import url from '../constant/url.js'
import {
	requestNoAuth
} from '../api/java110Request.js'
import mapping from '../constant/MappingConstant.js'
import {getWAppId} from '../api/init/initApi.js'

/**
 * 
 * app 自登陆处理
 * @param {Object} _key 自登陆key
 * add by  wuxw QQ 928255095
 */
export function doLoginOwnerByKey(_key, callback = () => {}) {
	requestNoAuth({
		url: url.loginOwnerByKey,
		method: 'post',
		data: {
			key: _key // 当前页地址
		},
		success: function(res) {
			let _param = res.data;
			if (_param.code != 0) {
				uni.navigateTo({
					url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
				});
				return;
			}

			let _ownerInfo = _param.owner;
			wx.setStorageSync(mapping.OWNER_INFO, _ownerInfo);
			wx.setStorageSync(mapping.USER_INFO, JSON.stringify(_ownerInfo));
			let _currentCommunityInfo = {
				communityId: _ownerInfo.communityId,
				communityName: _ownerInfo.communityName
			};
			wx.setStorageSync(mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);

			let date = new Date();
			let year = date.getFullYear(); //获取当前年份
			let mon = date.getMonth(); //获取当前月份
			let da = date.getDate(); //获取当前日
			let h = date.getHours() + 1; //获取小时
			let m = date.getMinutes(); //获取分钟
			let s = date.getSeconds(); //获取秒
			let afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间
			wx.setStorageSync(mapping.LOGIN_FLAG, {
				sessionKey: _ownerInfo.userId,
				expireTime: afterOneHourDate.getTime()
			});
			wx.setStorageSync(mapping.TOKEN, _param.token);
			//保存临时 钥匙
			wx.setStorageSync(mapping.OWNER_KEY, _param.key);
			callback();
		},
		fail: function(error) {
			// 调用服务端登录接口失败
			uni.navigateTo({
				url: '/pages/showlogin/showlogin?wAppId=' + getWAppId()
			});
		}
	});
}
