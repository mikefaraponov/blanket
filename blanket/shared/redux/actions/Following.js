import ajax from '../utils/ajax'
// export const FETCH_FOLLOWING_REQUEST = 'FETCH_SEARCH_REQUEST'
export const FETCH_FOLLOWING_SUCCESS = 'FETCH_FOLLOWING_SUCCESS'
export const FETCH_FOLLOWING_FAILURE = 'FETCH_FOLLOWING_FAILURE'

const {stringify} =  JSON

// function requestSearch() {
//   return {
//     type: FETCH_SEARCH_REQUEST,
//     isFetching: true
//   }
// }

function receiveFollowing(following) {
  return {
    type: FETCH_FOLLOWING_SUCCESS,
    isFetching: false,
    following
  }
}

function followingError(message) {
  return {
    type: FETCH_FOLLOWING_FAILURE,
    isFetching: false,
    message
  }
}

export function getFollowing(userId) {

  const config = {
    method: 'GET',
    headers: {'Authorization': 'Token token=' + localStorage.token}
  }

  return dispatch => {

      return ajax(`/users/${userId}/following`, config)
      .then( following =>  {
          dispatch(receiveFollowing(following))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(followingError(err.message)); 
      })
  }
}



