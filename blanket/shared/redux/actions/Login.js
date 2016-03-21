import {routeActions} from 'react-router-redux'
import ajax from '../utils/ajax'
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE'

function requestLogin() {
  return {
    type: FETCH_LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin(user) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError(message) {
  return {
    type: FETCH_LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {

  return dispatch => {
    
    dispatch(requestLogin())

    return ajax('/login', {
      method: 'POST',
      headers: { 
        'Content-Type':'application/json' 
      },
      body: JSON.stringify(
        {
          user: creds
        }
      )
    })
    .then( user => authenticate(dispatch, user) )
    .catch( err => dispatch(loginError(err.message)) )
  }
}

export function authenticate(dispatch, user){
  localStorage.user = JSON.stringify(user)
  localStorage.token = user.token
  dispatch(receiveLogin(user))
  dispatch(routeActions.push(`/id${user.id}`))
}




