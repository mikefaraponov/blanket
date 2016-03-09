class Comment < ActiveRecord::Base
  include ActiveModel::Serialization
  belongs_to :blank
  belongs_to :user

  validates :blank_id, :user_id, :body, presence: true
end
