class User < ActiveRecord::Base
  include ActiveModel::Serialization
  before_create :set_auth_token!

  has_secure_password
  has_many :comments, dependent: :destroy
  has_many :blanks, -> { order 'created_at DESC' }, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :active_relationships,
    class_name:  "Relationship",
    foreign_key: "follower_id",
    dependent:   :destroy
  has_many :passive_relationships,
    class_name:  "Relationship",
    foreign_key: "followed_id",
    dependent:   :destroy
  has_many :following, through: :active_relationships,  source: :followed
  has_many :followers, through: :passive_relationships, source: :follower


  has_attached_file :avatar,
    url: "/images/avatars/:hash.:extension",
    hash_secret: "BLANKET_1337",
    styles: { original: "64x64" },
    default_url: "/missing.png"

  validates :name, :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :name, length: { :in => 2..30  }
  validates :biography, length: { maximum: 500 }
  validates :password, length: { maximum: 20 }
  validates_attachment :avatar,
    content_type: { content_type: %w(image/jpeg image/jpg image/gif image/png) }

  def mail_to(user)
    UserMailer.email(self, user).deliver_now unless self.id === user.id
  end

  def follow(other_user)
    active_relationships.create(followed_id: other_user.id) unless self.following? other_user and self.id === other_user.id
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy if self.following? other_user
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def is_following
    self.followers.include? User.current_user
  end

  def blanks_count
    self.blanks.count
  end

  def followers_count
    self.followers.count
  end

  def following_count
    self.following.count
  end

  def like!(blank)
    self.likes.create(blank_id: blank.id) unless self.liked? blank
  end

  def dislike!(blank)
    self.likes.find_by(blank_id: blank.id).destroy if self.liked? blank
  end

  def liked?(blank)
    blank.likes.any? { |like| like.user_id === User.current_user.id }
  end

  def from_base64_to_avatar!(image)
    decoded_img = FromBase64.decode(image)
    StringIO.open(decoded_img[:data]) do |img|
      img.class.class_eval do
        attr_accessor :original_filename, :content_type
      end
      img.original_filename = "avatar.#{decoded_img[:extension]}"
      img.content_type = decoded_img[:mime_type]
      self.avatar = img
    end
  end

  def avatar_url
    avatar.url(:original, timestamp: false)
  end

  def serialize_for_relationships
    self.serializable_hash(only: [:id, :email, :name, :biography], methods: [:avatar_url])
  end
  def serialize_for_user
    self.serializable_hash(
      except: [:avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at, :password_digest],
      methods: :avatar_url
    )
  end
  def serizlize_for_search
    self.serializable_hash(
      only: [:id, :name, :email, :biography],
      methods: :avatar_url
    )
  end
  def serialize_for_show
    self.serializable_hash(
      only: [:id, :email, :name, :sex, :biography],
      methods: [:avatar_url, :blanks_count, :following_count, :followers_count, :is_following],
      :include => {
        blanks: {
          only: [:id],
          :include => {
            comments: {
              :include => {user: {only: [:name, :email], methods: :avatar_url}}
            }
          },
          methods: [:likes_count, :is_liked_by_current_user, :image_url, :your_like_id]
        }
      }
    )
  end

  def set_auth_token!
    self.token = generate_token
    self
  end

  private

  def generate_token
    SecureRandom.uuid.gsub(/\-/,'')
  end


  def self.current_user
    Thread.current[:current_user]
  end

  def self.current_user=(usr)
    Thread.current[:current_user] = usr
  end

end
