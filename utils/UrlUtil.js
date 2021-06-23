import {isNull} from './StringUtil.js'
export function encodeUrl(_url){
	if(isNull(_url)){
		return _url;
	}
	_url = _url.replace("?","**");
	_url = _url.replaceAll("&","@@");
	_url = _url.replace("#","!!");
	return _url;
}

export function decodeUrl(_url){
	if(isNull(_url)){
		return _url;
	}
	if(_url.indexOf("?")>-1){
		_url = _url.replaceAll("**", "&"); //已经有？了
	}else{
		_url = _url.replace("**", "?"); //已经有？了
	}
	_url = _url.replace("!!", "#");
	_url = _url.replaceAll("@@", "&");
	_url = _url.replaceAll("**", "&"); //已经有？了
	
	return _url;
}