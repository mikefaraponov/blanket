class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include Utils::RenderMixin
  include Utils::CorsMixin

  protect_from_forgery with: :null_session

  before_filter :authenticate, :cors_preflight_check
  skip_before_action :authenticate, only: [:cors_preflight_check]
  after_action :cors_set_access_control_headers
  around_filter :set_current_user

  private

  def set_current_user
    User.current_user = @current_user
    yield
  ensure
    User.current_user = nil
  end

  protected

  def authenticate
    user = authenticate_with_http_token do |token, options|
      User.find_by(token: token)
    end

    unless user.nil?
      @current_user = user
    else
      render_unauthorized
    end

  end

end
