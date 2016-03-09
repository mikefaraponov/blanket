import ajax from '../utils/ajax'

const {stringify} =  JSON


function receiveComment(index, comment) {
  return {
    type: 'ADD_COMMENT_SUCCESS',
    index,
    comment
  }
}


export function addComment(post_id, index, body) {

  return dispatch => {
    
      return ajax(`/users/1337/blanks/${post_id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token token=' + localStorage.token,
          'Content-Type':'application/json'
        },
        body: stringify({comment: {blank_id: post_id, body} }) 
      })
      .then( comment =>  {
          dispatch(receiveComment(index, comment))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
      })

      
  }
}

function requestBlank() {
  return {
    type: 'FETCH_ADD_BLANK_REQUEST',
    isBlankFetching: true,
    isFetching: true
  }
}

function receiveBlank(blank) {
  return {
    type: 'FETCH_ADD_BLANK_SUCCESS',
    isFetching: false,
    isBlankFetching: false,
    blank
  }
}

function blankError(message) {
  return {
    type: 'FETCH_ADD_BLANK_FAILURE',
    isFetching: false,
    isBlankFetching: false,
    message
  }
}


export function postBlank(user_id, blank) {

  return dispatch => {
    
      dispatch(requestBlank())

      return ajax(`/users/${user_id}/blanks`, {
        method: 'POST',
        headers: { 
          'Content-Type':'application/json' ,
          'Authorization': 'Token token=' + localStorage.token
        },
        body: stringify(
          {
            blank
          }
        )
      })
      .then( blank =>  {
          dispatch(receiveBlank(blank))
      })
      .catch(err => {
        console.warn("Error: ", err.message)
        dispatch(blankError(err.message)); 
      })

      
  }
}


