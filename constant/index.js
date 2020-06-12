/**
 * 常量入口类
 * 
 * add by wuxw 2019-12-28
 */
//应用常量类
const appConstant = require("./AppConstant.js"); // url 常量类


const urlConstant = require("./UrlConstant.js"); // 映射 常量类


const mappingConstant = require("./MappingConstant.js");

module.exports = {
  app: appConstant,
  url: urlConstant,
  mapping: mappingConstant
};