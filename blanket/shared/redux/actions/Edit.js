import ajax from '../utils/ajax'
import {authenticate} from './Login'

export const FETCH_EDIT_USER_REQUEST = 'FETCH_EDIT_USER_REQUEST'
export const FETCH_EDIT_USER_SUCCESS = 'FETCH_EDIT_USER_SUCCESS'
export const FETCH_EDIT_USER_FAILURE = 'FETCH_EDIT_USER_FAILURE'
export const FETCH_DELETE_USER_SUCCESS = 'FETCH_DELETE_USER_SUCCESS'

import { routeActions } from 'react-router-redux'

function requestEdit() {
  return {
    type: FETCH_EDIT_USER_REQUEST,
    isFetching: true
  }
}

function receiveEdit(user) {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    isFetching: false,
    user
  }
}

function editError(message) {
  return {
    type: FETCH_EDIT_USER_FAILURE,
    isFetching: false,
    message
  }
}

function receiveDelete(user) {
  return {
    type: FETCH_DELETE_USER_SUCCESS,
    isFetching: false,
    user
  }
}

export function editUser(user) {
  return dispatch => {
    dispatch(requestEdit())
    return ajax(`/users/1337`, {
      method: 'PATCH',
      headers: { 
        'Content-Type':'application/json',
        'Authorization': 'Token token=' + localStorage.token
      },
      body: JSON.stringify({user})
    })
    .then( user => {
        dispatch(receiveEdit(user))
        authenticate(dispatch, user)
    })
    .catch( err => dispatch(editError(err.message)) )
  }
}


export function deleteUser() {
  return dispatch => {
    return ajax(`/users/1337`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Token token=${localStorage.token}`
      }
    })
    .then( () =>  {
      delete localStorage.user;
      delete localStorage.token;
      dispatch(receiveDelete())
      dispatch(routeActions.push('/login'))
    })
    .catch(err => console.warn(err.message))
  }
}
