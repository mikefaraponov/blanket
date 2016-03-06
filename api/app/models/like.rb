class Like < ActiveRecord::Base
  include ActiveModel::Serialization

  belongs_to :user
  belongs_to :blank

  validates :blank_id, presence: true
  validates :user_id, presence: true

end
