import {FETCH_USER_PAGE_REQUEST, FETCH_USER_PAGE_SUCCESS, FETCH_USER_PAGE_FAILURE} from '../actions/UserPage'
var deepAssign = require('deep-assign');

function search(state = {
    profile: {},
    isFetching: false,
    errorMessage: ''
  }, action) {

  switch (action.type) {
    case FETCH_USER_PAGE_REQUEST:
      return Object.assign({}, state, {
        profile: true,
        isFetching: true,
        errorMessage: ''
      })
    case FETCH_USER_PAGE_SUCCESS:
      return Object.assign({}, state, {
        profile: action.profile,
        isFetching: false,
        errorMessage: ''
      })
    case FETCH_USER_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ''
      })
    case 'FETCH_ADD_BLANK_SUCCESS':
      return Object.assign({}, state, {
        profile: {
          avatar_url: state.profile.avatar_url,
          blanks_count:  state.profile.blanks_count + 1,
          following_count:  state.profile.following_count,
          followers_count:  state.profile.followers_count,
          is_following: state.profile.is_following,
          id:  state.profile.id,
          email:  state.profile.email,
          name:  state.profile.name,
          biography:  state.profile.biography,
          sex: state.profile.sex,
          blanks: [{
              id: action.blank.id,
              is_liked_by_current_user: action.blank.is_liked_by_current_user,
              likes_count: action.blank.likes_count,
              image_url: action.blank.image_url,
              comments: action.blank.comments || []
            },
            ...state.profile.blanks
          ]
        },
        isFetching: false,
        errorMessage: ''
      })

    case 'ADD_COMMENT_SUCCESS':
      return Object.assign({}, state, {
        profile: {
          avatar_url: state.profile.avatar_url,
          blanks_count:  state.profile.blanks_count,
          following_count:  state.profile.following_count,
          followers_count:  state.profile.followers_count,
          is_following: state.profile.is_following,
          id:  state.profile.id,
          email:  state.profile.email,
          name:  state.profile.name,
          biography:  state.profile.biography,
          sex: state.profile.sex,
          blanks: state.profile.blanks.map((b, i)=>{ if(i == action.index) b.comments.push(action.comment); return b})
        },
        isFetching: false,
        errorMessage: ''
      })
    case 'LIKE':
      return Object.assign({}, state, {
        profile: {
          avatar_url: state.profile.avatar_url,
          blanks_count:  state.profile.blanks_count,
          following_count:  state.profile.following_count,
          followers_count:  state.profile.followers_count,
          id:  state.profile.id,
          is_following: state.profile.is_following,
          email:  state.profile.email,
          name:  state.profile.name,
          biography:  state.profile.biography,
          sex: state.profile.sex,
          blanks: state.profile.blanks.map((b, i)=> { 
            if(i == action.index) {
              b.likes_count = action.like.likes_count
              b.is_liked_by_current_user = action.like.is_liked_by_current_user
              b.your_like_id = action.like.your_like_id
            }
            return b
          })
        },
        isFetching: false,
        errorMessage: ''
      })
    case 'SUBSCRIBE':
      return Object.assign({}, state, {
        profile: {
          avatar_url: state.profile.avatar_url,
          blanks_count:  state.profile.blanks_count,
          following_count:  state.profile.following_count,
          followers_count:  action.followers_count,
          is_following:  action.is_following,
          id:  state.profile.id,
          email:  state.profile.email,
          name:  state.profile.name,
          biography:  state.profile.biography,
          sex: state.profile.sex,
          blanks: state.profile.blanks,
          isFetching: false,
          errorMessage: ''
      }
    })
    case 'FETCH_ADD_BLANK_REQUEST':
      return Object.assign({}, state, {
        errorMessage: ''
      })

    case 'FETCH_ADD_BLANK_FAILURE':
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: action.message
      })
    default:
      return state
  }
}

export default search;
