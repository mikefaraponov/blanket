class LikesController < ApplicationController
  before_action :set_blank, only: [:create, :destroy]

  def create
    if @current_user.like! @blank
      @like = @current_user.likes.find_by(blank_id: @blank.id)
      render json: { likes_count: @blank.likes.count, your_like_id: @like.id, is_liked_by_current_user: true  }, status: :created
    else
      render_bad_request 'ALREADY_LIKED'
    end
  end

  def destroy
    if @current_user.dislike! @blank
      render json: {likes_count: @blank.likes.count, your_like_id: nil, is_liked_by_current_user: false}
    else
      render_bad_request 'IS_NOT_LIKED'
    end
  end

  private

  def set_blank
    @blank = Blank.find(params[:blank_id])
  end

  def like_params
    params.require(:like).permit(:blank_id)
  end

end
