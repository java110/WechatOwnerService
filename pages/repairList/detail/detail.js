/** index.js **/
const { appInfo, urlInfo } = require("../../../config/config.js");
const util = require('../../../utils/util.js');
//获取app实例
const app = getApp();

Page({
  data: {
    obj:{}
  },
  onLoad: function (e) {
    let that = this
    console.log(JSON.parse(e.item),99999)
    this.setData({
      obj: JSON.parse(e.item)
    })
  },

  onShow: function () {
    let that = this;
  },
})