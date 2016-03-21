// import toJSON from '../utils/toJSON'
import ajax from '../utils/ajax'
export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE'
export const SUBSCRIBE_FAILURE = 'SUBSCRIBE_FAILURE'
export const SUBSCRIBE_REQUEST = 'SUBSCRIBE_REQUEST'

function receiveSubscribe(is_following, followers_count) {
  return {
    type: SUBSCRIBE_SUCCESS,
    isFetching: false,
    is_following,
    followers_count
  }
}

function requestSubscribe(){
  return {
    type: SUBSCRIBE_REQUEST,
    loading: true
  }
} 

function subscribeError(message) {
  return {
    type: SUBSCRIBE_FAILURE,
    isFetching: false,
    message
  }
}

export function postSubscribe(otherUserId) {
  return dispatch => {
    dispatch(requestSubscribe())
    return ajax('/relationships', {
      method: 'POST',
      headers: { 
        'Content-Type':'application/json' ,
        'Authorization': 'Token token=' + localStorage.token
      },
      body: JSON.stringify(
        {
          relationship: {
            followed_id: otherUserId
          }
        }
      )
    })
    .then( subscribe => dispatch(receiveSubscribe(subscribe.is_following, subscribe.followers_count)) )
    .catch( err => dispatch(subscribeError(err.message)) )
  }
}

export function destroySubscribe(otherUserId) {
  return dispatch => {
    dispatch(requestSubscribe())
    return ajax(`/relationships/${otherUserId}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type':'application/json' ,
        'Authorization': 'Token token=' + localStorage.token
      },
      body: JSON.stringify(
        {
          relationship: {
            followed_id: otherUserId
          }
        }
      )
    })
    .then( subscribe => dispatch(receiveSubscribe(subscribe.is_following, subscribe.followers_count)) )
    .catch(err => dispatch(subscribeError(err.message)) )
  }
}

