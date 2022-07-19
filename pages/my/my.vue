<template>
  <view>
    <!--index.wxml-->
    <view class="user-container bg-white my_user">
      <view class="userinfo">
        <view class="already" v-if="login">
          <view class="cu-avatar header-img round " :style="{ backgroundImage: 'url(' + headerImg + ')' }">
          </view>
          <view class="userinfo-nickname margin-top">
            <text class="username">{{ userName }}</text>
            <text class="userphone">{{ userPhone }}</text>
            <text class="userarea" @tap="_changeCommunity()">{{ communityName }}</text>
          </view>
        </view>
        <view class="wait" v-else @tap="showLongModel">
          <view class="userinfo-avatar">
            <open-data type="userAvatarUrl" lang="zh_CN" />
          </view>
          <view class="userinfo-nickname margin-top">
            <text>请登录</text>
          </view>
        </view>
      </view>
      <view class="money_box">
        <view class="money_item" @click="myAccount()">
          <view class="num">￥{{blance}}</view>
          <view class="name">余额</view>
        </view>
        <view class="line"></view>
        <view class="money_item">
          <view class="num">{{inter}}</view>
          <view class="name">积分</view>
        </view>
        <view class="line"></view>
        <view class="money_item" @click="coupons()">
          <view class="num">{{ka}}</view>
          <view class="name">卡卷</view>
        </view>
      </view>
    </view>

    <view class="serve_box">
      <view class="serve_title">基础服务</view>
      <view class="serve_list">
        <view class="list">
          <view class="item" v-for="(item,index) in serve_list" :key="index" @tap="to_serve(item)">
            <image :src="item.src"></image>
            <view class="text">{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="order_box">
      <view class="order_title">我的订单</view>
      <view class="order_list">
        <view class="list">
          <view class="item" v-for="(item,index) in order_list" :key="index">
            <image :src="item.src"></image>
            <view class="text">{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="cu-list menu  margin-top margin-bottom">
      <view class="cu-item arrow" @click="mySettings()">
        <view class="content">
          <text class="cuIcon-settings text-gray"></text>
          <text class="text-grey">设置</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-profile text-pink"></text>
          <text class="text-grey">关于我们</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-circlefill text-yellow"></text>
          <text class="text-grey">退出登录</text>
        </view>
      </view>
    </view>

    <view class="cu-modal" :class="callPropertyModal==true?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">拨打电话</view>
          <view class="action" @tap="_cancleCall()">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-xl">
          您确认拨打,{{property.communityName}}物业客服电话<br />{{property.sCommunityTel}}
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action margin-0 flex-sub  solid-left" @tap="_cancleCall()">取消</view>
          <view class="action margin-0 flex-sub text-green solid-left" @tap="_doCall()">拨号</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  /** index.js **/
  import context from '../../lib/java110/Java110Context.js';
  const factory = context.factory; //获取app实例
  const constant = context.constant;
  //获取app实例
  const app = getApp().globalData;
  import conf from '../../conf/config.js';
  import { getHcCode } from '../../api/webView/webViewApi.js'
  import { encodeUrl } from '../../lib/java110/utils/UrlUtil.js'
  import { getCurCommunity } from '../../api/community/communityApi.js'
  import { setStorageSync } from '../../lib/java110/utils/StorageUtil.js'
  import mapping from '../../constant/MappingConstant.js'
  
	import {hasLogin} from '../../lib/java110/page/Page.js'
  import { hasOwner } from '../../api/owner/ownerApi.js'
  import {queryOwnerAccount} from '../../api/user/userApi.js'
export default {
  data() {
    return {
      userInfo: {},
      headerImg: '',
      userName: '',
      userPhone:'',
      communityName: '',
      property: {},
			callPropertyModal: false,
      // 用户信息
      ownerFlag: false, // 是否有业主信息 标记 如果有为 true  没有为false
      login: true,
      blance: '0.00',
      inter: '0.00',
      ka:'0',
      order_list: [
        {
          name: '待付款',
          src:'/static/images/serve/order1.png',
          href:''
        },
        {
          name: '待发货',
          src:'/static/images/serve/order2.png',
          href:''
        },
        {
          name: '待收货',
          src:'/static/images/serve/order3.png',
          href:''
        },
        {
          name: '已完成',
          src:'/static/images/serve/order4.png',
          href:''
        }
      ],
      serve_list:[
        {
          name: '业主信息',
          src:'/static/images/serve/my1.png',
          href:'../viewBindOwner/viewBindOwner'
        },
        {
          name: '我的物业',
          src:'/static/images/serve/my2.png',
          href:'../myProperty/myProperty'
        },
        {
          name: '我的房屋',
          src:'/static/images/serve/my3.png',
          href:'../my/myHouse'
        },
        {
          name: '我的报修',
          src:'/static/images/serve/my4.png',
          href:'/pages/myRepair/myRepair'   
        },
        {
          name: '缴费记录',
          src:'/static/images/serve/my5.png',
          href:'/pages/payFeeDetail/payFeeDetail'   
        },
        {
          name: '我的车位',
          src:'/static/images/serve/my6.png',
          href:'/pages/parkingInfo/parkingInfo'   
        },
        {
          name: '邀请家属',
          src:'/static/images/serve/my7.png',
          href:'/pages/familyList/familyList'   
        },
        {
          name: '一键开门',
          src:'/static/images/serve/my8.png',
          href:'/pages/openDoor/openDoor'   
        },
        {
          name: '门禁日志',
          src:'/static/images/serve/my9.png',
          href:'/pages/machineTranslateLog/machineTranslateLog'   
        },
        {
          name: '联系客服',
          src:'/static/images/serve/my10.png',   
        }
      ]

    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.vc.onLoad(options, () => {
      // this.refreshPageLoginInfo();
      this.loadOwnerAccount();
    });
  },
  onShow: function () {
    // this.refreshPageLoginInfo();
    let _that = this; //查询用户信息
    _that.headerImg = '/static/images/serve/head.png';
    _that.userName = '小李';
    _that.userPhone = '15952056435';
    _that.communityName = '莲湖社区';
  },
  methods: {
    // 原onShow方法
    // 自动登录后 刷新页面登录信息
    refreshPageLoginInfo: function () {
      let _that = this; //查询用户信息
      if (!_that.ckeckUserInfo()) {
        _that.login = false;
        return;
      }
      _that.login = true;
      _that.loadOwenrInfo();
      _that.userInfo = context.getUserInfo();
      console.log('用户信息', _that.userInfo)
      this.loadOwnerHeaderImg();
    },
    bindingOwner: function () {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      this.vc.navigateTo({
        url: '../bindOwner/bindOwner'
      });
    },
    /**
     * 查询业主头像
     */
    loadOwnerHeaderImg: function () {
      let _that = this;
      context.getOwner(function (_owner) {
        let _headerImg = constant.url.getOwnerPhotoPath + "?objId=" + _owner.memberId +
          "&communityId=" + _owner.communityId +
          "&fileTypeCd=10000";
        _that.headerImg = _headerImg;
        _that.userName = _owner.appUserName;
        _that.userPhone = _owner.appUserPhone;
        _that.communityName = _owner.communityName;

      });
    },
    showLongModel: function () {
      this.vc.navigateTo({
        url: '/pages/login/login'
      }, () => {
        this.refreshPageLoginInfo();
      });
    },
    ckeckUserInfo: function () {
      return context.checkLoginStatus();
    },
    loadOwenrInfo: function () {
      let _that = this;
      context.getOwner(function (_ownerInfo) {
        if (_ownerInfo) {
          _that.ownerFlag = true;
        } else {
          _that.ownerFlag = false;
        }
      });
    },
    toMallOrders() {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      this.vc.navigateToMall({
        url: '/pages/myOrder/myOrderAll'
      })
    },
    onGotUserInfo: function (e) {
      console.log("nickname=" + JSON.stringify(e.detail.userInfo));
    },
    // 我的资产
    myAssets: function () {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      hasOwner();
      this.vc.navigateTo({
        url: '/pages/my/myMenu?pageSign=myAssets'
      });
    },
    // 生活服务
    myServices: function () {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      hasOwner();
      this.vc.navigateTo({
        url: '/pages/my/myMenu?pageSign=myServices'
      });
    },
    // 设置
    mySettings: function () {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      this.vc.navigateTo({
        url: '/pages/settings/settings',
      });
    },
    // 我的钱包
    myAccount: function () {
      if (!this.ckeckUserInfo()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        }, () => {
          this.refreshPageLoginInfo();
        });
        return;
      }
      this.vc.navigateTo({
        url: '/pages/myAccount/myAccount',
      });
    },
    //切换小区
    _changeCommunity: function () {
      uni.navigateTo({
        url: "/pages/changeOwnerCommunity/changeOwnerCommunity"
      });
    },
    // 余额
    loadOwnerAccount: function() {
    	let _that = this;
    	context.getOwner(function(_ownerInfo) {
    		if (_ownerInfo) {
    			queryOwnerAccount({
    				page: 1,
    				row: 20,
    				idCard: _ownerInfo.idCard,
    				link: _ownerInfo.link,
    				communityId: _ownerInfo.communityId
    			}).then((data) => {
    				if(!data){
    					_that.accounts=[];
    					return ;
              _that.blance = 0
    				}
    				_that.accounts = data;
            let sum = 0
            _that.accounts.forEach((v,k)=>{
              sum+= v.amount
            })
            this.blance = sum
    			})
    		}
    	});
    },

    //优惠券
    coupons: function(_item) {
        this.vc.navigateTo({
            url: '/pages/myAccount/myCoupons',
        })
    },

    // 我的服务跳转
    to_serve(v) {
        if(v.name == '联系客服') {
          this.callPropertyTel()
        }else {
          this.vc.navigateTo({
            url: v.href,
          })
        }
    },
    // 拨打客服
    callPropertyTel: function() { //拨打电话
      let _that = this;
      if (!hasLogin()) {
        this.vc.navigateTo({
          url: '../showlogin/showlogin'
        });
        return;
      }
      hasOwner();
      uni.getStorage({
        key: 'ownerInfo',
        success: function (res) {
          _that.property = res.data;
          _that.callPropertyModal = true;
        }
      });
    },
    _cancleCall: function() {
				this.callPropertyModal = false;
		},
    _doCall: function() {
    
      let _that = this;
      uni.makePhoneCall({
        // 手机号
        phoneNumber: _that.property.sCommunityTel,
        // 成功回调
        success: (res) => {
          console.log('调用成功!')
        },
        // 失败回调
        fail: (res) => {
          console.log('调用失败!')
        }
      });
    },
  }
};
</script>
<style lang="less">


@import "./my.css";


.my_user {
  padding: 0;
}
.header-img,
.userinfo-avatar {
  width: 140upx;
  height: 140upx;
  margin-right: 20upx;
  background-color: #fff;
}

.userinfo {
  height: 200upx;
  background: url('/static/images/serve/bg.png') no-repeat center center;
  background-size: 100% 100%;
  
  padding: 30upx 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.already,
.wait {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 15%;
}

.userinfo-nickname {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  margin: 0!important;
}


.money_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 50upx;
  border-radius: 20upx;

  .money_item {
    text-align: center;
    color:#333;
    font-size: 28upx;
    padding: 10upx 0 
  }
  
  .line {
    height: 20upx;
    width: 2upx;
    background: #eee;
  }
}

.order_box {
  .order_title {
    line-height: 42upx;
    font-size: 30upx;
    font-weight: 600;
    color: #333;
    padding: 20upx;
  }

  .order_list {
    padding: 20upx 20upx 0;
    background: #fff;
  }

  .item {
    width: 25%;
    display: inline-block;
    text-align: center;
    margin-bottom: 20upx;
  }

  image {
    height: 44upx;
    width: 44upx;
  }

  .text {
    color: #333;
    font-size: 28upx;
  }
}

.serve_box {
  .serve_title {
    line-height: 42upx;
    font-size: 30upx;
    font-weight: 600;
    color: #333;
    padding: 20upx;
  }

  .serve_list {
    padding: 40upx 20upx 0;
    background: #fff;
  }

  .item {
    width: 20%;
    display: inline-block;
    text-align: center;
    margin-bottom: 40upx;
  }

  image {
    height: 44upx;
    width: 44upx;
  }

  .text {
    color: #333;
    font-size: 28upx;
  }
}
</style>
