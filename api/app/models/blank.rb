class Blank < ActiveRecord::Base
  include ActiveModel::Serialization

  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_attached_file :image,
    url: "/images/blanks/:hash.:extension",
    hash_secret: "BLANKET_IMAGES",
    styles: { original: "300x225" },
    default_url: "/300x225.png"

  validates :user_id, presence: true

  validates_attachment :image,
    content_type: { content_type: %w(image/jpeg image/jpg image/gif image/png) }
  def serialize_without_comments
    self.serializable_hash(only: [:id],
                           methods: [:likes_count, :is_liked_by_current_user, :image_url])
  end
  def serialize_for_blank
    self.serializable_hash(
      only: [:id],
      :include => {comments: {
                     :include => {user: {only: [:name, :email], methods: :avatar_url}}
      }},
    methods: [:likes_count, :is_liked_by_current_user, :image_url])
  end
  def from_base64_to_image!(image)
    decoded_img = FromBase64.decode(image)
    StringIO.open(decoded_img[:data]) do |img|
      img.class.class_eval do
        attr_accessor :original_filename, :content_type
      end
      img.original_filename = "blank.#{decoded_img[:extension]}"
      img.content_type = decoded_img[:mime_type]
      self.image = img
    end
  end

  def image_url
    image.url(:original, timestamp: false)
  end

  def likes_count
    self.likes.count
  end

  def is_liked_by_current_user
    self.likes.any? { |like| like.user_id === User.current_user.id }
  end

  def your_like_id
    if @like = self.likes.find { |like| like.user_id === User.current_user.id }
      @like.id
    end
  end

end
