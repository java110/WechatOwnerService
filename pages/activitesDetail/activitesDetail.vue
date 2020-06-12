<template>
<!--pages/detail/detail.wxml -->
<view class="detailContainer">
  <image class="headImg" v-if="showHeadImg"  :src="src" @error="hideHeadImg()"></image>
  <view class="ad_titile">
    <text class="company">{{title}}</text>
  </view>
  <view class="cu-list menu-avatar">
  <view class="cu-item">
  	<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' + headerImg + ')' }"></view>
  	<view class="content">
  		<view class="text-grey">
			<view class="text-cut">{{userName}}</view>
			<view class="cu-tag round bg-orange sm">管理员</view>
		</view>
  		<view class="text-gray text-sm ">
  			<view class="text-cut">
  				<text class="margin-right-xs"></text>
				{{startTime}}
				<text class="iconfont iconyuedu padding-left"></text> {{readCount}}
				<text class="iconfont icongood-fill padding-left"></text> {{likeCount}}
  			</view>
		</view>
  	</view>
  </view>
  </view>
  <view class="ad_context">
    <rich-text :nodes="context"></rich-text>
  </view>
</view>
</template>

<script>
const context = require("../../context/Java110Context.js");
const constant = context.constant;
const util = context.util;

export default {
  data() {
    return {
		showHeadImg: true,
      activitiesId: '',
      title: '',
	  readCount: '',
	  likeCount: '',
      communityId: '',
	  src:'',
	  userName:'',
	  startTime:'',
	  headerImg: '',
	  context:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.activitiesId = options.activitiesId;
	  this.title = options.title;
	  this.readCount = options.readCount;
	  this.likeCount = options.likeCount;
	  this.communityId = options.communityId;
	  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	let _that = this;
	const userInfo = uni.getStorageSync(constant.mapping.OWNER_INFO);
	if(userInfo == null || userInfo == ''){
		_that.communityId = constant.mapping.HC_TEST_COMMUNITY_ID;
		_that.loadActiviteFun();
	  	return;
	}
	this.loadOwnerHeaderImg();
    

    context.getOwner(function (_owner) {
      let _communityId = '';

      if (_owner == null) {
        _communityId = '7020181217000001';
      } else {
        _communityId = _owner.communityId;
      }
		_that.communityId = _communityId;
      // _that.setData({
      //   communityId: _communityId
      // });

      _that.loadActiviteFun();
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
	loadOwnerHeaderImg: function() {
	  	let _that = this;
	  	context.getOwner(function(_owner) {
	  		let _headerImg = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId + "&communityId=" + _owner.communityId +
	  			"&fileTypeCd=10000&time=" + new Date();
	  		_that.headerImg = _headerImg;
	  		_that.userName = _owner.appUserName;
	  	});
	  },
    loadActiviteFun: function () {
      let _that = this;

      let _objData = {
        page: 1,
        row: 1,
        communityId: this.communityId,
        activitiesId: this.activitiesId
      };
      uni.request({
        url: constant.url.listActivitiess,
        header: context.getHeaders(),
        method: "GET",
        data: _objData,
        //动态数据
        success: function (res) {
          console.log("请求返回信息：", res);

          if (res.statusCode == 200) {
            let _activites = res.data.activitiess[0];
            _activites.src = constant.url.filePath + "?fileId=" + _activites.headerImg + "&communityId=" + _that.communityId + "&time=" + new Date();

            let _startTime = _activites.startTime.replace(/\-/g, "/");

            let _tmpStartTime = new Date(_startTime);

            _activites.startTime = util.date.formatDate(_tmpStartTime);
			_that.src= _activites.src;
			_that.userName=_activites.userName;
			_that.startTime=_activites.startTime;
			_that.context=_activites.context;
			_that.readCount = _activites.readCount;
			_that.likeCount = _activites.likeCount;
			console.log(_that);
            //_that.setData(_activites);

            return;
          }

          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          });
        },
        fail: function (e) {
          wx.showToast({
            title: "服务器异常了",
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
	hideHeadImg:function(){
		this.showHeadImg = false;
	}
  }
};
</script>
<style>
@import "./activitesDetail.css";
</style>