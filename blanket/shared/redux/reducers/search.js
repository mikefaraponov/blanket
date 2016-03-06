import {FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE} from '../actions/Search'

function search(state = {
    results: [],
    isFetching: false,
    errorMessage: ''
  }, action) {

  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: ''
      })
    case FETCH_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        results: action.results,
        isFetching: false,
        errorMessage: ''
      })
    case 'CLEAR_SEARCH_RESULTS':
      return Object.assign({}, state, {
        results: [],
        isFetching: false,
        errorMessage: ''
      })
    case FETCH_SEARCH_FAILURE:
      console.warn(action)
      return Object.assign({}, state, {
        results: [],
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

export default search;
