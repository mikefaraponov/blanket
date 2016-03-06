class AuthController < ApplicationController

  skip_before_action :authenticate, except: :logout

  def login
    @logginer = User.new(login_params)
    if @user = User.find_by(email: @logginer.email)
      if @user = @user.try(:authenticate, @logginer.password)
        render json: @user
      else
        render_bad_credentials 'Bad Password!'
      end
    else
      render_bad_credentials 'Bad Email!'
    end
  end

  def logout
    if @current_user
      @current_user.set_auth_token!
      @current_user.save
    else
      render_unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end
end
