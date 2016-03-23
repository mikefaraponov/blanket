class Comment < ActiveRecord::Base
  include ActiveModel::Serialization
  belongs_to :blank
  belongs_to :user

  validates :blank_id, :user_id, :body, presence: true

  def serialize_for_create
    self.serializable_hash(:include => {user: {only: [:name, :email], methods: :avatar_url}})
  end
end
