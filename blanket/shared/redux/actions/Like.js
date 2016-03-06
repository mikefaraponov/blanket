import ajax from '../utils/ajax'

const {stringify} =  JSON

function receiveLike(index, like) {
  return {
    type: 'LIKE',
    isFetching: false,
    index,
    like
  }
}

function likeError(message) {
  return {
    type: 'FETCH_LIKE_FAILURE',
    isFetching: false,
    message
  }
}


export function postLike(user_id, blank_id, index) {

  return dispatch => {
    
      return ajax(`/users/1337/blanks/${blank_id}/likes`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json' ,
          'Authorization': 'Token token=' + localStorage.token
        },
        body: stringify(
          {
            like: {
              blank_id
            }
          }
        )
      })
      .then( like =>  {
          dispatch(receiveLike(index, like))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(likeError(err.message)); 
      })

      
  }
}

export function destroyLike(user_id, blank_id, like_id, index) {

  return dispatch => {
    

      return ajax(`/users/1337/blanks/${blank_id}/likes/${like_id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type':'application/json' ,
          'Authorization': 'Token token=' + localStorage.token
        }
      })
      .then( like =>  {
          dispatch(receiveLike(index, like))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(likeError(err.message)); 
      })

      
  }
}

