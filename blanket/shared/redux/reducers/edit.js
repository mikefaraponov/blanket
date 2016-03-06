export default function follow(state = {}, action){
  switch (action.type) {

    case 'FETCH_BLANKS_REQUEST':
      return Object.assign({}, state, {
        blanks: [],
        isFetching: true,
        errorMessage: ''
      })

    case 'FETCH_BLANKS_SUCCESS':
      return Object.assign({}, state, {
        blanks: action.blanks,
        isFetching: false,
        errorMessage: ''
      })

    case 'FETCH_BLANKS_FAILURE':
      return Object.assign({}, state, {
        blanks: [],
        isFetching: false,
        errorMessage: action.message
      })

    default:
      return state
  }
}
