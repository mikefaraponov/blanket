class BlanksController < ApplicationController
  before_action :set_blank, only: [:update, :destroy]

  # GET /blanks
  # GET /blanks.json
  def index
  end

  # GET /blanks/1
  # GET /blanks/1.json
  def show
  end

  # POST /blanks
  # POST /blanks.json
  def create
    @user = User.find(params[:user_id])
    @blank = @user.blanks.new(blank_params)
    @blank.from_base64_to_image! blank_params[:image]
    if @blank.save
      if body = params[:blank][:body]
        Comment.create(body: body, blank_id: @blank.id, user_id: @blank.user_id)
        render json: @blank.serialize_for_blank
      else
        render json: @blank.serialize_without_comments, status: :created
      end
    else
      render_bad_request 'Creating Blank Failure!'
    end
  end

  # PATCH/PUT /blanks/1
  # PATCH/PUT /blanks/1.json
  def update
  end

  # DELETE /blanks/1
  # DELETE /blanks/1.json
  def destroy
    @blank.destroy
    head :no_content
  end

  private

  def set_blank
    @blank = Blank.find(params[:id])
  end

  def blank_params
    params.require(:blank).permit(:image, :user_id)
  end
end
