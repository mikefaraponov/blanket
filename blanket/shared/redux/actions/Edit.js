import ajax from '../utils/ajax'
import {authenticate} from './Login'

export const FETCH_EDIT_REQUEST = 'FETCH_EDIT_REQUEST'
export const FETCH_EDIT_SUCCESS = 'FETCH_EDIT_SUCCESS'
export const FETCH_EDIT_FAILURE = 'FETCH_EDIT_FAILURE'
export const FETCH_DELETE_USER_SUCCESS = 'FETCH_DELETE_USER_SUCCESS'

import {routeActions} from 'react-router-redux'

function requestEdit() {
  return {
    type: FETCH_EDIT_REQUEST,
    isFetching: true
  }
}

function receiveEdit(user) {
  return {
    type: FETCH_EDIT_SUCCESS,
    isFetching: false,
    user
  }
}

function editError(message) {
  return {
    type: FETCH_EDIT_FAILURE,
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

export function editUser(form) {

  return dispatch => {
    
    dispatch(requestEdit())

      return ajax(`/users/1337`, {
        method: 'PATCH',
        headers: { 
          'Content-Type':'application/json',
          'Authorization': 'Token token=' + localStorage.token
        },
        body: JSON.stringify(
          {
            user: form
          }
        )
      })
      .then( user =>  {
          dispatch(receiveEdit(user))
          authenticate(dispatch, user)
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(editError(err.message)); 
      })

      
  }
}


export function deleteUser() {

  return dispatch => {
    
      return ajax(`/users/1337`, {
        method: 'DELETE',
        headers: { 
          'Authorization': 'Token token=' + localStorage.token
        }
      })
      .then( json =>  {
        console.log(json)
        delete localStorage.user;
        delete localStorage.token;
        dispatch(receiveDelete())
        dispatch(routeActions.push('/login'))
      })
      .catch(err => {
        console.log(err.message)
      })

      
  }
}
