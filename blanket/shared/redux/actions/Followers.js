import ajax from '../utils/ajax'
// export const FETCH_FOLLOWERS_REQUEST = 'FETCH_FOLLOWERS_REQUEST'
export const FETCH_FOLLOWERS_SUCCESS = 'FETCH_FOLLOWERS_SUCCESS'
export const FETCH_FOLLOWERS_FAILURE = 'FETCH_FOLLOWERS_FAILURE'

const {stringify} =  JSON

// function requestSearch() {
//   return {
//     type: FETCH_SEARCH_REQUEST,
//     isFetching: true
//   }
// }

function receiveFollowers(followers) {
  return {
    type: FETCH_FOLLOWERS_SUCCESS,
    isFetching: false,
    followers
  }
}

function followersError(message) {
  return {
    type: FETCH_FOLLOWERS_FAILURE,
    isFetching: false,
    message
  }
}

export function getFollowers(userId) {

  const config = {
    method: 'GET',
    headers: {'Authorization': 'Token token=' + localStorage.token}
  }

  return dispatch => {

      return ajax(`/users/${userId}/followers`, config)
      .then( followers =>  {
          dispatch(receiveFollowers(followers))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(followersError(err.message)); 
      })
  }
}



