export default function follow(state = {followers: [], following: [], isFetching: false, errorMessage: ''}, action){
  switch (action.type) {

    case 'FETCH_FOLLOWERS_REQUEST':
      return Object.assign({}, state, {
        followers: [],
        isFetching: true,
        errorMessage: ''
      })

    case 'FETCH_FOLLOWERS_SUCCESS':
      return Object.assign({}, state, {
        followers: action.followers || [],
        isFetching: false,
        errorMessage: ''
      })

    case 'FETCH_FOLLOWERS_FAILURE':
      return Object.assign({}, state, {
        followers: [],
        isFetching: false,
        errorMessage: action.message
      })
    case 'FETCH_FOLLOWING_REQUEST':
      return Object.assign({}, state, {
        following: [],
        isFetching: true,
        errorMessage: ''
      })

    case 'FETCH_FOLLOWING_SUCCESS':
      return Object.assign({}, state, {
        following: action.following || [],
        isFetching: false,
        errorMessage: ''
      })

    case 'FETCH_FOLLOWING_FAILURE':
      return Object.assign({}, state, {
        following: [],
        isFetching: false,
        errorMessage: action.message
      })

    default:
      return state
  }
}
