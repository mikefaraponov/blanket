import {routeActions} from 'react-router-redux'
import {authenticate} from './Login'
import ajax from '../utils/ajax'
export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE'
const {stringify} =  JSON

function requestSearch() {
  return {
    type: FETCH_SEARCH_REQUEST,
    isFetching: true
  }
}

function receiveSearchResults(results) {
  return {
    type: FETCH_SEARCH_SUCCESS,
    isFetching: false,
    results
  }
}

function searchError(message) {
  return {
    type: FETCH_SEARCH_FAILURE,
    isFetching: false,
    message
  }
}

export function searchUsers(query) {

  const config = {
    method: 'GET',
    headers: {'Authorization': 'Token token=' + localStorage.token}
  }

  return dispatch => {
    dispatch(requestSearch())
      return ajax(`/users/search?user[name]=${query}`, config)
      .then( results =>  {
          dispatch(receiveSearchResults(results))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(searchError(err.message)); 
      })
  }
}



