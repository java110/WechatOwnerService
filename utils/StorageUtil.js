/**
 * 存储工具类
 * 
 * add by 吴学文 QQ 928255095
 * 
 * 
 */
import {debug} from './LogUtil.js'

/**
 * @param {Object} _key 存储键
 * @return {Object} _value 查询到值
 */
export function getStorageSync(_key){
	debug('StorageUtil','getStorageSync',_key);
	
	let _value = uni.getStorageSync(_key);
	
	debug('StorageUtil','getStorageSync',_value);
	
	return _value;
}

/**
 * @description 将数据缓存至 磁盘中
 * @param {Object} _key 存储键
 * @param {Object} _value 存储值
 */
export function setStorageSync(_key,_value){
	debug('StorageUtil','setStorageSync',_key);
	
	uni.setStorageSync(_key,_value);
	
	debug('StorageUtil','setStorageSync',_value);
}