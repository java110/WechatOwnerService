/**
 * vcFramework
 * 
 * @author 吴学文
 * 
 * @version 0.3
 * 
 * @description uni-app 开发工具
 * 
 * @time 2020-03-04
 * 
 * @qq 928255095
 * 
 * @mail 928255095@qq.com
 * 
 */

// 存储相关
import {getStorageSync,setStorageSync} from '../utils/StorageUtil.js'
// 日志相关
import {debug,info,error,warn} from '../utils/LogUtil.js'
// 小区相关
import {getCurCommunity,recoveryCommunityInfo} from '../api/community/communityApi.js'

// 页面初始化相关
import {onLoad,getWAppId} from '../api/init/initApi.js'

import {navigateTo,navigateBack} from './vcRoute.js'

import {isEmpty} from '../utils/StringUtil.js'

import {hasLogin} from '../auth/Java110Auth.js'




export default{
	getStorageSync:getStorageSync,
	setStorageSync:setStorageSync,
	debug:debug,
	info:info,
	error:error,
	warn:warn,
	getCurCommunity:getCurCommunity,
	recoveryCommunityInfo:recoveryCommunityInfo,//将小区输入相应对象
	onLoad:onLoad,
	navigateTo:navigateTo,
	navigateBack:navigateBack,
	isEmpty:isEmpty,
	hasLogin:hasLogin,
	getWAppId:getWAppId
}