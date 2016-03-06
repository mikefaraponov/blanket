require 'test_helper'

class LikesControllerTest < ActionController::TestCase
  setup do
    @like = likes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:likes)
  end

  test "should create like" do
    assert_difference('Like.count') do
      post :create, like: { post_id: @like.post_id, user_id: @like.user_id }
    end

    assert_response 201
  end

  test "should show like" do
    get :show, id: @like
    assert_response :success
  end

  test "should update like" do
    put :update, id: @like, like: { post_id: @like.post_id, user_id: @like.user_id }
    assert_response 204
  end

  test "should destroy like" do
    assert_difference('Like.count', -1) do
      delete :destroy, id: @like
    end

    assert_response 204
  end
end
