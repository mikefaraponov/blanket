// import toJSON from '../utils/toJSON'
import ajax from '../utils/ajax'

const {stringify} =  JSON

function receiveSubscribe(is_following, followers_count) {
  return {
    type: 'SUBSCRIBE',
    isFetching: false,
    is_following,
    followers_count
  }
}

function subscribeError(message) {
  return {
    type: 'SUBSCRIBE_FAILURE',
    isFetching: false,
    message
  }
}

export function postSubscribe(other_user_id) {

  const config = {
    method: 'POST',
    headers: { 
      'Content-Type':'application/json' ,
      'Authorization': 'Token token=' + localStorage.token
    },
    body: stringify(
      {
        relationship: {
          followed_id: other_user_id
        }
      }
    )
  }

  return dispatch => {
    
      return ajax('/relationships', config)
      .then( subscribe =>  {
          console.info("Fuck!" + subscribe.is_following)
          dispatch(receiveSubscribe(subscribe.is_following, subscribe.followers_count))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(subscribeError(err.message)); 
      })

      
  }
}

export function destroySubscribe(other_user_id) {

  const config = {
    method: 'DELETE',
    headers: { 
      'Content-Type':'application/json' ,
      'Authorization': 'Token token=' + localStorage.token
    },
    body: stringify(
      {
        relationship: {
          followed_id: other_user_id
        }
      }
    )
  }

  return dispatch => {
    

      return ajax(`/relationships/${other_user_id}`, config)
      .then( subscribe =>  {
          dispatch(receiveSubscribe(subscribe.is_following, subscribe.followers_count))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(subscribeError(err.message)); 
      })

      
  }
}

