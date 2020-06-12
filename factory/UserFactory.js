/**
 * 用户工厂类
 * 
 * add by wuxw 2019-12-28
 */
const QQMapWX = require("../lib/qqmap-wx-jssdk.min.js");

var qqmapsdk;

class UserFactory {
  constructor() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'AWIBZ-M62LQ-7ND5S-GHM45-AGKU7-R5BU5'
    });
  } //获取地理位置


  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("latitude" + latitude);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          coord_type: 1,
          get_poi: 1,
          success: function (res, data) {
            console.log(data);
            wx.setStorageSync('location', data.pois[0].title);
            wx.setStorageSync('currentLocation', data.reverseGeocoderSimplify);
          }
        });
      }
    });
  }

}

module.exports = new UserFactory();