Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]
  resources :relationships, only: [:create, :destroy]

  resources :users, except: [:new, :edit, :index] do
    resources :blanks, except: [:new, :edit] do
      resources :comments, except: [:new, :edit]
      resources :likes, except: [:new, :edit, :update, :show, :index]
    end
    collection do
      get :search
    end
    member do
      get :following, :followers
    end
  end

  post '/login', to: 'auth#login'
  delete '/logout', to: 'auth#logout'
end
