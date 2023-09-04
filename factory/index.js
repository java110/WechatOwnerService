/**
 * 工厂类入口类
 * 
 * add by wuxw 2019-12-28
 * 
 */
//登录工厂类


const userFactory = require("./UserFactory.js");

const fileFactory = require("./FileFactory.js");

const coreFactory = require("./CoreFactory.js");

const httpFactory = require("./HttpFactory.js");

const base64Factory = require("./Base64Factory.js");

module.exports = {
  user: userFactory,
  file: fileFactory,
  core: coreFactory,
  http: httpFactory,
  base64: base64Factory
};