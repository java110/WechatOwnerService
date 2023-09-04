/**
 * 重新封装 http 请求
 * add by wuxw 2020-01-01
 * 
 * java110团队
 */
class HttpFactory {
  constructor() {}

  getSync(_httpHead, _url, _data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: _url,
        header: _httpHead,
        method: 'GET',
        data: _data,

        success(res) {
          resolve(res);
        },

        fail(err) {
          reject(err);
        }

      });
    });
  }

  postSync(_httpHead, _url, _data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: _url,
        header: _httpHead,
        method: 'POST',
        data: _data,

        success(res) {
          resolve(res);
        },

        fail(err) {
          reject(err);
        }

      });
    });
  }

}

module.exports = new HttpFactory();