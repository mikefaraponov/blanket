require 'test_helper'

class BlanksControllerTest < ActionController::TestCase
  setup do
    @blank = blanks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:blanks)
  end

  test "should create blank" do
    assert_difference('Blank.count') do
      post :create, blank: { image: @blank.image, user_id: @blank.user_id }
    end

    assert_response 201
  end

  test "should show blank" do
    get :show, id: @blank
    assert_response :success
  end

  test "should update blank" do
    put :update, id: @blank, blank: { image: @blank.image, user_id: @blank.user_id }
    assert_response 204
  end

  test "should destroy blank" do
    assert_difference('Blank.count', -1) do
      delete :destroy, id: @blank
    end

    assert_response 204
  end
end
