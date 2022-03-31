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

export function getPageUrl(){
	    let pages = getCurrentPages()
	    let len = pages.length
	    let curParam = pages[len - 1].options //获取当前页面参数
	    let param = []
	    for (let key in curParam) { //获取key=value键值对格式数组
		param.push(key + '=' + curParam[key])
	    }
	    let _url = '' //除去第一个参数拼接后面参数
	    param.forEach((item, i) => {
		if (i != 0) { //拼接&符号，由于第一组前拼接的是？所有第一组需要单独处理
		_url += '&' + item
		}
	    })
	    let url = '/' + pages[len - 1].route + '?' + param[0] + _url //最终格式**/pages/index/index/?id=11&name='boyyang'&sex='man'**
		return url;
}
