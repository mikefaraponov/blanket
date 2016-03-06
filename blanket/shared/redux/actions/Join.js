import ajax from '../utils/ajax'
import {authenticate} from './Login'
export const FETCH_JOIN_REQUEST = 'FETCH_JOIN_REQUEST'
export const FETCH_JOIN_SUCCESS = 'FETCH_JOIN_SUCCESS'
export const FETCH_JOIN_FAILURE = 'FETCH_JOIN_FAILURE'

function requestJoin() {
  return {
    type: FETCH_JOIN_REQUEST,
    isFetching: true
  }
}

function receiveJoin(user) {
  return {
    type: FETCH_JOIN_SUCCESS,
    isFetching: false,
    user
  }
}

function joinError(message) {
  return {
    type: FETCH_JOIN_FAILURE,
    isFetching: false,
    message
  }
}

export function joinUser(form) {

  return dispatch => {
    
    dispatch(requestJoin())

      return ajax(`/users`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json' 
        },
        body: JSON.stringify(
          {
            user: form
          }
        )
      })
      .then( user =>  {
          dispatch(receiveJoin(user))
          authenticate(dispatch, user)
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(joinError(err.message)); 
      })

      
  }
}



