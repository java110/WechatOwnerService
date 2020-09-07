/**
 * 日志工具类
 * 
 * add by 吴学文 QQ 928255095
 */

import conf from '../conf/config.js'

import {formatTimeNow} from './DateUtil.js'

//日志级别
const logLevel = conf.logLevel;

const DEBUG = "DEBUG";
const INFO = "INFO";
const WARN = "WARN";
const ERROR = "ERROR";

/**
 * @description  debug 答应日志
 * @param {string} fileName 文件名
 * @param {string} method 方法
 * @param {Object} msg 打印内容
 */
export function debug(fileName,method,msg) {
	if (logLevel == DEBUG) {
		console.log(formatTimeNow()+' ' + '[java110-debug] - ' + fileName + ':'+method+' ',msg);
	}
}

/**
 * @description info 打印日志
 * @param {string} fileName 文件名
 * @param {string} method 方法
 * @param {Object} msg 打印内容
 */
export function info(fileName,method,msg) {
	if (logLevel == DEBUG || logLevel == INFO) {
		console.log(formatTimeNow()+' ' + '[java110-info] - ' + fileName + ':'+method+' ' +msg);
	}
}

/**
 * @description info 打印日志
 * @param {string} fileName 文件名
 * @param {string} method 方法
 * @param {Object} msg 打印内容
 */
export function warn(fileName,method,msg) {
	if (logLevel == DEBUG || logLevel == INFO || logLevel == WARN) {
		console.log(formatTimeNow()+' ' + '[java110-warn] - ' + fileName + ':'+method+' ' +msg);
	}
}

/**
 * @description error 打印日志
 * @param {string} fileName 文件名
 * @param {string} method 方法
 * @param {Object} msg 打印内容
 */
export function error(fileName,method,msg) {
		console.error(formatTimeNow()+' ' + '[java110-error] - ' + fileName + ':'+method+' ' +msg);
}
