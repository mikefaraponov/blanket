import {routeActions} from 'react-router-redux'
import ajax from '../utils/ajax'
export const FETCH_USER_PAGE_REQUEST = 'FETCH_USER_PAGE_REQUEST'
export const FETCH_USER_PAGE_SUCCESS = 'FETCH_USER_PAGE_SUCCESS'
export const FETCH_USER_PAGE_FAILURE = 'FETCH_USER_PAGE_FAILURE'

const {stringify} =  JSON

function requestUserPage() {
  return {
    type: FETCH_USER_PAGE_REQUEST,
    isFetching: true
  }
}

function receiveUserPage(profile) {
  return {
    type: FETCH_USER_PAGE_SUCCESS,
    isFetching: false,
    profile
  }
}

function userPageError(message) {
  return {
    type: FETCH_USER_PAGE_FAILURE,
    isFetching: false,
    message
  }
}

export function getUserPageById(id) {

  const config = {
    method: 'GET',
    headers: { 'Authorization': 'Token token=' + localStorage.token }
  }

  return dispatch => {

    dispatch(requestUserPage())
      return ajax(`/users/${id}`, config)
        .then( userPage =>  {
            dispatch(receiveUserPage(userPage))
        })
        .catch(err => {
          console.warn("Error: ", err.message)
          dispatch(userPageError(err.message)); 
        })

  }
}


      
