
import {FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE} from '../actions/Login'
import {FETCH_JOIN_REQUEST, FETCH_JOIN_SUCCESS, FETCH_JOIN_FAILURE} from '../actions/Join'
import {LOGOUT_SUCCESS} from '../actions/Logout'

function user(state = {
    isFetching: false,
    isAuthenticated: localStorage.user ? true : false,
    errorMessage: '',
    user: localStorage.user && JSON.parse(localStorage.user) || null
  }, action) {

  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case FETCH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user
      })
    case FETCH_LOGIN_FAILURE:
      console.warn(action)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case 'CLEAR_FAILURE_MESSAGE': 
      return Object.assign({}, state, {
        errorMessage: ''
      })

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      })

    case FETCH_JOIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    case FETCH_JOIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user
      })

    case FETCH_JOIN_FAILURE:
    console.warn(action)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    
    default:
      return state
  }
}

export default user;
