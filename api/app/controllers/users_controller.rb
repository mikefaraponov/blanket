class UsersController < ApplicationController
  before_action :set_user, only: [:show, :following, :followers]
  skip_before_action :authenticate, only: [:create, :following, :followers]

  def following
    render json: @user.following.map { |u|
      u.serialize_for_relationships
    }
  end

  def followers
    render json: @user.followers.map { |u|
      u.serialize_for_relationships
    }
  end

  def show
    render json: @user.serialize_for_show
  end

  def search
    query = user_params[:name]
    if query.nil?
      render_bad_request 'Empty Query!'
      return
    end
    @results = User.where("name LIKE ?", "#{query}%").map { |u| u.serizlize_for_search }
    if @results.nil?
      render_not_found
    else
      render json: @results
    end
  end

  def create
    @user = User.new(user_params)
    @user.from_base64_to_avatar!(user_params[:avatar]) if user_params[:avatar]
    if @user.save
      # UserMailer.welcome_email(@user).deliver_now
      render json: @user.serialize_for_user, status: :created
    else
      render_bad_request "Bad Request!"
    end
  end

  def update
    @current_user.update(user_params)
    @current_user.from_base64_to_avatar!(user_params[:avatar]) if user_params[:avatar]
    if @current_user.save
      render json: @current_user.serialize_for_user
    else
      render json: { message: 'Edit Failure!' }, status: :unprocessable_entity
    end
  end

  def destroy
    @current_user.destroy
    render json: { message: 'Successful!' }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:avatar, :name, :password, :biography, :sex, :email).select do |k, v|
      !v.nil?
    end
  end

end
