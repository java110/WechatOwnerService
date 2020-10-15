import {
	isEmpty
} from './StringUtil'
/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
export function formatRichText(html) {
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"');
	return newContent;
}
/**
 * 替换 图片src
 * @param {Object} _content 富文本
 * @param {Object} _url 图片前缀
 */
export function replaceImgSrc(_content, _url) {
	console.log('_content', typeof(_content))
	if (isEmpty(_content)) {
		return _content;
	}
	// a 为富文本的字符串内容，为了测试，只写了img标签
	let b = /<img [^>]*src=['"]([^'"]+)[^>]*>/g; // img 标签取src里面内容的正则
	let s = _content.match(b); // 取到所有img标签 放到数组 s里面
	if (!isEmpty(s)) {
		for (let i = 0; i < s.length; i++) {
			let srcImg = s[i].replace(b, '$1'); //取src面的内容
			if (srcImg.slice(0, 4) == 'http' || srcImg.slice(0, 5) == 'https') {
				//若src前4位置或者前5位是http、https则不做任何修改
			} else {
				//修改富文本字符串内容 img标签src 相对路径改为绝对路径
				_content = _content.replace(srcImg, _url + srcImg);
			}
		}
	}

	return formatRichText(_content);
}
