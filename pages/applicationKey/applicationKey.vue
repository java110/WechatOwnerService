<template>
<view class="ak_context">
  <view class="ak_row">
    <view class="ak_row_black">
    </view>
    <view class="ak_row_title">
      <text>申请门禁钥匙</text>
    </view>
    <view class="ak_row_black_01"></view>
	
	
	<view class="bg-white padding">
			<view class="grid text-center" :class="'col-2'">
				<view class="padding">
				    <text class="iconfont iconshenqing ak_icon_text">\n</text>
					<text>1.提交申请钥匙</text>
				</view>
				<view class="padding">
					<text class="iconfont icondengdai ak_icon_text">\n</text>
				    <text>2.物业人员审核</text>
				</view>
			</view>
			<view class="grid text-center" :class="'col-1'">
				<view class="padding">
					<text class="iconfont iconshenqingtongguo ak_icon_text">\n</text>
					<text>3.审核通过后生成电子钥匙</text>
				</view>
			</view>
	</view>
    <view class="ak_row_black_02"></view>
     <view class="ak_row_black_03"></view>
	  <view class="padding flex flex-direction">
		 <button class="cu-btn bg-green lg" @click="applyApplicationKey">申请钥匙</button>
	  </view> 
     <view class="ak_row_black_04"></view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    /**
     * 申请钥匙
     */
    applyApplicationKey: function () {
      wx.navigateTo({
        url: '/pages/applicationKeyLocation/applicationKeyLocation'
      });
    }
  }
};
</script>
<style>
@import "./applicationKey.css";
</style>