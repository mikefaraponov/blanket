class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest
      t.attachment :avatar
      t.string :token
      t.boolean :sex
      t.text :biography

      t.timestamps null: false
    end
  end
end
