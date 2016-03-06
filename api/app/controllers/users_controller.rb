class UsersController < ApplicationController
  before_action :set_user, only: [:show, :following, :followers]
  skip_before_action :authenticate, only: [:create, :following, :followers]

  def index

  end

  def following
    render json: @user.following
  end

  def followers
    render json: @user.followers
  end

  def show
    render json: @user.serializable_hash(
      only: [:id, :email, :name, :sex, :biography],
      methods: [:avatar_url, :blanks_count, :following_count, :followers_count, :is_following],
      :include => {
        blanks: {
          only: [:id],
          :include => {
            comments: {
              :include => {user: {only: [:name, :email], methods: :avatar_url}}
            }
          },
          methods: [:likes_count, :is_liked_by_current_user, :image_url, :your_like_id]
        }
      }
    )
  end



  def search
    query = user_params[:name]
    if query.nil?
      render_bad_request 'Empty Query!'
      return
    end
    @results = User.where("name LIKE ?", "#{query}%").map { |u|
      u.serializable_hash(
        only: [:id, :name, :email, :biography],
        methods: :avatar_url
      )
    }
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
      render json: @user.serializable_hash(
        except: [:avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at, :password_digest],
        methods: :avatar_url
      ) , status: :created
    else
      render_bad_request "Bad Request!"
    end
  end



  def update
    @current_user.from_base64_to_avatar!(user_params[:avatar]) if user_params[:avatar]
    @current_user.name = user_params[:name] if user_params[:name]
    @current_user.email = user_params[:email] if user_params[:email]
    @current_user.biography = user_params[:biography] if user_params[:biography]
    @current_user.password = user_params[:password] if user_params[:password]
    @current_user.sex = user_params[:sex]
    if @current_user.save
      render json: @current_user.serializable_hash(
        except: [:avatar_file_name, :avatar_content_type, :avatar_file_size, :avatar_updated_at, :password_digest],
        methods: :avatar_url
      )
    else
      render json: { message: 'Edit Failure!' }, status: :unprocessable_entity
    end
  end


  def destroy
    @current_user.destroy
    render json: {message: 'Successful!'}
  end


  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:avatar, :name, :password, :biography, :sex, :email)
  end

end
