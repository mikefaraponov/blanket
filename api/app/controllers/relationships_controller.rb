class RelationshipsController < ApplicationController
  before_action :set_other_user

  def create
    if @current_user.follow @other_user
      render json: {is_following: true, followers_count: @other_user.followers.count}
    else
      render_bad_request "IS_ALREADY_FOLLOWED"
    end
  end

  def destroy
    if @current_user.unfollow @other_user
      render json: {is_following: false, followers_count: @other_user.followers.count}
    else
      render_bad_request "IS_ALREADY_UNFOLLOWED"
    end
  end


  private

  def set_other_user
    @other_user = User.find(params[:relationship][:followed_id])
  end

  # def relationship_params
  #   params.require(:relationship).permit(:followed_id)
  # end

end
