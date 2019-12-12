/** detail.js **/

//获取app实例
const app = getApp();

Page({
    data: {
        notice: {}
    },

    onLoad: function(options) {
        let index = parseInt(options.index);
        // this.checkLoginStatus();
        let info = JSON.parse( wx.getStorageSync('notice-'+ (index)));

        if (info) {
            this.setData({
                notice: info
            })
        }
        wx.clearStorageSync('notice-'+index);
    },

    onShow: function() {
        let that = this;
        // that.setData({
        //     userInfo: app.globalData.userInfo
        // });
    }
})