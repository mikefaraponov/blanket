export const ATTACH_FILE = 'ATTACH_FILE'
export const CLEAR_FILE = 'CLEAR_FILE'


export function attachFile({fileBase64, fileName}){
  return {
    fileBase64,
    fileName,
    type: ATTACH_FILE
  }
}
