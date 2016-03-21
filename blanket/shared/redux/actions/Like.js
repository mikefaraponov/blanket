import ajax from '../utils/ajax'

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


export function postLike(userId, blankId, index) {
  return dispatch => {
      return ajax(`/users/1337/blanks/${blankId}/likes`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json' ,
          'Authorization': 'Token token=' + localStorage.token
        },
        body: JSON.stringify({
          like: {
            blank_id: blankId
          }
        })
      })
      .then( like => dispatch(receiveLike(index, like)) )
      .catch( err => dispatch(likeError(err.message)) )

      
  }
}

export function destroyLike(userId, blankId, likeId, index) {
  return dispatch => {
      return ajax(`/users/1337/blanks/${blankId}/likes/${likeId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type':'application/json' ,
          'Authorization': 'Token token=' + localStorage.token
        }
      })
      .then( like => dispatch(receiveLike(index, like)) )
      .catch( err => dispatch(likeError(err.message)) )
  }
}

