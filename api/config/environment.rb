# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.gmail.com',
  :domain         => 'gmail.com',
  :port           => 587,
  :user_name      => 'master.chi.of.unix@gmail.com',
  :password       => ENV["GMAIL_SECRET"],
  :authentication => :plain,
  :enable_starttls_auto => true
}
