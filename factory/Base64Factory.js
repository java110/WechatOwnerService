/**
 * base64 处理 工厂类
 * 
 * add by wuxw 2020-01-01 美丽的夏都西宁
 */
class Base64Factory {
	constructor() {}

	static getLocalFilePath(path) {
		if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf(
				'_downloads') === 0) {
			return path
		}
		if (path.indexOf('file://') === 0) {
			return path
		}
		if (path.indexOf('/storage/emulated/0/') === 0) {
			return path
		}
		if (path.indexOf('/') === 0) {
			var localFilePath = plus.io.convertAbsoluteFileSystem(path)
			if (localFilePath !== path) {
				return localFilePath
			} else {
				path = path.substr(1)
			}
		}
		return '_www/' + path
	}

	static urlTobase64(url) {
		//url = Base64Factory.getLocalFilePath(url);

		return new Promise((resolve, reject) => {
			console.log('url', url);
			// #ifdef H5
			let imgData;
			let reader = new FileReader();
			getImageBlob(url, function(blob) {
				reader.readAsDataURL(blob);
			});
			reader.onload = function(e) {
				imgData = e.target.result;
				resolve(imgData);
			};

			function getImageBlob(_url, cb) {
				let xhr = new XMLHttpRequest();
				xhr.open("get", _url, true);
				xhr.responseType = "blob";
				xhr.onload = function() {
					if (this.status == 200) {
						if (cb) cb(this.response);
					}
				};
				xhr.send();
			}
			// #endif
			// #ifdef APP-PLUS 
			let _imageBase64List = '';
			plus.io.resolveLocalFileSystemURL(url,
				function(entry) {
					// 可通过entry对象操作test.html文件
					entry.file(function(file) {
						var fileReader = new plus.io.FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onloadend = function(evt) {
							_imageBase64List = _imageBase64List.concat(evt.target.result);
							resolve(_imageBase64List);
						}
					})
				});
			// #endif

			// #ifdef MP-WEIXIN
			wx.getFileSystemManager().readFile({
				filePath: url, //选择图片返回的相对路径
				encoding: 'base64', //编码格式
				success: res => { //成功的回调
					//console.log('data:image/png;base64,' + res.data);
					let base64 = 'data:image/png;base64,' + res.data;
					resolve(base64);
				},
				fail: function(e) {
					console.log(e);
					reject(e);
				}
			})
			// #endif
		});

	}

}

module.exports = Base64Factory;
