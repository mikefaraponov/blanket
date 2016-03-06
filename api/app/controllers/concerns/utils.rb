module Utils

  module CorsMixin

    def cors_preflight_check
      if request.method == :options
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PATCH, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, content-type'
        head(:ok)
      end
    end

    protected

    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PATCH, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, content-type'
    end

  end

  module RenderMixin

    protected

    def render_not_found
      render status: :not_found, json: { message: 'Not Found!' }
    end

    def render_bad_credentials(status_text)
      render status: :unauthorized, json: {
        message: status_text
      }
    end

    def render_unauthorized
      self.headers['WWW-Authenticate'] = 'Token realm="Blanket"'
      render json: { message: 'Unauthorized' }, status: :unauthorized
    end

    def render_bad_request(message)
      render status: :bad_request, json: {message: message}
    end

  end

end
