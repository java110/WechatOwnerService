/** index.js **/
const { appInfo, urlInfo } = require("../../config/config.js");
const util = require('../../utils/util.js');
//获取app实例
const app = getApp();

Page({
    data: {
        notices:[],
        currPageIndex: 0,
        pageSize: 10
    },
    onLoad: function() {
        let that = this
        wx.request({
            header: util.getHeaders(),
            url: urlInfo.GetNoticeListUrl,
            method: "GET",
            data: {
                pageIndex: 0,
                pageSize: 10
            },
            success: function (res) {
                // TODO 判断
                console.log(res)
                res.data.notices.forEach(function(item, index) {
                    item.timeStr = (new Date(parseInt(item.startTime) ).toLocaleString().replace(/:\d{1,2}$/,' '));  
                });
                that.setData({
                    notices: res.data.notices,
                })

                
            }
        });
    },

    onShow: function() {
        let that = this;
    },
    gotoDetail: function(e) {
        
        let that= this;
        console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        console.log(JSON.stringify(that.data.notices[index]))
        wx.setStorageSync('notice-'+ index, JSON.stringify(that.data.notices[index]));

        wx.navigateTo({
            url: "/pages/notice/detail/detail?index=" + index
        })
    }
})