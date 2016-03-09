class Like < ActiveRecord::Base
  include ActiveModel::Serialization

  belongs_to :user
  belongs_to :blank

  validates :user_id, :blank_id, presence: true
end
