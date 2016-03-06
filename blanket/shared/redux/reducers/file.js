import { ATTACH_FILE } from '../actions/attachFile'

function file(state = {
    fileName: null,
    fileBase64: null
  }, action) {
  switch (action.type) {
    case ATTACH_FILE:
      return Object.assign({}, state, {
        fileName: action.fileName,
        fileBase64: action.fileBase64
      })
    case 'CLEAR_FILE':
      return Object.assign({}, state, {
        fileName: null,
        fileBase64: null
      })
    default:
      return state
  }
}

export default file;
