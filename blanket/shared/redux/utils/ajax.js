
function json(res){
	return res.json().then(json => ({json, res}))
}

function http({json, res}){
	return (!res.ok)?Promise.reject(json):json
}

export default function ajax(url, options){
  return fetch(API + url, options).
  		 then(json).
  		 then(http);
}

