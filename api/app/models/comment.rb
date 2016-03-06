class Comment < ActiveRecord::Base
  include ActiveModel::Serialization
  belongs_to :blank
  belongs_to :user

  validates :blank_id, presence: true
  validates :user_id, presence: true
  validates :body, presence: true

end
