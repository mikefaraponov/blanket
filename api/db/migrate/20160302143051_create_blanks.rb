class CreateBlanks < ActiveRecord::Migration
  def change
    create_table :blanks do |t|
      t.attachment :image
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
