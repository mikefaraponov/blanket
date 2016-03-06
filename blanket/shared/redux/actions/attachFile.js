export const ATTACH_FILE = 'ATTACH_FILE'


export function attachFile({fileBase64, fileName}){
  return {
    type: ATTACH_FILE,
    fileBase64,
    fileName
  }
}
