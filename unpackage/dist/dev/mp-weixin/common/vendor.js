(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!*******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/utils/CoreUtil.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 核心工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2019-12-28
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var
CoreUtil = /*#__PURE__*/function () {"use strict";function CoreUtil() {_classCallCheck(this, CoreUtil);}_createClass(CoreUtil, null, [{ key: "showInfo",
    // 封装 wx.showToast 方法
    value: function showInfo() {var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'error';var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      wx.showToast({
        title: info,
        icon: icon,
        duration: 1500,
        mask: true });

    }
    /**
      * 生成uuid
      */ }, { key: "wxuuid", value: function wxuuid()


    {
      var s = [];
      var hexDigits = "0123456789abcdef";

      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }

      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

      s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    } }]);return CoreUtil;}();



module.exports = CoreUtil;

/***/ }),

/***/ 104:
/*!*****************************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/applicationKey/applicationKeyApi.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.listApplicationKeys = listApplicationKeys;exports.applyApplicationKey = applyApplicationKey;exports.listOwnerMachines = listOwnerMachines;


var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 钥匙申请接口类
                                                                                                                                                                                           */

/**
                                                                                                                                                                                               * 查询钥匙
                                                                                                                                                                                               * @param {Object} _objData 对象
                                                                                                                                                                                               */
function listApplicationKeys(_objData) {

  return new Promise(function (resolve, reject) {
    (0, _java110Request.request)({
      url: _url.default.listApplicationKeys,
      method: "GET",
      data: _objData, //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          //成功情况下跳转
          var _applicationKeys = res.data.applicationKeys;

          _that.applicationKeys = _applicationKeys;
          resolve(_applicationKeys);
          return;
        }
        reject();
      },
      fail: function fail(e) {
        reject();
      } });

  });
}

/**
   * 申请钥匙
   * @param {Object} _obj 申请钥匙对象内容
   */
function applyApplicationKey(_obj) {
  return new Promise(function (resolve, reject) {
    (0, _java110Request.request)({
      url: _url.default.applyApplicationKey,
      method: "POST",
      data: _objData, //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          resolve(res);
          return;
        }
        reject(res);
      },
      fail: function fail(e) {
        reject(e);
      } });

  });
}


function listOwnerMachines(_objData) {
  return new Promise(function (resolve, reject) {
    (0, _java110Request.request)({
      url: _url.default.listOwnerMachines,
      method: "GET",
      data: _objData, //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          var _machines = res.data.machines;
          resolve(_machines);
          return;
        }
        reject(res);
      },
      fail: function fail(e) {
        reject(e);
      } });

  });
}

/***/ }),

/***/ 11:
/*!*************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/constant/AppConstant.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";





var _config = _interopRequireDefault(__webpack_require__(/*! ../conf/config.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var
AppConstant = function AppConstant() {_classCallCheck(this, AppConstant);};_defineProperty(AppConstant, "wAppId",

_config.default.wAppId);_defineProperty(AppConstant, "appId",




"992019111758490006");_defineProperty(AppConstant, "appSecurity",
"");













module.exports = AppConstant;

/***/ }),

/***/ 113:
/*!*************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/common/commonApi.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.sendMessageCode = sendMessageCode;




var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);



var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 发送验证码
                                                                                                                                                                                           */

function timer(_that) {var _this = this;
  var promise = new Promise(function (resolve, reject) {
    var setTimer = setInterval(
    function () {
      var second = _this.second - 1;
      _that.second = second;
      _that.btnValue = second + '秒';
      _that.btnDisabled = true;
      if (_that.second <= 0) {
        _that.second = 60;
        _that.btnValue = '获取验证码';
        _that.btnDisabled = false;
        resolve(setTimer);
      }
    }, 1000);
  });
  promise.then(function (setTimer) {
    clearInterval(setTimer);
  });
}

function sendMessageCode(_objData, _that) {

  return new Promise(function (resolve, reject) {
    (0, _java110Request.requestNoAuth)({
      url: _url.default.userSendSms,
      method: "POST",
      data: _objData, //动态数据
      success: function success(res) {
        //成功情况下跳转
        if (res.statusCode == 200) {
          uni.showToast({
            title: '验证码下发成功',
            icon: 'none',
            duration: 2000 });

          timer(_that);
          resolve();
          return;
        }
        uni.hideLoading();
        uni.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000 });

      },
      fail: function fail(e) {
        uni.hideLoading();
        uni.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000 });

      } });

  });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!****************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/conf/config.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * HC智慧家园配置文件
                                                                                                      * 
                                                                                                      * 本项目只有这里修改相应配置信息，如果不是二次开发 请不要修改其他文件内容
                                                                                                      * 
                                                                                                      * @website http://www.homecommunity.cn/
                                                                                                      * @author 吴学文
                                                                                                      * @QQ 928255095
                                                                                                      */







//服务器域名 小程序 或者 app 时 后端地址
var baseUrl = 'https://app.demo.winqi.cn/';


//默认的小区ID和名称，用户还没有登录时显示的小区信息
var DEFAULT_COMMUNITY_ID = "7020181217000001"; //HC测试小区id  用于没有登录时展示相关信息
var DEFAULT_COMMUNITY_NAME = "丰仪家园";

// 微信appId
var wAppId = "wx43458162e3c31d92"; //微信AppId

var logLevel = "DEBUG"; // 日志级别
var _default =
{
  baseUrl: baseUrl,
  DEFAULT_COMMUNITY_ID: DEFAULT_COMMUNITY_ID,
  DEFAULT_COMMUNITY_NAME: DEFAULT_COMMUNITY_NAME,
  wAppId: wAppId,
  logLevel: logLevel };exports.default = _default;

/***/ }),

/***/ 13:
/*!*******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/utils/DateUtil.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatTimeNow = formatTimeNow;exports.formatTime = formatTime;exports.formatDate = formatDate;exports.getDate = getDate;exports.dateTimeStringToDateString = dateTimeStringToDateString;exports.formatNumber = formatNumber;exports.getDateYYYYMMDDHHMISS = getDateYYYYMMDDHHMISS;exports.addYear = addYear;exports.addMonth = addMonth;exports.addDay = addDay;exports.addHour = addHour;exports.addMinutes = addMinutes;exports.addSeconds = addSeconds; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 规范编程
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2019-12-27
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 将时间转换为 字符串
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @desc: 格式化时间
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @return: eg: '2018/04/09 21:31:00'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Date对象} date 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
function formatTimeNow() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
   * 
   * 将时间转换为 字符串
   * @desc: 格式化时间
   * @return: eg: '2018/04/09 21:31:00'
   * @param {Date对象} date 
   */
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
/**
   * 将日期转换为 字符串
   * @desc: 格式化日期
   * @return: eg: '2018/04/09 21:31:00'
   * @param {Date对象} date 
   */
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('/');
}; //字符串转日期格式，strDate要转为日期格式的字符串 


function getDate(strDate) {
  var st = strDate;
  var a = st.split(" "); //这个根据你的字符串决定，如果中间为T则改T
  var b = a[0].split("-");
  var c = a[1].split(":");
  var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
  return date;
};

/**
    * @description 将时间字符串 转为日期字符串 
    * @param {String} _dateTimeString 时间字符串 YYYY-MM-DD hh:mi:ss
    * @return {String} _value 日期字符串 YYYY/MM/DD
    */
function dateTimeStringToDateString(_dateTimeString) {
  var _value = _dateTimeString.replace(/\-/g, "/");
  var _tmpValue = new Date(_value);
  return formatDate(_tmpValue);
}

/**
   * @desc: 格式化数字
   * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
   * @param {*} n 
   */
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
    * @description  查询当前时间YYYYMMDDHHMISS字符串
    * @return {YYYYMMDDHHMISS} 返回当前时间YYYYMMDDHHMISS字符串
    * @param {}   
    */
function getDateYYYYMMDDHHMISS() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
};

/**
    * @description 当前时间加 指定年
    * @param {Object} _date 指定时间
    * @param {Object} _year 指定年
    * @return {Date} 返回新的日期
    */
function addYear(_date, _year) {
  var year = _date.getFullYear() + _year; //获取当前年份
  var mon = _date.getMonth(); //获取当前月份
  var da = _date.getDate(); //获取当前日
  var h = _date.getHours(); //获取小时
  var m = _date.getMinutes(); //获取分钟
  var s = _date.getSeconds(); //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
};

/**
    * @description 当前时间加指定月
    * @param {Object} _date 指定日期
    * @param {Object} _month 指定月
    * @return {Date} 返回新的日期
    */
function addMonth(_date, _month) {
  var year = _date.getFullYear(); //获取当前年份
  var mon = _date.getMonth() + _month; //获取当前月份
  var da = _date.getDate(); //获取当前日
  var h = _date.getHours(); //获取小时
  var m = _date.getMinutes(); //获取分钟
  var s = _date.getSeconds(); //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
};
/**
    * @description 指定时间加入指定日
    * @param {Object} _date 指定时间
    * @param {Object} _day 指定日
    * @return {Date} 返回新的日期
    */
function addDay(_date, _day) {
  var year = _date.getFullYear(); //获取当前年份
  var mon = _date.getMonth(); //获取当前月份
  var da = _date.getDate() + _day; //获取当前日
  var h = _date.getHours(); //获取小时
  var m = _date.getMinutes(); //获取分钟
  var s = _date.getSeconds(); //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
};

/**
    * @description 指定时间上加上指定小时
    * @param {Object} _date 指定日期
    * @param {Object} _hour 指定小时
    * @return {Date} 返回新的日期
    */
function addHour(_date, _hour) {
  var year = _date.getFullYear(); //获取当前年份
  var mon = _date.getMonth(); //获取当前月份
  var da = _date.getDate(); //获取当前日
  var h = _date.getHours() + _hour; //获取小时
  var m = _date.getMinutes(); //获取分钟
  var s = _date.getSeconds(); //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
};
/**
    * @description 指定时间上加上指定分钟
    * @param {Object} _date 指定日期
    * @param {Object} _minute 指定分钟
    * @return {Date} 返回新的日期
    */
function addMinutes(_date, _minute) {
  var year = _date.getFullYear(); //获取当前年份
  var mon = _date.getMonth(); //获取当前月份
  var da = _date.getDate(); //获取当前日
  var h = _date.getHours(); //获取小时
  var m = _date.getMinutes() + _minute; //获取分钟
  var s = _date.getSeconds(); //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
};
/**
    * @description 指定时间上加上指定秒
    * @param {Object} _date 指定日期
    * @param {Object} _second 指定秒
    * @return {Date} 返回新的日期
    */
function addSeconds(_date, _second) {
  var year = _date.getFullYear(); //获取当前年份
  var mon = _date.getMonth(); //获取当前月份
  var da = _date.getDate(); //获取当前日
  var h = _date.getHours(); //获取小时
  var m = _date.getMinutes(); //获取分钟
  var s = _date.getSeconds() + _second; //获取秒
  var newDate = new Date(year, mon, da, h, m, s);
  return newDate;
}

/***/ }),

/***/ 14:
/*!*****************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/constant/url.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = _interopRequireDefault(__webpack_require__(/*! ../conf/config.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var baseUrl = _config.default.baseUrl;var _default =
{
  baseUrl: baseUrl,
  wechatRefrashToken: baseUrl + "app/refreshToken", // 公众号刷新token
  loginOwnerByKey: baseUrl + "app/loginOwnerByKey", // 根据临时秘钥登录
  loginUrl: baseUrl + 'app/loginWx',
  getWxPhoto: baseUrl + 'app/getWxPhoto',
  loginOwnerUrl: baseUrl + 'app/loginOwner',
  areaUrl: baseUrl + "app/area.listAreas",
  GetNoticeListUrl: baseUrl + 'app/notice.listNotices', //公告接口
  saveOwnerRepair: baseUrl + 'app/ownerRepair.saveOwnerRepair', //报修
  listOwnerRepairs: baseUrl + 'app/ownerRepair.listOwnerRepairs', //查询报修
  saveOwner: baseUrl + 'app/owner.saveOwner', //家庭成员列表
  queryOwnerMembers: baseUrl + 'app/owner.queryOwnerMembers', //投诉建议列表
  listComplaints: baseUrl + 'app/complaint.listComplaints', //添加投诉建议
  saveComplaint: baseUrl + 'app/complaint', //查询业主房间
  queryRoomsByOwner: baseUrl + 'app/room.queryRoomsByOwner', //绑定业主
  appUserBindingOwner: baseUrl + 'app/owner.appUserBindingOwner', //查询绑定业主
  ownerRegiter: baseUrl + 'app/owner.ownerRegister', //业主注册
  ownerRegisterWxPhoto: baseUrl + 'app/owner.ownerRegisterWxPhoto', //业主注册
  queryAppUserBindingOwner: baseUrl + 'app/owner.listAppUserBindingOwners', //解绑业主
  appUserUnBindingOwner: baseUrl + 'app/owner.deleteAppUserBindingOwner', //查询业主门禁
  listOwnerMachines: baseUrl + 'app/owner.listOwnerMachines', // 申请钥匙
  applyApplicationKey: baseUrl + "app/applicationKey.applyApplicationKey", //查询钥匙
  listApplicationKeys: baseUrl + "app/applicationKey.listApplicationKeys", //申请访客钥匙
  applyVisitorApplicationKey: baseUrl + "app/applicationKey.applyVisitorApplicationKey", //上传业主照片
  uploadOwnerPhoto: baseUrl + "app/owner.uploadOwnerPhoto",
  getOwnerPhotoPath: baseUrl + "callComponent/download/getFile/fileByObjId",
  filePath: baseUrl + "callComponent/download/getFile/file", //查询业主车位信息
  queryParkingSpacesByOwner: baseUrl + "app/parkingSpace.queryParkingSpacesByOwner", //查询停车位费用
  queryFeeByParkingSpace: baseUrl + "app/fee.queryFeeByParkingSpace", //查询物业费用
  queryFeeByOwner: baseUrl + "app/fee.listFee", //预下单
  preOrder: baseUrl + "app/payment/toPay", //查询小区
  //临时车缴费
  preOrderTempCarInout: baseUrl + "/app/payment/toPayTempCarInout",
  listCommunitys: baseUrl + "app/community.listCommunitys", //查询小区文化
  listActivitiess: baseUrl + "app/activities.listActivitiess", //查询小区广告
  listAdvertPhoto: baseUrl + "app/advert.listAdvertPhoto",
  //查询车辆进场费用
  queryFeeByCarInout: baseUrl + "app/fee.queryFeeByCarInout",
  //查询报修单
  listMyRepair: baseUrl + "app/ownerRepair.listOwnerRepairs",
  //查询在场车辆
  listCarIn: baseUrl + "app/carInout.listCarInouts",
  queryConfigFee: baseUrl + "app/fee.queryFeeConfig",
  //缴费历史查询
  queryFeeDetail: baseUrl + "app/fee.queryFeeDetail",
  //发送验证码
  userSendSms: baseUrl + "app/user.userSendSms",
  userLogout: baseUrl + 'app/user.service.logout', //绑定业主
  listStore: baseUrl + 'app/store.listStoresByCommunity', // 查询小区商户
  //发布需求信息
  saveJunkRequirement: baseUrl + 'app/junkRequirement.saveJunkRequirement',
  //查询需求信息
  listJunkRequirements: baseUrl + 'app/junkRequirement.listJunkRequirements',
  //删除 需求信息
  deleteJunkRequirement: baseUrl + 'app/junkRequirement.deleteJunkRequirement',
  //标记为已完成
  updateJunkRequirement: baseUrl + 'app/junkRequirement.updateJunkRequirement',
  //查询楼栋
  queryFloor: baseUrl + 'app/floor.queryFloors',
  //查询单元
  queryUnit: baseUrl + 'app/unit.queryUnits',
  //查询报修类型
  listRepairSettings: baseUrl + 'app/repair.listRepairSettings',
  //待办工单
  listStaffRepairs: baseUrl + "app/ownerRepair.listStaffRepairs",
  //已办工单
  listStaffFinishRepairs: baseUrl + "app/ownerRepair.listStaffFinishRepairs",
  // 查询报修单处理师傅
  listRepairStaffs: baseUrl + "app/ownerRepair.listRepairStaffs",
  // 删除报修单
  deleteOwnerRepair: baseUrl + "app/ownerRepair.deleteOwnerRepair",
  // 报修退单
  repairDispatch: baseUrl + 'app/ownerRepair.repairDispatch',
  // 报修评价
  appraiseRepair: baseUrl + 'app/repair/appraiseRepair',
  // 根据属性查询费用
  listFeeByAttr: baseUrl + "app/feeApi/listFeeByAttr",
  // 投诉 处理意见
  listWorkflowAuditInfo: baseUrl + 'app/workflow.listWorkflowAuditInfo',
  //查询待审核单
  auditComplaint: baseUrl + 'app/complaint.auditComplaint',
  changeStaffPwd: baseUrl + 'app/user.changeStaffPwd', //修改密码
  changeOwnerPhone: baseUrl + 'app/ownerApi/changeOwnerPhone', //修改密码
  queryRentingConfig: baseUrl + 'app/renting/queryRentingConfig', // 房屋出租配置查询
  saveRentingPool: baseUrl + 'app/renting/saveRentingPool', //出租提交
  NEED_NOT_LOGIN_PAGE: [
  '/pages/login/login',
  '/pages/register/register',
  '/pages/my/my',
  '/pages/index/index',
  '/pages/market/market',
  '/pages/showlogin/showlogin'],

  NEED_NOT_LOGIN_URL: [
    // this.listActivitiess,
    // this.listAdvertPhoto,
    // this.queryAppUserBindingOwner,
    // this.listJunkRequirements
  ] };exports.default = _default;

/***/ }),

/***/ 15:
/*!*****************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/constant/MappingConstant.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";





var _config = _interopRequireDefault(__webpack_require__(/*! ../conf/config.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var
MappingConstant = function MappingConstant() {_classCallCheck(this, MappingConstant);};_defineProperty(MappingConstant, "LOGIN_FLAG",
'loginFlag');_defineProperty(MappingConstant, "TOKEN",

"token");_defineProperty(MappingConstant, "OWNER_KEY",

"owner_key");_defineProperty(MappingConstant, "USER_INFO",

"userInfo");_defineProperty(MappingConstant, "AREA_INFO",

"areaInfo");_defineProperty(MappingConstant, "CURRENT_COMMUNITY_INFO",

"currentCommunityInfo");_defineProperty(MappingConstant, "OWNER_INFO",

"ownerInfo");_defineProperty(MappingConstant, "CURRENT_COMMUNITY_INFO",

"currentCommunityInfo");_defineProperty(MappingConstant, "CURRENT_OPEN_ID",

"openId");_defineProperty(MappingConstant, "HC_TEST_COMMUNITY_ID",

_config.default.DEFAULT_COMMUNITY_ID);_defineProperty(MappingConstant, "HC_TEST_COMMUNITY_NAME",
_config.default.DEFAULT_COMMUNITY_NAME);_defineProperty(MappingConstant, "W_APP_ID",

"wAppId");




module.exports = MappingConstant;

/***/ }),

/***/ 16:
/*!*********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/auth/Java110Auth.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.checkSession = checkSession;exports.hasLogin = hasLogin;var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                                                                   * 检查会话是否 存在
                                                                                                                                                                                                                                                                                                                                   * add by 吴学文 QQ:928255095
                                                                                                                                                                                                                                                                                                                                   */
function checkSession() {var _this = this;
  return new Promise(function (resolve, reject) {
    var _that = _this;
    var loginFlag = wx.getStorageSync(_MappingConstant.default.LOGIN_FLAG);
    var nowDate = new Date();
    //判断如果是APP









    //判断如果是H5










    if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 有效(为过期)
        success: function success() {

          resolve();
        },
        // session_key 过期
        fail: function fail() {
          // session_key过期
          reject();
        } });

    } else {
      // 无登录态
      reject();
    }

  });
}
/**
   * 是否登录 不跳转 只是判断是否登录
   * 
   * add by 吴学文 QQ:928255095
   */
function hasLogin() {
  //判断当前登录状态，不调跳转登录界面
  var loginFlag = uni.getStorageSync(_MappingConstant.default.LOGIN_FLAG);
  var nowDate = new Date();
  if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
    return true;
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!*****************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/auth/H5Login.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.wechatRefreshToken = wechatRefreshToken;

var _url = _interopRequireDefault(__webpack_require__(/*! ../constant/url.js */ 14));
var _java110Request = __webpack_require__(/*! ../api/java110Request.js */ 9);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                         * 
                                                                                                                                                         * H5 刷新鉴权登录
                                                                                                                                                         * @param {Object} errorUrl 登录失败时的跳转页面
                                                                                                                                                         * @param {Object} _login  
                                                                                                                                                         * 
                                                                                                                                                         * add by 吴学文 QQ 928255095
                                                                                                                                                         */
function wechatRefreshToken(errorUrl, _login) {
  var _errorUrl = errorUrl;
  if (errorUrl == null || errorUrl == undefined || errorUrl == '') {
    _errorUrl = '/#/pages/showlogin/showlogin';
  }

  if (_login == null || _login == undefined || _login == '') {
    _login = 0; // 不是登录页面鉴权
  }
  (0, _java110Request.requestNoAuth)({
    url: _url.default.wechatRefrashToken,
    method: 'get',
    data: {
      redirectUrl: window.location.href, // 当前页地址
      errorUrl: _errorUrl,
      loginFlag: _login },

    success: function success(res) {
      var _param = res.data;
      if (_param.code == 0) {
        window.location.href = _param.data.openUrl;
        return;
      }
    },
    fail: function fail(error) {
      // 调用服务端登录接口失败
      if (error.statusCode == 401) {
        return;
      }
    } });

}

/***/ }),

/***/ 18:
/*!***********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/auth/MpWeixinLogin.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.doLogin = doLogin;var _LoginHcServer = __webpack_require__(/*! ./LoginHcServer.js */ 19);




function doLogin() {var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var that = this;
  wx.login({
    success: function success(loginRes) {
      if (loginRes.code) {
        // TODO
        //请求服务后端登录
        (0, _LoginHcServer.requsetHcServerToLogin)(loginRes, callback);
      } else {
        // 获取 code 失败
        //that.coreUtil.showInfo('登录失败');
        console.log('调用wx.login获取code失败');
      }
    },
    fail: function fail(error) {
      // 调用 wx.login 接口失败
      //that.coreUtil.showInfo('接口调用失败' + error);
      console.log(error);
    } });

}

/***/ }),

/***/ 19:
/*!***********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/auth/LoginHcServer.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.requsetHcServerToLogin = requsetHcServerToLogin;var _java110Request = __webpack_require__(/*! ../api/java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../constant/url.js */ 14));
var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                        * 请求 HC服务 登录
                                                                                                                                                                                        */
function requsetHcServerToLogin(loginRes) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var defaultRawData = '{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}'; // 请求服务端的登录接口
  console.log('返回信息', loginRes);
  var _appId = '';

  var accountInfo = uni.getAccountInfoSync();
  _appId = accountInfo.miniProgram.appId;





  (0, _java110Request.requestNoAuth)({
    url: _url.default.loginUrl,
    method: 'post',
    data: {
      code: loginRes.code,
      // 临时登录凭证
      userInfo: JSON.parse(defaultRawData),
      // 用户非敏感信息
      signature: '',
      // 签名
      encryptedData: '',
      // 用户敏感信息
      iv: '', // 解密算法的向量
      appId: _appId },


    success: function success(res) {
      if (res.statusCode == '401') {
        var data = res.data;
        uni.setStorageSync(_MappingConstant.default.CURRENT_OPEN_ID, data.openId);
        wx.reLaunch({
          url: '/pages/showlogin/showlogin' });

        return;
      }

      res = res.data;

      if (res.result == 0) {
        //that.globalData.userInfo = res.userInfo;
        console.log(res.userInfo);
        wx.setStorageSync(_MappingConstant.default.USER_INFO, JSON.stringify(res.userInfo));
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份

        var mon = date.getMonth(); //获取当前月份

        var da = date.getDate(); //获取当前日

        var h = date.getHours() + 1; //获取小时

        var m = date.getMinutes(); //获取分钟

        var s = date.getSeconds(); //获取秒

        console.log("获取过去时间", year, mon, da, h, m, s); //将时间格式转化为时间戳

        var afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间

        console.log("afterOneHourDate", afterOneHourDate);
        wx.setStorageSync(_MappingConstant.default.LOGIN_FLAG, {
          sessionKey: res.sessionKey,
          expireTime: afterOneHourDate.getTime() });

        wx.setStorageSync(_MappingConstant.default.TOKEN, res.token);
        callback();
      } else {

      }
    },
    fail: function fail(error) {
      // 调用服务端登录接口失败
      if (error.statusCode == 401) {
        uni.reLaunch({
          url: '/pages/login/login' });

        return;
      }
      console.log(error);
    } });

} // 获取用户登录标示 供全局调用
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/auth/AppLogin.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.doLoginOwnerByKey = doLoginOwnerByKey;var _url = _interopRequireDefault(__webpack_require__(/*! ../constant/url.js */ 14));
var _java110Request = __webpack_require__(/*! ../api/java110Request.js */ 9);


var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                        * 
                                                                                                                                                                                        * app 自登陆处理
                                                                                                                                                                                        * @param {Object} _key 自登陆key
                                                                                                                                                                                        * add by  wuxw QQ 928255095
                                                                                                                                                                                        */
function doLoginOwnerByKey(_key) {
  (0, _java110Request.requestNoAuth)({
    url: _url.default.loginOwnerByKey,
    method: 'post',
    data: {
      key: _key // 当前页地址
    },
    success: function success(res) {
      var _param = res.data;
      if (_param.code != 0) {
        uni.navigateTo({
          url: '/pages/showlogin/showlogin' });

        return;
      }

      var _ownerInfo = _param.owner;
      wx.setStorageSync(_MappingConstant.default.OWNER_INFO, _ownerInfo);
      wx.setStorageSync(_MappingConstant.default.USER_INFO, JSON.stringify(_ownerInfo));
      var _currentCommunityInfo = {
        communityId: _ownerInfo.communityId,
        communityName: _ownerInfo.communityName };

      wx.setStorageSync(_MappingConstant.default.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);

      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var mon = date.getMonth(); //获取当前月份
      var da = date.getDate(); //获取当前日
      var h = date.getHours() + 1; //获取小时
      var m = date.getMinutes(); //获取分钟
      var s = date.getSeconds(); //获取秒
      var afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间
      wx.setStorageSync(_MappingConstant.default.LOGIN_FLAG, {
        sessionKey: _ownerInfo.userId,
        expireTime: afterOneHourDate.getTime() });

      wx.setStorageSync(_MappingConstant.default.TOKEN, _param.token);
      //保存临时 钥匙
      wx.setStorageSync(_MappingConstant.default.OWNER_KEY, _param.key);
    },
    fail: function fail(error) {
      // 调用服务端登录接口失败
      uni.navigateTo({
        url: '/pages/showlogin/showlogin' });

    } });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/utils/LogUtil.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.debug = debug;exports.info = info;exports.warn = warn;exports.error = error;





var _config = _interopRequireDefault(__webpack_require__(/*! ../conf/config.js */ 12));

var _DateUtil = __webpack_require__(/*! ./DateUtil.js */ 13);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                        * 日志工具类
                                                                                                                                        * 
                                                                                                                                        * add by 吴学文 QQ 928255095
                                                                                                                                        */ //日志级别
var logLevel = _config.default.logLevel;var DEBUG = "DEBUG";
var INFO = "INFO";
var WARN = "WARN";
var ERROR = "ERROR";

/**
                      * @description  debug 答应日志
                      * @param {string} fileName 文件名
                      * @param {string} method 方法
                      * @param {Object} msg 打印内容
                      */
function debug(fileName, method, msg) {
  if (logLevel == DEBUG) {
    console.log((0, _DateUtil.formatTimeNow)() + ' ' + '[java110-debug] - ' + fileName + ':' + method + ' ', msg);
  }
}

/**
   * @description info 打印日志
   * @param {string} fileName 文件名
   * @param {string} method 方法
   * @param {Object} msg 打印内容
   */
function info(fileName, method, msg) {
  if (logLevel == DEBUG || logLevel == INFO) {
    console.log((0, _DateUtil.formatTimeNow)() + ' ' + '[java110-info] - ' + fileName + ':' + method + ' ' + msg);
  }
}

/**
   * @description info 打印日志
   * @param {string} fileName 文件名
   * @param {string} method 方法
   * @param {Object} msg 打印内容
   */
function warn(fileName, method, msg) {
  if (logLevel == DEBUG || logLevel == INFO || logLevel == WARN) {
    console.log((0, _DateUtil.formatTimeNow)() + ' ' + '[java110-warn] - ' + fileName + ':' + method + ' ' + msg);
  }
}

/**
   * @description error 打印日志
   * @param {string} fileName 文件名
   * @param {string} method 方法
   * @param {Object} msg 打印内容
   */
function error(fileName, method, msg) {
  console.error((0, _DateUtil.formatTimeNow)() + ' ' + '[java110-error] - ' + fileName + ':' + method + ' ' + msg);
}

/***/ }),

/***/ 22:
/*!***********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/owner/ownerApi.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getCurOwner = getCurOwner;






var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 首页相关 数据封装API
                                                                                                                                                                                           * add by 吴学文 2020-09-07
                                                                                                                                                                                           * QQ 92825595
                                                                                                                                                                                           * 
                                                                                                                                                                                           */ /**
                                                                                                                                                                                               * 查询当前业主信息
                                                                                                                                                                                               */function getCurOwner() {return new Promise(function (resolve, reject) {
    var _ownerInfo = wx.getStorageSync(_MappingConstant.default.OWNER_INFO);
    if (_ownerInfo) {
      resolve(_ownerInfo);
    } else {
      (0, _java110Request.request)({
        url: _url.default.queryAppUserBindingOwner,
        data: {},
        success: function success(res) {
          var _json = res.data;
          if (_json.code == 0) {
            _ownerInfo = _json.data[0];
            if (_ownerInfo == null || _ownerInfo == undefined) {
              //没有业主信息
              reject();
              return;
            }
            if (_ownerInfo.state == '12000') {
              wx.setStorageSync(_MappingConstant.default.OWNER_INFO, _ownerInfo);
              var _currentCommunityInfo = {
                communityId: _ownerInfo.communityId,
                communityName: _ownerInfo.communityName };

              wx.setStorageSync(_MappingConstant.default.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);
            }
            resolve(_json.data[0]);
          }
        },
        fail: function fail(error) {
          // 查询失败
          reject();
        } });

    }
  });
}

/***/ }),

/***/ 23:
/*!*****************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/property/propertyApi.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getProperty = getProperty;






var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));



var _communityApi = __webpack_require__(/*! ../community/communityApi.js */ 24);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                           * 物业信息处理 api 接口类
                                                                                                                                                           * 
                                                                                                                                                           * add by 吴学文 QQ 928255095
                                                                                                                                                           */ /**
                                                                                                                                                               * 查询物业信息
                                                                                                                                                               * @param {Object} _communityInfo 小区信息
                                                                                                                                                               */
function doGetProperty(_communityInfo) {

  return new Promise(function (resolve, reject) {
    var _objData = {
      page: 1,
      row: 5,
      communityId: _communityInfo.communityId,
      memberTypeCd: '390001200002' };

    (0, _java110Request.request)({
      url: _url.default.listStore,
      method: "GET",
      data: _objData,
      //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          resolve(res.data.stores[0]);
          return;
        }
        reject(res.body);
      },
      fail: function fail(e) {
        reject(e);
      } });

  });
}

/**
   * 查询物业信息
   */
function getProperty() {
  return new Promise(function (resolve, reject) {
    //查询当前小区
    (0, _communityApi.getCurCommunity)().
    then(function (_communityInfo) {
      //查询当前物业
      doGetProperty(_communityInfo).
      then(function (_propertyInfo) {
        resolve(_propertyInfo);
      }).
      then(function (res) {
        reject(res);
      });
    });
  });
};

/***/ }),

/***/ 24:
/*!*******************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/community/communityApi.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getCommunitys = getCommunitys;exports.getCurCommunity = getCurCommunity;exports.recoveryCommunityInfo = recoveryCommunityInfo;var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));




var _Java110Auth = __webpack_require__(/*! ../../auth/Java110Auth.js */ 16);



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));

var _ownerApi = __webpack_require__(/*! ../owner/ownerApi.js */ 22);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                               * @param {Object} dataObj
                                                                                                                                               * 				page: 1,
                                                                                                                                              				row: 15,
                                                                                                                                              				cityCode: this.areaCode,
                                                                                                                                              				state: '1100',
                                                                                                                                              				name: this.searchValue
                                                                                                                                               */
function getCommunitys(dataObj) {
  return new Promise(
  function (resolve, reject) {
    (0, _java110Request.requestNoAuth)({
      url: _url.default.listCommunitys,
      method: "GET",
      data: dataObj,
      //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          var _communtiys = res.data.communitys;

          _that.communitys = _communtiys;
        }
      },
      fail: function fail(e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000 });

      } });

  });
}

/**
   * 查询当前小区
   * 
   * 当还没有小区时返回 演示小区
   */
function getCurCommunity() {
  return new Promise(function (resolve, reject) {
    if ((0, _Java110Auth.hasLogin)()) {// 判断是否已经登录
      //已经登录 去后台查询
      (0, _ownerApi.getCurOwner)().
      then(function (_ownerInfo) {
        var _currentCommunityInfo = {
          communityId: _ownerInfo.communityId,
          communityName: _ownerInfo.communityName };

        resolve(_currentCommunityInfo);
      }).then(function () {
        var _currentCommunityInfo = {
          communityId: _MappingConstant.default.HC_TEST_COMMUNITY_ID,
          communityName: _MappingConstant.default.HC_TEST_COMMUNITY_NAME };

        resolve(_currentCommunityInfo);
      });
    } else {
      //没有登录直接写演示小区信息
      var _currentCommunityInfo = {
        communityId: _MappingConstant.default.HC_TEST_COMMUNITY_ID,
        communityName: _MappingConstant.default.HC_TEST_COMMUNITY_NAME };

      resolve(_currentCommunityInfo);
    }
  });
}

/**
   * 将小区信息 刷入 _obj对象
   * @param {Object} _obj 刷入 小区信息对象
   */
function recoveryCommunityInfo(_obj) {

  return new Promise(function (resolve, reject) {
    getCurCommunity().
    then(function (_communityInfo) {
      if (_obj.hasOwnProperty("communityId")) {
        _obj.communityId = _communityInfo.communityId;
      }

      if (_obj.hasOwnProperty("communityName")) {
        _obj.communityName = _communityInfo.communityName;
      }
      resolve(_communityInfo);
    });
  });

}

/***/ }),

/***/ 25:
/*!*********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/init/initApi.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.onLoad = onLoad; /**
                                                                                                     * 页面初始化数据封装
                                                                                                     * add by 吴学文 2020-09-07
                                                                                                     * QQ 92825595
                                                                                                     * 
                                                                                                     */

/**
                                                                                                         * 页面加载方法
                                                                                                         * @param {Object} _option 页面参数对象
                                                                                                         */
function onLoad(_option) {

















}

/***/ }),

/***/ 26:
/*!*******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/constant/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 常量入口类
 * 
 * add by wuxw 2019-12-28
 */
//应用常量类
var appConstant = __webpack_require__(/*! ./AppConstant.js */ 11); // url 常量类


var urlConstant = __webpack_require__(/*! ./UrlConstant.js */ 27); // 映射 常量类


var mappingConstant = __webpack_require__(/*! ./MappingConstant.js */ 15);

module.exports = {
  app: appConstant,
  url: urlConstant,
  mapping: mappingConstant };

/***/ }),

/***/ 27:
/*!*************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/constant/UrlConstant.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";






var _config = _interopRequireDefault(__webpack_require__(/*! ../conf/config.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                  * url 常量类
                                                                                                                                                                  * 
                                                                                                                                                                  * add by wuxw 2019-12-28
                                                                                                                                                                  */var constant = __webpack_require__(/*! ../constant/index.js */ 26);var baseUrl = _config.default.baseUrl;var wechatRefrashToken = baseUrl + "app/refreshToken"; // 公众号刷新token
var loginOwnerByKey = baseUrl + "app/loginOwnerByKey"; // 根据临时秘钥登录

var loginUrl = baseUrl + 'app/loginWx';
var getWxPhoto = baseUrl + 'app/getWxPhoto';
var loginOwnerUrl = baseUrl + 'app/loginOwner';
var areaUrl = baseUrl + "app/area.listAreas";
var GetNoticeListUrl = baseUrl + 'app/notice.listNotices'; //公告接口

var saveOwnerRepair = baseUrl + 'app/ownerRepair.saveOwnerRepair'; //报修

var listOwnerRepairs = baseUrl + 'app/ownerRepair.listOwnerRepairs'; //查询报修

var saveOwner = baseUrl + 'app/owner.saveOwner'; //家庭成员列表

var queryOwnerMembers = baseUrl + 'app/owner.queryOwnerMembers'; //投诉建议列表

var listComplaints = baseUrl + 'app/complaint.listComplaints'; //添加投诉建议

var saveComplaint = baseUrl + 'app/complaint'; //查询业主房间

var queryRoomsByOwner = baseUrl + 'app/room.queryRoomsByOwner'; //绑定业主

var appUserBindingOwner = baseUrl + 'app/owner.appUserBindingOwner'; //查询绑定业主

var ownerRegiter = baseUrl + 'app/owner.ownerRegister'; //业主注册

var ownerRegisterWxPhoto = baseUrl + 'app/owner.ownerRegisterWxPhoto'; //业主注册

var queryAppUserBindingOwner = baseUrl + 'app/owner.listAppUserBindingOwners'; //解绑业主

var appUserUnBindingOwner = baseUrl + 'app/owner.deleteAppUserBindingOwner'; //查询业主门禁

var listOwnerMachines = baseUrl + 'app/owner.listOwnerMachines'; // 申请钥匙

var applyApplicationKey = baseUrl + "app/applicationKey.applyApplicationKey"; //查询钥匙

var listApplicationKeys = baseUrl + "app/applicationKey.listApplicationKeys"; //申请访客钥匙

var applyVisitorApplicationKey = baseUrl + "app/applicationKey.applyVisitorApplicationKey"; //上传业主照片

var uploadOwnerPhoto = baseUrl + "app/owner.uploadOwnerPhoto";
var getOwnerPhotoPath = baseUrl + "callComponent/download/getFile/fileByObjId";
var filePath = baseUrl + "callComponent/download/getFile/file"; //查询业主车位信息

var queryParkingSpacesByOwner = baseUrl + "app/parkingSpace.queryParkingSpacesByOwner"; //查询停车位费用

var queryFeeByParkingSpace = baseUrl + "app/fee.queryFeeByParkingSpace"; //查询物业费用

var queryFeeByOwner = baseUrl + "app/fee.listFee"; //预下单

var preOrder = baseUrl + "app/payment/toPay"; //查询小区

//临时车缴费
var preOrderTempCarInout = baseUrl + "/app/payment/toPayTempCarInout";

var listCommunitys = baseUrl + "app/community.listCommunitys"; //查询小区文化

var listActivitiess = baseUrl + "app/activities.listActivitiess"; //查询小区广告

var listAdvertPhoto = baseUrl + "app/advert.listAdvertPhoto";

//查询车辆进场费用
var queryFeeByCarInout = baseUrl + "app/fee.queryFeeByCarInout";

//查询报修单
var listMyRepair = baseUrl + "app/ownerRepair.listOwnerRepairs";

//查询在场车辆
var listCarIn = baseUrl + "app/carInout.listCarInouts";

var queryConfigFee = baseUrl + "app/fee.queryFeeConfig";

//缴费历史查询
var queryFeeDetail = baseUrl + "app/fee.queryFeeDetail";

//发送验证码
var userSendSms = baseUrl + "app/user.userSendSms";

var userLogout = baseUrl + 'app/user.service.logout'; //绑定业主

var listStore = baseUrl + 'app/store.listStoresByCommunity'; // 查询小区商户

//发布需求信息
var saveJunkRequirement = baseUrl + 'app/junkRequirement.saveJunkRequirement';

//查询需求信息
var listJunkRequirements = baseUrl + 'app/junkRequirement.listJunkRequirements';

//删除 需求信息
var deleteJunkRequirement = baseUrl + 'app/junkRequirement.deleteJunkRequirement';

//标记为已完成
var updateJunkRequirement = baseUrl + 'app/junkRequirement.updateJunkRequirement';

//查询楼栋
var queryFloor = baseUrl + 'app/floor.queryFloors';

//查询单元
var queryUnit = baseUrl + 'app/unit.queryUnits';

//查询报修类型
var listRepairSettings = baseUrl + 'app/repair.listRepairSettings';

//待办工单
var listStaffRepairs = baseUrl + "app/ownerRepair.listStaffRepairs";

//已办工单
var listStaffFinishRepairs = baseUrl + "app/ownerRepair.listStaffFinishRepairs";

// 查询报修单处理师傅
var listRepairStaffs = baseUrl + "app/ownerRepair.listRepairStaffs";


// 删除报修单
var deleteOwnerRepair = baseUrl + "app/ownerRepair.deleteOwnerRepair";

// 报修退单
var repairDispatch = baseUrl + 'app/ownerRepair.repairDispatch';

// 报修评价
var appraiseRepair = baseUrl + 'app/repair/appraiseRepair';


// 根据属性查询费用
var listFeeByAttr = baseUrl + "app/feeApi/listFeeByAttr";

// 投诉 处理意见
var listWorkflowAuditInfo = baseUrl + 'app/workflow.listWorkflowAuditInfo';

//查询待审核单
var auditComplaint = baseUrl + 'app/complaint.auditComplaint';

var changeStaffPwd = baseUrl + 'app/user.changeStaffPwd'; //修改密码

var changeOwnerPhone = baseUrl + 'app/ownerApi/changeOwnerPhone'; //修改密码



var queryRentingPool = baseUrl + 'app/renting/queryRentingPool'; //查询房源



/**
 * 不需要登录页面
 */
var NEED_NOT_LOGIN_PAGE = [
'/pages/login/login',
'/pages/register/register',
'/pages/my/my',
'/pages/index/index',
'/pages/market/market',
'/pages/showlogin/showlogin',
'/pages/rentHouse/rentHouse'];


var NEED_NOT_LOGIN_URL = [
listActivitiess,
listAdvertPhoto,
queryAppUserBindingOwner,
listJunkRequirements,
queryRentingPool];


module.exports = {
  baseUrl: baseUrl,
  loginUrl: loginUrl,
  getWxPhoto: getWxPhoto,
  loginOwnerUrl: loginOwnerUrl,
  areaUrl: areaUrl,
  GetNoticeListUrl: GetNoticeListUrl,
  saveOwnerRepair: saveOwnerRepair,
  listOwnerRepairs: listOwnerRepairs,
  saveOwner: saveOwner,
  appUserBindingOwner: appUserBindingOwner,
  queryAppUserBindingOwner: queryAppUserBindingOwner,
  queryOwnerMembers: queryOwnerMembers,
  listComplaints: listComplaints,
  saveComplaint: saveComplaint,
  appUserUnBindingOwner: appUserUnBindingOwner,
  listOwnerMachines: listOwnerMachines,
  applyApplicationKey: applyApplicationKey,
  listApplicationKeys: listApplicationKeys,
  applyVisitorApplicationKey: applyVisitorApplicationKey,
  uploadOwnerPhoto: uploadOwnerPhoto,
  getOwnerPhotoPath: getOwnerPhotoPath,
  queryRoomsByOwner: queryRoomsByOwner,
  queryParkingSpacesByOwner: queryParkingSpacesByOwner,
  queryFeeByParkingSpace: queryFeeByParkingSpace,
  queryFeeByOwner: queryFeeByOwner,
  preOrder: preOrder,
  listCommunitys: listCommunitys,
  listActivitiess: listActivitiess,
  filePath: filePath,
  listAdvertPhoto: listAdvertPhoto,
  listMyRepair: listMyRepair,
  listCarIn: listCarIn,
  queryConfigFee: queryConfigFee,
  queryFeeByCarInout: queryFeeByCarInout,
  preOrderTempCarInout: preOrderTempCarInout,
  queryFeeDetail: queryFeeDetail,
  userSendSms: userSendSms,
  userLogout: userLogout,
  ownerRegiter: ownerRegiter,
  listStore: listStore,
  saveJunkRequirement: saveJunkRequirement,
  listJunkRequirements: listJunkRequirements,
  deleteJunkRequirement: deleteJunkRequirement,
  updateJunkRequirement: updateJunkRequirement,
  wechatRefrashToken: wechatRefrashToken,
  loginOwnerByKey: loginOwnerByKey,
  NEED_NOT_LOGIN_URL: NEED_NOT_LOGIN_URL,
  NEED_NOT_LOGIN_PAGE: NEED_NOT_LOGIN_PAGE,
  queryFloor: queryFloor,
  queryUnit: queryUnit,
  listRepairSettings: listRepairSettings,
  listStaffRepairs: listStaffRepairs,
  listStaffFinishRepairs: listStaffFinishRepairs,
  listRepairStaffs: listRepairStaffs,
  deleteOwnerRepair: deleteOwnerRepair,
  repairDispatch: repairDispatch,
  appraiseRepair: appraiseRepair,
  listFeeByAttr: listFeeByAttr,
  listWorkflowAuditInfo: listWorkflowAuditInfo,
  auditComplaint: auditComplaint,
  ownerRegisterWxPhoto: ownerRegisterWxPhoto,
  changeStaffPwd: changeStaffPwd,
  changeOwnerPhone: changeOwnerPhone,
  queryRentingPool: queryRentingPool };

/***/ }),

/***/ 28:
/*!******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 工厂类入口类
 * 
 * add by wuxw 2019-12-28
 * 
 */
//登录工厂类
var loginFactory = __webpack_require__(/*! ./LoginFactory.js */ 29);

var userFactory = __webpack_require__(/*! ./UserFactory.js */ 31);

var fileFactory = __webpack_require__(/*! ./FileFactory.js */ 33);

var coreFactory = __webpack_require__(/*! ./CoreFactory.js */ 34);

var httpFactory = __webpack_require__(/*! ./HttpFactory.js */ 35);

var base64Factory = __webpack_require__(/*! ./Base64Factory.js */ 36);

module.exports = {
  login: loginFactory,
  user: userFactory,
  file: fileFactory,
  core: coreFactory,
  http: httpFactory,
  base64: base64Factory };

/***/ }),

/***/ 29:
/*!*************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/LoginFactory.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {










var _SeqUtil = __webpack_require__(/*! ../utils/SeqUtil.js */ 30);
var _DateUtil = __webpack_require__(/*! ../utils/DateUtil.js */ 13);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var constant = __webpack_require__(/*! ../constant/index.js */ 26);

var context = __webpack_require__(/*! ../context/Java110Context.js */ 8);var

LoginFactory = /*#__PURE__*/function () {
  function LoginFactory() {_classCallCheck(this, LoginFactory);

  } // 检查本地 storage 中是否有登录态标识
  _createClass(LoginFactory, [{ key: "getHeaders", value: function getHeaders()
    {
      var _wAppId = uni.getStorageSync(constant.mapping.W_APP_ID);

      return {
        "app-id": constant.app.appId,
        "transaction-id": (0, _SeqUtil.uuid)(),
        "req-time": (0, _DateUtil.getDateYYYYMMDDHHMISS)(),
        "sign": '1234567',
        "user-id": '-1',
        "cookie": '_java110_token_=' + wx.getStorageSync('token'),
        "Accept": '*/*',
        "w-app-id": _wAppId };

    } }, { key: "checkSession",

    //检查当前是否有回话
    value: function checkSession() {var _this = this;
      return new Promise(function (resolve, reject) {
        var _that = _this;
        var loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
        var nowDate = new Date();
        //判断如果是APP









        //判断如果是H5











        if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
          // 检查 session_key 是否过期
          wx.checkSession({
            // session_key 有效(为过期)
            success: function success() {

              resolve();
            },
            // session_key 过期
            fail: function fail() {
              // session_key过期
              reject();
            } });

        } else {
          // 无登录态
          reject();
        }

      });
    } }, { key: "checkLoginStatus", value: function checkLoginStatus()

    {var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _that = this;

      var loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);

      var nowDate = new Date();





























      if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
        // 检查 session_key 是否过期
        wx.checkSession({
          // session_key 有效(为过期)
          success: function success() {
            console.log('判断用户是否登录');
            callback();
          },
          // session_key 过期
          fail: function fail() {
            // session_key过期
            _that.doLogin();
          } });

      } else {
        // 无登录态
        _that.doLogin(callback);
      }

    } // 登录动作
  }, { key: "doLogin", value: function doLogin()

    {var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var that = this;
      wx.login({
        success: function success(loginRes) {
          if (loginRes.code) {
            // TODO
            //请求服务后端登录
            that.requsetHcServerToLogin(loginRes, callback);
          } else {
            // 获取 code 失败
            console.log('调用wx.login获取code失败');
          }
        },
        fail: function fail(error) {
          // 调用 wx.login 接口失败

          console.log(error);
        } });

    }
    /**
       * h5刷新 token
       */ }, { key: "wechatRefreshToken", value: function wechatRefreshToken(
    errorUrl, _login) {
      var _errorUrl = errorUrl;
      if (errorUrl == null || errorUrl == undefined || errorUrl == '') {
        _errorUrl = '/#/pages/showlogin/showlogin';
      }

      if (_login == null || _login == undefined || _login == '') {
        _login = 0; // 不是登录页面鉴权
      }
      uni.request({
        url: constant.url.wechatRefrashToken,
        method: 'get',
        header: this.getHeaders(),
        data: {
          redirectUrl: window.location.href, // 当前页地址
          errorUrl: _errorUrl,
          loginFlag: _login },

        success: function success(res) {
          var _param = res.data;
          if (_param.code == 0) {
            window.location.href = _param.data.openUrl;
            return;
          }
        },
        fail: function fail(error) {
          // 调用服务端登录接口失败
          if (error.statusCode == 401) {
            return;
          }
        } });

    }

    /**
       * 请求 HC服务 登录
       */ }, { key: "requsetHcServerToLogin", value: function requsetHcServerToLogin(
    loginRes) {var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var defaultRawData = '{"nickName":"","gender":1,"language":"","city":"","province":"","country":"","avatarUrl":""}'; // 请求服务端的登录接口
      console.log('返回信息', loginRes);
      var _appId = '';

      var accountInfo = uni.getAccountInfoSync();
      _appId = accountInfo.miniProgram.appId;





      wx.request({
        url: constant.url.loginUrl,
        method: 'post',
        header: this.getHeaders(),
        data: {
          code: loginRes.code,
          // 临时登录凭证
          userInfo: JSON.parse(defaultRawData),
          // 用户非敏感信息
          signature: '',
          // 签名
          encryptedData: '',
          // 用户敏感信息
          iv: '', // 解密算法的向量
          appId: _appId },


        success: function success(res) {

          if (res.statusCode == '401') {
            var data = res.data;
            uni.setStorageSync(constant.mapping.CURRENT_OPEN_ID, data.openId);
            wx.reLaunch({
              url: '/pages/showlogin/showlogin' });

            return;
          }

          res = res.data;

          if (res.result == 0) {
            //that.globalData.userInfo = res.userInfo;
            console.log(res.userInfo);
            wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(res.userInfo));
            var date = new Date();
            var year = date.getFullYear(); //获取当前年份

            var mon = date.getMonth(); //获取当前月份

            var da = date.getDate(); //获取当前日

            var h = date.getHours() + 1; //获取小时

            var m = date.getMinutes(); //获取分钟

            var s = date.getSeconds(); //获取秒

            console.log("获取过去时间", year, mon, da, h, m, s); //将时间格式转化为时间戳

            var afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间

            console.log("afterOneHourDate", afterOneHourDate);
            wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
              sessionKey: res.sessionKey,
              expireTime: afterOneHourDate.getTime() });

            wx.setStorageSync(constant.mapping.TOKEN, res.token);
            callback();
          } else {
          }
        },
        fail: function fail(error) {
          // 调用服务端登录接口失败
          if (error.statusCode == 401) {
            uni.reLaunch({
              url: '/pages/login/login' });

            return;
          }

          console.log(error);
        } });

    } // 获取用户登录标示 供全局调用
  }, { key: "getLoginFlag", value: function getLoginFlag()

    {
      return wx.getStorageSync(constant.mapping.LOGIN_FLAG);
    } }, { key: "_doLoginOwnerByKey", value: function _doLoginOwnerByKey(

    _key) {
      uni.request({
        url: constant.url.loginOwnerByKey,
        method: 'post',
        header: this.getHeaders(),
        data: {
          key: _key // 当前页地址
        },
        success: function success(res) {
          var _param = res.data;
          if (_param.code != 0) {
            uni.navigateTo({
              url: '/pages/showlogin/showlogin' });

            return;
          }

          var _ownerInfo = _param.owner;
          wx.setStorageSync(constant.mapping.OWNER_INFO, _ownerInfo);
          wx.setStorageSync(constant.mapping.USER_INFO, JSON.stringify(_ownerInfo));
          var _currentCommunityInfo = {
            communityId: _ownerInfo.communityId,
            communityName: _ownerInfo.communityName };

          wx.setStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO, _currentCommunityInfo);

          var date = new Date();
          var year = date.getFullYear(); //获取当前年份
          var mon = date.getMonth(); //获取当前月份
          var da = date.getDate(); //获取当前日
          var h = date.getHours() + 1; //获取小时
          var m = date.getMinutes(); //获取分钟
          var s = date.getSeconds(); //获取秒
          var afterOneHourDate = new Date(year, mon, da, h, m, s); //30s之后的时间
          wx.setStorageSync(constant.mapping.LOGIN_FLAG, {
            sessionKey: _ownerInfo.userId,
            expireTime: afterOneHourDate.getTime() });

          wx.setStorageSync(constant.mapping.TOKEN, _param.token);
          //保存临时 钥匙
          wx.setStorageSync(constant.mapping.OWNER_KEY, _param.key);
        },
        fail: function fail(error) {
          // 调用服务端登录接口失败
          uni.navigateTo({
            url: '/pages/showlogin/showlogin' });

        } });

    } }]);return LoginFactory;}();


;
module.exports = new LoginFactory();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/utils/SeqUtil.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.uuid = uuid; /**
                                                                                                 * 序列工具类
                                                                                                 * 
                                                                                                 * add by 吴学文 QQ 928255095
                                                                                                 */
/**
                                                                                                     * @description uuid 序列生成
                                                                                                     * 
                                                                                                     * @return {string} uuid 序列
                                                                                                     */
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

/***/ }),

/***/ 305:
/*!*********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/room/roomApi.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getRooms = getRooms;exports.queryRentingConfig = queryRentingConfig;exports.hireRoom = hireRoom;






var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));



var _ownerApi = __webpack_require__(/*! ../owner/ownerApi.js */ 22);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                               * 房屋信息处理 api 接口类
                                                                                                                                               * 
                                                                                                                                               * add by 吴学文 QQ 928255095
                                                                                                                                               */ /**
                                                                                                                                                   * 查询业主房屋
                                                                                                                                                   */
function getRooms() {
  return new Promise(function (resolve, reject) {
    (0, _ownerApi.getCurOwner)().
    then(function (_owner) {
      (0, _java110Request.request)({
        url: _url.default.queryRoomsByOwner,
        method: "GET",
        data: {
          communityId: _owner.communityId,
          ownerId: _owner.memberId },

        success: function success(res) {
          if (res.statusCode == 200) {
            //将业主信息和房屋信息一起返回
            res.data['owner'] = _owner;
            if (res.data.rooms.length == 0) {
              reject("业主没有房屋信息");
              return;
            }
            resolve(res.data);
          } else {
            reject("查询房屋失败");
          }
        },
        fail: function fail(res) {
          reject(res);
        } });

    });
  });
};

/**
    * 查询房屋租聘配置
    */
function queryRentingConfig() {
  return new Promise(function (resolve, reject) {
    (0, _java110Request.request)({
      url: _url.default.queryRentingConfig,
      method: "GET",
      data: {
        page: 1,
        row: 10 },

      success: function success(res) {

        var data = res.data;
        if (data.code == 0) {
          resolve(data.data);
        } else {
          reject(data.msg);
        }
      },
      fail: function fail(res) {
        reject(res);
      } });

  });
}

/**
   * 房屋租赁
   * @param {Object} obj 房屋租赁数据
   * "rentingName": this.rentingName,
  	"roomId": this.roomId,
  	"communityId": this.communityId,
  	"price": this.price,
  	"paymentType": this.paymentType,
  	"rentingConfigId": this.rentingConfigId,
  	"photos": [],
  	"rentingDesc": this.rentingDesc,
  	"ownerTel": this.userTel,
  	"ownerName":this.userName,
  	"state":"0"
   */
function hireRoom(obj) {
  return new Promise(function (resolve, reject) {
    var msg = "";
    if (obj.rentingName == "") {
      msg = "出租标题不能为空";
    } else if (obj.roomId == "") {
      msg = "请选择房屋";
    } else if (obj.communityId == "") {
      msg = "未找到小区信息";
    } else if (obj.price == "") {
      msg = "请填写租金(元)";
    } else if (obj.paymentType == "") {
      msg = "请选择付费类型";
    } else if (obj.rentingConfigId == "") {
      msg = "请选择出租方式";
    } else if (obj.rentingDesc == '') {
      msg = "请填写出租说明";
    } else if (obj.photos.length < 1) {
      msg = "请选择图片";
    } else if (obj.checkIn == '') {
      msg = "请选择入住日期";
    }

    if (msg != "") {
      reject(msg);
    } else {
      (0, _java110Request.request)({
        url: _url.default.saveRentingPool,
        method: "POST",
        data: obj, //动态数据
        success: function success(res) {
          var _json = res.data;
          if (_json.code == 0) {
            resolve(_json);
            return;
          }
          reject(_json.msg);
        },
        fail: function fail(e) {
          reject('服务异常');
        } });

    }
  });
}

/***/ }),

/***/ 306:
/*!*******************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/fee/feeApi.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getRoomFees = getRoomFees;var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));



var _DateUtil = __webpack_require__(/*! ../../utils/DateUtil.js */ 13);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                  * @param {Object} _objData {
                                                                                                                                                 	 page: 1,
                                                                                                                                                 	 row: 30,
                                                                                                                                                 	 payerObjId: _room.roomId,
                                                                                                                                                 	 feeTypeCd: '888800010001',
                                                                                                                                                 	 communityId: _room.communityId,
                                                                                                                                                 	 state:'2008001'
                                                                                                                                                  }
                                                                                                                                                  */
function getRoomFees(_objData, _tmpRoom) {
  return new Promise(function (resolve, reject) {
    var moreRooms = [];
    (0, _java110Request.request)({
      url: _url.default.queryFeeByOwner,
      method: "GET",
      data: _objData, //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          //成功情况下跳转
          var _roomFees = res.data.fees;
          if (_roomFees.length < 1) {
            //_that.noData = true;
            reject();
          }
          _roomFees.forEach(function (_roomFee) {
            _tmpRoom.endTime = (0, _DateUtil.dateTimeStringToDateString)(_roomFee.endTime);
            var _now = new Date();
            if (_roomFee.endTime > _now) {
              _tmpRoom.feeStateName = '正常';
            } else {
              _tmpRoom.feeStateName = '欠费';
            }
            _tmpRoom.additionalAmount = _roomFee.additionalAmount;
            _tmpRoom.squarePrice = _roomFee.squarePrice;
            _tmpRoom.amount = _roomFee.feePrice;
            _tmpRoom.feeId = _roomFee.feeId;
            _tmpRoom.feeName = _roomFee.feeName;
            _tmpRoom.feeFlag = _roomFee.feeFlag;
            _tmpRoom.paymentCycle = _roomFee.paymentCycle;
            moreRooms.push(_tmpRoom);
          });
          resolve(moreRooms);
          return;
        }
        reject();
      },
      fail: function fail(e) {
        reject();
      } });

  });
}

/***/ }),

/***/ 31:
/*!************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/UserFactory.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 用户工厂类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2019-12-28
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */
var QQMapWX = __webpack_require__(/*! ../lib/qqmap-wx-jssdk.min.js */ 32);

var qqmapsdk;var

UserFactory = /*#__PURE__*/function () {"use strict";
  function UserFactory() {_classCallCheck(this, UserFactory);
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'AWIBZ-M62LQ-7ND5S-GHM45-AGKU7-R5BU5' });

  } //获取地理位置
  _createClass(UserFactory, [{ key: "getUserLocation", value: function getUserLocation()

    {
      wx.getLocation({
        type: 'gcj02',
        success: function success(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log("latitude" + latitude);
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude },

            coord_type: 1,
            get_poi: 1,
            success: function success(res, data) {
              console.log(data);
              wx.setStorageSync('location', data.pois[0].title);
              wx.setStorageSync('currentLocation', data.reverseGeocoderSimplify);
            } });

        } });

    } }]);return UserFactory;}();



module.exports = new UserFactory();

/***/ }),

/***/ 32:
/*!***************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/lib/qqmap-wx-jssdk.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;

/***/ }),

/***/ 33:
/*!************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/FileFactory.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 文件工厂类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2019-12-28
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var
FileFactory = /*#__PURE__*/function () {"use strict";
  function FileFactory() {_classCallCheck(this, FileFactory);} // 获取书籍已下载路径
  _createClass(FileFactory, [{ key: "getDownloadPath", value: function getDownloadPath(

    key) {
      return wx.getStorageSync(key);
    } // 调用 wx.saveFile 将下载的文件保存在本地
  }, { key: "saveDownloadPath", value: function saveDownloadPath(

    key, filePath) {
      return new Promise(function (resolve, reject) {
        wx.saveFile({
          tempFilePath: filePath,
          success: function success(res) {
            // 保存成功 在Storage中标记 下次不再下载
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync(key, savedFilePath);
            resolve(savedFilePath);
          },
          fail: function fail() {
            reject(false);
          } });

      });
    } }]);return FileFactory;}();



module.exports = FileFactory;

/***/ }),

/***/ 34:
/*!************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/CoreFactory.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 核心工厂类，写一些 核心业务处理 如果 权限验证
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2019-12-28
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var
CoreFactory = /*#__PURE__*/function () {"use strict";
  function CoreFactory() {_classCallCheck(this, CoreFactory);} // 检查用户信息授权设置
  _createClass(CoreFactory, [{ key: "checkUserInfoPermission", value: function checkUserInfoPermission()

    {var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.openSetting({
              success: function success(authSetting) {
                console.log(authSetting);
              } });

          }
        },
        fail: function fail(error) {
          console.log(error);
        } });

    } }]);return CoreFactory;}();



module.exports = new CoreFactory();

/***/ }),

/***/ 35:
/*!************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/HttpFactory.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 重新封装 http 请求
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2020-01-01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * java110团队
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var
HttpFactory = /*#__PURE__*/function () {"use strict";
  function HttpFactory() {_classCallCheck(this, HttpFactory);}_createClass(HttpFactory, [{ key: "getSync", value: function getSync(

    _httpHead, _url, _data) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: _url,
          header: _httpHead,
          method: 'GET',
          data: _data,

          success: function success(res) {
            resolve(res);
          },

          fail: function fail(err) {
            reject(err);
          } });


      });
    } }, { key: "postSync", value: function postSync(

    _httpHead, _url, _data) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: _url,
          header: _httpHead,
          method: 'POST',
          data: _data,

          success: function success(res) {
            resolve(res);
          },

          fail: function fail(err) {
            reject(err);
          } });


      });
    } }]);return HttpFactory;}();



module.exports = new HttpFactory();

/***/ }),

/***/ 36:
/*!**************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/factory/Base64Factory.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * base64 处理 工厂类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * add by wuxw 2020-01-01 美丽的夏都西宁
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */var
Base64Factory = /*#__PURE__*/function () {"use strict";
  function Base64Factory() {_classCallCheck(this, Base64Factory);}_createClass(Base64Factory, null, [{ key: "getLocalFilePath", value: function getLocalFilePath(

    path) {
      if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf(
      '_downloads') === 0) {
        return path;
      }
      if (path.indexOf('file://') === 0) {
        return path;
      }
      if (path.indexOf('/storage/emulated/0/') === 0) {
        return path;
      }
      if (path.indexOf('/') === 0) {
        var localFilePath = plus.io.convertAbsoluteFileSystem(path);
        if (localFilePath !== path) {
          return localFilePath;
        } else {
          path = path.substr(1);
        }
      }
      return '_www/' + path;
    } }, { key: "urlTobase64", value: function urlTobase64(

    url) {
      //url = Base64Factory.getLocalFilePath(url);

      return new Promise(function (resolve, reject) {
        console.log('url', url);








































        wx.getFileSystemManager().readFile({
          filePath: url, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: function success(res) {//成功的回调
            //console.log('data:image/png;base64,' + res.data);
            var base64 = 'data:image/png;base64,' + res.data;
            resolve(base64);
          },
          fail: function fail(e) {
            console.log(e);
            reject(e);
          } });


      });

    } }]);return Base64Factory;}();



module.exports = Base64Factory;

/***/ }),

/***/ 39:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 4:
/*!************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/pages.json ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/core/vcFramework.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

















var _StorageUtil = __webpack_require__(/*! ../utils/StorageUtil.js */ 41);

var _LogUtil = __webpack_require__(/*! ../utils/LogUtil.js */ 21);

var _communityApi = __webpack_require__(/*! ../api/community/communityApi.js */ 24);


var _initApi = __webpack_require__(/*! ../api/init/initApi.js */ 25);

var _vcRoute = __webpack_require__(/*! ./vcRoute.js */ 42); /**
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
                                         */ // 存储相关
// 日志相关
// 小区相关
// 页面初始化相关
var _default = { getStorageSync: _StorageUtil.getStorageSync, setStorageSync: _StorageUtil.setStorageSync, debug: _LogUtil.debug, info: _LogUtil.info, error: _LogUtil.error, warn: _LogUtil.warn, getCurCommunity: _communityApi.getCurCommunity, recoveryCommunityInfo: _communityApi.recoveryCommunityInfo, //将小区输入相应对象
  onLoad: _initApi.onLoad, navigateTo: _vcRoute.navigateTo, navigateBack: _vcRoute.navigateBack };exports.default = _default;

/***/ }),

/***/ 41:
/*!**********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/utils/StorageUtil.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getStorageSync = getStorageSync;exports.setStorageSync = setStorageSync;






var _LogUtil = __webpack_require__(/*! ./LogUtil.js */ 21); /**
                                         * 存储工具类
                                         * 
                                         * add by 吴学文 QQ 928255095
                                         * 
                                         * 
                                         */ /**
                                             * @param {Object} _key 存储键
                                             * @return {Object} _value 查询到值
                                             */function getStorageSync(_key) {(0, _LogUtil.debug)('StorageUtil', 'getStorageSync', _key);var _value = uni.getStorageSync(_key);

  (0, _LogUtil.debug)('StorageUtil', 'getStorageSync', _value);

  return _value;
}

/**
   * @description 将数据缓存至 磁盘中
   * @param {Object} _key 存储键
   * @param {Object} _value 存储值
   */
function setStorageSync(_key, _value) {
  (0, _LogUtil.debug)('StorageUtil', 'setStorageSync', _key);

  uni.setStorageSync(_key, _value);

  (0, _LogUtil.debug)('StorageUtil', 'setStorageSync', _value);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 42:
/*!*****************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/core/vcRoute.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.navigateTo = navigateTo;exports.navigateBack = navigateBack;





var _url2 = _interopRequireDefault(__webpack_require__(/*! ../constant/url.js */ 14));

var _LogUtil = __webpack_require__(/*! ../utils/LogUtil.js */ 21);

var _Java110Auth = __webpack_require__(/*! ../auth/Java110Auth.js */ 16);

var _H5Login = __webpack_require__(/*! ../auth/H5Login.js */ 17);



var _MpWeixinLogin = __webpack_require__(/*! ../auth/MpWeixinLogin.js */ 18);



var _AppLogin = __webpack_require__(/*! ../auth/AppLogin.js */ 20);




var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/MappingConstant.js */ 15));

var _StorageUtil = __webpack_require__(/*! ../utils/StorageUtil.js */ 41);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                     * 路由处理文件
                                                                                                                                                     * 
                                                                                                                                                     * add by 吴学文 QQ 928255095
                                                                                                                                                     */ /*
                                                                                                                                                        * 跳转功能封装
                                                                                                                                                         * @param {Object} _param 跳转入参
                                                                                                                                                         */function navigateTo(_param) {var _url = _param.url;
  var _tempUrl = _url.indexOf('?') > 0 ? _url.substring(0, _url.indexOf('?')) : _url;
  //是否需要登录
  _url2.default.NEED_NOT_LOGIN_PAGE.forEach(function (item) {
    if (item == _tempUrl) {
      uni.navigateTo(_param);
      return;
    }
  });
  (0, _LogUtil.debug)('vcRoute', 'navigateTo', _param);
  //校验是否登录，如果没有登录跳转至温馨提示页面
  (0, _Java110Auth.checkSession)().then(function () {
    //有回话 跳转至相应页面
    uni.navigateTo(_param);
  }, function (error) {//回话过期





    //小程序登录

    (0, _MpWeixinLogin.doLogin)();














  });
};

/**
    * 返回上层页面
    */
function navigateBack() {
  uni.navigateBack({
    delta: 1 });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 435:
/*!*************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/repair/repairApi.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appraiseRepair = appraiseRepair;var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));



var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../../constant/MappingConstant.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



/**
                                                                                                                                                                                           * 报修评价
                                                                                                                                                                                           * @param {Object} _data 评价内容
                                                                                                                                                                                           */
function appraiseRepair(_data) {
  return new Promise(function (resolve, reject) {
    var moreRooms = [];
    (0, _java110Request.request)({
      url: _url.default.appraiseRepair,
      method: "POST",
      data: _data, //动态数据
      success: function success(res) {
        var _data = res.data;
        if (_data.code == 0) {
          resolve(_data);
          return;
        }
        reject(_data.msg);
      },
      fail: function fail(e) {
        reject(e);
      } });

  });
}

/***/ }),

/***/ 49:
/*!***********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/index/indexApi.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getActivitiTitle = getActivitiTitle;exports.getCategoryList = getCategoryList;exports.loadActivites = loadActivites;exports.loadAdverts = loadAdverts;






var _java110Request = __webpack_require__(/*! ../java110Request.js */ 9);


var _url = _interopRequireDefault(__webpack_require__(/*! ../../constant/url.js */ 14));


var _DateUtil = __webpack_require__(/*! ../../utils/DateUtil.js */ 13);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                  * 首页相关 数据封装API
                                                                                                                                                  * add by 吴学文 2020-09-07
                                                                                                                                                  * QQ 92825595
                                                                                                                                                  * 
                                                                                                                                                  */ /**
                                                                                                                                                      * 查询活动列表
                                                                                                                                                      */function getActivitiTitle() {return [{ typeCd: '10003',
    name: '公共安全及消防' },

  {
    typeCd: '10004',
    name: '政务及党政' },

  {
    typeCd: '10005',
    name: '费用公开' },

  {
    typeCd: '10001',
    name: '小区文化' },

  {
    typeCd: '10002',
    name: '其他' }];


}

/**
   * 查询 目录列表
   */
function getCategoryList() {
  return {
    pageone: [{
      name: "物业费",
      src: "/static/images/index_property.png",
      href: "/pages/roomFeeList/roomFeeList" },
    {
      name: "停车费",
      src: "/static/images/index_park.png",
      href: "/pages/payParkingFeeList/payParkingFeeList" },
    {
      name: "投诉建议",
      src: "/static/images/index_complaint.png",
      href: "/pages/complaint/complaint" },
    {
      name: "家庭成员",
      src: "/static/images/index_member.png",
      href: "/pages/familyList/familyList" },
    {
      name: "报修",
      src: "/static/images/index_repair.png",
      href: "/pages/repair/repair" },
    {
      name: "公告",
      src: "/static/images/index_notice.png",
      href: "/pages/notice/index" },
    {
      name: "联系客服",
      src: "/static/images/index_persion.png",
      href: "callProperty" },
    {
      name: "房屋出租",
      src: "/static/images/index_openDoor.png",
      href: "/pages/hireRoom/hireRoom" }],

    pagetwo: [{
      name: "智慧开门",
      src: "/static/images/index_openDoor.png",
      href: "/pages/openDoor/openDoor" }] };


}


/**
   * 查询活动
   */
function loadActivites(dataObj) {
  return new Promise(
  function (resolve, reject) {
    (0, _java110Request.requestNoAuth)({
      url: _url.default.listActivitiess,
      method: "GET",
      data: dataObj,
      //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          var _activites = res.data.activitiess;
          var _acts = [];
          _activites.forEach(function (_item) {
            _item.src = _url.default.filePath + "?fileId=" + _item.headerImg + "&communityId=" + dataObj.communityId +
            "&time=" + new Date();
            _item.startTime = (0, _DateUtil.dateTimeStringToDateString)(_item.startTime);

            _acts.push(_item);
          });
          resolve(_acts);
          return;
        }
        reject();
      },
      fail: function fail(e) {
        reject();
      } });

  });
}

/**
   * 查询小区广告
   */
function loadAdverts(dataObj) {
  return new Promise(
  function (resolve, reject) {
    (0, _java110Request.requestNoAuth)({
      url: _url.default.listAdvertPhoto,
      method: "GET",
      data: dataObj,
      //动态数据
      success: function success(res) {
        if (res.statusCode == 200) {
          var _advertPhotos = res.data;
          var _aPhotos = [];
          var _urlPath = '';

          _urlPath = _url.default.baseUrl;

          _advertPhotos.forEach(function (_item) {
            _item.url = _urlPath + _item.url + "&time=" + new Date();
            _aPhotos.push(_item);
          });
          resolve(_aPhotos);
          return;
        }
        reject();
      },
      fail: function fail(e) {
        reject();
      } });

  });
}

/***/ }),

/***/ 506:
/*!*******************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/components/uni-icons/icons.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 521:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 522);

/***/ }),

/***/ 522:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 523);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 523:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 524:
/*!******************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/components/sx-rate/common.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getClientRect = getClientRect;function getClientRect(selector, component) {
  return new Promise(function (resolve, reject) {
    var query = component ? uni.createSelectorQuery().in(component) : uni.createSelectorQuery();
    return query.select(selector).boundingClientRect(resolve).exec();
  });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 71:
/*!**********************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/components/pickerAddress/data.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "provinceCode": "110000",
  "provinceName": "北京",
  "city": [{
    "cityCode": "110000-1",
    "cityName": "北京市",
    "county": [{
      "countyCode": "110115",
      "countyName": "大兴区" },
    {
      "countyCode": "110116",
      "countyName": "怀柔区" },
    {
      "countyCode": "110105",
      "countyName": "朝阳区" },
    {
      "countyCode": "110229",
      "countyName": "延庆区" },
    {
      "countyCode": "110114",
      "countyName": "昌平区" },
    {
      "countyCode": "110108",
      "countyName": "海淀区" },
    {
      "countyCode": "110107",
      "countyName": "石景山区" },
    {
      "countyCode": "110112",
      "countyName": "通州区" },
    {
      "countyCode": "110228",
      "countyName": "密云区" },
    {
      "countyCode": "110117",
      "countyName": "平谷区" },
    {
      "countyCode": "110109",
      "countyName": "门头沟区" },
    {
      "countyCode": "110113",
      "countyName": "顺义区" },
    {
      "countyCode": "110106",
      "countyName": "丰台区" },
    {
      "countyCode": "110111",
      "countyName": "房山区" },
    {
      "countyCode": "110101",
      "countyName": "东城区" },
    {
      "countyCode": "110102",
      "countyName": "西城区" }] }] },


{
  "provinceCode": "120000",
  "provinceName": "天津",
  "city": [{
    "cityCode": "120000-1",
    "cityName": "天津市",
    "county": [{
      "countyCode": "120103",
      "countyName": "河西区" },
    {
      "countyCode": "120106",
      "countyName": "红桥区" },
    {
      "countyCode": "120223",
      "countyName": "静海区" },
    {
      "countyCode": "120114",
      "countyName": "武清区" },
    {
      "countyCode": "120110",
      "countyName": "东丽区" },
    {
      "countyCode": "120111",
      "countyName": "西青区" },
    {
      "countyCode": "120225",
      "countyName": "蓟州区" },
    {
      "countyCode": "120116",
      "countyName": "滨海新区" },
    {
      "countyCode": "120113",
      "countyName": "北辰区" },
    {
      "countyCode": "120115",
      "countyName": "宝坻区" },
    {
      "countyCode": "120101",
      "countyName": "和平区" },
    {
      "countyCode": "120112",
      "countyName": "津南区" },
    {
      "countyCode": "120221",
      "countyName": "宁河区" },
    {
      "countyCode": "120104",
      "countyName": "南开区" },
    {
      "countyCode": "120105",
      "countyName": "河北区" },
    {
      "countyCode": "120102",
      "countyName": "河东区" }] }] },


{
  "provinceCode": "130000",
  "provinceName": "河北省",
  "city": [{
    "cityCode": "130400",
    "cityName": "邯郸市",
    "county": [{
      "countyCode": "130404",
      "countyName": "复兴区" },
    {
      "countyCode": "130424",
      "countyName": "成安县" },
    {
      "countyCode": "130403",
      "countyName": "丛台区" },
    {
      "countyCode": "130402",
      "countyName": "邯山区" },
    {
      "countyCode": "130434",
      "countyName": "魏县" },
    {
      "countyCode": "130429",
      "countyName": "永年区" },
    {
      "countyCode": "130427",
      "countyName": "磁县" },
    {
      "countyCode": "130433",
      "countyName": "馆陶县" },
    {
      "countyCode": "130421",
      "countyName": "邯郸县" },
    {
      "countyCode": "130435",
      "countyName": "曲周县" },
    {
      "countyCode": "130425",
      "countyName": "大名县" },
    {
      "countyCode": "130426",
      "countyName": "涉县" },
    {
      "countyCode": "130423",
      "countyName": "临漳县" },
    {
      "countyCode": "130431",
      "countyName": "鸡泽县" },
    {
      "countyCode": "130406",
      "countyName": "峰峰矿区" },
    {
      "countyCode": "130430",
      "countyName": "邱县" },
    {
      "countyCode": "130428",
      "countyName": "肥乡区" },
    {
      "countyCode": "130432",
      "countyName": "广平县" },
    {
      "countyCode": "130481",
      "countyName": "武安市" }] },

  {
    "cityCode": "131100",
    "cityName": "衡水市",
    "county": [{
      "countyCode": "131127",
      "countyName": "景县" },
    {
      "countyCode": "131102",
      "countyName": "桃城区" },
    {
      "countyCode": "131128",
      "countyName": "阜城县" },
    {
      "countyCode": "131125",
      "countyName": "安平县" },
    {
      "countyCode": "131121",
      "countyName": "枣强县" },
    {
      "countyCode": "131123",
      "countyName": "武强县" },
    {
      "countyCode": "131122",
      "countyName": "武邑县" },
    {
      "countyCode": "131181",
      "countyName": "冀州区" },
    {
      "countyCode": "131126",
      "countyName": "故城县" },
    {
      "countyCode": "131124",
      "countyName": "饶阳县" },
    {
      "countyCode": "131182",
      "countyName": "深州市" }] },

  {
    "cityCode": "130900",
    "cityName": "沧州市",
    "county": [{
      "countyCode": "130930",
      "countyName": "孟村回族自治县" },
    {
      "countyCode": "130923",
      "countyName": "东光县" },
    {
      "countyCode": "130981",
      "countyName": "泊头市" },
    {
      "countyCode": "130924",
      "countyName": "海兴县" },
    {
      "countyCode": "130927",
      "countyName": "南皮县" },
    {
      "countyCode": "130922",
      "countyName": "青县" },
    {
      "countyCode": "130902",
      "countyName": "新华区" },
    {
      "countyCode": "130925",
      "countyName": "盐山县" },
    {
      "countyCode": "130903",
      "countyName": "运河区" },
    {
      "countyCode": "130921",
      "countyName": "沧县" },
    {
      "countyCode": "130984",
      "countyName": "河间市" },
    {
      "countyCode": "130926",
      "countyName": "肃宁县" },
    {
      "countyCode": "130982",
      "countyName": "任丘市" },
    {
      "countyCode": "130983",
      "countyName": "黄骅市" },
    {
      "countyCode": "130928",
      "countyName": "吴桥县" },
    {
      "countyCode": "130929",
      "countyName": "献县" }] },

  {
    "cityCode": "130200",
    "cityName": "唐山市",
    "county": [{
      "countyCode": "130207",
      "countyName": "丰南区" },
    {
      "countyCode": "130204",
      "countyName": "古冶区" },
    {
      "countyCode": "130224",
      "countyName": "滦南县" },
    {
      "countyCode": "130209",
      "countyName": "曹妃甸区" },
    {
      "countyCode": "130202",
      "countyName": "路南区" },
    {
      "countyCode": "130208",
      "countyName": "丰润区" },
    {
      "countyCode": "130203",
      "countyName": "路北区" },
    {
      "countyCode": "130281",
      "countyName": "遵化市" },
    {
      "countyCode": "130205",
      "countyName": "开平区" },
    {
      "countyCode": "130283",
      "countyName": "迁安市" },
    {
      "countyCode": "130227",
      "countyName": "迁西县" },
    {
      "countyCode": "130229",
      "countyName": "玉田县" },
    {
      "countyCode": "130225",
      "countyName": "乐亭县" },
    {
      "countyCode": "130223",
      "countyName": "滦州市" }] },

  {
    "cityCode": "130700",
    "cityName": "张家口市",
    "county": [{
      "countyCode": "130728",
      "countyName": "怀安县" },
    {
      "countyCode": "130723",
      "countyName": "康保县" },
    {
      "countyCode": "130702",
      "countyName": "桥东区" },
    {
      "countyCode": "130732",
      "countyName": "赤城县" },
    {
      "countyCode": "130733",
      "countyName": "崇礼区" },
    {
      "countyCode": "130727",
      "countyName": "阳原县" },
    {
      "countyCode": "130731",
      "countyName": "涿鹿县" },
    {
      "countyCode": "130705",
      "countyName": "宣化区" },
    {
      "countyCode": "130722",
      "countyName": "张北县" },
    {
      "countyCode": "130729",
      "countyName": "万全区" },
    {
      "countyCode": "130724",
      "countyName": "沽源县" },
    {
      "countyCode": "130703",
      "countyName": "桥西区" },
    {
      "countyCode": "130706",
      "countyName": "下花园区" },
    {
      "countyCode": "130730",
      "countyName": "怀来县" },
    {
      "countyCode": "130725",
      "countyName": "尚义县" },
    {
      "countyCode": "130726",
      "countyName": "蔚县" },
    {
      "countyCode": "130721",
      "countyName": "宣化县" }] },

  {
    "cityCode": "131000",
    "cityName": "廊坊市",
    "county": [{
      "countyCode": "131002",
      "countyName": "安次区" },
    {
      "countyCode": "131082",
      "countyName": "三河市" },
    {
      "countyCode": "131025",
      "countyName": "大城县" },
    {
      "countyCode": "131023",
      "countyName": "永清县" },
    {
      "countyCode": "131028",
      "countyName": "大厂回族自治县" },
    {
      "countyCode": "131022",
      "countyName": "固安县" },
    {
      "countyCode": "131003",
      "countyName": "广阳区" },
    {
      "countyCode": "131081",
      "countyName": "霸州市" },
    {
      "countyCode": "131026",
      "countyName": "文安县" },
    {
      "countyCode": "131024",
      "countyName": "香河县" }] },

  {
    "cityCode": "130300",
    "cityName": "秦皇岛市",
    "county": [{
      "countyCode": "130323",
      "countyName": "抚宁区" },
    {
      "countyCode": "130321",
      "countyName": "青龙满族自治县" },
    {
      "countyCode": "130303",
      "countyName": "山海关区" },
    {
      "countyCode": "130304",
      "countyName": "北戴河区" },
    {
      "countyCode": "130302",
      "countyName": "海港区" },
    {
      "countyCode": "130322",
      "countyName": "昌黎县" },
    {
      "countyCode": "130324",
      "countyName": "卢龙县" }] },

  {
    "cityCode": "130500",
    "cityName": "邢台市",
    "county": [{
      "countyCode": "130533",
      "countyName": "威县" },
    {
      "countyCode": "130532",
      "countyName": "平乡县" },
    {
      "countyCode": "130527",
      "countyName": "南和县" },
    {
      "countyCode": "130521",
      "countyName": "邢台县" },
    {
      "countyCode": "130524",
      "countyName": "柏乡县" },
    {
      "countyCode": "130522",
      "countyName": "临城县" },
    {
      "countyCode": "130530",
      "countyName": "新河县" },
    {
      "countyCode": "130534",
      "countyName": "清河县" },
    {
      "countyCode": "130582",
      "countyName": "沙河市" },
    {
      "countyCode": "130531",
      "countyName": "广宗县" },
    {
      "countyCode": "130525",
      "countyName": "隆尧县" },
    {
      "countyCode": "130529",
      "countyName": "巨鹿县" },
    {
      "countyCode": "130523",
      "countyName": "内丘县" },
    {
      "countyCode": "130528",
      "countyName": "宁晋县" },
    {
      "countyCode": "130526",
      "countyName": "任县" },
    {
      "countyCode": "130581",
      "countyName": "南宫市" },
    {
      "countyCode": "130535",
      "countyName": "临西县" },
    {
      "countyCode": "130502",
      "countyName": "桥东区" },
    {
      "countyCode": "130503",
      "countyName": "桥西区" }] },

  {
    "cityCode": "130100",
    "cityName": "石家庄市",
    "county": [{
      "countyCode": "130125",
      "countyName": "行唐县" },
    {
      "countyCode": "130185",
      "countyName": "鹿泉区" },
    {
      "countyCode": "130123",
      "countyName": "正定县" },
    {
      "countyCode": "130107",
      "countyName": "井陉矿区" },
    {
      "countyCode": "130102",
      "countyName": "长安区" },
    {
      "countyCode": "130184",
      "countyName": "新乐市" },
    {
      "countyCode": "130183",
      "countyName": "晋州市" },
    {
      "countyCode": "130128",
      "countyName": "深泽县" },
    {
      "countyCode": "130181",
      "countyName": "辛集市" },
    {
      "countyCode": "130124",
      "countyName": "栾城区" },
    {
      "countyCode": "130126",
      "countyName": "灵寿县" },
    {
      "countyCode": "130104",
      "countyName": "桥西区" },
    {
      "countyCode": "130130",
      "countyName": "无极县" },
    {
      "countyCode": "130108",
      "countyName": "裕华区" },
    {
      "countyCode": "130129",
      "countyName": "赞皇县" },
    {
      "countyCode": "130133",
      "countyName": "赵县" },
    {
      "countyCode": "130182",
      "countyName": "藁城区" },
    {
      "countyCode": "130127",
      "countyName": "高邑县" },
    {
      "countyCode": "130132",
      "countyName": "元氏县" },
    {
      "countyCode": "130131",
      "countyName": "平山县" },
    {
      "countyCode": "130121",
      "countyName": "井陉县" },
    {
      "countyCode": "130105",
      "countyName": "新华区" }] },

  {
    "cityCode": "130800",
    "cityName": "承德市",
    "county": [{
      "countyCode": "130803",
      "countyName": "双滦区" },
    {
      "countyCode": "130827",
      "countyName": "宽城满族自治县" },
    {
      "countyCode": "130802",
      "countyName": "双桥区" },
    {
      "countyCode": "130826",
      "countyName": "丰宁满族自治县" },
    {
      "countyCode": "130821",
      "countyName": "承德县" },
    {
      "countyCode": "130828",
      "countyName": "围场满族蒙古族自治县" },
    {
      "countyCode": "130822",
      "countyName": "兴隆县" },
    {
      "countyCode": "130825",
      "countyName": "隆化县" },
    {
      "countyCode": "130823",
      "countyName": "平泉市" },
    {
      "countyCode": "130804",
      "countyName": "鹰手营子矿区" },
    {
      "countyCode": "130824",
      "countyName": "滦平县" }] },

  {
    "cityCode": "130600",
    "cityName": "保定市",
    "county": [{
      "countyCode": "130638",
      "countyName": "雄县" },
    {
      "countyCode": "130625",
      "countyName": "徐水区" },
    {
      "countyCode": "130682",
      "countyName": "定州市" },
    {
      "countyCode": "130631",
      "countyName": "望都县" },
    {
      "countyCode": "130630",
      "countyName": "涞源县" },
    {
      "countyCode": "130621",
      "countyName": "满城区" },
    {
      "countyCode": "130626",
      "countyName": "定兴县" },
    {
      "countyCode": "130624",
      "countyName": "阜平县" },
    {
      "countyCode": "130636",
      "countyName": "顺平县" },
    {
      "countyCode": "130627",
      "countyName": "唐县" },
    {
      "countyCode": "130623",
      "countyName": "涞水县" },
    {
      "countyCode": "130629",
      "countyName": "容城县" },
    {
      "countyCode": "130634",
      "countyName": "曲阳县" },
    {
      "countyCode": "130637",
      "countyName": "博野县" },
    {
      "countyCode": "130622",
      "countyName": "清苑区" },
    {
      "countyCode": "130632",
      "countyName": "安新县" },
    {
      "countyCode": "130684",
      "countyName": "高碑店市" },
    {
      "countyCode": "130633",
      "countyName": "易县" },
    {
      "countyCode": "130628",
      "countyName": "高阳县" },
    {
      "countyCode": "130683",
      "countyName": "安国市" },
    {
      "countyCode": "130604",
      "countyName": "南市区" },
    {
      "countyCode": "130603",
      "countyName": "北市区" },
    {
      "countyCode": "130681",
      "countyName": "涿州市" },
    {
      "countyCode": "130635",
      "countyName": "蠡县" },
    {
      "countyCode": "130602",
      "countyName": "竞秀区" },
    {
      "countyCode": "130606",
      "countyName": "莲池区" }] }] },


{
  "provinceCode": "140000",
  "provinceName": "山西省",
  "city": [{
    "cityCode": "141000",
    "cityName": "临汾市",
    "county": [{
      "countyCode": "141033",
      "countyName": "蒲县" },
    {
      "countyCode": "141025",
      "countyName": "古县" },
    {
      "countyCode": "141034",
      "countyName": "汾西县" },
    {
      "countyCode": "141027",
      "countyName": "浮山县" },
    {
      "countyCode": "141021",
      "countyName": "曲沃县" },
    {
      "countyCode": "141032",
      "countyName": "永和县" },
    {
      "countyCode": "141082",
      "countyName": "霍州市" },
    {
      "countyCode": "141028",
      "countyName": "吉县" },
    {
      "countyCode": "141022",
      "countyName": "翼城县" },
    {
      "countyCode": "141030",
      "countyName": "大宁县" },
    {
      "countyCode": "141081",
      "countyName": "侯马市" },
    {
      "countyCode": "141002",
      "countyName": "尧都区" },
    {
      "countyCode": "141026",
      "countyName": "安泽县" },
    {
      "countyCode": "141024",
      "countyName": "洪洞县" },
    {
      "countyCode": "141023",
      "countyName": "襄汾县" },
    {
      "countyCode": "141029",
      "countyName": "乡宁县" },
    {
      "countyCode": "141031",
      "countyName": "隰县" }] },

  {
    "cityCode": "140200",
    "cityName": "大同市",
    "county": [{
      "countyCode": "140223",
      "countyName": "广灵县" },
    {
      "countyCode": "140203",
      "countyName": "矿区" },
    {
      "countyCode": "140212",
      "countyName": "新荣区" },
    {
      "countyCode": "140224",
      "countyName": "灵丘县" },
    {
      "countyCode": "140222",
      "countyName": "天镇县" },
    {
      "countyCode": "140213",
      "countyName": "平城区" },
    {
      "countyCode": "140227",
      "countyName": "云州区" },
    {
      "countyCode": "140202",
      "countyName": "城区" },
    {
      "countyCode": "140225",
      "countyName": "浑源县" },
    {
      "countyCode": "140221",
      "countyName": "阳高县" },
    {
      "countyCode": "140211",
      "countyName": "南郊区" },
    {
      "countyCode": "140214",
      "countyName": "云冈区" },
    {
      "countyCode": "140226",
      "countyName": "左云县" }] },

  {
    "cityCode": "140700",
    "cityName": "晋中市",
    "county": [{
      "countyCode": "140722",
      "countyName": "左权县" },
    {
      "countyCode": "140721",
      "countyName": "榆社县" },
    {
      "countyCode": "140728",
      "countyName": "平遥县" },
    {
      "countyCode": "140723",
      "countyName": "和顺县" },
    {
      "countyCode": "140726",
      "countyName": "太谷县" },
    {
      "countyCode": "140781",
      "countyName": "介休市" },
    {
      "countyCode": "140725",
      "countyName": "寿阳县" },
    {
      "countyCode": "140727",
      "countyName": "祁县" },
    {
      "countyCode": "140724",
      "countyName": "昔阳县" },
    {
      "countyCode": "140702",
      "countyName": "榆次区" },
    {
      "countyCode": "140729",
      "countyName": "灵石县" }] },

  {
    "cityCode": "140500",
    "cityName": "晋城市",
    "county": [{
      "countyCode": "140521",
      "countyName": "沁水县" },
    {
      "countyCode": "140581",
      "countyName": "高平市" },
    {
      "countyCode": "140524",
      "countyName": "陵川县" },
    {
      "countyCode": "140522",
      "countyName": "阳城县" },
    {
      "countyCode": "140525",
      "countyName": "泽州县" },
    {
      "countyCode": "140502",
      "countyName": "城区" }] },

  {
    "cityCode": "140600",
    "cityName": "朔州市",
    "county": [{
      "countyCode": "140621",
      "countyName": "山阴县" },
    {
      "countyCode": "140623",
      "countyName": "右玉县" },
    {
      "countyCode": "140603",
      "countyName": "平鲁区" },
    {
      "countyCode": "140602",
      "countyName": "朔城区" },
    {
      "countyCode": "140622",
      "countyName": "应县" },
    {
      "countyCode": "140624",
      "countyName": "怀仁市" }] },

  {
    "cityCode": "141100",
    "cityName": "吕梁市",
    "county": [{
      "countyCode": "141125",
      "countyName": "柳林县" },
    {
      "countyCode": "141127",
      "countyName": "岚县" },
    {
      "countyCode": "141122",
      "countyName": "交城县" },
    {
      "countyCode": "141128",
      "countyName": "方山县" },
    {
      "countyCode": "141129",
      "countyName": "中阳县" },
    {
      "countyCode": "141102",
      "countyName": "离石区" },
    {
      "countyCode": "141126",
      "countyName": "石楼县" },
    {
      "countyCode": "141182",
      "countyName": "汾阳市" },
    {
      "countyCode": "141130",
      "countyName": "交口县" },
    {
      "countyCode": "141124",
      "countyName": "临县" },
    {
      "countyCode": "141181",
      "countyName": "孝义市" },
    {
      "countyCode": "141123",
      "countyName": "兴县" },
    {
      "countyCode": "141121",
      "countyName": "文水县" }] },

  {
    "cityCode": "140900",
    "cityName": "忻州市",
    "county": [{
      "countyCode": "140902",
      "countyName": "忻府区" },
    {
      "countyCode": "140922",
      "countyName": "五台县" },
    {
      "countyCode": "140981",
      "countyName": "原平市" },
    {
      "countyCode": "140932",
      "countyName": "偏关县" },
    {
      "countyCode": "140927",
      "countyName": "神池县" },
    {
      "countyCode": "140925",
      "countyName": "宁武县" },
    {
      "countyCode": "140924",
      "countyName": "繁峙县" },
    {
      "countyCode": "140931",
      "countyName": "保德县" },
    {
      "countyCode": "140926",
      "countyName": "静乐县" },
    {
      "countyCode": "140930",
      "countyName": "河曲县" },
    {
      "countyCode": "140921",
      "countyName": "定襄县" },
    {
      "countyCode": "140923",
      "countyName": "代县" },
    {
      "countyCode": "140928",
      "countyName": "五寨县" },
    {
      "countyCode": "140929",
      "countyName": "岢岚县" }] },

  {
    "cityCode": "140100",
    "cityName": "太原市",
    "county": [{
      "countyCode": "140107",
      "countyName": "杏花岭区" },
    {
      "countyCode": "140109",
      "countyName": "万柏林区" },
    {
      "countyCode": "140105",
      "countyName": "小店区" },
    {
      "countyCode": "140181",
      "countyName": "古交市" },
    {
      "countyCode": "140110",
      "countyName": "晋源区" },
    {
      "countyCode": "140122",
      "countyName": "阳曲县" },
    {
      "countyCode": "140108",
      "countyName": "尖草坪区" },
    {
      "countyCode": "140121",
      "countyName": "清徐县" },
    {
      "countyCode": "140123",
      "countyName": "娄烦县" },
    {
      "countyCode": "140106",
      "countyName": "迎泽区" }] },

  {
    "cityCode": "140300",
    "cityName": "阳泉市",
    "county": [{
      "countyCode": "140302",
      "countyName": "城区" },
    {
      "countyCode": "140321",
      "countyName": "平定县" },
    {
      "countyCode": "140311",
      "countyName": "郊区" },
    {
      "countyCode": "140303",
      "countyName": "矿区" },
    {
      "countyCode": "140322",
      "countyName": "盂县" }] },

  {
    "cityCode": "140800",
    "cityName": "运城市",
    "county": [{
      "countyCode": "140802",
      "countyName": "盐湖区" },
    {
      "countyCode": "140829",
      "countyName": "平陆县" },
    {
      "countyCode": "140828",
      "countyName": "夏县" },
    {
      "countyCode": "140825",
      "countyName": "新绛县" },
    {
      "countyCode": "140830",
      "countyName": "芮城县" },
    {
      "countyCode": "140823",
      "countyName": "闻喜县" },
    {
      "countyCode": "140826",
      "countyName": "绛县" },
    {
      "countyCode": "140822",
      "countyName": "万荣县" },
    {
      "countyCode": "140821",
      "countyName": "临猗县" },
    {
      "countyCode": "140827",
      "countyName": "垣曲县" },
    {
      "countyCode": "140824",
      "countyName": "稷山县" },
    {
      "countyCode": "140881",
      "countyName": "永济市" },
    {
      "countyCode": "140882",
      "countyName": "河津市" }] },

  {
    "cityCode": "140400",
    "cityName": "长治市",
    "county": [{
      "countyCode": "140428",
      "countyName": "长子县" },
    {
      "countyCode": "140430",
      "countyName": "沁县" },
    {
      "countyCode": "140426",
      "countyName": "黎城县" },
    {
      "countyCode": "140481",
      "countyName": "潞城市" },
    {
      "countyCode": "140403",
      "countyName": "潞州区" },
    {
      "countyCode": "140402",
      "countyName": "城区" },
    {
      "countyCode": "140427",
      "countyName": "壶关县" },
    {
      "countyCode": "140429",
      "countyName": "武乡县" },
    {
      "countyCode": "140425",
      "countyName": "平顺县" },
    {
      "countyCode": "140421",
      "countyName": "长治县" },
    {
      "countyCode": "140424",
      "countyName": "屯留县" },
    {
      "countyCode": "140431",
      "countyName": "沁源县" },
    {
      "countyCode": "140411",
      "countyName": "郊区" },
    {
      "countyCode": "140423",
      "countyName": "襄垣县" }] }] },


{
  "provinceCode": "150000",
  "provinceName": "内蒙古自治区",
  "city": [{
    "cityCode": "150100",
    "cityName": "呼和浩特市",
    "county": [{
      "countyCode": "150125",
      "countyName": "武川县" },
    {
      "countyCode": "150124",
      "countyName": "清水河县" },
    {
      "countyCode": "150105",
      "countyName": "赛罕区" },
    {
      "countyCode": "150122",
      "countyName": "托克托县" },
    {
      "countyCode": "150121",
      "countyName": "土默特左旗" },
    {
      "countyCode": "150102",
      "countyName": "新城区" },
    {
      "countyCode": "150104",
      "countyName": "玉泉区" },
    {
      "countyCode": "150123",
      "countyName": "和林格尔县" },
    {
      "countyCode": "150103",
      "countyName": "回民区" }] },

  {
    "cityCode": "150300",
    "cityName": "乌海市",
    "county": [{
      "countyCode": "150303",
      "countyName": "海南区" },
    {
      "countyCode": "150302",
      "countyName": "海勃湾区" },
    {
      "countyCode": "150304",
      "countyName": "乌达区" }] },

  {
    "cityCode": "150500",
    "cityName": "通辽市",
    "county": [{
      "countyCode": "150502",
      "countyName": "科尔沁区" },
    {
      "countyCode": "150526",
      "countyName": "扎鲁特旗" },
    {
      "countyCode": "150522",
      "countyName": "科尔沁左翼后旗" },
    {
      "countyCode": "150523",
      "countyName": "开鲁县" },
    {
      "countyCode": "150524",
      "countyName": "库伦旗" },
    {
      "countyCode": "150525",
      "countyName": "奈曼旗" },
    {
      "countyCode": "150521",
      "countyName": "科尔沁左翼中旗" },
    {
      "countyCode": "150581",
      "countyName": "霍林郭勒市" }] },

  {
    "cityCode": "150400",
    "cityName": "赤峰市",
    "county": [{
      "countyCode": "150422",
      "countyName": "巴林左旗" },
    {
      "countyCode": "150429",
      "countyName": "宁城县" },
    {
      "countyCode": "150421",
      "countyName": "阿鲁科尔沁旗" },
    {
      "countyCode": "150423",
      "countyName": "巴林右旗" },
    {
      "countyCode": "150425",
      "countyName": "克什克腾旗" },
    {
      "countyCode": "150426",
      "countyName": "翁牛特旗" },
    {
      "countyCode": "150402",
      "countyName": "红山区" },
    {
      "countyCode": "150430",
      "countyName": "敖汉旗" },
    {
      "countyCode": "150428",
      "countyName": "喀喇沁旗" },
    {
      "countyCode": "150404",
      "countyName": "松山区" },
    {
      "countyCode": "150424",
      "countyName": "林西县" },
    {
      "countyCode": "150403",
      "countyName": "元宝山区" }] },

  {
    "cityCode": "150200",
    "cityName": "包头市",
    "county": [{
      "countyCode": "150203",
      "countyName": "昆都仑区" },
    {
      "countyCode": "150204",
      "countyName": "青山区" },
    {
      "countyCode": "150205",
      "countyName": "石拐区" },
    {
      "countyCode": "150221",
      "countyName": "土默特右旗" },
    {
      "countyCode": "150222",
      "countyName": "固阳县" },
    {
      "countyCode": "150223",
      "countyName": "达尔罕茂明安联合旗" },
    {
      "countyCode": "150206",
      "countyName": "白云鄂博矿区" },
    {
      "countyCode": "150202",
      "countyName": "东河区" },
    {
      "countyCode": "150207",
      "countyName": "九原区" }] },

  {
    "cityCode": "150700",
    "cityName": "呼伦贝尔市",
    "county": [{
      "countyCode": "150721",
      "countyName": "阿荣旗" },
    {
      "countyCode": "150723",
      "countyName": "鄂伦春自治旗" },
    {
      "countyCode": "150785",
      "countyName": "根河市" },
    {
      "countyCode": "150782",
      "countyName": "牙克石市" },
    {
      "countyCode": "150783",
      "countyName": "扎兰屯市" },
    {
      "countyCode": "150724",
      "countyName": "鄂温克族自治旗" },
    {
      "countyCode": "150784",
      "countyName": "额尔古纳市" },
    {
      "countyCode": "150727",
      "countyName": "新巴尔虎右旗" },
    {
      "countyCode": "150726",
      "countyName": "新巴尔虎左旗" },
    {
      "countyCode": "150702",
      "countyName": "海拉尔区" },
    {
      "countyCode": "150703",
      "countyName": "扎赉诺尔区" },
    {
      "countyCode": "150781",
      "countyName": "满洲里市" },
    {
      "countyCode": "150725",
      "countyName": "陈巴尔虎旗" },
    {
      "countyCode": "150722",
      "countyName": "莫力达瓦达斡尔族自治旗" }] },

  {
    "cityCode": "152500",
    "cityName": "锡林郭勒盟",
    "county": [{
      "countyCode": "152529",
      "countyName": "正镶白旗" },
    {
      "countyCode": "152501",
      "countyName": "二连浩特市" },
    {
      "countyCode": "152525",
      "countyName": "东乌珠穆沁旗" },
    {
      "countyCode": "152524",
      "countyName": "苏尼特右旗" },
    {
      "countyCode": "152523",
      "countyName": "苏尼特左旗" },
    {
      "countyCode": "152526",
      "countyName": "西乌珠穆沁旗" },
    {
      "countyCode": "152531",
      "countyName": "多伦县" },
    {
      "countyCode": "152528",
      "countyName": "镶黄旗" },
    {
      "countyCode": "152530",
      "countyName": "正蓝旗" },
    {
      "countyCode": "152522",
      "countyName": "阿巴嘎旗" },
    {
      "countyCode": "152502",
      "countyName": "锡林浩特市" },
    {
      "countyCode": "152527",
      "countyName": "太仆寺旗" }] },

  {
    "cityCode": "152200",
    "cityName": "兴安盟",
    "county": [{
      "countyCode": "152221",
      "countyName": "科尔沁右翼前旗" },
    {
      "countyCode": "152223",
      "countyName": "扎赉特旗" },
    {
      "countyCode": "152201",
      "countyName": "乌兰浩特市" },
    {
      "countyCode": "152224",
      "countyName": "突泉县" },
    {
      "countyCode": "152222",
      "countyName": "科尔沁右翼中旗" },
    {
      "countyCode": "152202",
      "countyName": "阿尔山市" }] },

  {
    "cityCode": "150900",
    "cityName": "乌兰察布市",
    "county": [{
      "countyCode": "150902",
      "countyName": "集宁区" },
    {
      "countyCode": "150921",
      "countyName": "卓资县" },
    {
      "countyCode": "150922",
      "countyName": "化德县" },
    {
      "countyCode": "150923",
      "countyName": "商都县" },
    {
      "countyCode": "150928",
      "countyName": "察哈尔右翼后旗" },
    {
      "countyCode": "150926",
      "countyName": "察哈尔右翼前旗" },
    {
      "countyCode": "150927",
      "countyName": "察哈尔右翼中旗" },
    {
      "countyCode": "150929",
      "countyName": "四子王旗" },
    {
      "countyCode": "150981",
      "countyName": "丰镇市" },
    {
      "countyCode": "150925",
      "countyName": "凉城县" },
    {
      "countyCode": "150924",
      "countyName": "兴和县" }] },

  {
    "cityCode": "150600",
    "cityName": "鄂尔多斯市",
    "county": [{
      "countyCode": "150624",
      "countyName": "鄂托克旗" },
    {
      "countyCode": "150621",
      "countyName": "达拉特旗" },
    {
      "countyCode": "150626",
      "countyName": "乌审旗" },
    {
      "countyCode": "150602",
      "countyName": "东胜区" },
    {
      "countyCode": "150603",
      "countyName": "康巴什区" },
    {
      "countyCode": "150623",
      "countyName": "鄂托克前旗" },
    {
      "countyCode": "150622",
      "countyName": "准格尔旗" },
    {
      "countyCode": "150625",
      "countyName": "杭锦旗" },
    {
      "countyCode": "150627",
      "countyName": "伊金霍洛旗" }] },

  {
    "cityCode": "152900",
    "cityName": "阿拉善盟",
    "county": [{
      "countyCode": "152923",
      "countyName": "额济纳旗" },
    {
      "countyCode": "152921",
      "countyName": "阿拉善左旗" },
    {
      "countyCode": "152922",
      "countyName": "阿拉善右旗" }] },

  {
    "cityCode": "150800",
    "cityName": "巴彦淖尔市",
    "county": [{
      "countyCode": "150802",
      "countyName": "临河区" },
    {
      "countyCode": "150823",
      "countyName": "乌拉特前旗" },
    {
      "countyCode": "150821",
      "countyName": "五原县" },
    {
      "countyCode": "150826",
      "countyName": "杭锦后旗" },
    {
      "countyCode": "150825",
      "countyName": "乌拉特后旗" },
    {
      "countyCode": "150824",
      "countyName": "乌拉特中旗" },
    {
      "countyCode": "150822",
      "countyName": "磴口县" }] }] },


{
  "provinceCode": "210000",
  "provinceName": "辽宁省",
  "city": [{
    "cityCode": "211200",
    "cityName": "铁岭市",
    "county": [{
      "countyCode": "211281",
      "countyName": "调兵山市" },
    {
      "countyCode": "211221",
      "countyName": "铁岭县" },
    {
      "countyCode": "211224",
      "countyName": "昌图县" },
    {
      "countyCode": "211223",
      "countyName": "西丰县" },
    {
      "countyCode": "211282",
      "countyName": "开原市" },
    {
      "countyCode": "211202",
      "countyName": "银州区" },
    {
      "countyCode": "211204",
      "countyName": "清河区" }] },

  {
    "cityCode": "210500",
    "cityName": "本溪市",
    "county": [{
      "countyCode": "210522",
      "countyName": "桓仁满族自治县" },
    {
      "countyCode": "210502",
      "countyName": "平山区" },
    {
      "countyCode": "210503",
      "countyName": "溪湖区" },
    {
      "countyCode": "210505",
      "countyName": "南芬区" },
    {
      "countyCode": "210504",
      "countyName": "明山区" },
    {
      "countyCode": "210521",
      "countyName": "本溪满族自治县" }] },

  {
    "cityCode": "211400",
    "cityName": "葫芦岛市",
    "county": [{
      "countyCode": "211421",
      "countyName": "绥中县" },
    {
      "countyCode": "211481",
      "countyName": "兴城市" },
    {
      "countyCode": "211403",
      "countyName": "龙港区" },
    {
      "countyCode": "211404",
      "countyName": "南票区" },
    {
      "countyCode": "211422",
      "countyName": "建昌县" },
    {
      "countyCode": "211402",
      "countyName": "连山区" }] },

  {
    "cityCode": "210100",
    "cityName": "沈阳市",
    "county": [{
      "countyCode": "210122",
      "countyName": "辽中区" },
    {
      "countyCode": "210104",
      "countyName": "大东区" },
    {
      "countyCode": "210105",
      "countyName": "皇姑区" },
    {
      "countyCode": "210123",
      "countyName": "康平县" },
    {
      "countyCode": "210124",
      "countyName": "法库县" },
    {
      "countyCode": "210181",
      "countyName": "新民市" },
    {
      "countyCode": "210103",
      "countyName": "沈河区" },
    {
      "countyCode": "210111",
      "countyName": "苏家屯区" },
    {
      "countyCode": "210106",
      "countyName": "铁西区" },
    {
      "countyCode": "210102",
      "countyName": "和平区" },
    {
      "countyCode": "210113",
      "countyName": "沈北新区" },
    {
      "countyCode": "210114",
      "countyName": "于洪区" },
    {
      "countyCode": "210112",
      "countyName": "浑南区" }] },

  {
    "cityCode": "210900",
    "cityName": "阜新市",
    "county": [{
      "countyCode": "210905",
      "countyName": "清河门区" },
    {
      "countyCode": "210911",
      "countyName": "细河区" },
    {
      "countyCode": "210921",
      "countyName": "阜新蒙古族自治县" },
    {
      "countyCode": "210902",
      "countyName": "海州区" },
    {
      "countyCode": "210903",
      "countyName": "新邱区" },
    {
      "countyCode": "210922",
      "countyName": "彰武县" },
    {
      "countyCode": "210904",
      "countyName": "太平区" }] },

  {
    "cityCode": "210800",
    "cityName": "营口市",
    "county": [{
      "countyCode": "210802",
      "countyName": "站前区" },
    {
      "countyCode": "210804",
      "countyName": "鲅鱼圈区" },
    {
      "countyCode": "210811",
      "countyName": "老边区" },
    {
      "countyCode": "210882",
      "countyName": "大石桥市" },
    {
      "countyCode": "210881",
      "countyName": "盖州市" },
    {
      "countyCode": "210803",
      "countyName": "西市区" }] },

  {
    "cityCode": "210300",
    "cityName": "鞍山市",
    "county": [{
      "countyCode": "210304",
      "countyName": "立山区" },
    {
      "countyCode": "210381",
      "countyName": "海城市" },
    {
      "countyCode": "210321",
      "countyName": "台安县" },
    {
      "countyCode": "210311",
      "countyName": "千山区" },
    {
      "countyCode": "210302",
      "countyName": "铁东区" },
    {
      "countyCode": "210303",
      "countyName": "铁西区" },
    {
      "countyCode": "210323",
      "countyName": "岫岩满族自治县" }] },

  {
    "cityCode": "210700",
    "cityName": "锦州市",
    "county": [{
      "countyCode": "210727",
      "countyName": "义县" },
    {
      "countyCode": "210781",
      "countyName": "凌海市" },
    {
      "countyCode": "210711",
      "countyName": "太和区" },
    {
      "countyCode": "210726",
      "countyName": "黑山县" },
    {
      "countyCode": "210782",
      "countyName": "北镇市" },
    {
      "countyCode": "210702",
      "countyName": "古塔区" },
    {
      "countyCode": "210703",
      "countyName": "凌河区" }] },

  {
    "cityCode": "210400",
    "cityName": "抚顺市",
    "county": [{
      "countyCode": "210403",
      "countyName": "东洲区" },
    {
      "countyCode": "210411",
      "countyName": "顺城区" },
    {
      "countyCode": "210404",
      "countyName": "望花区" },
    {
      "countyCode": "210402",
      "countyName": "新抚区" },
    {
      "countyCode": "210421",
      "countyName": "抚顺县" },
    {
      "countyCode": "210423",
      "countyName": "清原满族自治县" },
    {
      "countyCode": "210422",
      "countyName": "新宾满族自治县" }] },

  {
    "cityCode": "210200",
    "cityName": "大连市",
    "county": [{
      "countyCode": "210213",
      "countyName": "金州区" },
    {
      "countyCode": "210202",
      "countyName": "中山区" },
    {
      "countyCode": "210282",
      "countyName": "普兰店区" },
    {
      "countyCode": "210204",
      "countyName": "沙河口区" },
    {
      "countyCode": "210203",
      "countyName": "西岗区" },
    {
      "countyCode": "210281",
      "countyName": "瓦房店市" },
    {
      "countyCode": "210211",
      "countyName": "甘井子区" },
    {
      "countyCode": "210212",
      "countyName": "旅顺口区" },
    {
      "countyCode": "210224",
      "countyName": "长海县" },
    {
      "countyCode": "210283",
      "countyName": "庄河市" }] },

  {
    "cityCode": "211000",
    "cityName": "辽阳市",
    "county": [{
      "countyCode": "211003",
      "countyName": "文圣区" },
    {
      "countyCode": "211081",
      "countyName": "灯塔市" },
    {
      "countyCode": "211011",
      "countyName": "太子河区" },
    {
      "countyCode": "211005",
      "countyName": "弓长岭区" },
    {
      "countyCode": "211004",
      "countyName": "宏伟区" },
    {
      "countyCode": "211021",
      "countyName": "辽阳县" },
    {
      "countyCode": "211002",
      "countyName": "白塔区" }] },

  {
    "cityCode": "210600",
    "cityName": "丹东市",
    "county": [{
      "countyCode": "210603",
      "countyName": "振兴区" },
    {
      "countyCode": "210681",
      "countyName": "东港市" },
    {
      "countyCode": "210624",
      "countyName": "宽甸满族自治县" },
    {
      "countyCode": "210682",
      "countyName": "凤城市" },
    {
      "countyCode": "210604",
      "countyName": "振安区" },
    {
      "countyCode": "210602",
      "countyName": "元宝区" }] },

  {
    "cityCode": "211300",
    "cityName": "朝阳市",
    "county": [{
      "countyCode": "211382",
      "countyName": "凌源市" },
    {
      "countyCode": "211322",
      "countyName": "建平县" },
    {
      "countyCode": "211381",
      "countyName": "北票市" },
    {
      "countyCode": "211303",
      "countyName": "龙城区" },
    {
      "countyCode": "211302",
      "countyName": "双塔区" },
    {
      "countyCode": "211324",
      "countyName": "喀喇沁左翼蒙古族自治县" },
    {
      "countyCode": "211321",
      "countyName": "朝阳县" }] },

  {
    "cityCode": "211100",
    "cityName": "盘锦市",
    "county": [{
      "countyCode": "211122",
      "countyName": "盘山县" },
    {
      "countyCode": "211103",
      "countyName": "兴隆台区" },
    {
      "countyCode": "211102",
      "countyName": "双台子区" },
    {
      "countyCode": "211121",
      "countyName": "大洼区" }] }] },


{
  "provinceCode": "220000",
  "provinceName": "吉林省",
  "city": [{
    "cityCode": "220600",
    "cityName": "白山市",
    "county": [{
      "countyCode": "220621",
      "countyName": "抚松县" },
    {
      "countyCode": "220602",
      "countyName": "浑江区" },
    {
      "countyCode": "220622",
      "countyName": "靖宇县" },
    {
      "countyCode": "220605",
      "countyName": "江源区" },
    {
      "countyCode": "220681",
      "countyName": "临江市" },
    {
      "countyCode": "220623",
      "countyName": "长白朝鲜族自治县" }] },

  {
    "cityCode": "220500",
    "cityName": "通化市",
    "county": [{
      "countyCode": "220523",
      "countyName": "辉南县" },
    {
      "countyCode": "220521",
      "countyName": "通化县" },
    {
      "countyCode": "220581",
      "countyName": "梅河口市" },
    {
      "countyCode": "220502",
      "countyName": "东昌区" },
    {
      "countyCode": "220524",
      "countyName": "柳河县" },
    {
      "countyCode": "220503",
      "countyName": "二道江区" },
    {
      "countyCode": "220582",
      "countyName": "集安市" }] },

  {
    "cityCode": "220700",
    "cityName": "松原市",
    "county": [{
      "countyCode": "220722",
      "countyName": "长岭县" },
    {
      "countyCode": "220702",
      "countyName": "宁江区" },
    {
      "countyCode": "220724",
      "countyName": "扶余市" },
    {
      "countyCode": "220721",
      "countyName": "前郭尔罗斯蒙古族自治县" },
    {
      "countyCode": "220723",
      "countyName": "乾安县" }] },

  {
    "cityCode": "220800",
    "cityName": "白城市",
    "county": [{
      "countyCode": "220802",
      "countyName": "洮北区" },
    {
      "countyCode": "220821",
      "countyName": "镇赉县" },
    {
      "countyCode": "220822",
      "countyName": "通榆县" },
    {
      "countyCode": "220881",
      "countyName": "洮南市" },
    {
      "countyCode": "220882",
      "countyName": "大安市" }] },

  {
    "cityCode": "220100",
    "cityName": "长春市",
    "county": [{
      "countyCode": "220105",
      "countyName": "二道区" },
    {
      "countyCode": "220182",
      "countyName": "榆树市" },
    {
      "countyCode": "220106",
      "countyName": "绿园区" },
    {
      "countyCode": "220181",
      "countyName": "九台区" },
    {
      "countyCode": "220122",
      "countyName": "农安县" },
    {
      "countyCode": "220103",
      "countyName": "宽城区" },
    {
      "countyCode": "220102",
      "countyName": "南关区" },
    {
      "countyCode": "220104",
      "countyName": "朝阳区" },
    {
      "countyCode": "220183",
      "countyName": "德惠市" },
    {
      "countyCode": "220112",
      "countyName": "双阳区" }] },

  {
    "cityCode": "222400",
    "cityName": "延边朝鲜族自治州",
    "county": [{
      "countyCode": "222424",
      "countyName": "汪清县" },
    {
      "countyCode": "222401",
      "countyName": "延吉市" },
    {
      "countyCode": "222404",
      "countyName": "珲春市" },
    {
      "countyCode": "222405",
      "countyName": "龙井市" },
    {
      "countyCode": "222402",
      "countyName": "图们市" },
    {
      "countyCode": "222426",
      "countyName": "安图县" },
    {
      "countyCode": "222406",
      "countyName": "和龙市" },
    {
      "countyCode": "222403",
      "countyName": "敦化市" }] },

  {
    "cityCode": "220400",
    "cityName": "辽源市",
    "county": [{
      "countyCode": "220422",
      "countyName": "东辽县" },
    {
      "countyCode": "220402",
      "countyName": "龙山区" },
    {
      "countyCode": "220421",
      "countyName": "东丰县" },
    {
      "countyCode": "220403",
      "countyName": "西安区" }] },

  {
    "cityCode": "220300",
    "cityName": "四平市",
    "county": [{
      "countyCode": "220381",
      "countyName": "公主岭市" },
    {
      "countyCode": "220323",
      "countyName": "伊通满族自治县" },
    {
      "countyCode": "220322",
      "countyName": "梨树县" },
    {
      "countyCode": "220382",
      "countyName": "双辽市" },
    {
      "countyCode": "220302",
      "countyName": "铁西区" },
    {
      "countyCode": "220303",
      "countyName": "铁东区" }] },

  {
    "cityCode": "220200",
    "cityName": "吉林市",
    "county": [{
      "countyCode": "220204",
      "countyName": "船营区" },
    {
      "countyCode": "220283",
      "countyName": "舒兰市" },
    {
      "countyCode": "220282",
      "countyName": "桦甸市" },
    {
      "countyCode": "220202",
      "countyName": "昌邑区" },
    {
      "countyCode": "220281",
      "countyName": "蛟河市" },
    {
      "countyCode": "220284",
      "countyName": "磐石市" },
    {
      "countyCode": "220211",
      "countyName": "丰满区" },
    {
      "countyCode": "220203",
      "countyName": "龙潭区" },
    {
      "countyCode": "220221",
      "countyName": "永吉县" }] }] },


{
  "provinceCode": "230000",
  "provinceName": "黑龙江省",
  "city": [{
    "cityCode": "230400",
    "cityName": "鹤岗市",
    "county": [{
      "countyCode": "230406",
      "countyName": "东山区" },
    {
      "countyCode": "230407",
      "countyName": "兴山区" },
    {
      "countyCode": "230422",
      "countyName": "绥滨县" },
    {
      "countyCode": "230403",
      "countyName": "工农区" },
    {
      "countyCode": "230404",
      "countyName": "南山区" },
    {
      "countyCode": "230421",
      "countyName": "萝北县" },
    {
      "countyCode": "230402",
      "countyName": "向阳区" },
    {
      "countyCode": "230405",
      "countyName": "兴安区" }] },

  {
    "cityCode": "230700",
    "cityName": "伊春市",
    "county": [{
      "countyCode": "230708",
      "countyName": "美溪区" },
    {
      "countyCode": "230705",
      "countyName": "西林区" },
    {
      "countyCode": "230722",
      "countyName": "嘉荫县" },
    {
      "countyCode": "230709",
      "countyName": "金山屯区" },
    {
      "countyCode": "230711",
      "countyName": "乌马河区" },
    {
      "countyCode": "230707",
      "countyName": "新青区" },
    {
      "countyCode": "230702",
      "countyName": "伊春区" },
    {
      "countyCode": "230704",
      "countyName": "友好区" },
    {
      "countyCode": "230703",
      "countyName": "南岔区" },
    {
      "countyCode": "230710",
      "countyName": "五营区" },
    {
      "countyCode": "230716",
      "countyName": "上甘岭区" },
    {
      "countyCode": "230712",
      "countyName": "汤旺河区" },
    {
      "countyCode": "230781",
      "countyName": "铁力市" },
    {
      "countyCode": "230714",
      "countyName": "乌伊岭区" },
    {
      "countyCode": "230715",
      "countyName": "红星区" },
    {
      "countyCode": "230706",
      "countyName": "翠峦区" },
    {
      "countyCode": "230713",
      "countyName": "带岭区" }] },

  {
    "cityCode": "230800",
    "cityName": "佳木斯市",
    "county": [{
      "countyCode": "230881",
      "countyName": "同江市" },
    {
      "countyCode": "230805",
      "countyName": "东风区" },
    {
      "countyCode": "230811",
      "countyName": "郊区" },
    {
      "countyCode": "230882",
      "countyName": "富锦市" },
    {
      "countyCode": "230828",
      "countyName": "汤原县" },
    {
      "countyCode": "230833",
      "countyName": "抚远市" },
    {
      "countyCode": "230804",
      "countyName": "前进区" },
    {
      "countyCode": "230803",
      "countyName": "向阳区" },
    {
      "countyCode": "230826",
      "countyName": "桦川县" },
    {
      "countyCode": "230822",
      "countyName": "桦南县" }] },

  {
    "cityCode": "230200",
    "cityName": "齐齐哈尔市",
    "county": [{
      "countyCode": "230207",
      "countyName": "碾子山区" },
    {
      "countyCode": "230203",
      "countyName": "建华区" },
    {
      "countyCode": "230204",
      "countyName": "铁锋区" },
    {
      "countyCode": "230208",
      "countyName": "梅里斯达斡尔族区" },
    {
      "countyCode": "230230",
      "countyName": "克东县" },
    {
      "countyCode": "230227",
      "countyName": "富裕县" },
    {
      "countyCode": "230205",
      "countyName": "昂昂溪区" },
    {
      "countyCode": "230221",
      "countyName": "龙江县" },
    {
      "countyCode": "230206",
      "countyName": "富拉尔基区" },
    {
      "countyCode": "230223",
      "countyName": "依安县" },
    {
      "countyCode": "230225",
      "countyName": "甘南县" },
    {
      "countyCode": "230229",
      "countyName": "克山县" },
    {
      "countyCode": "230281",
      "countyName": "讷河市" },
    {
      "countyCode": "230202",
      "countyName": "龙沙区" },
    {
      "countyCode": "230231",
      "countyName": "拜泉县" },
    {
      "countyCode": "230224",
      "countyName": "泰来县" }] },

  {
    "cityCode": "230500",
    "cityName": "双鸭山市",
    "county": [{
      "countyCode": "230524",
      "countyName": "饶河县" },
    {
      "countyCode": "230506",
      "countyName": "宝山区" },
    {
      "countyCode": "230503",
      "countyName": "岭东区" },
    {
      "countyCode": "230505",
      "countyName": "四方台区" },
    {
      "countyCode": "230523",
      "countyName": "宝清县" },
    {
      "countyCode": "230521",
      "countyName": "集贤县" },
    {
      "countyCode": "230522",
      "countyName": "友谊县" },
    {
      "countyCode": "230502",
      "countyName": "尖山区" }] },

  {
    "cityCode": "230100",
    "cityName": "哈尔滨市",
    "county": [{
      "countyCode": "230109",
      "countyName": "松北区" },
    {
      "countyCode": "230127",
      "countyName": "木兰县" },
    {
      "countyCode": "230124",
      "countyName": "方正县" },
    {
      "countyCode": "230103",
      "countyName": "南岗区" },
    {
      "countyCode": "230183",
      "countyName": "尚志市" },
    {
      "countyCode": "230129",
      "countyName": "延寿县" },
    {
      "countyCode": "230126",
      "countyName": "巴彦县" },
    {
      "countyCode": "230125",
      "countyName": "宾县" },
    {
      "countyCode": "230102",
      "countyName": "道里区" },
    {
      "countyCode": "230111",
      "countyName": "呼兰区" },
    {
      "countyCode": "230112",
      "countyName": "阿城区" },
    {
      "countyCode": "230110",
      "countyName": "香坊区" },
    {
      "countyCode": "230108",
      "countyName": "平房区" },
    {
      "countyCode": "230182",
      "countyName": "双城区" },
    {
      "countyCode": "230123",
      "countyName": "依兰县" },
    {
      "countyCode": "230184",
      "countyName": "五常市" },
    {
      "countyCode": "230104",
      "countyName": "道外区" },
    {
      "countyCode": "230128",
      "countyName": "通河县" }] },

  {
    "cityCode": "231000",
    "cityName": "牡丹江市",
    "county": [{
      "countyCode": "231003",
      "countyName": "阳明区" },
    {
      "countyCode": "231005",
      "countyName": "西安区" },
    {
      "countyCode": "231025",
      "countyName": "林口县" },
    {
      "countyCode": "231024",
      "countyName": "东宁市" },
    {
      "countyCode": "231004",
      "countyName": "爱民区" },
    {
      "countyCode": "231084",
      "countyName": "宁安市" },
    {
      "countyCode": "231083",
      "countyName": "海林市" },
    {
      "countyCode": "231002",
      "countyName": "东安区" },
    {
      "countyCode": "231085",
      "countyName": "穆棱市" },
    {
      "countyCode": "231081",
      "countyName": "绥芬河市" }] },

  {
    "cityCode": "230900",
    "cityName": "七台河市",
    "county": [{
      "countyCode": "230904",
      "countyName": "茄子河区" },
    {
      "countyCode": "230921",
      "countyName": "勃利县" },
    {
      "countyCode": "230902",
      "countyName": "新兴区" },
    {
      "countyCode": "230903",
      "countyName": "桃山区" }] },

  {
    "cityCode": "231100",
    "cityName": "黑河市",
    "county": [{
      "countyCode": "231102",
      "countyName": "爱辉区" },
    {
      "countyCode": "231182",
      "countyName": "五大连池市" },
    {
      "countyCode": "231181",
      "countyName": "北安市" },
    {
      "countyCode": "231124",
      "countyName": "孙吴县" },
    {
      "countyCode": "231123",
      "countyName": "逊克县" },
    {
      "countyCode": "231121",
      "countyName": "嫩江县" }] },

  {
    "cityCode": "230600",
    "cityName": "大庆市",
    "county": [{
      "countyCode": "230605",
      "countyName": "红岗区" },
    {
      "countyCode": "230606",
      "countyName": "大同区" },
    {
      "countyCode": "230623",
      "countyName": "林甸县" },
    {
      "countyCode": "230622",
      "countyName": "肇源县" },
    {
      "countyCode": "230621",
      "countyName": "肇州县" },
    {
      "countyCode": "230624",
      "countyName": "杜尔伯特蒙古族自治县" },
    {
      "countyCode": "230603",
      "countyName": "龙凤区" },
    {
      "countyCode": "230602",
      "countyName": "萨尔图区" },
    {
      "countyCode": "230604",
      "countyName": "让胡路区" }] },

  {
    "cityCode": "232700",
    "cityName": "大兴安岭地区",
    "county": [{
      "countyCode": "232703",
      "countyName": "新林区" },
    {
      "countyCode": "232702",
      "countyName": "松岭区" },
    {
      "countyCode": "232701",
      "countyName": "加格达奇区" },
    {
      "countyCode": "232722",
      "countyName": "塔河县" },
    {
      "countyCode": "232721",
      "countyName": "呼玛县" },
    {
      "countyCode": "232704",
      "countyName": "呼中区" },
    {
      "countyCode": "232723",
      "countyName": "漠河市" }] },

  {
    "cityCode": "231200",
    "cityName": "绥化市",
    "county": [{
      "countyCode": "231281",
      "countyName": "安达市" },
    {
      "countyCode": "231224",
      "countyName": "庆安县" },
    {
      "countyCode": "231282",
      "countyName": "肇东市" },
    {
      "countyCode": "231283",
      "countyName": "海伦市" },
    {
      "countyCode": "231225",
      "countyName": "明水县" },
    {
      "countyCode": "231222",
      "countyName": "兰西县" },
    {
      "countyCode": "231223",
      "countyName": "青冈县" },
    {
      "countyCode": "231226",
      "countyName": "绥棱县" },
    {
      "countyCode": "231221",
      "countyName": "望奎县" },
    {
      "countyCode": "231202",
      "countyName": "北林区" }] },

  {
    "cityCode": "230300",
    "cityName": "鸡西市",
    "county": [{
      "countyCode": "230303",
      "countyName": "恒山区" },
    {
      "countyCode": "230302",
      "countyName": "鸡冠区" },
    {
      "countyCode": "230305",
      "countyName": "梨树区" },
    {
      "countyCode": "230321",
      "countyName": "鸡东县" },
    {
      "countyCode": "230304",
      "countyName": "滴道区" },
    {
      "countyCode": "230381",
      "countyName": "虎林市" },
    {
      "countyCode": "230307",
      "countyName": "麻山区" },
    {
      "countyCode": "230306",
      "countyName": "城子河区" },
    {
      "countyCode": "230382",
      "countyName": "密山市" }] }] },


{
  "provinceCode": "310000",
  "provinceName": "上海",
  "city": [{
    "cityCode": "310000-1",
    "cityName": "上海市",
    "county": [{
      "countyCode": "310115",
      "countyName": "浦东新区" },
    {
      "countyCode": "310110",
      "countyName": "杨浦区" },
    {
      "countyCode": "310230",
      "countyName": "崇明区" },
    {
      "countyCode": "310113",
      "countyName": "宝山区" },
    {
      "countyCode": "310114",
      "countyName": "嘉定区" },
    {
      "countyCode": "310109",
      "countyName": "虹口区" },
    {
      "countyCode": "310101",
      "countyName": "黄浦区" },
    {
      "countyCode": "310120",
      "countyName": "奉贤区" },
    {
      "countyCode": "310118",
      "countyName": "青浦区" },
    {
      "countyCode": "310112",
      "countyName": "闵行区" },
    {
      "countyCode": "310105",
      "countyName": "长宁区" },
    {
      "countyCode": "310104",
      "countyName": "徐汇区" },
    {
      "countyCode": "310117",
      "countyName": "松江区" },
    {
      "countyCode": "310106",
      "countyName": "静安区" },
    {
      "countyCode": "310107",
      "countyName": "普陀区" },
    {
      "countyCode": "310116",
      "countyName": "金山区" }] }] },


{
  "provinceCode": "340000",
  "provinceName": "安徽省",
  "city": [{
    "cityCode": "341000",
    "cityName": "黄山市",
    "county": [{
      "countyCode": "341022",
      "countyName": "休宁县" },
    {
      "countyCode": "341024",
      "countyName": "祁门县" },
    {
      "countyCode": "341021",
      "countyName": "歙县" },
    {
      "countyCode": "341003",
      "countyName": "黄山区" },
    {
      "countyCode": "341023",
      "countyName": "黟县" },
    {
      "countyCode": "341004",
      "countyName": "徽州区" },
    {
      "countyCode": "341002",
      "countyName": "屯溪区" }] },

  {
    "cityCode": "340200",
    "cityName": "芜湖市",
    "county": [{
      "countyCode": "340208",
      "countyName": "三山区" },
    {
      "countyCode": "340222",
      "countyName": "繁昌县" },
    {
      "countyCode": "340207",
      "countyName": "鸠江区" },
    {
      "countyCode": "340221",
      "countyName": "芜湖县" },
    {
      "countyCode": "340202",
      "countyName": "镜湖区" },
    {
      "countyCode": "340203",
      "countyName": "弋江区" },
    {
      "countyCode": "340225",
      "countyName": "无为县" },
    {
      "countyCode": "340223",
      "countyName": "南陵县" }] },

  {
    "cityCode": "340800",
    "cityName": "安庆市",
    "county": [{
      "countyCode": "340826",
      "countyName": "宿松县" },
    {
      "countyCode": "340824",
      "countyName": "潜山市" },
    {
      "countyCode": "340881",
      "countyName": "桐城市" },
    {
      "countyCode": "340828",
      "countyName": "岳西县" },
    {
      "countyCode": "340825",
      "countyName": "太湖县" },
    {
      "countyCode": "340811",
      "countyName": "宜秀区" },
    {
      "countyCode": "340803",
      "countyName": "大观区" },
    {
      "countyCode": "340827",
      "countyName": "望江县" },
    {
      "countyCode": "340802",
      "countyName": "迎江区" },
    {
      "countyCode": "340822",
      "countyName": "怀宁县" }] },

  {
    "cityCode": "341100",
    "cityName": "滁州市",
    "county": [{
      "countyCode": "341103",
      "countyName": "南谯区" },
    {
      "countyCode": "341102",
      "countyName": "琅琊区" },
    {
      "countyCode": "341181",
      "countyName": "天长市" },
    {
      "countyCode": "341125",
      "countyName": "定远县" },
    {
      "countyCode": "341124",
      "countyName": "全椒县" },
    {
      "countyCode": "341122",
      "countyName": "来安县" },
    {
      "countyCode": "341182",
      "countyName": "明光市" },
    {
      "countyCode": "341126",
      "countyName": "凤阳县" }] },

  {
    "cityCode": "340600",
    "cityName": "淮北市",
    "county": [{
      "countyCode": "340621",
      "countyName": "濉溪县" },
    {
      "countyCode": "340603",
      "countyName": "相山区" },
    {
      "countyCode": "340602",
      "countyName": "杜集区" },
    {
      "countyCode": "340604",
      "countyName": "烈山区" }] },

  {
    "cityCode": "340700",
    "cityName": "铜陵市",
    "county": [{
      "countyCode": "340711",
      "countyName": "郊区" },
    {
      "countyCode": "340702",
      "countyName": "铜官山区" },
    {
      "countyCode": "340823",
      "countyName": "枞阳县" },
    {
      "countyCode": "340703",
      "countyName": "铜官区" },
    {
      "countyCode": "340721",
      "countyName": "义安区" }] },

  {
    "cityCode": "340300",
    "cityName": "蚌埠市",
    "county": [{
      "countyCode": "340303",
      "countyName": "蚌山区" },
    {
      "countyCode": "340323",
      "countyName": "固镇县" },
    {
      "countyCode": "340322",
      "countyName": "五河县" },
    {
      "countyCode": "340304",
      "countyName": "禹会区" },
    {
      "countyCode": "340311",
      "countyName": "淮上区" },
    {
      "countyCode": "340302",
      "countyName": "龙子湖区" },
    {
      "countyCode": "340321",
      "countyName": "怀远县" }] },

  {
    "cityCode": "340400",
    "cityName": "淮南市",
    "county": [{
      "countyCode": "340421",
      "countyName": "凤台县" },
    {
      "countyCode": "341521",
      "countyName": "寿县" },
    {
      "countyCode": "340403",
      "countyName": "田家庵区" },
    {
      "countyCode": "340404",
      "countyName": "谢家集区" },
    {
      "countyCode": "340406",
      "countyName": "潘集区" },
    {
      "countyCode": "340405",
      "countyName": "八公山区" },
    {
      "countyCode": "340402",
      "countyName": "大通区" }] },

  {
    "cityCode": "341300",
    "cityName": "宿州市",
    "county": [{
      "countyCode": "341321",
      "countyName": "砀山县" },
    {
      "countyCode": "341322",
      "countyName": "萧县" },
    {
      "countyCode": "341324",
      "countyName": "泗县" },
    {
      "countyCode": "341323",
      "countyName": "灵璧县" },
    {
      "countyCode": "341302",
      "countyName": "埇桥区" }] },

  {
    "cityCode": "341700",
    "cityName": "池州市",
    "county": [{
      "countyCode": "341723",
      "countyName": "青阳县" },
    {
      "countyCode": "341722",
      "countyName": "石台县" },
    {
      "countyCode": "341721",
      "countyName": "东至县" },
    {
      "countyCode": "341702",
      "countyName": "贵池区" }] },

  {
    "cityCode": "340500",
    "cityName": "马鞍山市",
    "county": [{
      "countyCode": "340522",
      "countyName": "含山县" },
    {
      "countyCode": "340503",
      "countyName": "花山区" },
    {
      "countyCode": "340506",
      "countyName": "博望区" },
    {
      "countyCode": "340523",
      "countyName": "和县" },
    {
      "countyCode": "340521",
      "countyName": "当涂县" },
    {
      "countyCode": "340504",
      "countyName": "雨山区" }] },

  {
    "cityCode": "341200",
    "cityName": "阜阳市",
    "county": [{
      "countyCode": "341222",
      "countyName": "太和县" },
    {
      "countyCode": "341226",
      "countyName": "颍上县" },
    {
      "countyCode": "341221",
      "countyName": "临泉县" },
    {
      "countyCode": "341204",
      "countyName": "颍泉区" },
    {
      "countyCode": "341225",
      "countyName": "阜南县" },
    {
      "countyCode": "341282",
      "countyName": "界首市" },
    {
      "countyCode": "341203",
      "countyName": "颍东区" },
    {
      "countyCode": "341202",
      "countyName": "颍州区" }] },

  {
    "cityCode": "341600",
    "cityName": "亳州市",
    "county": [{
      "countyCode": "341621",
      "countyName": "涡阳县" },
    {
      "countyCode": "341623",
      "countyName": "利辛县" },
    {
      "countyCode": "341602",
      "countyName": "谯城区" },
    {
      "countyCode": "341622",
      "countyName": "蒙城县" }] },

  {
    "cityCode": "341800",
    "cityName": "宣城市",
    "county": [{
      "countyCode": "341881",
      "countyName": "宁国市" },
    {
      "countyCode": "341822",
      "countyName": "广德县" },
    {
      "countyCode": "341821",
      "countyName": "郎溪县" },
    {
      "countyCode": "341823",
      "countyName": "泾县" },
    {
      "countyCode": "341825",
      "countyName": "旌德县" },
    {
      "countyCode": "341802",
      "countyName": "宣州区" },
    {
      "countyCode": "341824",
      "countyName": "绩溪县" }] },

  {
    "cityCode": "340100",
    "cityName": "合肥市",
    "county": [{
      "countyCode": "340181",
      "countyName": "巢湖市" },
    {
      "countyCode": "340104",
      "countyName": "蜀山区" },
    {
      "countyCode": "340122",
      "countyName": "肥东县" },
    {
      "countyCode": "340111",
      "countyName": "包河区" },
    {
      "countyCode": "340102",
      "countyName": "瑶海区" },
    {
      "countyCode": "340123",
      "countyName": "肥西县" },
    {
      "countyCode": "340124",
      "countyName": "庐江县" },
    {
      "countyCode": "340121",
      "countyName": "长丰县" },
    {
      "countyCode": "340103",
      "countyName": "庐阳区" }] },

  {
    "cityCode": "341500",
    "cityName": "六安市",
    "county": [{
      "countyCode": "341525",
      "countyName": "霍山县" },
    {
      "countyCode": "341502",
      "countyName": "金安区" },
    {
      "countyCode": "341503",
      "countyName": "裕安区" },
    {
      "countyCode": "341522",
      "countyName": "霍邱县" },
    {
      "countyCode": "341504",
      "countyName": "叶集区" },
    {
      "countyCode": "341523",
      "countyName": "舒城县" },
    {
      "countyCode": "341524",
      "countyName": "金寨县" }] }] },


{
  "provinceCode": "350000",
  "provinceName": "福建省",
  "city": [{
    "cityCode": "350200",
    "cityName": "厦门市",
    "county": [{
      "countyCode": "350206",
      "countyName": "湖里区" },
    {
      "countyCode": "350212",
      "countyName": "同安区" },
    {
      "countyCode": "350203",
      "countyName": "思明区" },
    {
      "countyCode": "350213",
      "countyName": "翔安区" },
    {
      "countyCode": "350205",
      "countyName": "海沧区" },
    {
      "countyCode": "350211",
      "countyName": "集美区" }] },

  {
    "cityCode": "350800",
    "cityName": "龙岩市",
    "county": [{
      "countyCode": "350881",
      "countyName": "漳平市" },
    {
      "countyCode": "350825",
      "countyName": "连城县" },
    {
      "countyCode": "350821",
      "countyName": "长汀县" },
    {
      "countyCode": "350802",
      "countyName": "新罗区" },
    {
      "countyCode": "350823",
      "countyName": "上杭县" },
    {
      "countyCode": "350822",
      "countyName": "永定区" },
    {
      "countyCode": "350824",
      "countyName": "武平县" }] },

  {
    "cityCode": "350100",
    "cityName": "福州市",
    "county": [{
      "countyCode": "350124",
      "countyName": "闽清县" },
    {
      "countyCode": "350103",
      "countyName": "台江区" },
    {
      "countyCode": "350121",
      "countyName": "闽侯县" },
    {
      "countyCode": "350182",
      "countyName": "长乐区" },
    {
      "countyCode": "350125",
      "countyName": "永泰县" },
    {
      "countyCode": "350111",
      "countyName": "晋安区" },
    {
      "countyCode": "350123",
      "countyName": "罗源县" },
    {
      "countyCode": "350102",
      "countyName": "鼓楼区" },
    {
      "countyCode": "350105",
      "countyName": "马尾区" },
    {
      "countyCode": "350104",
      "countyName": "仓山区" },
    {
      "countyCode": "350128",
      "countyName": "平潭县" },
    {
      "countyCode": "350181",
      "countyName": "福清市" },
    {
      "countyCode": "350122",
      "countyName": "连江县" }] },

  {
    "cityCode": "350700",
    "cityName": "南平市",
    "county": [{
      "countyCode": "350724",
      "countyName": "松溪县" },
    {
      "countyCode": "350783",
      "countyName": "建瓯市" },
    {
      "countyCode": "350725",
      "countyName": "政和县" },
    {
      "countyCode": "350723",
      "countyName": "光泽县" },
    {
      "countyCode": "350721",
      "countyName": "顺昌县" },
    {
      "countyCode": "350781",
      "countyName": "邵武市" },
    {
      "countyCode": "350782",
      "countyName": "武夷山市" },
    {
      "countyCode": "350722",
      "countyName": "浦城县" },
    {
      "countyCode": "350784",
      "countyName": "建阳区" },
    {
      "countyCode": "350702",
      "countyName": "延平区" }] },

  {
    "cityCode": "350900",
    "cityName": "宁德市",
    "county": [{
      "countyCode": "350922",
      "countyName": "古田县" },
    {
      "countyCode": "350924",
      "countyName": "寿宁县" },
    {
      "countyCode": "350902",
      "countyName": "蕉城区" },
    {
      "countyCode": "350926",
      "countyName": "柘荣县" },
    {
      "countyCode": "350925",
      "countyName": "周宁县" },
    {
      "countyCode": "350982",
      "countyName": "福鼎市" },
    {
      "countyCode": "350923",
      "countyName": "屏南县" },
    {
      "countyCode": "350981",
      "countyName": "福安市" },
    {
      "countyCode": "350921",
      "countyName": "霞浦县" }] },

  {
    "cityCode": "350500",
    "cityName": "泉州市",
    "county": [{
      "countyCode": "350526",
      "countyName": "德化县" },
    {
      "countyCode": "350582",
      "countyName": "晋江市" },
    {
      "countyCode": "350583",
      "countyName": "南安市" },
    {
      "countyCode": "350503",
      "countyName": "丰泽区" },
    {
      "countyCode": "350581",
      "countyName": "石狮市" },
    {
      "countyCode": "350525",
      "countyName": "永春县" },
    {
      "countyCode": "350521",
      "countyName": "惠安县" },
    {
      "countyCode": "350524",
      "countyName": "安溪县" },
    {
      "countyCode": "350502",
      "countyName": "鲤城区" },
    {
      "countyCode": "350505",
      "countyName": "泉港区" },
    {
      "countyCode": "350527",
      "countyName": "金门县" },
    {
      "countyCode": "350504",
      "countyName": "洛江区" }] },

  {
    "cityCode": "350400",
    "cityName": "三明市",
    "county": [{
      "countyCode": "350421",
      "countyName": "明溪县" },
    {
      "countyCode": "350403",
      "countyName": "三元区" },
    {
      "countyCode": "350423",
      "countyName": "清流县" },
    {
      "countyCode": "350426",
      "countyName": "尤溪县" },
    {
      "countyCode": "350481",
      "countyName": "永安市" },
    {
      "countyCode": "350424",
      "countyName": "宁化县" },
    {
      "countyCode": "350425",
      "countyName": "大田县" },
    {
      "countyCode": "350427",
      "countyName": "沙县" },
    {
      "countyCode": "350430",
      "countyName": "建宁县" },
    {
      "countyCode": "350428",
      "countyName": "将乐县" },
    {
      "countyCode": "350402",
      "countyName": "梅列区" },
    {
      "countyCode": "350429",
      "countyName": "泰宁县" }] },

  {
    "cityCode": "350300",
    "cityName": "莆田市",
    "county": [{
      "countyCode": "350322",
      "countyName": "仙游县" },
    {
      "countyCode": "350303",
      "countyName": "涵江区" },
    {
      "countyCode": "350304",
      "countyName": "荔城区" },
    {
      "countyCode": "350302",
      "countyName": "城厢区" },
    {
      "countyCode": "350305",
      "countyName": "秀屿区" }] },

  {
    "cityCode": "350600",
    "cityName": "漳州市",
    "county": [{
      "countyCode": "350629",
      "countyName": "华安县" },
    {
      "countyCode": "350623",
      "countyName": "漳浦县" },
    {
      "countyCode": "350602",
      "countyName": "芗城区" },
    {
      "countyCode": "350625",
      "countyName": "长泰县" },
    {
      "countyCode": "350603",
      "countyName": "龙文区" },
    {
      "countyCode": "350622",
      "countyName": "云霄县" },
    {
      "countyCode": "350628",
      "countyName": "平和县" },
    {
      "countyCode": "350627",
      "countyName": "南靖县" },
    {
      "countyCode": "350681",
      "countyName": "龙海市" },
    {
      "countyCode": "350624",
      "countyName": "诏安县" },
    {
      "countyCode": "350626",
      "countyName": "东山县" }] }] },


{
  "provinceCode": "360000",
  "provinceName": "江西省",
  "city": [{
    "cityCode": "361000",
    "cityName": "抚州市",
    "county": [{
      "countyCode": "361002",
      "countyName": "临川区" },
    {
      "countyCode": "361023",
      "countyName": "南丰县" },
    {
      "countyCode": "361026",
      "countyName": "宜黄县" },
    {
      "countyCode": "361028",
      "countyName": "资溪县" },
    {
      "countyCode": "361029",
      "countyName": "东乡区" },
    {
      "countyCode": "361027",
      "countyName": "金溪县" },
    {
      "countyCode": "361022",
      "countyName": "黎川县" },
    {
      "countyCode": "361021",
      "countyName": "南城县" },
    {
      "countyCode": "361025",
      "countyName": "乐安县" },
    {
      "countyCode": "361024",
      "countyName": "崇仁县" },
    {
      "countyCode": "361030",
      "countyName": "广昌县" }] },

  {
    "cityCode": "360900",
    "cityName": "宜春市",
    "county": [{
      "countyCode": "360981",
      "countyName": "丰城市" },
    {
      "countyCode": "360902",
      "countyName": "袁州区" },
    {
      "countyCode": "360921",
      "countyName": "奉新县" },
    {
      "countyCode": "360983",
      "countyName": "高安市" },
    {
      "countyCode": "360922",
      "countyName": "万载县" },
    {
      "countyCode": "360926",
      "countyName": "铜鼓县" },
    {
      "countyCode": "360923",
      "countyName": "上高县" },
    {
      "countyCode": "360924",
      "countyName": "宜丰县" },
    {
      "countyCode": "360925",
      "countyName": "靖安县" },
    {
      "countyCode": "360982",
      "countyName": "樟树市" }] },

  {
    "cityCode": "360100",
    "cityName": "南昌市",
    "county": [{
      "countyCode": "360104",
      "countyName": "青云谱区" },
    {
      "countyCode": "360105",
      "countyName": "湾里区" },
    {
      "countyCode": "360124",
      "countyName": "进贤县" },
    {
      "countyCode": "360102",
      "countyName": "东湖区" },
    {
      "countyCode": "360123",
      "countyName": "安义县" },
    {
      "countyCode": "360122",
      "countyName": "新建区" },
    {
      "countyCode": "360121",
      "countyName": "南昌县" },
    {
      "countyCode": "360111",
      "countyName": "青山湖区" },
    {
      "countyCode": "360103",
      "countyName": "西湖区" }] },

  {
    "cityCode": "360700",
    "cityName": "赣州市",
    "county": [{
      "countyCode": "360725",
      "countyName": "崇义县" },
    {
      "countyCode": "360727",
      "countyName": "龙南县" },
    {
      "countyCode": "360728",
      "countyName": "定南县" },
    {
      "countyCode": "360723",
      "countyName": "大余县" },
    {
      "countyCode": "360734",
      "countyName": "寻乌县" },
    {
      "countyCode": "360702",
      "countyName": "章贡区" },
    {
      "countyCode": "360726",
      "countyName": "安远县" },
    {
      "countyCode": "360729",
      "countyName": "全南县" },
    {
      "countyCode": "360735",
      "countyName": "石城县" },
    {
      "countyCode": "360782",
      "countyName": "南康区" },
    {
      "countyCode": "360721",
      "countyName": "赣县区" },
    {
      "countyCode": "360732",
      "countyName": "兴国县" },
    {
      "countyCode": "360781",
      "countyName": "瑞金市" },
    {
      "countyCode": "360724",
      "countyName": "上犹县" },
    {
      "countyCode": "360730",
      "countyName": "宁都县" },
    {
      "countyCode": "360733",
      "countyName": "会昌县" },
    {
      "countyCode": "360722",
      "countyName": "信丰县" },
    {
      "countyCode": "360731",
      "countyName": "于都县" }] },

  {
    "cityCode": "360200",
    "cityName": "景德镇市",
    "county": [{
      "countyCode": "360222",
      "countyName": "浮梁县" },
    {
      "countyCode": "360281",
      "countyName": "乐平市" },
    {
      "countyCode": "360202",
      "countyName": "昌江区" },
    {
      "countyCode": "360203",
      "countyName": "珠山区" }] },

  {
    "cityCode": "360800",
    "cityName": "吉安市",
    "county": [{
      "countyCode": "360829",
      "countyName": "安福县" },
    {
      "countyCode": "360821",
      "countyName": "吉安县" },
    {
      "countyCode": "360827",
      "countyName": "遂川县" },
    {
      "countyCode": "360803",
      "countyName": "青原区" },
    {
      "countyCode": "360828",
      "countyName": "万安县" },
    {
      "countyCode": "360826",
      "countyName": "泰和县" },
    {
      "countyCode": "360823",
      "countyName": "峡江县" },
    {
      "countyCode": "360822",
      "countyName": "吉水县" },
    {
      "countyCode": "360802",
      "countyName": "吉州区" },
    {
      "countyCode": "360824",
      "countyName": "新干县" },
    {
      "countyCode": "360830",
      "countyName": "永新县" },
    {
      "countyCode": "360881",
      "countyName": "井冈山市" },
    {
      "countyCode": "360825",
      "countyName": "永丰县" }] },

  {
    "cityCode": "360400",
    "cityName": "九江市",
    "county": [{
      "countyCode": "360423",
      "countyName": "武宁县" },
    {
      "countyCode": "360421",
      "countyName": "柴桑区" },
    {
      "countyCode": "360429",
      "countyName": "湖口县" },
    {
      "countyCode": "360427",
      "countyName": "庐山市" },
    {
      "countyCode": "360426",
      "countyName": "德安县" },
    {
      "countyCode": "360428",
      "countyName": "都昌县" },
    {
      "countyCode": "360430",
      "countyName": "彭泽县" },
    {
      "countyCode": "360403",
      "countyName": "浔阳区" },
    {
      "countyCode": "360402",
      "countyName": "濂溪区" },
    {
      "countyCode": "360424",
      "countyName": "修水县" },
    {
      "countyCode": "360481",
      "countyName": "瑞昌市" },
    {
      "countyCode": "360425",
      "countyName": "永修县" },
    {
      "countyCode": "360482",
      "countyName": "共青城市" }] },

  {
    "cityCode": "360600",
    "cityName": "鹰潭市",
    "county": [{
      "countyCode": "360602",
      "countyName": "月湖区" },
    {
      "countyCode": "360622",
      "countyName": "余江区" },
    {
      "countyCode": "360681",
      "countyName": "贵溪市" }] },

  {
    "cityCode": "360500",
    "cityName": "新余市",
    "county": [{
      "countyCode": "360521",
      "countyName": "分宜县" },
    {
      "countyCode": "360502",
      "countyName": "渝水区" }] },

  {
    "cityCode": "361100",
    "cityName": "上饶市",
    "county": [{
      "countyCode": "361181",
      "countyName": "德兴市" },
    {
      "countyCode": "361102",
      "countyName": "信州区" },
    {
      "countyCode": "361130",
      "countyName": "婺源县" },
    {
      "countyCode": "361128",
      "countyName": "鄱阳县" },
    {
      "countyCode": "361129",
      "countyName": "万年县" },
    {
      "countyCode": "361123",
      "countyName": "玉山县" },
    {
      "countyCode": "361122",
      "countyName": "广丰区" },
    {
      "countyCode": "361124",
      "countyName": "铅山县" },
    {
      "countyCode": "361121",
      "countyName": "上饶县" },
    {
      "countyCode": "361127",
      "countyName": "余干县" },
    {
      "countyCode": "361126",
      "countyName": "弋阳县" },
    {
      "countyCode": "361125",
      "countyName": "横峰县" }] },

  {
    "cityCode": "360300",
    "cityName": "萍乡市",
    "county": [{
      "countyCode": "360322",
      "countyName": "上栗县" },
    {
      "countyCode": "360313",
      "countyName": "湘东区" },
    {
      "countyCode": "360302",
      "countyName": "安源区" },
    {
      "countyCode": "360323",
      "countyName": "芦溪县" },
    {
      "countyCode": "360321",
      "countyName": "莲花县" }] }] },


{
  "provinceCode": "370000",
  "provinceName": "山东省",
  "city": [{
    "cityCode": "370400",
    "cityName": "枣庄市",
    "county": [{
      "countyCode": "370402",
      "countyName": "市中区" },
    {
      "countyCode": "370481",
      "countyName": "滕州市" },
    {
      "countyCode": "370406",
      "countyName": "山亭区" },
    {
      "countyCode": "370405",
      "countyName": "台儿庄区" },
    {
      "countyCode": "370403",
      "countyName": "薛城区" },
    {
      "countyCode": "370404",
      "countyName": "峄城区" }] },

  {
    "cityCode": "371100",
    "cityName": "日照市",
    "county": [{
      "countyCode": "371121",
      "countyName": "五莲县" },
    {
      "countyCode": "371102",
      "countyName": "东港区" },
    {
      "countyCode": "371122",
      "countyName": "莒县" },
    {
      "countyCode": "371103",
      "countyName": "岚山区" }] },

  {
    "cityCode": "371700",
    "cityName": "菏泽市",
    "county": [{
      "countyCode": "371722",
      "countyName": "单县" },
    {
      "countyCode": "371724",
      "countyName": "巨野县" },
    {
      "countyCode": "371721",
      "countyName": "曹县" },
    {
      "countyCode": "371702",
      "countyName": "牡丹区" },
    {
      "countyCode": "371727",
      "countyName": "定陶区" },
    {
      "countyCode": "371728",
      "countyName": "东明县" },
    {
      "countyCode": "371723",
      "countyName": "成武县" },
    {
      "countyCode": "371725",
      "countyName": "郓城县" },
    {
      "countyCode": "371726",
      "countyName": "鄄城县" }] },

  {
    "cityCode": "371500",
    "cityName": "聊城市",
    "county": [{
      "countyCode": "371524",
      "countyName": "东阿县" },
    {
      "countyCode": "371521",
      "countyName": "阳谷县" },
    {
      "countyCode": "371526",
      "countyName": "高唐县" },
    {
      "countyCode": "371502",
      "countyName": "东昌府区" },
    {
      "countyCode": "371581",
      "countyName": "临清市" },
    {
      "countyCode": "371522",
      "countyName": "莘县" },
    {
      "countyCode": "371525",
      "countyName": "冠县" },
    {
      "countyCode": "371523",
      "countyName": "茌平县" }] },

  {
    "cityCode": "371000",
    "cityName": "威海市",
    "county": [{
      "countyCode": "371002",
      "countyName": "环翠区" },
    {
      "countyCode": "371083",
      "countyName": "乳山市" },
    {
      "countyCode": "371082",
      "countyName": "荣成市" },
    {
      "countyCode": "371081",
      "countyName": "文登区" }] },

  {
    "cityCode": "370300",
    "cityName": "淄博市",
    "county": [{
      "countyCode": "370322",
      "countyName": "高青县" },
    {
      "countyCode": "370321",
      "countyName": "桓台县" },
    {
      "countyCode": "370305",
      "countyName": "临淄区" },
    {
      "countyCode": "370306",
      "countyName": "周村区" },
    {
      "countyCode": "370323",
      "countyName": "沂源县" },
    {
      "countyCode": "370304",
      "countyName": "博山区" },
    {
      "countyCode": "370302",
      "countyName": "淄川区" },
    {
      "countyCode": "370303",
      "countyName": "张店区" }] },

  {
    "cityCode": "370800",
    "cityName": "济宁市",
    "county": [{
      "countyCode": "370811",
      "countyName": "任城区" },
    {
      "countyCode": "370802",
      "countyName": "市中区" },
    {
      "countyCode": "370882",
      "countyName": "兖州区" },
    {
      "countyCode": "370830",
      "countyName": "汶上县" },
    {
      "countyCode": "370883",
      "countyName": "邹城市" },
    {
      "countyCode": "370828",
      "countyName": "金乡县" },
    {
      "countyCode": "370829",
      "countyName": "嘉祥县" },
    {
      "countyCode": "370826",
      "countyName": "微山县" },
    {
      "countyCode": "370881",
      "countyName": "曲阜市" },
    {
      "countyCode": "370827",
      "countyName": "鱼台县" },
    {
      "countyCode": "370831",
      "countyName": "泗水县" },
    {
      "countyCode": "370832",
      "countyName": "梁山县" }] },

  {
    "cityCode": "371200",
    "cityName": "莱芜市",
    "county": [{
      "countyCode": "371202",
      "countyName": "莱城区" },
    {
      "countyCode": "371203",
      "countyName": "钢城区" }] },

  {
    "cityCode": "370500",
    "cityName": "东营市",
    "county": [{
      "countyCode": "370523",
      "countyName": "广饶县" },
    {
      "countyCode": "370521",
      "countyName": "垦利区" },
    {
      "countyCode": "370502",
      "countyName": "东营区" },
    {
      "countyCode": "370522",
      "countyName": "利津县" },
    {
      "countyCode": "370503",
      "countyName": "河口区" }] },

  {
    "cityCode": "371600",
    "cityName": "滨州市",
    "county": [{
      "countyCode": "371625",
      "countyName": "博兴县" },
    {
      "countyCode": "371622",
      "countyName": "阳信县" },
    {
      "countyCode": "371621",
      "countyName": "惠民县" },
    {
      "countyCode": "371626",
      "countyName": "邹平市" },
    {
      "countyCode": "371602",
      "countyName": "滨城区" },
    {
      "countyCode": "371623",
      "countyName": "无棣县" },
    {
      "countyCode": "371624",
      "countyName": "沾化区" }] },

  {
    "cityCode": "371300",
    "cityName": "临沂市",
    "county": [{
      "countyCode": "371328",
      "countyName": "蒙阴县" },
    {
      "countyCode": "371302",
      "countyName": "兰山区" },
    {
      "countyCode": "371329",
      "countyName": "临沭县" },
    {
      "countyCode": "371321",
      "countyName": "沂南县" },
    {
      "countyCode": "371311",
      "countyName": "罗庄区" },
    {
      "countyCode": "371325",
      "countyName": "费县" },
    {
      "countyCode": "371326",
      "countyName": "平邑县" },
    {
      "countyCode": "371327",
      "countyName": "莒南县" },
    {
      "countyCode": "371312",
      "countyName": "河东区" },
    {
      "countyCode": "371324",
      "countyName": "兰陵县" },
    {
      "countyCode": "371323",
      "countyName": "沂水县" },
    {
      "countyCode": "371322",
      "countyName": "郯城县" }] },

  {
    "cityCode": "370200",
    "cityName": "青岛市",
    "county": [{
      "countyCode": "370211",
      "countyName": "黄岛区" },
    {
      "countyCode": "370203",
      "countyName": "市北区" },
    {
      "countyCode": "370281",
      "countyName": "胶州市" },
    {
      "countyCode": "370212",
      "countyName": "崂山区" },
    {
      "countyCode": "370202",
      "countyName": "市南区" },
    {
      "countyCode": "370282",
      "countyName": "即墨区" },
    {
      "countyCode": "370205",
      "countyName": "四方区" },
    {
      "countyCode": "370214",
      "countyName": "城阳区" },
    {
      "countyCode": "370283",
      "countyName": "平度市" },
    {
      "countyCode": "370213",
      "countyName": "李沧区" },
    {
      "countyCode": "370285",
      "countyName": "莱西市" }] },

  {
    "cityCode": "370100",
    "cityName": "济南市",
    "county": [{
      "countyCode": "370124",
      "countyName": "平阴县" },
    {
      "countyCode": "370103",
      "countyName": "市中区" },
    {
      "countyCode": "370181",
      "countyName": "章丘区" },
    {
      "countyCode": "370126",
      "countyName": "商河县" },
    {
      "countyCode": "370125",
      "countyName": "济阳区" },
    {
      "countyCode": "370113",
      "countyName": "长清区" },
    {
      "countyCode": "370102",
      "countyName": "历下区" },
    {
      "countyCode": "370112",
      "countyName": "历城区" },
    {
      "countyCode": "370105",
      "countyName": "天桥区" },
    {
      "countyCode": "370104",
      "countyName": "槐荫区" }] },

  {
    "cityCode": "371400",
    "cityName": "德州市",
    "county": [{
      "countyCode": "371481",
      "countyName": "乐陵市" },
    {
      "countyCode": "371423",
      "countyName": "庆云县" },
    {
      "countyCode": "371421",
      "countyName": "陵城区" },
    {
      "countyCode": "371482",
      "countyName": "禹城市" },
    {
      "countyCode": "371424",
      "countyName": "临邑县" },
    {
      "countyCode": "371426",
      "countyName": "平原县" },
    {
      "countyCode": "371425",
      "countyName": "齐河县" },
    {
      "countyCode": "371427",
      "countyName": "夏津县" },
    {
      "countyCode": "371422",
      "countyName": "宁津县" },
    {
      "countyCode": "371428",
      "countyName": "武城县" },
    {
      "countyCode": "371402",
      "countyName": "德城区" }] },

  {
    "cityCode": "370900",
    "cityName": "泰安市",
    "county": [{
      "countyCode": "370911",
      "countyName": "岱岳区" },
    {
      "countyCode": "370923",
      "countyName": "东平县" },
    {
      "countyCode": "370983",
      "countyName": "肥城市" },
    {
      "countyCode": "370921",
      "countyName": "宁阳县" },
    {
      "countyCode": "370982",
      "countyName": "新泰市" },
    {
      "countyCode": "370902",
      "countyName": "泰山区" }] },

  {
    "cityCode": "370600",
    "cityName": "烟台市",
    "county": [{
      "countyCode": "370686",
      "countyName": "栖霞市" },
    {
      "countyCode": "370634",
      "countyName": "长岛县" },
    {
      "countyCode": "370613",
      "countyName": "莱山区" },
    {
      "countyCode": "370612",
      "countyName": "牟平区" },
    {
      "countyCode": "370681",
      "countyName": "龙口市" },
    {
      "countyCode": "370683",
      "countyName": "莱州市" },
    {
      "countyCode": "370602",
      "countyName": "芝罘区" },
    {
      "countyCode": "370682",
      "countyName": "莱阳市" },
    {
      "countyCode": "370685",
      "countyName": "招远市" },
    {
      "countyCode": "370611",
      "countyName": "福山区" },
    {
      "countyCode": "370684",
      "countyName": "蓬莱市" },
    {
      "countyCode": "370687",
      "countyName": "海阳市" }] },

  {
    "cityCode": "370700",
    "cityName": "潍坊市",
    "county": [{
      "countyCode": "370781",
      "countyName": "青州市" },
    {
      "countyCode": "370782",
      "countyName": "诸城市" },
    {
      "countyCode": "370703",
      "countyName": "寒亭区" },
    {
      "countyCode": "370785",
      "countyName": "高密市" },
    {
      "countyCode": "370702",
      "countyName": "潍城区" },
    {
      "countyCode": "370725",
      "countyName": "昌乐县" },
    {
      "countyCode": "370704",
      "countyName": "坊子区" },
    {
      "countyCode": "370784",
      "countyName": "安丘市" },
    {
      "countyCode": "370705",
      "countyName": "奎文区" },
    {
      "countyCode": "370724",
      "countyName": "临朐县" },
    {
      "countyCode": "370786",
      "countyName": "昌邑市" },
    {
      "countyCode": "370783",
      "countyName": "寿光市" }] }] },


{
  "provinceCode": "410000",
  "provinceName": "河南省",
  "city": [{
    "cityCode": "411500",
    "cityName": "信阳市",
    "county": [{
      "countyCode": "411523",
      "countyName": "新县" },
    {
      "countyCode": "411525",
      "countyName": "固始县" },
    {
      "countyCode": "411524",
      "countyName": "商城县" },
    {
      "countyCode": "411528",
      "countyName": "息县" },
    {
      "countyCode": "411502",
      "countyName": "浉河区" },
    {
      "countyCode": "411521",
      "countyName": "罗山县" },
    {
      "countyCode": "411522",
      "countyName": "光山县" },
    {
      "countyCode": "411503",
      "countyName": "平桥区" },
    {
      "countyCode": "411526",
      "countyName": "潢川县" },
    {
      "countyCode": "411527",
      "countyName": "淮滨县" }] },

  {
    "cityCode": "410300",
    "cityName": "洛阳市",
    "county": [{
      "countyCode": "410323",
      "countyName": "新安县" },
    {
      "countyCode": "410306",
      "countyName": "吉利区" },
    {
      "countyCode": "410328",
      "countyName": "洛宁县" },
    {
      "countyCode": "410325",
      "countyName": "嵩县" },
    {
      "countyCode": "410302",
      "countyName": "老城区" },
    {
      "countyCode": "410322",
      "countyName": "孟津县" },
    {
      "countyCode": "410311",
      "countyName": "洛龙区" },
    {
      "countyCode": "410304",
      "countyName": "瀍河回族区" },
    {
      "countyCode": "410327",
      "countyName": "宜阳县" },
    {
      "countyCode": "410381",
      "countyName": "偃师市" },
    {
      "countyCode": "410326",
      "countyName": "汝阳县" },
    {
      "countyCode": "410329",
      "countyName": "伊川县" },
    {
      "countyCode": "410305",
      "countyName": "涧西区" },
    {
      "countyCode": "410324",
      "countyName": "栾川县" },
    {
      "countyCode": "410303",
      "countyName": "西工区" }] },

  {
    "cityCode": "411200",
    "cityName": "三门峡市",
    "county": [{
      "countyCode": "411222",
      "countyName": "陕州区" },
    {
      "countyCode": "411281",
      "countyName": "义马市" },
    {
      "countyCode": "411282",
      "countyName": "灵宝市" },
    {
      "countyCode": "411221",
      "countyName": "渑池县" },
    {
      "countyCode": "411202",
      "countyName": "湖滨区" },
    {
      "countyCode": "411224",
      "countyName": "卢氏县" }] },

  {
    "cityCode": "411700",
    "cityName": "驻马店市",
    "county": [{
      "countyCode": "411729",
      "countyName": "新蔡县" },
    {
      "countyCode": "411728",
      "countyName": "遂平县" },
    {
      "countyCode": "411727",
      "countyName": "汝南县" },
    {
      "countyCode": "411724",
      "countyName": "正阳县" },
    {
      "countyCode": "411723",
      "countyName": "平舆县" },
    {
      "countyCode": "411725",
      "countyName": "确山县" },
    {
      "countyCode": "411722",
      "countyName": "上蔡县" },
    {
      "countyCode": "411702",
      "countyName": "驿城区" },
    {
      "countyCode": "411721",
      "countyName": "西平县" },
    {
      "countyCode": "411726",
      "countyName": "泌阳县" }] },

  {
    "cityCode": "410500",
    "cityName": "安阳市",
    "county": [{
      "countyCode": "410505",
      "countyName": "殷都区" },
    {
      "countyCode": "410527",
      "countyName": "内黄县" },
    {
      "countyCode": "410522",
      "countyName": "安阳县" },
    {
      "countyCode": "410526",
      "countyName": "滑县" },
    {
      "countyCode": "410502",
      "countyName": "文峰区" },
    {
      "countyCode": "410503",
      "countyName": "北关区" },
    {
      "countyCode": "410506",
      "countyName": "龙安区" },
    {
      "countyCode": "410523",
      "countyName": "汤阴县" },
    {
      "countyCode": "410581",
      "countyName": "林州市" }] },

  {
    "cityCode": "411300",
    "cityName": "南阳市",
    "county": [{
      "countyCode": "411325",
      "countyName": "内乡县" },
    {
      "countyCode": "411328",
      "countyName": "唐河县" },
    {
      "countyCode": "411381",
      "countyName": "邓州市" },
    {
      "countyCode": "411322",
      "countyName": "方城县" },
    {
      "countyCode": "411330",
      "countyName": "桐柏县" },
    {
      "countyCode": "411321",
      "countyName": "南召县" },
    {
      "countyCode": "411323",
      "countyName": "西峡县" },
    {
      "countyCode": "411327",
      "countyName": "社旗县" },
    {
      "countyCode": "411302",
      "countyName": "宛城区" },
    {
      "countyCode": "411303",
      "countyName": "卧龙区" },
    {
      "countyCode": "411326",
      "countyName": "淅川县" },
    {
      "countyCode": "411329",
      "countyName": "新野县" },
    {
      "countyCode": "411324",
      "countyName": "镇平县" }] },

  {
    "cityCode": "410700",
    "cityName": "新乡市",
    "county": [{
      "countyCode": "410711",
      "countyName": "牧野区" },
    {
      "countyCode": "410721",
      "countyName": "新乡县" },
    {
      "countyCode": "410704",
      "countyName": "凤泉区" },
    {
      "countyCode": "410781",
      "countyName": "卫辉市" },
    {
      "countyCode": "410727",
      "countyName": "封丘县" },
    {
      "countyCode": "410702",
      "countyName": "红旗区" },
    {
      "countyCode": "410726",
      "countyName": "延津县" },
    {
      "countyCode": "410703",
      "countyName": "卫滨区" },
    {
      "countyCode": "410782",
      "countyName": "辉县市" },
    {
      "countyCode": "410728",
      "countyName": "长垣县" },
    {
      "countyCode": "410724",
      "countyName": "获嘉县" },
    {
      "countyCode": "410725",
      "countyName": "原阳县" }] },

  {
    "cityCode": "410200",
    "cityName": "开封市",
    "county": [{
      "countyCode": "410205",
      "countyName": "禹王台区" },
    {
      "countyCode": "410222",
      "countyName": "通许县" },
    {
      "countyCode": "410225",
      "countyName": "兰考县" },
    {
      "countyCode": "410223",
      "countyName": "尉氏县" },
    {
      "countyCode": "410203",
      "countyName": "顺河回族区" },
    {
      "countyCode": "410204",
      "countyName": "鼓楼区" },
    {
      "countyCode": "410224",
      "countyName": "祥符区" },
    {
      "countyCode": "410221",
      "countyName": "杞县" },
    {
      "countyCode": "410211",
      "countyName": "金明区" },
    {
      "countyCode": "410202",
      "countyName": "龙亭区" }] },

  {
    "cityCode": "411400",
    "cityName": "商丘市",
    "county": [{
      "countyCode": "411402",
      "countyName": "梁园区" },
    {
      "countyCode": "411422",
      "countyName": "睢县" },
    {
      "countyCode": "411423",
      "countyName": "宁陵县" },
    {
      "countyCode": "411421",
      "countyName": "民权县" },
    {
      "countyCode": "411424",
      "countyName": "柘城县" },
    {
      "countyCode": "411425",
      "countyName": "虞城县" },
    {
      "countyCode": "411426",
      "countyName": "夏邑县" },
    {
      "countyCode": "411481",
      "countyName": "永城市" },
    {
      "countyCode": "411403",
      "countyName": "睢阳区" }] },

  {
    "cityCode": "411000",
    "cityName": "许昌市",
    "county": [{
      "countyCode": "411024",
      "countyName": "鄢陵县" },
    {
      "countyCode": "411082",
      "countyName": "长葛市" },
    {
      "countyCode": "411002",
      "countyName": "魏都区" },
    {
      "countyCode": "411081",
      "countyName": "禹州市" },
    {
      "countyCode": "411025",
      "countyName": "襄城县" },
    {
      "countyCode": "411023",
      "countyName": "建安区" }] },

  {
    "cityCode": "410100",
    "cityName": "郑州市",
    "county": [{
      "countyCode": "410185",
      "countyName": "登封市" },
    {
      "countyCode": "410182",
      "countyName": "荥阳市" },
    {
      "countyCode": "410104",
      "countyName": "管城回族区" },
    {
      "countyCode": "410108",
      "countyName": "惠济区" },
    {
      "countyCode": "410122",
      "countyName": "中牟县" },
    {
      "countyCode": "410105",
      "countyName": "金水区" },
    {
      "countyCode": "410183",
      "countyName": "新密市" },
    {
      "countyCode": "410184",
      "countyName": "新郑市" },
    {
      "countyCode": "410181",
      "countyName": "巩义市" },
    {
      "countyCode": "410106",
      "countyName": "上街区" },
    {
      "countyCode": "410103",
      "countyName": "二七区" },
    {
      "countyCode": "410102",
      "countyName": "中原区" }] },

  {
    "cityCode": "419001",
    "cityName": "济源市",
    "county": [{
      "countyCode": "419001-1",
      "countyName": "济源市" }] },

  {
    "cityCode": "410400",
    "cityName": "平顶山市",
    "county": [{
      "countyCode": "410481",
      "countyName": "舞钢市" },
    {
      "countyCode": "410421",
      "countyName": "宝丰县" },
    {
      "countyCode": "410482",
      "countyName": "汝州市" },
    {
      "countyCode": "410404",
      "countyName": "石龙区" },
    {
      "countyCode": "410403",
      "countyName": "卫东区" },
    {
      "countyCode": "410411",
      "countyName": "湛河区" },
    {
      "countyCode": "410402",
      "countyName": "新华区" },
    {
      "countyCode": "410423",
      "countyName": "鲁山县" },
    {
      "countyCode": "410422",
      "countyName": "叶县" },
    {
      "countyCode": "410425",
      "countyName": "郏县" }] },

  {
    "cityCode": "410900",
    "cityName": "濮阳市",
    "county": [{
      "countyCode": "410902",
      "countyName": "华龙区" },
    {
      "countyCode": "410922",
      "countyName": "清丰县" },
    {
      "countyCode": "410926",
      "countyName": "范县" },
    {
      "countyCode": "410927",
      "countyName": "台前县" },
    {
      "countyCode": "410923",
      "countyName": "南乐县" },
    {
      "countyCode": "410928",
      "countyName": "濮阳县" }] },

  {
    "cityCode": "410600",
    "cityName": "鹤壁市",
    "county": [{
      "countyCode": "410603",
      "countyName": "山城区" },
    {
      "countyCode": "410611",
      "countyName": "淇滨区" },
    {
      "countyCode": "410602",
      "countyName": "鹤山区" },
    {
      "countyCode": "410621",
      "countyName": "浚县" },
    {
      "countyCode": "410622",
      "countyName": "淇县" }] },

  {
    "cityCode": "411100",
    "cityName": "漯河市",
    "county": [{
      "countyCode": "411102",
      "countyName": "源汇区" },
    {
      "countyCode": "411122",
      "countyName": "临颍县" },
    {
      "countyCode": "411103",
      "countyName": "郾城区" },
    {
      "countyCode": "411104",
      "countyName": "召陵区" },
    {
      "countyCode": "411121",
      "countyName": "舞阳县" }] },

  {
    "cityCode": "411600",
    "cityName": "周口市",
    "county": [{
      "countyCode": "411626",
      "countyName": "淮阳县" },
    {
      "countyCode": "411681",
      "countyName": "项城市" },
    {
      "countyCode": "411624",
      "countyName": "沈丘县" },
    {
      "countyCode": "411622",
      "countyName": "西华县" },
    {
      "countyCode": "411627",
      "countyName": "太康县" },
    {
      "countyCode": "411623",
      "countyName": "商水县" },
    {
      "countyCode": "411628",
      "countyName": "鹿邑县" },
    {
      "countyCode": "411602",
      "countyName": "川汇区" },
    {
      "countyCode": "411621",
      "countyName": "扶沟县" },
    {
      "countyCode": "411625",
      "countyName": "郸城县" }] },

  {
    "cityCode": "410800",
    "cityName": "焦作市",
    "county": [{
      "countyCode": "410883",
      "countyName": "孟州市" },
    {
      "countyCode": "410823",
      "countyName": "武陟县" },
    {
      "countyCode": "410882",
      "countyName": "沁阳市" },
    {
      "countyCode": "410822",
      "countyName": "博爱县" },
    {
      "countyCode": "410821",
      "countyName": "修武县" },
    {
      "countyCode": "410825",
      "countyName": "温县" },
    {
      "countyCode": "410804",
      "countyName": "马村区" },
    {
      "countyCode": "410802",
      "countyName": "解放区" },
    {
      "countyCode": "410811",
      "countyName": "山阳区" },
    {
      "countyCode": "410803",
      "countyName": "中站区" }] }] },


{
  "provinceCode": "420000",
  "provinceName": "湖北省",
  "city": [{
    "cityCode": "429004",
    "cityName": "仙桃市",
    "county": [{
      "countyCode": "429004-1",
      "countyName": "仙桃市" }] },

  {
    "cityCode": "421200",
    "cityName": "咸宁市",
    "county": [{
      "countyCode": "421223",
      "countyName": "崇阳县" },
    {
      "countyCode": "421224",
      "countyName": "通山县" },
    {
      "countyCode": "421202",
      "countyName": "咸安区" },
    {
      "countyCode": "421222",
      "countyName": "通城县" },
    {
      "countyCode": "421221",
      "countyName": "嘉鱼县" },
    {
      "countyCode": "421281",
      "countyName": "赤壁市" }] },

  {
    "cityCode": "421300",
    "cityName": "随州市",
    "county": [{
      "countyCode": "421381",
      "countyName": "广水市" },
    {
      "countyCode": "421303",
      "countyName": "曾都区" },
    {
      "countyCode": "421321",
      "countyName": "随县" }] },

  {
    "cityCode": "422800",
    "cityName": "恩施土家族苗族自治州",
    "county": [{
      "countyCode": "422828",
      "countyName": "鹤峰县" },
    {
      "countyCode": "422825",
      "countyName": "宣恩县" },
    {
      "countyCode": "422801",
      "countyName": "恩施市" },
    {
      "countyCode": "422822",
      "countyName": "建始县" },
    {
      "countyCode": "422823",
      "countyName": "巴东县" },
    {
      "countyCode": "422826",
      "countyName": "咸丰县" },
    {
      "countyCode": "422827",
      "countyName": "来凤县" },
    {
      "countyCode": "422802",
      "countyName": "利川市" }] },

  {
    "cityCode": "420900",
    "cityName": "孝感市",
    "county": [{
      "countyCode": "420902",
      "countyName": "孝南区" },
    {
      "countyCode": "420981",
      "countyName": "应城市" },
    {
      "countyCode": "420923",
      "countyName": "云梦县" },
    {
      "countyCode": "420982",
      "countyName": "安陆市" },
    {
      "countyCode": "420922",
      "countyName": "大悟县" },
    {
      "countyCode": "420921",
      "countyName": "孝昌县" },
    {
      "countyCode": "420984",
      "countyName": "汉川市" }] },

  {
    "cityCode": "420100",
    "cityName": "武汉市",
    "county": [{
      "countyCode": "420104",
      "countyName": "硚口区" },
    {
      "countyCode": "420107",
      "countyName": "青山区" },
    {
      "countyCode": "420116",
      "countyName": "黄陂区" },
    {
      "countyCode": "420102",
      "countyName": "江岸区" },
    {
      "countyCode": "420115",
      "countyName": "江夏区" },
    {
      "countyCode": "420114",
      "countyName": "蔡甸区" },
    {
      "countyCode": "420106",
      "countyName": "武昌区" },
    {
      "countyCode": "420112",
      "countyName": "东西湖区" },
    {
      "countyCode": "420105",
      "countyName": "汉阳区" },
    {
      "countyCode": "420113",
      "countyName": "汉南区" },
    {
      "countyCode": "420111",
      "countyName": "洪山区" },
    {
      "countyCode": "420103",
      "countyName": "江汉区" },
    {
      "countyCode": "420117",
      "countyName": "新洲区" }] },

  {
    "cityCode": "420500",
    "cityName": "宜昌市",
    "county": [{
      "countyCode": "420502",
      "countyName": "西陵区" },
    {
      "countyCode": "420505",
      "countyName": "猇亭区" },
    {
      "countyCode": "420503",
      "countyName": "伍家岗区" },
    {
      "countyCode": "420581",
      "countyName": "宜都市" },
    {
      "countyCode": "420504",
      "countyName": "点军区" },
    {
      "countyCode": "420526",
      "countyName": "兴山县" },
    {
      "countyCode": "420525",
      "countyName": "远安县" },
    {
      "countyCode": "420527",
      "countyName": "秭归县" },
    {
      "countyCode": "420583",
      "countyName": "枝江市" },
    {
      "countyCode": "420529",
      "countyName": "五峰土家族自治县" },
    {
      "countyCode": "420582",
      "countyName": "当阳市" },
    {
      "countyCode": "420506",
      "countyName": "夷陵区" },
    {
      "countyCode": "420528",
      "countyName": "长阳土家族自治县" }] },

  {
    "cityCode": "420800",
    "cityName": "荆门市",
    "county": [{
      "countyCode": "420804",
      "countyName": "掇刀区" },
    {
      "countyCode": "420822",
      "countyName": "沙洋县" },
    {
      "countyCode": "420802",
      "countyName": "东宝区" },
    {
      "countyCode": "420881",
      "countyName": "钟祥市" },
    {
      "countyCode": "420821",
      "countyName": "京山市" }] },

  {
    "cityCode": "429006",
    "cityName": "天门市",
    "county": [{
      "countyCode": "429006-1",
      "countyName": "天门市" }] },

  {
    "cityCode": "421000",
    "cityName": "荆州市",
    "county": [{
      "countyCode": "421003",
      "countyName": "荆州区" },
    {
      "countyCode": "421023",
      "countyName": "监利县" },
    {
      "countyCode": "421087",
      "countyName": "松滋市" },
    {
      "countyCode": "421022",
      "countyName": "公安县" },
    {
      "countyCode": "421002",
      "countyName": "沙市区" },
    {
      "countyCode": "421024",
      "countyName": "江陵县" },
    {
      "countyCode": "421081",
      "countyName": "石首市" },
    {
      "countyCode": "421083",
      "countyName": "洪湖市" }] },

  {
    "cityCode": "420600",
    "cityName": "襄阳市",
    "county": [{
      "countyCode": "420625",
      "countyName": "谷城县" },
    {
      "countyCode": "420607",
      "countyName": "襄州区" },
    {
      "countyCode": "420606",
      "countyName": "樊城区" },
    {
      "countyCode": "420602",
      "countyName": "襄城区" },
    {
      "countyCode": "420626",
      "countyName": "保康县" },
    {
      "countyCode": "420624",
      "countyName": "南漳县" },
    {
      "countyCode": "420683",
      "countyName": "枣阳市" },
    {
      "countyCode": "420682",
      "countyName": "老河口市" },
    {
      "countyCode": "420684",
      "countyName": "宜城市" }] },

  {
    "cityCode": "420700",
    "cityName": "鄂州市",
    "county": [{
      "countyCode": "420702",
      "countyName": "梁子湖区" },
    {
      "countyCode": "420703",
      "countyName": "华容区" },
    {
      "countyCode": "420704",
      "countyName": "鄂城区" }] },

  {
    "cityCode": "429021",
    "cityName": "神农架林区",
    "county": [{
      "countyCode": "429021-1",
      "countyName": "神农架林区" }] },

  {
    "cityCode": "420200",
    "cityName": "黄石市",
    "county": [{
      "countyCode": "420202",
      "countyName": "黄石港区" },
    {
      "countyCode": "420281",
      "countyName": "大冶市" },
    {
      "countyCode": "420205",
      "countyName": "铁山区" },
    {
      "countyCode": "420222",
      "countyName": "阳新县" },
    {
      "countyCode": "420203",
      "countyName": "西塞山区" },
    {
      "countyCode": "420204",
      "countyName": "下陆区" }] },

  {
    "cityCode": "421100",
    "cityName": "黄冈市",
    "county": [{
      "countyCode": "421181",
      "countyName": "麻城市" },
    {
      "countyCode": "421125",
      "countyName": "浠水县" },
    {
      "countyCode": "421121",
      "countyName": "团风县" },
    {
      "countyCode": "421182",
      "countyName": "武穴市" },
    {
      "countyCode": "421124",
      "countyName": "英山县" },
    {
      "countyCode": "421122",
      "countyName": "红安县" },
    {
      "countyCode": "421102",
      "countyName": "黄州区" },
    {
      "countyCode": "421123",
      "countyName": "罗田县" },
    {
      "countyCode": "421126",
      "countyName": "蕲春县" },
    {
      "countyCode": "421127",
      "countyName": "黄梅县" }] },

  {
    "cityCode": "420300",
    "cityName": "十堰市",
    "county": [{
      "countyCode": "420322",
      "countyName": "郧西县" },
    {
      "countyCode": "420321",
      "countyName": "郧阳区" },
    {
      "countyCode": "420323",
      "countyName": "竹山县" },
    {
      "countyCode": "420324",
      "countyName": "竹溪县" },
    {
      "countyCode": "420325",
      "countyName": "房县" },
    {
      "countyCode": "420302",
      "countyName": "茅箭区" },
    {
      "countyCode": "420303",
      "countyName": "张湾区" },
    {
      "countyCode": "420381",
      "countyName": "丹江口市" }] },

  {
    "cityCode": "429005",
    "cityName": "潜江市",
    "county": [{
      "countyCode": "429005-1",
      "countyName": "潜江市" }] }] },


{
  "provinceCode": "430000",
  "provinceName": "湖南省",
  "city": [{
    "cityCode": "430300",
    "cityName": "湘潭市",
    "county": [{
      "countyCode": "430381",
      "countyName": "湘乡市" },
    {
      "countyCode": "430302",
      "countyName": "雨湖区" },
    {
      "countyCode": "430382",
      "countyName": "韶山市" },
    {
      "countyCode": "430321",
      "countyName": "湘潭县" },
    {
      "countyCode": "430304",
      "countyName": "岳塘区" }] },

  {
    "cityCode": "430600",
    "cityName": "岳阳市",
    "county": [{
      "countyCode": "430623",
      "countyName": "华容县" },
    {
      "countyCode": "430682",
      "countyName": "临湘市" },
    {
      "countyCode": "430603",
      "countyName": "云溪区" },
    {
      "countyCode": "430681",
      "countyName": "汨罗市" },
    {
      "countyCode": "430624",
      "countyName": "湘阴县" },
    {
      "countyCode": "430602",
      "countyName": "岳阳楼区" },
    {
      "countyCode": "430626",
      "countyName": "平江县" },
    {
      "countyCode": "430611",
      "countyName": "君山区" },
    {
      "countyCode": "430621",
      "countyName": "岳阳县" }] },

  {
    "cityCode": "430100",
    "cityName": "长沙市",
    "county": [{
      "countyCode": "430111",
      "countyName": "雨花区" },
    {
      "countyCode": "430103",
      "countyName": "天心区" },
    {
      "countyCode": "430104",
      "countyName": "岳麓区" },
    {
      "countyCode": "430181",
      "countyName": "浏阳市" },
    {
      "countyCode": "430124",
      "countyName": "宁乡市" },
    {
      "countyCode": "430112",
      "countyName": "望城区" },
    {
      "countyCode": "430121",
      "countyName": "长沙县" },
    {
      "countyCode": "430105",
      "countyName": "开福区" },
    {
      "countyCode": "430102",
      "countyName": "芙蓉区" }] },

  {
    "cityCode": "430200",
    "cityName": "株洲市",
    "county": [{
      "countyCode": "430202",
      "countyName": "荷塘区" },
    {
      "countyCode": "430225",
      "countyName": "炎陵县" },
    {
      "countyCode": "430281",
      "countyName": "醴陵市" },
    {
      "countyCode": "430203",
      "countyName": "芦淞区" },
    {
      "countyCode": "430224",
      "countyName": "茶陵县" },
    {
      "countyCode": "430211",
      "countyName": "天元区" },
    {
      "countyCode": "430221",
      "countyName": "株洲县" },
    {
      "countyCode": "430223",
      "countyName": "攸县" },
    {
      "countyCode": "430204",
      "countyName": "石峰区" }] },

  {
    "cityCode": "431000",
    "cityName": "郴州市",
    "county": [{
      "countyCode": "431028",
      "countyName": "安仁县" },
    {
      "countyCode": "431021",
      "countyName": "桂阳县" },
    {
      "countyCode": "431002",
      "countyName": "北湖区" },
    {
      "countyCode": "431027",
      "countyName": "桂东县" },
    {
      "countyCode": "431024",
      "countyName": "嘉禾县" },
    {
      "countyCode": "431026",
      "countyName": "汝城县" },
    {
      "countyCode": "431023",
      "countyName": "永兴县" },
    {
      "countyCode": "431025",
      "countyName": "临武县" },
    {
      "countyCode": "431022",
      "countyName": "宜章县" },
    {
      "countyCode": "431003",
      "countyName": "苏仙区" },
    {
      "countyCode": "431081",
      "countyName": "资兴市" }] },

  {
    "cityCode": "431200",
    "cityName": "怀化市",
    "county": [{
      "countyCode": "431223",
      "countyName": "辰溪县" },
    {
      "countyCode": "431202",
      "countyName": "鹤城区" },
    {
      "countyCode": "431224",
      "countyName": "溆浦县" },
    {
      "countyCode": "431226",
      "countyName": "麻阳苗族自治县" },
    {
      "countyCode": "431229",
      "countyName": "靖州苗族侗族自治县" },
    {
      "countyCode": "431230",
      "countyName": "通道侗族自治县" },
    {
      "countyCode": "431281",
      "countyName": "洪江市" },
    {
      "countyCode": "431228",
      "countyName": "芷江侗族自治县" },
    {
      "countyCode": "431221",
      "countyName": "中方县" },
    {
      "countyCode": "431225",
      "countyName": "会同县" },
    {
      "countyCode": "431227",
      "countyName": "新晃侗族自治县" },
    {
      "countyCode": "431222",
      "countyName": "沅陵县" }] },

  {
    "cityCode": "431100",
    "cityName": "永州市",
    "county": [{
      "countyCode": "431123",
      "countyName": "双牌县" },
    {
      "countyCode": "431125",
      "countyName": "江永县" },
    {
      "countyCode": "431102",
      "countyName": "零陵区" },
    {
      "countyCode": "431129",
      "countyName": "江华瑶族自治县" },
    {
      "countyCode": "431124",
      "countyName": "道县" },
    {
      "countyCode": "431127",
      "countyName": "蓝山县" },
    {
      "countyCode": "431103",
      "countyName": "冷水滩区" },
    {
      "countyCode": "431122",
      "countyName": "东安县" },
    {
      "countyCode": "431128",
      "countyName": "新田县" },
    {
      "countyCode": "431121",
      "countyName": "祁阳县" },
    {
      "countyCode": "431126",
      "countyName": "宁远县" }] },

  {
    "cityCode": "430700",
    "cityName": "常德市",
    "county": [{
      "countyCode": "430703",
      "countyName": "鼎城区" },
    {
      "countyCode": "430725",
      "countyName": "桃源县" },
    {
      "countyCode": "430724",
      "countyName": "临澧县" },
    {
      "countyCode": "430781",
      "countyName": "津市市" },
    {
      "countyCode": "430702",
      "countyName": "武陵区" },
    {
      "countyCode": "430721",
      "countyName": "安乡县" },
    {
      "countyCode": "430726",
      "countyName": "石门县" },
    {
      "countyCode": "430722",
      "countyName": "汉寿县" },
    {
      "countyCode": "430723",
      "countyName": "澧县" }] },

  {
    "cityCode": "431300",
    "cityName": "娄底市",
    "county": [{
      "countyCode": "431322",
      "countyName": "新化县" },
    {
      "countyCode": "431302",
      "countyName": "娄星区" },
    {
      "countyCode": "431321",
      "countyName": "双峰县" },
    {
      "countyCode": "431381",
      "countyName": "冷水江市" },
    {
      "countyCode": "431382",
      "countyName": "涟源市" }] },

  {
    "cityCode": "430800",
    "cityName": "张家界市",
    "county": [{
      "countyCode": "430821",
      "countyName": "慈利县" },
    {
      "countyCode": "430822",
      "countyName": "桑植县" },
    {
      "countyCode": "430802",
      "countyName": "永定区" },
    {
      "countyCode": "430811",
      "countyName": "武陵源区" }] },

  {
    "cityCode": "430400",
    "cityName": "衡阳市",
    "county": [{
      "countyCode": "430423",
      "countyName": "衡山县" },
    {
      "countyCode": "430408",
      "countyName": "蒸湘区" },
    {
      "countyCode": "430405",
      "countyName": "珠晖区" },
    {
      "countyCode": "430481",
      "countyName": "耒阳市" },
    {
      "countyCode": "430422",
      "countyName": "衡南县" },
    {
      "countyCode": "430426",
      "countyName": "祁东县" },
    {
      "countyCode": "430407",
      "countyName": "石鼓区" },
    {
      "countyCode": "430482",
      "countyName": "常宁市" },
    {
      "countyCode": "430424",
      "countyName": "衡东县" },
    {
      "countyCode": "430406",
      "countyName": "雁峰区" },
    {
      "countyCode": "430421",
      "countyName": "衡阳县" },
    {
      "countyCode": "430412",
      "countyName": "南岳区" }] },

  {
    "cityCode": "430500",
    "cityName": "邵阳市",
    "county": [{
      "countyCode": "430524",
      "countyName": "隆回县" },
    {
      "countyCode": "430503",
      "countyName": "大祥区" },
    {
      "countyCode": "430528",
      "countyName": "新宁县" },
    {
      "countyCode": "430529",
      "countyName": "城步苗族自治县" },
    {
      "countyCode": "430581",
      "countyName": "武冈市" },
    {
      "countyCode": "430502",
      "countyName": "双清区" },
    {
      "countyCode": "430523",
      "countyName": "邵阳县" },
    {
      "countyCode": "430522",
      "countyName": "新邵县" },
    {
      "countyCode": "430521",
      "countyName": "邵东县" },
    {
      "countyCode": "430525",
      "countyName": "洞口县" },
    {
      "countyCode": "430511",
      "countyName": "北塔区" },
    {
      "countyCode": "430527",
      "countyName": "绥宁县" }] },

  {
    "cityCode": "433100",
    "cityName": "湘西土家族苗族自治州",
    "county": [{
      "countyCode": "433123",
      "countyName": "凤凰县" },
    {
      "countyCode": "433126",
      "countyName": "古丈县" },
    {
      "countyCode": "433125",
      "countyName": "保靖县" },
    {
      "countyCode": "433124",
      "countyName": "花垣县" },
    {
      "countyCode": "433127",
      "countyName": "永顺县" },
    {
      "countyCode": "433122",
      "countyName": "泸溪县" },
    {
      "countyCode": "433101",
      "countyName": "吉首市" },
    {
      "countyCode": "433130",
      "countyName": "龙山县" }] },

  {
    "cityCode": "430900",
    "cityName": "益阳市",
    "county": [{
      "countyCode": "430923",
      "countyName": "安化县" },
    {
      "countyCode": "430921",
      "countyName": "南县" },
    {
      "countyCode": "430902",
      "countyName": "资阳区" },
    {
      "countyCode": "430981",
      "countyName": "沅江市" },
    {
      "countyCode": "430903",
      "countyName": "赫山区" },
    {
      "countyCode": "430922",
      "countyName": "桃江县" }] }] },


{
  "provinceCode": "450000",
  "provinceName": "广西壮族自治区",
  "city": [{
    "cityCode": "450400",
    "cityName": "梧州市",
    "county": [{
      "countyCode": "450481",
      "countyName": "岑溪市" },
    {
      "countyCode": "450423",
      "countyName": "蒙山县" },
    {
      "countyCode": "450421",
      "countyName": "苍梧县" },
    {
      "countyCode": "450422",
      "countyName": "藤县" },
    {
      "countyCode": "450403",
      "countyName": "万秀区" },
    {
      "countyCode": "450405",
      "countyName": "长洲区" },
    {
      "countyCode": "450424",
      "countyName": "龙圩区" },
    {
      "countyCode": "450404",
      "countyName": "蝶山区" }] },

  {
    "cityCode": "450500",
    "cityName": "北海市",
    "county": [{
      "countyCode": "450521",
      "countyName": "合浦县" },
    {
      "countyCode": "450512",
      "countyName": "铁山港区" },
    {
      "countyCode": "450502",
      "countyName": "海城区" },
    {
      "countyCode": "450503",
      "countyName": "银海区" }] },

  {
    "cityCode": "450300",
    "cityName": "桂林市",
    "county": [{
      "countyCode": "450327",
      "countyName": "灌阳县" },
    {
      "countyCode": "450305",
      "countyName": "七星区" },
    {
      "countyCode": "450326",
      "countyName": "永福县" },
    {
      "countyCode": "450325",
      "countyName": "兴安县" },
    {
      "countyCode": "450321",
      "countyName": "阳朔县" },
    {
      "countyCode": "450332",
      "countyName": "恭城瑶族自治县" },
    {
      "countyCode": "450302",
      "countyName": "秀峰区" },
    {
      "countyCode": "450304",
      "countyName": "象山区" },
    {
      "countyCode": "450330",
      "countyName": "平乐县" },
    {
      "countyCode": "450331",
      "countyName": "荔浦县" },
    {
      "countyCode": "450329",
      "countyName": "资源县" },
    {
      "countyCode": "450323",
      "countyName": "灵川县" },
    {
      "countyCode": "450324",
      "countyName": "全州县" },
    {
      "countyCode": "450322",
      "countyName": "临桂区" },
    {
      "countyCode": "450303",
      "countyName": "叠彩区" },
    {
      "countyCode": "450311",
      "countyName": "雁山区" },
    {
      "countyCode": "450328",
      "countyName": "龙胜各族自治县" }] },

  {
    "cityCode": "451100",
    "cityName": "贺州市",
    "county": [{
      "countyCode": "451121",
      "countyName": "昭平县" },
    {
      "countyCode": "451122",
      "countyName": "钟山县" },
    {
      "countyCode": "451102",
      "countyName": "八步区" },
    {
      "countyCode": "451123",
      "countyName": "富川瑶族自治县" },
    {
      "countyCode": "451103",
      "countyName": "平桂区" }] },

  {
    "cityCode": "450800",
    "cityName": "贵港市",
    "county": [{
      "countyCode": "450804",
      "countyName": "覃塘区" },
    {
      "countyCode": "450881",
      "countyName": "桂平市" },
    {
      "countyCode": "450821",
      "countyName": "平南县" },
    {
      "countyCode": "450803",
      "countyName": "港南区" },
    {
      "countyCode": "450802",
      "countyName": "港北区" }] },

  {
    "cityCode": "450900",
    "cityName": "玉林市",
    "county": [{
      "countyCode": "450921",
      "countyName": "容县" },
    {
      "countyCode": "450924",
      "countyName": "兴业县" },
    {
      "countyCode": "450902",
      "countyName": "玉州区" },
    {
      "countyCode": "450903",
      "countyName": "福绵区" },
    {
      "countyCode": "450981",
      "countyName": "北流市" },
    {
      "countyCode": "450923",
      "countyName": "博白县" },
    {
      "countyCode": "450922",
      "countyName": "陆川县" }] },

  {
    "cityCode": "450200",
    "cityName": "柳州市",
    "county": [{
      "countyCode": "450225",
      "countyName": "融水苗族自治县" },
    {
      "countyCode": "450202",
      "countyName": "城中区" },
    {
      "countyCode": "450223",
      "countyName": "鹿寨县" },
    {
      "countyCode": "450226",
      "countyName": "三江侗族自治县" },
    {
      "countyCode": "450204",
      "countyName": "柳南区" },
    {
      "countyCode": "450203",
      "countyName": "鱼峰区" },
    {
      "countyCode": "450222",
      "countyName": "柳城县" },
    {
      "countyCode": "450224",
      "countyName": "融安县" },
    {
      "countyCode": "450205",
      "countyName": "柳北区" },
    {
      "countyCode": "450221",
      "countyName": "柳江区" }] },

  {
    "cityCode": "451000",
    "cityName": "百色市",
    "county": [{
      "countyCode": "451002",
      "countyName": "右江区" },
    {
      "countyCode": "451031",
      "countyName": "隆林各族自治县" },
    {
      "countyCode": "451027",
      "countyName": "凌云县" },
    {
      "countyCode": "451023",
      "countyName": "平果县" },
    {
      "countyCode": "451026",
      "countyName": "那坡县" },
    {
      "countyCode": "451030",
      "countyName": "西林县" },
    {
      "countyCode": "451024",
      "countyName": "德保县" },
    {
      "countyCode": "451022",
      "countyName": "田东县" },
    {
      "countyCode": "451021",
      "countyName": "田阳县" },
    {
      "countyCode": "451028",
      "countyName": "乐业县" },
    {
      "countyCode": "451029",
      "countyName": "田林县" },
    {
      "countyCode": "451025",
      "countyName": "靖西市" }] },

  {
    "cityCode": "451300",
    "cityName": "来宾市",
    "county": [{
      "countyCode": "451381",
      "countyName": "合山市" },
    {
      "countyCode": "451322",
      "countyName": "象州县" },
    {
      "countyCode": "451324",
      "countyName": "金秀瑶族自治县" },
    {
      "countyCode": "451321",
      "countyName": "忻城县" },
    {
      "countyCode": "451302",
      "countyName": "兴宾区" },
    {
      "countyCode": "451323",
      "countyName": "武宣县" }] },

  {
    "cityCode": "450100",
    "cityName": "南宁市",
    "county": [{
      "countyCode": "450105",
      "countyName": "江南区" },
    {
      "countyCode": "450107",
      "countyName": "西乡塘区" },
    {
      "countyCode": "450109",
      "countyName": "邕宁区" },
    {
      "countyCode": "450126",
      "countyName": "宾阳县" },
    {
      "countyCode": "450108",
      "countyName": "良庆区" },
    {
      "countyCode": "450125",
      "countyName": "上林县" },
    {
      "countyCode": "450123",
      "countyName": "隆安县" },
    {
      "countyCode": "450124",
      "countyName": "马山县" },
    {
      "countyCode": "450122",
      "countyName": "武鸣区" },
    {
      "countyCode": "450102",
      "countyName": "兴宁区" },
    {
      "countyCode": "450127",
      "countyName": "横县" },
    {
      "countyCode": "450103",
      "countyName": "青秀区" }] },

  {
    "cityCode": "450700",
    "cityName": "钦州市",
    "county": [{
      "countyCode": "450702",
      "countyName": "钦南区" },
    {
      "countyCode": "450722",
      "countyName": "浦北县" },
    {
      "countyCode": "450721",
      "countyName": "灵山县" },
    {
      "countyCode": "450703",
      "countyName": "钦北区" }] },

  {
    "cityCode": "450600",
    "cityName": "防城港市",
    "county": [{
      "countyCode": "450603",
      "countyName": "防城区" },
    {
      "countyCode": "450621",
      "countyName": "上思县" },
    {
      "countyCode": "450602",
      "countyName": "港口区" },
    {
      "countyCode": "450681",
      "countyName": "东兴市" }] },

  {
    "cityCode": "451200",
    "cityName": "河池市",
    "county": [{
      "countyCode": "451202",
      "countyName": "金城江区" },
    {
      "countyCode": "451281",
      "countyName": "宜州区" },
    {
      "countyCode": "451221",
      "countyName": "南丹县" },
    {
      "countyCode": "451224",
      "countyName": "东兰县" },
    {
      "countyCode": "451228",
      "countyName": "都安瑶族自治县" },
    {
      "countyCode": "451229",
      "countyName": "大化瑶族自治县" },
    {
      "countyCode": "451222",
      "countyName": "天峨县" },
    {
      "countyCode": "451225",
      "countyName": "罗城仫佬族自治县" },
    {
      "countyCode": "451227",
      "countyName": "巴马瑶族自治县" },
    {
      "countyCode": "451226",
      "countyName": "环江毛南族自治县" },
    {
      "countyCode": "451223",
      "countyName": "凤山县" }] },

  {
    "cityCode": "451400",
    "cityName": "崇左市",
    "county": [{
      "countyCode": "451423",
      "countyName": "龙州县" },
    {
      "countyCode": "451425",
      "countyName": "天等县" },
    {
      "countyCode": "451481",
      "countyName": "凭祥市" },
    {
      "countyCode": "451422",
      "countyName": "宁明县" },
    {
      "countyCode": "451402",
      "countyName": "江州区" },
    {
      "countyCode": "451421",
      "countyName": "扶绥县" },
    {
      "countyCode": "451424",
      "countyName": "大新县" }] }] },


{
  "provinceCode": "460000",
  "provinceName": "海南省",
  "city": [{
    "cityCode": "469005",
    "cityName": "文昌市",
    "county": [{
      "countyCode": "469005-1",
      "countyName": "文昌市" }] },

  {
    "cityCode": "460300",
    "cityName": "三沙市",
    "county": [{
      "countyCode": "460321",
      "countyName": "西沙群岛" },
    {
      "countyCode": "460322",
      "countyName": "南沙群岛" },
    {
      "countyCode": "469031",
      "countyName": "西沙群岛" },
    {
      "countyCode": "469032",
      "countyName": "南沙群岛" },
    {
      "countyCode": "460323",
      "countyName": "中沙群岛的岛礁及其海域" }] },

  {
    "cityCode": "469027",
    "cityName": "乐东黎族自治县",
    "county": [{
      "countyCode": "469027-1",
      "countyName": "乐东黎族自治县" }] },

  {
    "cityCode": "460200",
    "cityName": "三亚市",
    "county": [{
      "countyCode": "460203",
      "countyName": "吉阳区" },
    {
      "countyCode": "460202",
      "countyName": "海棠区" },
    {
      "countyCode": "460205",
      "countyName": "崖州区" },
    {
      "countyCode": "460204",
      "countyName": "天涯区" }] },

  {
    "cityCode": "469002",
    "cityName": "琼海市",
    "county": [{
      "countyCode": "469002-1",
      "countyName": "琼海市" }] },

  {
    "cityCode": "469021",
    "cityName": "定安县",
    "county": [{
      "countyCode": "469021-1",
      "countyName": "定安县" }] },

  {
    "cityCode": "460100",
    "cityName": "海口市",
    "county": [{
      "countyCode": "460107",
      "countyName": "琼山区" },
    {
      "countyCode": "460108",
      "countyName": "美兰区" },
    {
      "countyCode": "460105",
      "countyName": "秀英区" },
    {
      "countyCode": "460106",
      "countyName": "龙华区" }] },

  {
    "cityCode": "469006",
    "cityName": "万宁市",
    "county": [{
      "countyCode": "469006-1",
      "countyName": "万宁市" }] },

  {
    "cityCode": "469029",
    "cityName": "保亭黎族苗族自治县",
    "county": [{
      "countyCode": "469029-1",
      "countyName": "保亭黎族苗族自治县" }] },

  {
    "cityCode": "469003",
    "cityName": "儋州市",
    "county": [{
      "countyCode": "469003-1",
      "countyName": "儋州市" }] },

  {
    "cityCode": "469023",
    "cityName": "澄迈县",
    "county": [{
      "countyCode": "469023-1",
      "countyName": "澄迈县" }] },

  {
    "cityCode": "469022",
    "cityName": "屯昌县",
    "county": [{
      "countyCode": "469022-1",
      "countyName": "屯昌县" }] },

  {
    "cityCode": "469028",
    "cityName": "陵水黎族自治县",
    "county": [{
      "countyCode": "469028-1",
      "countyName": "陵水黎族自治县" }] },

  {
    "cityCode": "469007",
    "cityName": "东方市",
    "county": [{
      "countyCode": "469007-1",
      "countyName": "东方市" }] },

  {
    "cityCode": "469001",
    "cityName": "五指山市",
    "county": [{
      "countyCode": "469001-1",
      "countyName": "五指山市" }] },

  {
    "cityCode": "469025",
    "cityName": "白沙黎族自治县",
    "county": [{
      "countyCode": "469025-1",
      "countyName": "白沙黎族自治县" }] },

  {
    "cityCode": "469026",
    "cityName": "昌江黎族自治县",
    "county": [{
      "countyCode": "469026-1",
      "countyName": "昌江黎族自治县" }] },

  {
    "cityCode": "469024",
    "cityName": "临高县",
    "county": [{
      "countyCode": "469024-1",
      "countyName": "临高县" }] },

  {
    "cityCode": "469030",
    "cityName": "琼中黎族苗族自治县",
    "county": [{
      "countyCode": "469030-1",
      "countyName": "琼中黎族苗族自治县" }] }] },


{
  "provinceCode": "500000",
  "provinceName": "重庆",
  "city": [{
    "cityCode": "500000-1",
    "cityName": "重庆市",
    "county": [{
      "countyCode": "500108",
      "countyName": "南岸区" },
    {
      "countyCode": "500101",
      "countyName": "万州区" },
    {
      "countyCode": "500103",
      "countyName": "渝中区" },
    {
      "countyCode": "500106",
      "countyName": "沙坪坝区" },
    {
      "countyCode": "500102",
      "countyName": "涪陵区" },
    {
      "countyCode": "500226",
      "countyName": "荣昌区" },
    {
      "countyCode": "500223",
      "countyName": "潼南区" },
    {
      "countyCode": "500242",
      "countyName": "酉阳土家族苗族自治县" },
    {
      "countyCode": "500232",
      "countyName": "武隆区" },
    {
      "countyCode": "500113",
      "countyName": "巴南区" },
    {
      "countyCode": "500109",
      "countyName": "北碚区" },
    {
      "countyCode": "500104",
      "countyName": "大渡口区" },
    {
      "countyCode": "500117",
      "countyName": "合川区" },
    {
      "countyCode": "500112",
      "countyName": "渝北区" },
    {
      "countyCode": "500116",
      "countyName": "江津区" },
    {
      "countyCode": "500228",
      "countyName": "梁平区" },
    {
      "countyCode": "500119",
      "countyName": "南川区" },
    {
      "countyCode": "500110",
      "countyName": "綦江区" },
    {
      "countyCode": "500227",
      "countyName": "璧山区" },
    {
      "countyCode": "500115",
      "countyName": "长寿区" },
    {
      "countyCode": "500231",
      "countyName": "垫江县" },
    {
      "countyCode": "500230",
      "countyName": "丰都县" },
    {
      "countyCode": "500224",
      "countyName": "铜梁区" },
    {
      "countyCode": "500243",
      "countyName": "彭水苗族土家族自治县" },
    {
      "countyCode": "500105",
      "countyName": "江北区" },
    {
      "countyCode": "500107",
      "countyName": "九龙坡区" },
    {
      "countyCode": "500236",
      "countyName": "奉节县" },
    {
      "countyCode": "500111",
      "countyName": "大足区" },
    {
      "countyCode": "500234",
      "countyName": "开州区" },
    {
      "countyCode": "500241",
      "countyName": "秀山土家族苗族自治县" },
    {
      "countyCode": "500229",
      "countyName": "城口县" },
    {
      "countyCode": "500238",
      "countyName": "巫溪县" },
    {
      "countyCode": "500118",
      "countyName": "永川区" },
    {
      "countyCode": "500233",
      "countyName": "忠县" },
    {
      "countyCode": "500240",
      "countyName": "石柱土家族自治县" },
    {
      "countyCode": "500114",
      "countyName": "黔江区" },
    {
      "countyCode": "500237",
      "countyName": "巫山县" },
    {
      "countyCode": "500235",
      "countyName": "云阳县" }] }] },


{
  "provinceCode": "510000",
  "provinceName": "四川省",
  "city": [{
    "cityCode": "511300",
    "cityName": "南充市",
    "county": [{
      "countyCode": "511304",
      "countyName": "嘉陵区" },
    {
      "countyCode": "511323",
      "countyName": "蓬安县" },
    {
      "countyCode": "511322",
      "countyName": "营山县" },
    {
      "countyCode": "511381",
      "countyName": "阆中市" },
    {
      "countyCode": "511303",
      "countyName": "高坪区" },
    {
      "countyCode": "511324",
      "countyName": "仪陇县" },
    {
      "countyCode": "511302",
      "countyName": "顺庆区" },
    {
      "countyCode": "511321",
      "countyName": "南部县" },
    {
      "countyCode": "511325",
      "countyName": "西充县" }] },

  {
    "cityCode": "511800",
    "cityName": "雅安市",
    "county": [{
      "countyCode": "511826",
      "countyName": "芦山县" },
    {
      "countyCode": "511824",
      "countyName": "石棉县" },
    {
      "countyCode": "511803",
      "countyName": "名山区" },
    {
      "countyCode": "511827",
      "countyName": "宝兴县" },
    {
      "countyCode": "511802",
      "countyName": "雨城区" },
    {
      "countyCode": "511823",
      "countyName": "汉源县" },
    {
      "countyCode": "511825",
      "countyName": "天全县" },
    {
      "countyCode": "511822",
      "countyName": "荥经县" }] },

  {
    "cityCode": "513400",
    "cityName": "凉山彝族自治州",
    "county": [{
      "countyCode": "513427",
      "countyName": "宁南县" },
    {
      "countyCode": "513432",
      "countyName": "喜德县" },
    {
      "countyCode": "513431",
      "countyName": "昭觉县" },
    {
      "countyCode": "513401",
      "countyName": "西昌市" },
    {
      "countyCode": "513437",
      "countyName": "雷波县" },
    {
      "countyCode": "513433",
      "countyName": "冕宁县" },
    {
      "countyCode": "513434",
      "countyName": "越西县" },
    {
      "countyCode": "513435",
      "countyName": "甘洛县" },
    {
      "countyCode": "513429",
      "countyName": "布拖县" },
    {
      "countyCode": "513430",
      "countyName": "金阳县" },
    {
      "countyCode": "513436",
      "countyName": "美姑县" },
    {
      "countyCode": "513428",
      "countyName": "普格县" },
    {
      "countyCode": "513424",
      "countyName": "德昌县" },
    {
      "countyCode": "513425",
      "countyName": "会理县" },
    {
      "countyCode": "513423",
      "countyName": "盐源县" },
    {
      "countyCode": "513426",
      "countyName": "会东县" },
    {
      "countyCode": "513422",
      "countyName": "木里藏族自治县" }] },

  {
    "cityCode": "511400",
    "cityName": "眉山市",
    "county": [{
      "countyCode": "511422",
      "countyName": "彭山区" },
    {
      "countyCode": "511424",
      "countyName": "丹棱县" },
    {
      "countyCode": "511425",
      "countyName": "青神县" },
    {
      "countyCode": "511402",
      "countyName": "东坡区" },
    {
      "countyCode": "511423",
      "countyName": "洪雅县" },
    {
      "countyCode": "511421",
      "countyName": "仁寿县" }] },

  {
    "cityCode": "510300",
    "cityName": "自贡市",
    "county": [{
      "countyCode": "510304",
      "countyName": "大安区" },
    {
      "countyCode": "510302",
      "countyName": "自流井区" },
    {
      "countyCode": "510321",
      "countyName": "荣县" },
    {
      "countyCode": "510303",
      "countyName": "贡井区" },
    {
      "countyCode": "510322",
      "countyName": "富顺县" },
    {
      "countyCode": "510311",
      "countyName": "沿滩区" }] },

  {
    "cityCode": "511900",
    "cityName": "巴中市",
    "county": [{
      "countyCode": "511903",
      "countyName": "恩阳区" },
    {
      "countyCode": "511921",
      "countyName": "通江县" },
    {
      "countyCode": "511922",
      "countyName": "南江县" },
    {
      "countyCode": "511902",
      "countyName": "巴州区" },
    {
      "countyCode": "511923",
      "countyName": "平昌县" }] },

  {
    "cityCode": "513300",
    "cityName": "甘孜藏族自治州",
    "county": [{
      "countyCode": "513328",
      "countyName": "甘孜县" },
    {
      "countyCode": "513324",
      "countyName": "九龙县" },
    {
      "countyCode": "513332",
      "countyName": "石渠县" },
    {
      "countyCode": "513337",
      "countyName": "稻城县" },
    {
      "countyCode": "513326",
      "countyName": "道孚县" },
    {
      "countyCode": "513330",
      "countyName": "德格县" },
    {
      "countyCode": "513336",
      "countyName": "乡城县" },
    {
      "countyCode": "513325",
      "countyName": "雅江县" },
    {
      "countyCode": "513334",
      "countyName": "理塘县" },
    {
      "countyCode": "513329",
      "countyName": "新龙县" },
    {
      "countyCode": "513338",
      "countyName": "得荣县" },
    {
      "countyCode": "513331",
      "countyName": "白玉县" },
    {
      "countyCode": "513323",
      "countyName": "丹巴县" },
    {
      "countyCode": "513327",
      "countyName": "炉霍县" },
    {
      "countyCode": "513335",
      "countyName": "巴塘县" },
    {
      "countyCode": "513321",
      "countyName": "康定市" },
    {
      "countyCode": "513333",
      "countyName": "色达县" },
    {
      "countyCode": "513322",
      "countyName": "泸定县" }] },

  {
    "cityCode": "511700",
    "cityName": "达州市",
    "county": [{
      "countyCode": "511722",
      "countyName": "宣汉县" },
    {
      "countyCode": "511781",
      "countyName": "万源市" },
    {
      "countyCode": "511724",
      "countyName": "大竹县" },
    {
      "countyCode": "511723",
      "countyName": "开江县" },
    {
      "countyCode": "511721",
      "countyName": "达川区" },
    {
      "countyCode": "511702",
      "countyName": "通川区" },
    {
      "countyCode": "511725",
      "countyName": "渠县" }] },

  {
    "cityCode": "510500",
    "cityName": "泸州市",
    "county": [{
      "countyCode": "510524",
      "countyName": "叙永县" },
    {
      "countyCode": "510521",
      "countyName": "泸县" },
    {
      "countyCode": "510502",
      "countyName": "江阳区" },
    {
      "countyCode": "510504",
      "countyName": "龙马潭区" },
    {
      "countyCode": "510525",
      "countyName": "古蔺县" },
    {
      "countyCode": "510522",
      "countyName": "合江县" },
    {
      "countyCode": "510503",
      "countyName": "纳溪区" }] },

  {
    "cityCode": "510800",
    "cityName": "广元市",
    "county": [{
      "countyCode": "510802",
      "countyName": "利州区" },
    {
      "countyCode": "510811",
      "countyName": "昭化区" },
    {
      "countyCode": "510824",
      "countyName": "苍溪县" },
    {
      "countyCode": "510812",
      "countyName": "朝天区" },
    {
      "countyCode": "510823",
      "countyName": "剑阁县" },
    {
      "countyCode": "510821",
      "countyName": "旺苍县" },
    {
      "countyCode": "510822",
      "countyName": "青川县" }] },

  {
    "cityCode": "512000",
    "cityName": "资阳市",
    "county": [{
      "countyCode": "512022",
      "countyName": "乐至县" },
    {
      "countyCode": "512021",
      "countyName": "安岳县" },
    {
      "countyCode": "512002",
      "countyName": "雁江区" }] },

  {
    "cityCode": "510400",
    "cityName": "攀枝花市",
    "county": [{
      "countyCode": "510411",
      "countyName": "仁和区" },
    {
      "countyCode": "510422",
      "countyName": "盐边县" },
    {
      "countyCode": "510403",
      "countyName": "西区" },
    {
      "countyCode": "510421",
      "countyName": "米易县" },
    {
      "countyCode": "510402",
      "countyName": "东区" }] },

  {
    "cityCode": "510100",
    "cityName": "成都市",
    "county": [{
      "countyCode": "510115",
      "countyName": "温江区" },
    {
      "countyCode": "510105",
      "countyName": "青羊区" },
    {
      "countyCode": "510124",
      "countyName": "郫都区" },
    {
      "countyCode": "510122",
      "countyName": "双流区" },
    {
      "countyCode": "510129",
      "countyName": "大邑县" },
    {
      "countyCode": "510106",
      "countyName": "金牛区" },
    {
      "countyCode": "510112",
      "countyName": "龙泉驿区" },
    {
      "countyCode": "512081",
      "countyName": "简阳市" },
    {
      "countyCode": "510181",
      "countyName": "都江堰市" },
    {
      "countyCode": "510108",
      "countyName": "成华区" },
    {
      "countyCode": "510132",
      "countyName": "新津县" },
    {
      "countyCode": "510113",
      "countyName": "青白江区" },
    {
      "countyCode": "510182",
      "countyName": "彭州市" },
    {
      "countyCode": "510114",
      "countyName": "新都区" },
    {
      "countyCode": "510184",
      "countyName": "崇州市" },
    {
      "countyCode": "510121",
      "countyName": "金堂县" },
    {
      "countyCode": "510107",
      "countyName": "武侯区" },
    {
      "countyCode": "510104",
      "countyName": "锦江区" },
    {
      "countyCode": "510131",
      "countyName": "蒲江县" },
    {
      "countyCode": "510183",
      "countyName": "邛崃市" }] },

  {
    "cityCode": "511100",
    "cityName": "乐山市",
    "county": [{
      "countyCode": "511132",
      "countyName": "峨边彝族自治县" },
    {
      "countyCode": "511113",
      "countyName": "金口河区" },
    {
      "countyCode": "511111",
      "countyName": "沙湾区" },
    {
      "countyCode": "511181",
      "countyName": "峨眉山市" },
    {
      "countyCode": "511126",
      "countyName": "夹江县" },
    {
      "countyCode": "511102",
      "countyName": "市中区" },
    {
      "countyCode": "511112",
      "countyName": "五通桥区" },
    {
      "countyCode": "511124",
      "countyName": "井研县" },
    {
      "countyCode": "511129",
      "countyName": "沐川县" },
    {
      "countyCode": "511123",
      "countyName": "犍为县" },
    {
      "countyCode": "511133",
      "countyName": "马边彝族自治县" }] },

  {
    "cityCode": "510700",
    "cityName": "绵阳市",
    "county": [{
      "countyCode": "510724",
      "countyName": "安州区" },
    {
      "countyCode": "510725",
      "countyName": "梓潼县" },
    {
      "countyCode": "510781",
      "countyName": "江油市" },
    {
      "countyCode": "510704",
      "countyName": "游仙区" },
    {
      "countyCode": "510727",
      "countyName": "平武县" },
    {
      "countyCode": "510723",
      "countyName": "盐亭县" },
    {
      "countyCode": "510703",
      "countyName": "涪城区" },
    {
      "countyCode": "510722",
      "countyName": "三台县" },
    {
      "countyCode": "510726",
      "countyName": "北川羌族自治县" }] },

  {
    "cityCode": "511600",
    "cityName": "广安市",
    "county": [{
      "countyCode": "511623",
      "countyName": "邻水县" },
    {
      "countyCode": "511622",
      "countyName": "武胜县" },
    {
      "countyCode": "511603000000",
      "countyName": "前锋区" },
    {
      "countyCode": "511602",
      "countyName": "广安区" },
    {
      "countyCode": "511621",
      "countyName": "岳池县" },
    {
      "countyCode": "511681",
      "countyName": "华蓥市" }] },

  {
    "cityCode": "511500",
    "cityName": "宜宾市",
    "county": [{
      "countyCode": "511523",
      "countyName": "江安县" },
    {
      "countyCode": "511521",
      "countyName": "叙州区" },
    {
      "countyCode": "511525",
      "countyName": "高县" },
    {
      "countyCode": "511529",
      "countyName": "屏山县" },
    {
      "countyCode": "511528",
      "countyName": "兴文县" },
    {
      "countyCode": "511502",
      "countyName": "翠屏区" },
    {
      "countyCode": "511527",
      "countyName": "筠连县" },
    {
      "countyCode": "511524",
      "countyName": "长宁县" },
    {
      "countyCode": "511526",
      "countyName": "珙县" },
    {
      "countyCode": "511503",
      "countyName": "南溪区" }] },

  {
    "cityCode": "511000",
    "cityName": "内江市",
    "county": [{
      "countyCode": "511024",
      "countyName": "威远县" },
    {
      "countyCode": "511002",
      "countyName": "市中区" },
    {
      "countyCode": "511011",
      "countyName": "东兴区" },
    {
      "countyCode": "511028",
      "countyName": "隆昌市" },
    {
      "countyCode": "511025",
      "countyName": "资中县" }] },

  {
    "cityCode": "513200",
    "cityName": "阿坝藏族羌族自治州",
    "county": [{
      "countyCode": "513230",
      "countyName": "壤塘县" },
    {
      "countyCode": "513225",
      "countyName": "九寨沟县" },
    {
      "countyCode": "513223",
      "countyName": "茂县" },
    {
      "countyCode": "513226",
      "countyName": "金川县" },
    {
      "countyCode": "513227",
      "countyName": "小金县" },
    {
      "countyCode": "513233",
      "countyName": "红原县" },
    {
      "countyCode": "513222",
      "countyName": "理县" },
    {
      "countyCode": "513232",
      "countyName": "若尔盖县" },
    {
      "countyCode": "513221",
      "countyName": "汶川县" },
    {
      "countyCode": "513228",
      "countyName": "黑水县" },
    {
      "countyCode": "513229",
      "countyName": "马尔康市" },
    {
      "countyCode": "513231",
      "countyName": "阿坝县" },
    {
      "countyCode": "513224",
      "countyName": "松潘县" }] },

  {
    "cityCode": "510900",
    "cityName": "遂宁市",
    "county": [{
      "countyCode": "510904",
      "countyName": "安居区" },
    {
      "countyCode": "510923",
      "countyName": "大英县" },
    {
      "countyCode": "510922",
      "countyName": "射洪县" },
    {
      "countyCode": "510903",
      "countyName": "船山区" },
    {
      "countyCode": "510921",
      "countyName": "蓬溪县" }] },

  {
    "cityCode": "510600",
    "cityName": "德阳市",
    "county": [{
      "countyCode": "510682",
      "countyName": "什邡市" },
    {
      "countyCode": "510683",
      "countyName": "绵竹市" },
    {
      "countyCode": "510623",
      "countyName": "中江县" },
    {
      "countyCode": "510681",
      "countyName": "广汉市" },
    {
      "countyCode": "510626",
      "countyName": "罗江区" },
    {
      "countyCode": "510603",
      "countyName": "旌阳区" }] }] },


{
  "provinceCode": "520000",
  "provinceName": "贵州省",
  "city": [{
    "cityCode": "520100",
    "cityName": "贵阳市",
    "county": [{
      "countyCode": "520103",
      "countyName": "云岩区" },
    {
      "countyCode": "520123",
      "countyName": "修文县" },
    {
      "countyCode": "520121",
      "countyName": "开阳县" },
    {
      "countyCode": "520114",
      "countyName": "小河区" },
    {
      "countyCode": "520122",
      "countyName": "息烽县" },
    {
      "countyCode": "520113",
      "countyName": "白云区" },
    {
      "countyCode": "520115",
      "countyName": "观山湖区" },
    {
      "countyCode": "520102",
      "countyName": "南明区" },
    {
      "countyCode": "520181",
      "countyName": "清镇市" },
    {
      "countyCode": "520112",
      "countyName": "乌当区" },
    {
      "countyCode": "520111",
      "countyName": "花溪区" }] },

  {
    "cityCode": "520300",
    "cityName": "遵义市",
    "county": [{
      "countyCode": "520381",
      "countyName": "赤水市" },
    {
      "countyCode": "520329",
      "countyName": "余庆县" },
    {
      "countyCode": "520325",
      "countyName": "道真仡佬族苗族自治县" },
    {
      "countyCode": "520326",
      "countyName": "务川仡佬族苗族自治县" },
    {
      "countyCode": "520328",
      "countyName": "湄潭县" },
    {
      "countyCode": "520327",
      "countyName": "凤冈县" },
    {
      "countyCode": "520302",
      "countyName": "红花岗区" },
    {
      "countyCode": "520382",
      "countyName": "仁怀市" },
    {
      "countyCode": "520321",
      "countyName": "播州区" },
    {
      "countyCode": "520330",
      "countyName": "习水县" },
    {
      "countyCode": "520324",
      "countyName": "正安县" },
    {
      "countyCode": "520303",
      "countyName": "汇川区" },
    {
      "countyCode": "520323",
      "countyName": "绥阳县" },
    {
      "countyCode": "520322",
      "countyName": "桐梓县" }] },

  {
    "cityCode": "522700",
    "cityName": "黔南布依族苗族自治州",
    "county": [{
      "countyCode": "522722",
      "countyName": "荔波县" },
    {
      "countyCode": "522725",
      "countyName": "瓮安县" },
    {
      "countyCode": "522702",
      "countyName": "福泉市" },
    {
      "countyCode": "522728",
      "countyName": "罗甸县" },
    {
      "countyCode": "522723",
      "countyName": "贵定县" },
    {
      "countyCode": "522701",
      "countyName": "都匀市" },
    {
      "countyCode": "522726",
      "countyName": "独山县" },
    {
      "countyCode": "522731",
      "countyName": "惠水县" },
    {
      "countyCode": "522732",
      "countyName": "三都水族自治县" },
    {
      "countyCode": "522727",
      "countyName": "平塘县" },
    {
      "countyCode": "522729",
      "countyName": "长顺县" },
    {
      "countyCode": "522730",
      "countyName": "龙里县" }] },

  {
    "cityCode": "520200",
    "cityName": "六盘水市",
    "county": [{
      "countyCode": "520222",
      "countyName": "盘州市" },
    {
      "countyCode": "520203",
      "countyName": "六枝特区" },
    {
      "countyCode": "520201",
      "countyName": "钟山区" },
    {
      "countyCode": "520221",
      "countyName": "水城县" }] },

  {
    "cityCode": "520400",
    "cityName": "安顺市",
    "county": [{
      "countyCode": "520424",
      "countyName": "关岭布依族苗族自治县" },
    {
      "countyCode": "520423",
      "countyName": "镇宁布依族苗族自治县" },
    {
      "countyCode": "520422",
      "countyName": "普定县" },
    {
      "countyCode": "520421",
      "countyName": "平坝区" },
    {
      "countyCode": "520425",
      "countyName": "紫云苗族布依族自治县" },
    {
      "countyCode": "520402",
      "countyName": "西秀区" }] },

  {
    "cityCode": "520500",
    "cityName": "毕节市",
    "county": [{
      "countyCode": "520523",
      "countyName": "金沙县" },
    {
      "countyCode": "520524",
      "countyName": "织金县" },
    {
      "countyCode": "520525",
      "countyName": "纳雍县" },
    {
      "countyCode": "520522",
      "countyName": "黔西县" },
    {
      "countyCode": "520526",
      "countyName": "威宁彝族回族苗族自治县" },
    {
      "countyCode": "520527",
      "countyName": "赫章县" },
    {
      "countyCode": "520521",
      "countyName": "大方县" },
    {
      "countyCode": "520502",
      "countyName": "七星关区" }] },

  {
    "cityCode": "522600",
    "cityName": "黔东南苗族侗族自治州",
    "county": [{
      "countyCode": "522626",
      "countyName": "岑巩县" },
    {
      "countyCode": "522630",
      "countyName": "台江县" },
    {
      "countyCode": "522624",
      "countyName": "三穗县" },
    {
      "countyCode": "522625",
      "countyName": "镇远县" },
    {
      "countyCode": "522636",
      "countyName": "丹寨县" },
    {
      "countyCode": "522633",
      "countyName": "从江县" },
    {
      "countyCode": "522634",
      "countyName": "雷山县" },
    {
      "countyCode": "522623",
      "countyName": "施秉县" },
    {
      "countyCode": "522629",
      "countyName": "剑河县" },
    {
      "countyCode": "522628",
      "countyName": "锦屏县" },
    {
      "countyCode": "522632",
      "countyName": "榕江县" },
    {
      "countyCode": "522631",
      "countyName": "黎平县" },
    {
      "countyCode": "522627",
      "countyName": "天柱县" },
    {
      "countyCode": "522622",
      "countyName": "黄平县" },
    {
      "countyCode": "522635",
      "countyName": "麻江县" },
    {
      "countyCode": "522601",
      "countyName": "凯里市" }] },

  {
    "cityCode": "522300",
    "cityName": "黔西南布依族苗族自治州",
    "county": [{
      "countyCode": "522326",
      "countyName": "望谟县" },
    {
      "countyCode": "522327",
      "countyName": "册亨县" },
    {
      "countyCode": "522323",
      "countyName": "普安县" },
    {
      "countyCode": "522322",
      "countyName": "兴仁县" },
    {
      "countyCode": "522301",
      "countyName": "兴义市" },
    {
      "countyCode": "522328",
      "countyName": "安龙县" },
    {
      "countyCode": "522324",
      "countyName": "晴隆县" },
    {
      "countyCode": "522325",
      "countyName": "贞丰县" }] },

  {
    "cityCode": "520600",
    "cityName": "铜仁市",
    "county": [{
      "countyCode": "520602",
      "countyName": "碧江区" },
    {
      "countyCode": "520622",
      "countyName": "玉屏侗族自治县" },
    {
      "countyCode": "520603",
      "countyName": "万山区" },
    {
      "countyCode": "520627",
      "countyName": "沿河土家族自治县" },
    {
      "countyCode": "520624",
      "countyName": "思南县" },
    {
      "countyCode": "520626",
      "countyName": "德江县" },
    {
      "countyCode": "520628",
      "countyName": "松桃苗族自治县" },
    {
      "countyCode": "520621",
      "countyName": "江口县" },
    {
      "countyCode": "520623",
      "countyName": "石阡县" },
    {
      "countyCode": "520625",
      "countyName": "印江土家族苗族自治县" }] }] },


{
  "provinceCode": "530000",
  "provinceName": "云南省",
  "city": [{
    "cityCode": "530400",
    "cityName": "玉溪市",
    "county": [{
      "countyCode": "530425",
      "countyName": "易门县" },
    {
      "countyCode": "530423",
      "countyName": "通海县" },
    {
      "countyCode": "530421",
      "countyName": "江川区" },
    {
      "countyCode": "530424",
      "countyName": "华宁县" },
    {
      "countyCode": "530426",
      "countyName": "峨山彝族自治县" },
    {
      "countyCode": "530402",
      "countyName": "红塔区" },
    {
      "countyCode": "530422",
      "countyName": "澄江县" },
    {
      "countyCode": "530427",
      "countyName": "新平彝族傣族自治县" },
    {
      "countyCode": "530428",
      "countyName": "元江哈尼族彝族傣族自治县" }] },

  {
    "cityCode": "533100",
    "cityName": "德宏傣族景颇族自治州",
    "county": [{
      "countyCode": "533124",
      "countyName": "陇川县" },
    {
      "countyCode": "533122",
      "countyName": "梁河县" },
    {
      "countyCode": "533123",
      "countyName": "盈江县" },
    {
      "countyCode": "533103",
      "countyName": "芒市" },
    {
      "countyCode": "533102",
      "countyName": "瑞丽市" }] },

  {
    "cityCode": "532900",
    "cityName": "大理白族自治州",
    "county": [{
      "countyCode": "532927",
      "countyName": "巍山彝族回族自治县" },
    {
      "countyCode": "532931",
      "countyName": "剑川县" },
    {
      "countyCode": "532923",
      "countyName": "祥云县" },
    {
      "countyCode": "532932",
      "countyName": "鹤庆县" },
    {
      "countyCode": "532928",
      "countyName": "永平县" },
    {
      "countyCode": "532929",
      "countyName": "云龙县" },
    {
      "countyCode": "532930",
      "countyName": "洱源县" },
    {
      "countyCode": "532924",
      "countyName": "宾川县" },
    {
      "countyCode": "532925",
      "countyName": "弥渡县" },
    {
      "countyCode": "532926",
      "countyName": "南涧彝族自治县" },
    {
      "countyCode": "532901",
      "countyName": "大理市" },
    {
      "countyCode": "532922",
      "countyName": "漾濞彝族自治县" }] },

  {
    "cityCode": "530100",
    "cityName": "昆明市",
    "county": [{
      "countyCode": "530124",
      "countyName": "富民县" },
    {
      "countyCode": "530114",
      "countyName": "呈贡区" },
    {
      "countyCode": "530126",
      "countyName": "石林彝族自治县" },
    {
      "countyCode": "530181",
      "countyName": "安宁市" },
    {
      "countyCode": "530128",
      "countyName": "禄劝彝族苗族自治县" },
    {
      "countyCode": "530125",
      "countyName": "宜良县" },
    {
      "countyCode": "530103",
      "countyName": "盘龙区" },
    {
      "countyCode": "530102",
      "countyName": "五华区" },
    {
      "countyCode": "530122",
      "countyName": "晋宁区" },
    {
      "countyCode": "530113",
      "countyName": "东川区" },
    {
      "countyCode": "530111",
      "countyName": "官渡区" },
    {
      "countyCode": "530127",
      "countyName": "嵩明县" },
    {
      "countyCode": "530112",
      "countyName": "西山区" },
    {
      "countyCode": "530129",
      "countyName": "寻甸回族彝族自治县" }] },

  {
    "cityCode": "530900",
    "cityName": "临沧市",
    "county": [{
      "countyCode": "530921",
      "countyName": "凤庆县" },
    {
      "countyCode": "530926",
      "countyName": "耿马傣族佤族自治县" },
    {
      "countyCode": "530922",
      "countyName": "云县" },
    {
      "countyCode": "530924",
      "countyName": "镇康县" },
    {
      "countyCode": "530923",
      "countyName": "永德县" },
    {
      "countyCode": "530927",
      "countyName": "沧源佤族自治县" },
    {
      "countyCode": "530925",
      "countyName": "双江拉祜族佤族布朗族傣族自治县" },
    {
      "countyCode": "530902",
      "countyName": "临翔区" }] },

  {
    "cityCode": "532300",
    "cityName": "楚雄彝族自治州",
    "county": [{
      "countyCode": "532329",
      "countyName": "武定县" },
    {
      "countyCode": "532324",
      "countyName": "南华县" },
    {
      "countyCode": "532327",
      "countyName": "永仁县" },
    {
      "countyCode": "532328",
      "countyName": "元谋县" },
    {
      "countyCode": "532331",
      "countyName": "禄丰县" },
    {
      "countyCode": "532326",
      "countyName": "大姚县" },
    {
      "countyCode": "532325",
      "countyName": "姚安县" },
    {
      "countyCode": "532301",
      "countyName": "楚雄市" },
    {
      "countyCode": "532323",
      "countyName": "牟定县" },
    {
      "countyCode": "532322",
      "countyName": "双柏县" }] },

  {
    "cityCode": "532800",
    "cityName": "西双版纳傣族自治州",
    "county": [{
      "countyCode": "532823",
      "countyName": "勐腊县" },
    {
      "countyCode": "532801",
      "countyName": "景洪市" },
    {
      "countyCode": "532822",
      "countyName": "勐海县" }] },

  {
    "cityCode": "532600",
    "cityName": "文山壮族苗族自治州",
    "county": [{
      "countyCode": "532601",
      "countyName": "文山市" },
    {
      "countyCode": "532623",
      "countyName": "西畴县" },
    {
      "countyCode": "532627",
      "countyName": "广南县" },
    {
      "countyCode": "532625",
      "countyName": "马关县" },
    {
      "countyCode": "532622",
      "countyName": "砚山县" },
    {
      "countyCode": "532628",
      "countyName": "富宁县" },
    {
      "countyCode": "532624",
      "countyName": "麻栗坡县" },
    {
      "countyCode": "532626",
      "countyName": "丘北县" }] },

  {
    "cityCode": "530300",
    "cityName": "曲靖市",
    "county": [{
      "countyCode": "530302",
      "countyName": "麒麟区" },
    {
      "countyCode": "530325",
      "countyName": "富源县" },
    {
      "countyCode": "530326",
      "countyName": "会泽县" },
    {
      "countyCode": "530324",
      "countyName": "罗平县" },
    {
      "countyCode": "530328",
      "countyName": "沾益区" },
    {
      "countyCode": "530323",
      "countyName": "师宗县" },
    {
      "countyCode": "530321",
      "countyName": "马龙区" },
    {
      "countyCode": "530322",
      "countyName": "陆良县" },
    {
      "countyCode": "530381",
      "countyName": "宣威市" }] },

  {
    "cityCode": "533400",
    "cityName": "迪庆藏族自治州",
    "county": [{
      "countyCode": "533421",
      "countyName": "香格里拉市" },
    {
      "countyCode": "533422",
      "countyName": "德钦县" },
    {
      "countyCode": "533423",
      "countyName": "维西傈僳族自治县" }] },

  {
    "cityCode": "530600",
    "cityName": "昭通市",
    "county": [{
      "countyCode": "530629",
      "countyName": "威信县" },
    {
      "countyCode": "530624",
      "countyName": "大关县" },
    {
      "countyCode": "530630",
      "countyName": "水富县" },
    {
      "countyCode": "530626",
      "countyName": "绥江县" },
    {
      "countyCode": "530628",
      "countyName": "彝良县" },
    {
      "countyCode": "530623",
      "countyName": "盐津县" },
    {
      "countyCode": "530602",
      "countyName": "昭阳区" },
    {
      "countyCode": "530621",
      "countyName": "鲁甸县" },
    {
      "countyCode": "530627",
      "countyName": "镇雄县" },
    {
      "countyCode": "530625",
      "countyName": "永善县" },
    {
      "countyCode": "530622",
      "countyName": "巧家县" }] },

  {
    "cityCode": "533300",
    "cityName": "怒江傈僳族自治州",
    "county": [{
      "countyCode": "533323",
      "countyName": "福贡县" },
    {
      "countyCode": "533324",
      "countyName": "贡山独龙族怒族自治县" },
    {
      "countyCode": "533321",
      "countyName": "泸水市" },
    {
      "countyCode": "533325",
      "countyName": "兰坪白族普米族自治县" }] },

  {
    "cityCode": "530700",
    "cityName": "丽江市",
    "county": [{
      "countyCode": "530724",
      "countyName": "宁蒗彝族自治县" },
    {
      "countyCode": "530722",
      "countyName": "永胜县" },
    {
      "countyCode": "530702",
      "countyName": "古城区" },
    {
      "countyCode": "530721",
      "countyName": "玉龙纳西族自治县" },
    {
      "countyCode": "530723",
      "countyName": "华坪县" }] },

  {
    "cityCode": "530800",
    "cityName": "普洱市",
    "county": [{
      "countyCode": "530822",
      "countyName": "墨江哈尼族自治县" },
    {
      "countyCode": "530823",
      "countyName": "景东彝族自治县" },
    {
      "countyCode": "530827",
      "countyName": "孟连傣族拉祜族佤族自治县" },
    {
      "countyCode": "530825",
      "countyName": "镇沅彝族哈尼族拉祜族自治县" },
    {
      "countyCode": "530828",
      "countyName": "澜沧拉祜族自治县" },
    {
      "countyCode": "530829",
      "countyName": "西盟佤族自治县" },
    {
      "countyCode": "530821",
      "countyName": "宁洱哈尼族彝族自治县" },
    {
      "countyCode": "530802",
      "countyName": "思茅区" },
    {
      "countyCode": "530826",
      "countyName": "江城哈尼族彝族自治县" },
    {
      "countyCode": "530824",
      "countyName": "景谷傣族彝族自治县" }] },

  {
    "cityCode": "532500",
    "cityName": "红河哈尼族彝族自治州",
    "county": [{
      "countyCode": "532525",
      "countyName": "石屏县" },
    {
      "countyCode": "532530",
      "countyName": "金平苗族瑶族傣族自治县" },
    {
      "countyCode": "532503",
      "countyName": "蒙自市" },
    {
      "countyCode": "532528",
      "countyName": "元阳县" },
    {
      "countyCode": "532527",
      "countyName": "泸西县" },
    {
      "countyCode": "532502",
      "countyName": "开远市" },
    {
      "countyCode": "532524",
      "countyName": "建水县" },
    {
      "countyCode": "532532",
      "countyName": "河口瑶族自治县" },
    {
      "countyCode": "532529",
      "countyName": "红河县" },
    {
      "countyCode": "532531",
      "countyName": "绿春县" },
    {
      "countyCode": "532501",
      "countyName": "个旧市" },
    {
      "countyCode": "532523",
      "countyName": "屏边苗族自治县" },
    {
      "countyCode": "532526",
      "countyName": "弥勒市" }] },

  {
    "cityCode": "530500",
    "cityName": "保山市",
    "county": [{
      "countyCode": "530523",
      "countyName": "龙陵县" },
    {
      "countyCode": "530522",
      "countyName": "腾冲市" },
    {
      "countyCode": "530521",
      "countyName": "施甸县" },
    {
      "countyCode": "530502",
      "countyName": "隆阳区" },
    {
      "countyCode": "530524",
      "countyName": "昌宁县" }] }] },


{
  "provinceCode": "540000",
  "provinceName": "西藏自治区",
  "city": [{
    "cityCode": "542100",
    "cityName": "昌都市",
    "county": [{
      "countyCode": "542122",
      "countyName": "江达县" },
    {
      "countyCode": "542129",
      "countyName": "芒康县" },
    {
      "countyCode": "542128",
      "countyName": "左贡县" },
    {
      "countyCode": "542126",
      "countyName": "察雅县" },
    {
      "countyCode": "542132",
      "countyName": "洛隆县" },
    {
      "countyCode": "542121",
      "countyName": "卡若区" },
    {
      "countyCode": "542125",
      "countyName": "丁青县" },
    {
      "countyCode": "542133",
      "countyName": "边坝县" },
    {
      "countyCode": "542123",
      "countyName": "贡觉县" },
    {
      "countyCode": "542127",
      "countyName": "八宿县" },
    {
      "countyCode": "542124",
      "countyName": "类乌齐县" }] },

  {
    "cityCode": "542200",
    "cityName": "山南市",
    "county": [{
      "countyCode": "542229",
      "countyName": "加查县" },
    {
      "countyCode": "542225",
      "countyName": "琼结县" },
    {
      "countyCode": "542232",
      "countyName": "错那县" },
    {
      "countyCode": "542221",
      "countyName": "乃东区" },
    {
      "countyCode": "542224",
      "countyName": "桑日县" },
    {
      "countyCode": "542222",
      "countyName": "扎囊县" },
    {
      "countyCode": "542227",
      "countyName": "措美县" },
    {
      "countyCode": "542223",
      "countyName": "贡嘎县" },
    {
      "countyCode": "542228",
      "countyName": "洛扎县" },
    {
      "countyCode": "542226",
      "countyName": "曲松县" },
    {
      "countyCode": "542233",
      "countyName": "浪卡子县" },
    {
      "countyCode": "542231",
      "countyName": "隆子县" }] },

  {
    "cityCode": "542400",
    "cityName": "那曲市",
    "county": [{
      "countyCode": "542426",
      "countyName": "申扎县" },
    {
      "countyCode": "542423",
      "countyName": "比如县" },
    {
      "countyCode": "542430",
      "countyName": "尼玛县" },
    {
      "countyCode": "542421",
      "countyName": "色尼区" },
    {
      "countyCode": "542422",
      "countyName": "嘉黎县" },
    {
      "countyCode": "542424",
      "countyName": "聂荣县" },
    {
      "countyCode": "542427",
      "countyName": "索县" },
    {
      "countyCode": "542425",
      "countyName": "安多县" },
    {
      "countyCode": "542428",
      "countyName": "班戈县" },
    {
      "countyCode": "542429",
      "countyName": "巴青县" }] },

  {
    "cityCode": "542600",
    "cityName": "林芝市",
    "county": [{
      "countyCode": "542623",
      "countyName": "米林县" },
    {
      "countyCode": "542626",
      "countyName": "察隅县" },
    {
      "countyCode": "542627",
      "countyName": "朗县" },
    {
      "countyCode": "542622",
      "countyName": "工布江达县" },
    {
      "countyCode": "542625",
      "countyName": "波密县" },
    {
      "countyCode": "542624",
      "countyName": "墨脱县" },
    {
      "countyCode": "542621",
      "countyName": "巴宜区" }] },

  {
    "cityCode": "540100",
    "cityName": "拉萨市",
    "county": [{
      "countyCode": "540121",
      "countyName": "林周县" },
    {
      "countyCode": "540124",
      "countyName": "曲水县" },
    {
      "countyCode": "540126",
      "countyName": "达孜区" },
    {
      "countyCode": "540125",
      "countyName": "堆龙德庆区" },
    {
      "countyCode": "540122",
      "countyName": "当雄县" },
    {
      "countyCode": "540127",
      "countyName": "墨竹工卡县" },
    {
      "countyCode": "540123",
      "countyName": "尼木县" },
    {
      "countyCode": "540102",
      "countyName": "城关区" }] },

  {
    "cityCode": "542300",
    "cityName": "日喀则市",
    "county": [{
      "countyCode": "542335",
      "countyName": "吉隆县" },
    {
      "countyCode": "542323",
      "countyName": "江孜县" },
    {
      "countyCode": "542331",
      "countyName": "康马县" },
    {
      "countyCode": "542322",
      "countyName": "南木林县" },
    {
      "countyCode": "542338",
      "countyName": "岗巴县" },
    {
      "countyCode": "542336",
      "countyName": "聂拉木县" },
    {
      "countyCode": "542328",
      "countyName": "谢通门县" },
    {
      "countyCode": "542325",
      "countyName": "萨迦县" },
    {
      "countyCode": "542329",
      "countyName": "白朗县" },
    {
      "countyCode": "542326",
      "countyName": "拉孜县" },
    {
      "countyCode": "542332",
      "countyName": "定结县" },
    {
      "countyCode": "542327",
      "countyName": "昂仁县" },
    {
      "countyCode": "542334",
      "countyName": "亚东县" },
    {
      "countyCode": "542337",
      "countyName": "萨嘎县" },
    {
      "countyCode": "542324",
      "countyName": "定日县" },
    {
      "countyCode": "542333",
      "countyName": "仲巴县" },
    {
      "countyCode": "542301",
      "countyName": "桑珠孜区" },
    {
      "countyCode": "542330",
      "countyName": "仁布县" }] },

  {
    "cityCode": "542500",
    "cityName": "阿里地区",
    "county": [{
      "countyCode": "542523",
      "countyName": "噶尔县" },
    {
      "countyCode": "542525",
      "countyName": "革吉县" },
    {
      "countyCode": "542524",
      "countyName": "日土县" },
    {
      "countyCode": "542527",
      "countyName": "措勤县" },
    {
      "countyCode": "542521",
      "countyName": "普兰县" },
    {
      "countyCode": "542526",
      "countyName": "改则县" },
    {
      "countyCode": "542522",
      "countyName": "札达县" }] }] },


{
  "provinceCode": "610000",
  "provinceName": "陕西省",
  "city": [{
    "cityCode": "610800",
    "cityName": "榆林市",
    "county": [{
      "countyCode": "610831",
      "countyName": "子洲县" },
    {
      "countyCode": "610825",
      "countyName": "定边县" },
    {
      "countyCode": "610827",
      "countyName": "米脂县" },
    {
      "countyCode": "610821",
      "countyName": "神木市" },
    {
      "countyCode": "610829",
      "countyName": "吴堡县" },
    {
      "countyCode": "610822",
      "countyName": "府谷县" },
    {
      "countyCode": "610830",
      "countyName": "清涧县" },
    {
      "countyCode": "610823",
      "countyName": "横山区" },
    {
      "countyCode": "610824",
      "countyName": "靖边县" },
    {
      "countyCode": "610826",
      "countyName": "绥德县" },
    {
      "countyCode": "610802",
      "countyName": "榆阳区" },
    {
      "countyCode": "610828",
      "countyName": "佳县" }] },

  {
    "cityCode": "610200",
    "cityName": "铜川市",
    "county": [{
      "countyCode": "610202",
      "countyName": "王益区" },
    {
      "countyCode": "610203",
      "countyName": "印台区" },
    {
      "countyCode": "610204",
      "countyName": "耀州区" },
    {
      "countyCode": "610222",
      "countyName": "宜君县" }] },

  {
    "cityCode": "611000",
    "cityName": "商洛市",
    "county": [{
      "countyCode": "611022",
      "countyName": "丹凤县" },
    {
      "countyCode": "611023",
      "countyName": "商南县" },
    {
      "countyCode": "611026",
      "countyName": "柞水县" },
    {
      "countyCode": "611025",
      "countyName": "镇安县" },
    {
      "countyCode": "611024",
      "countyName": "山阳县" },
    {
      "countyCode": "611021",
      "countyName": "洛南县" },
    {
      "countyCode": "611002",
      "countyName": "商州区" }] },

  {
    "cityCode": "610500",
    "cityName": "渭南市",
    "county": [{
      "countyCode": "610582",
      "countyName": "华阴市" },
    {
      "countyCode": "610524",
      "countyName": "合阳县" },
    {
      "countyCode": "610521",
      "countyName": "华州区" },
    {
      "countyCode": "610581",
      "countyName": "韩城市" },
    {
      "countyCode": "610526",
      "countyName": "蒲城县" },
    {
      "countyCode": "610527",
      "countyName": "白水县" },
    {
      "countyCode": "610522",
      "countyName": "潼关县" },
    {
      "countyCode": "610528",
      "countyName": "富平县" },
    {
      "countyCode": "610523",
      "countyName": "大荔县" },
    {
      "countyCode": "610502",
      "countyName": "临渭区" },
    {
      "countyCode": "610525",
      "countyName": "澄城县" }] },

  {
    "cityCode": "610300",
    "cityName": "宝鸡市",
    "county": [{
      "countyCode": "610328",
      "countyName": "千阳县" },
    {
      "countyCode": "610330",
      "countyName": "凤县" },
    {
      "countyCode": "610329",
      "countyName": "麟游县" },
    {
      "countyCode": "610323",
      "countyName": "岐山县" },
    {
      "countyCode": "610302",
      "countyName": "渭滨区" },
    {
      "countyCode": "610327",
      "countyName": "陇县" },
    {
      "countyCode": "610322",
      "countyName": "凤翔县" },
    {
      "countyCode": "610324",
      "countyName": "扶风县" },
    {
      "countyCode": "610304",
      "countyName": "陈仓区" },
    {
      "countyCode": "610303",
      "countyName": "金台区" },
    {
      "countyCode": "610326",
      "countyName": "眉县" },
    {
      "countyCode": "610331",
      "countyName": "太白县" }] },

  {
    "cityCode": "610900",
    "cityName": "安康市",
    "county": [{
      "countyCode": "610927",
      "countyName": "镇坪县" },
    {
      "countyCode": "610923",
      "countyName": "宁陕县" },
    {
      "countyCode": "610922",
      "countyName": "石泉县" },
    {
      "countyCode": "610921",
      "countyName": "汉阴县" },
    {
      "countyCode": "610925",
      "countyName": "岚皋县" },
    {
      "countyCode": "610926",
      "countyName": "平利县" },
    {
      "countyCode": "610928",
      "countyName": "旬阳县" },
    {
      "countyCode": "610929",
      "countyName": "白河县" },
    {
      "countyCode": "610902",
      "countyName": "汉滨区" },
    {
      "countyCode": "610924",
      "countyName": "紫阳县" }] },

  {
    "cityCode": "610700",
    "cityName": "汉中市",
    "county": [{
      "countyCode": "610724",
      "countyName": "西乡县" },
    {
      "countyCode": "610721",
      "countyName": "南郑区" },
    {
      "countyCode": "610722",
      "countyName": "城固县" },
    {
      "countyCode": "610727",
      "countyName": "略阳县" },
    {
      "countyCode": "610728",
      "countyName": "镇巴县" },
    {
      "countyCode": "610702",
      "countyName": "汉台区" },
    {
      "countyCode": "610729",
      "countyName": "留坝县" },
    {
      "countyCode": "610723",
      "countyName": "洋县" },
    {
      "countyCode": "610730",
      "countyName": "佛坪县" },
    {
      "countyCode": "610726",
      "countyName": "宁强县" },
    {
      "countyCode": "610725",
      "countyName": "勉县" }] },

  {
    "cityCode": "610600",
    "cityName": "延安市",
    "county": [{
      "countyCode": "610628",
      "countyName": "富县" },
    {
      "countyCode": "610631",
      "countyName": "黄龙县" },
    {
      "countyCode": "610602",
      "countyName": "宝塔区" },
    {
      "countyCode": "610630",
      "countyName": "宜川县" },
    {
      "countyCode": "610624",
      "countyName": "安塞区" },
    {
      "countyCode": "610629",
      "countyName": "洛川县" },
    {
      "countyCode": "610621",
      "countyName": "延长县" },
    {
      "countyCode": "610632",
      "countyName": "黄陵县" },
    {
      "countyCode": "610626",
      "countyName": "吴起县" },
    {
      "countyCode": "610623",
      "countyName": "子长县" },
    {
      "countyCode": "610627",
      "countyName": "甘泉县" },
    {
      "countyCode": "610625",
      "countyName": "志丹县" },
    {
      "countyCode": "610622",
      "countyName": "延川县" }] },

  {
    "cityCode": "610100",
    "cityName": "西安市",
    "county": [{
      "countyCode": "610116",
      "countyName": "长安区" },
    {
      "countyCode": "610112",
      "countyName": "未央区" },
    {
      "countyCode": "610102",
      "countyName": "新城区" },
    {
      "countyCode": "610114",
      "countyName": "阎良区" },
    {
      "countyCode": "610111",
      "countyName": "灞桥区" },
    {
      "countyCode": "610126",
      "countyName": "高陵区" },
    {
      "countyCode": "610122",
      "countyName": "蓝田县" },
    {
      "countyCode": "610103",
      "countyName": "碑林区" },
    {
      "countyCode": "610115",
      "countyName": "临潼区" },
    {
      "countyCode": "610113",
      "countyName": "雁塔区" },
    {
      "countyCode": "610124",
      "countyName": "周至县" },
    {
      "countyCode": "610104",
      "countyName": "莲湖区" },
    {
      "countyCode": "610125",
      "countyName": "鄠邑区" }] },

  {
    "cityCode": "610400",
    "cityName": "咸阳市",
    "county": [{
      "countyCode": "610430",
      "countyName": "淳化县" },
    {
      "countyCode": "610423",
      "countyName": "泾阳县" },
    {
      "countyCode": "610481",
      "countyName": "兴平市" },
    {
      "countyCode": "610422",
      "countyName": "三原县" },
    {
      "countyCode": "610424",
      "countyName": "乾县" },
    {
      "countyCode": "610426",
      "countyName": "永寿县" },
    {
      "countyCode": "610427",
      "countyName": "彬州市" },
    {
      "countyCode": "610402",
      "countyName": "秦都区" },
    {
      "countyCode": "610404",
      "countyName": "渭城区" },
    {
      "countyCode": "610403",
      "countyName": "杨陵区" },
    {
      "countyCode": "610431",
      "countyName": "武功县" },
    {
      "countyCode": "610428",
      "countyName": "长武县" },
    {
      "countyCode": "610425",
      "countyName": "礼泉县" },
    {
      "countyCode": "610429",
      "countyName": "旬邑县" }] }] },


{
  "provinceCode": "620000",
  "provinceName": "甘肃省",
  "city": [{
    "cityCode": "620500",
    "cityName": "天水市",
    "county": [{
      "countyCode": "620524",
      "countyName": "武山县" },
    {
      "countyCode": "620502",
      "countyName": "秦州区" },
    {
      "countyCode": "620521",
      "countyName": "清水县" },
    {
      "countyCode": "620523",
      "countyName": "甘谷县" },
    {
      "countyCode": "620522",
      "countyName": "秦安县" },
    {
      "countyCode": "620503",
      "countyName": "麦积区" },
    {
      "countyCode": "620525",
      "countyName": "张家川回族自治县" }] },

  {
    "cityCode": "620300",
    "cityName": "金昌市",
    "county": [{
      "countyCode": "620302",
      "countyName": "金川区" },
    {
      "countyCode": "620321",
      "countyName": "永昌县" }] },

  {
    "cityCode": "620600",
    "cityName": "武威市",
    "county": [{
      "countyCode": "620602",
      "countyName": "凉州区" },
    {
      "countyCode": "620623",
      "countyName": "天祝藏族自治县" },
    {
      "countyCode": "620622",
      "countyName": "古浪县" },
    {
      "countyCode": "620621",
      "countyName": "民勤县" }] },

  {
    "cityCode": "620700",
    "cityName": "张掖市",
    "county": [{
      "countyCode": "620702",
      "countyName": "甘州区" },
    {
      "countyCode": "620724",
      "countyName": "高台县" },
    {
      "countyCode": "620725",
      "countyName": "山丹县" },
    {
      "countyCode": "620723",
      "countyName": "临泽县" },
    {
      "countyCode": "620722",
      "countyName": "民乐县" },
    {
      "countyCode": "620721",
      "countyName": "肃南裕固族自治县" }] },

  {
    "cityCode": "621200",
    "cityName": "陇南市",
    "county": [{
      "countyCode": "621225",
      "countyName": "西和县" },
    {
      "countyCode": "621223",
      "countyName": "宕昌县" },
    {
      "countyCode": "621227",
      "countyName": "徽县" },
    {
      "countyCode": "621224",
      "countyName": "康县" },
    {
      "countyCode": "621221",
      "countyName": "成县" },
    {
      "countyCode": "621228",
      "countyName": "两当县" },
    {
      "countyCode": "621226",
      "countyName": "礼县" },
    {
      "countyCode": "621222",
      "countyName": "文县" },
    {
      "countyCode": "621202",
      "countyName": "武都区" }] },

  {
    "cityCode": "620100",
    "cityName": "兰州市",
    "county": [{
      "countyCode": "620121",
      "countyName": "永登县" },
    {
      "countyCode": "620111",
      "countyName": "红古区" },
    {
      "countyCode": "620103",
      "countyName": "七里河区" },
    {
      "countyCode": "620122",
      "countyName": "皋兰县" },
    {
      "countyCode": "620104",
      "countyName": "西固区" },
    {
      "countyCode": "620102",
      "countyName": "城关区" },
    {
      "countyCode": "620105",
      "countyName": "安宁区" },
    {
      "countyCode": "620123",
      "countyName": "榆中县" }] },

  {
    "cityCode": "621000",
    "cityName": "庆阳市",
    "county": [{
      "countyCode": "621025",
      "countyName": "正宁县" },
    {
      "countyCode": "621026",
      "countyName": "宁县" },
    {
      "countyCode": "621027",
      "countyName": "镇原县" },
    {
      "countyCode": "621023",
      "countyName": "华池县" },
    {
      "countyCode": "621002",
      "countyName": "西峰区" },
    {
      "countyCode": "621024",
      "countyName": "合水县" },
    {
      "countyCode": "621022",
      "countyName": "环县" },
    {
      "countyCode": "621021",
      "countyName": "庆城县" }] },

  {
    "cityCode": "620200",
    "cityName": "嘉峪关市",
    "county": [{
      "countyCode": "620200-1",
      "countyName": "嘉峪关市" }] },

  {
    "cityCode": "620800",
    "cityName": "平凉市",
    "county": [{
      "countyCode": "620826",
      "countyName": "静宁县" },
    {
      "countyCode": "620822",
      "countyName": "灵台县" },
    {
      "countyCode": "620823",
      "countyName": "崇信县" },
    {
      "countyCode": "620825",
      "countyName": "庄浪县" },
    {
      "countyCode": "620824",
      "countyName": "华亭县" },
    {
      "countyCode": "620821",
      "countyName": "泾川县" },
    {
      "countyCode": "620802",
      "countyName": "崆峒区" }] },

  {
    "cityCode": "623000",
    "cityName": "甘南藏族自治州",
    "county": [{
      "countyCode": "623024",
      "countyName": "迭部县" },
    {
      "countyCode": "623026",
      "countyName": "碌曲县" },
    {
      "countyCode": "623022",
      "countyName": "卓尼县" },
    {
      "countyCode": "623021",
      "countyName": "临潭县" },
    {
      "countyCode": "623025",
      "countyName": "玛曲县" },
    {
      "countyCode": "623001",
      "countyName": "合作市" },
    {
      "countyCode": "623027",
      "countyName": "夏河县" },
    {
      "countyCode": "623023",
      "countyName": "舟曲县" }] },

  {
    "cityCode": "620400",
    "cityName": "白银市",
    "county": [{
      "countyCode": "620422",
      "countyName": "会宁县" },
    {
      "countyCode": "620403",
      "countyName": "平川区" },
    {
      "countyCode": "620423",
      "countyName": "景泰县" },
    {
      "countyCode": "620421",
      "countyName": "靖远县" },
    {
      "countyCode": "620402",
      "countyName": "白银区" }] },

  {
    "cityCode": "620900",
    "cityName": "酒泉市",
    "county": [{
      "countyCode": "620921",
      "countyName": "金塔县" },
    {
      "countyCode": "620924",
      "countyName": "阿克塞哈萨克族自治县" },
    {
      "countyCode": "620923",
      "countyName": "肃北蒙古族自治县" },
    {
      "countyCode": "620922",
      "countyName": "瓜州县" },
    {
      "countyCode": "620981",
      "countyName": "玉门市" },
    {
      "countyCode": "620902",
      "countyName": "肃州区" },
    {
      "countyCode": "620982",
      "countyName": "敦煌市" }] },

  {
    "cityCode": "621100",
    "cityName": "定西市",
    "county": [{
      "countyCode": "621122",
      "countyName": "陇西县" },
    {
      "countyCode": "621123",
      "countyName": "渭源县" },
    {
      "countyCode": "621125",
      "countyName": "漳县" },
    {
      "countyCode": "621124",
      "countyName": "临洮县" },
    {
      "countyCode": "621121",
      "countyName": "通渭县" },
    {
      "countyCode": "621126",
      "countyName": "岷县" },
    {
      "countyCode": "621102",
      "countyName": "安定区" }] },

  {
    "cityCode": "622900",
    "cityName": "临夏回族自治州",
    "county": [{
      "countyCode": "622921",
      "countyName": "临夏县" },
    {
      "countyCode": "622925",
      "countyName": "和政县" },
    {
      "countyCode": "622924",
      "countyName": "广河县" },
    {
      "countyCode": "622901",
      "countyName": "临夏市" },
    {
      "countyCode": "622926",
      "countyName": "东乡族自治县" },
    {
      "countyCode": "622923",
      "countyName": "永靖县" },
    {
      "countyCode": "622927",
      "countyName": "积石山保安族东乡族撒拉族自治县" },
    {
      "countyCode": "622922",
      "countyName": "康乐县" }] }] },


{
  "provinceCode": "630000",
  "provinceName": "青海省",
  "city": [{
    "cityCode": "632200",
    "cityName": "海北藏族自治州",
    "county": [{
      "countyCode": "632224",
      "countyName": "刚察县" },
    {
      "countyCode": "632222",
      "countyName": "祁连县" },
    {
      "countyCode": "632223",
      "countyName": "海晏县" },
    {
      "countyCode": "632221",
      "countyName": "门源回族自治县" }] },

  {
    "cityCode": "632500",
    "cityName": "海南藏族自治州",
    "county": [{
      "countyCode": "632522",
      "countyName": "同德县" },
    {
      "countyCode": "632525",
      "countyName": "贵南县" },
    {
      "countyCode": "632524",
      "countyName": "兴海县" },
    {
      "countyCode": "632523",
      "countyName": "贵德县" },
    {
      "countyCode": "632521",
      "countyName": "共和县" }] },

  {
    "cityCode": "630100",
    "cityName": "西宁市",
    "county": [{
      "countyCode": "630102",
      "countyName": "城东区" },
    {
      "countyCode": "630122",
      "countyName": "湟中县" },
    {
      "countyCode": "630105",
      "countyName": "城北区" },
    {
      "countyCode": "630121",
      "countyName": "大通回族土族自治县" },
    {
      "countyCode": "630103",
      "countyName": "城中区" },
    {
      "countyCode": "630104",
      "countyName": "城西区" },
    {
      "countyCode": "630123",
      "countyName": "湟源县" }] },

  {
    "cityCode": "632700",
    "cityName": "玉树藏族自治州",
    "county": [{
      "countyCode": "632726",
      "countyName": "曲麻莱县" },
    {
      "countyCode": "632721",
      "countyName": "玉树市" },
    {
      "countyCode": "632723",
      "countyName": "称多县" },
    {
      "countyCode": "632722",
      "countyName": "杂多县" },
    {
      "countyCode": "632725",
      "countyName": "囊谦县" },
    {
      "countyCode": "632724",
      "countyName": "治多县" }] },

  {
    "cityCode": "632800",
    "cityName": "海西蒙古族藏族自治州",
    "county": [{
      "countyCode": "632801",
      "countyName": "格尔木市" },
    {
      "countyCode": "632823",
      "countyName": "天峻县" },
    {
      "countyCode": "632802",
      "countyName": "德令哈市" },
    {
      "countyCode": "632822",
      "countyName": "都兰县" },
    {
      "countyCode": "632821",
      "countyName": "乌兰县" },
    {
      "countyCode": "632803",
      "countyName": "茫崖市" }] },

  {
    "cityCode": "632100",
    "cityName": "海东市",
    "county": [{
      "countyCode": "632128",
      "countyName": "循化撒拉族自治县" },
    {
      "countyCode": "632126",
      "countyName": "互助土族自治县" },
    {
      "countyCode": "632127",
      "countyName": "化隆回族自治县" },
    {
      "countyCode": "632122",
      "countyName": "民和回族土族自治县" },
    {
      "countyCode": "632121",
      "countyName": "平安区" },
    {
      "countyCode": "632123",
      "countyName": "乐都区" }] },

  {
    "cityCode": "632300",
    "cityName": "黄南藏族自治州",
    "county": [{
      "countyCode": "632322",
      "countyName": "尖扎县" },
    {
      "countyCode": "632323",
      "countyName": "泽库县" },
    {
      "countyCode": "632324",
      "countyName": "河南蒙古族自治县" },
    {
      "countyCode": "632321",
      "countyName": "同仁县" }] },

  {
    "cityCode": "632600",
    "cityName": "果洛藏族自治州",
    "county": [{
      "countyCode": "632625",
      "countyName": "久治县" },
    {
      "countyCode": "632623",
      "countyName": "甘德县" },
    {
      "countyCode": "632622",
      "countyName": "班玛县" },
    {
      "countyCode": "632626",
      "countyName": "玛多县" },
    {
      "countyCode": "632624",
      "countyName": "达日县" },
    {
      "countyCode": "632621",
      "countyName": "玛沁县" }] }] },


{
  "provinceCode": "640000",
  "provinceName": "宁夏回族自治区",
  "city": [{
    "cityCode": "640200",
    "cityName": "石嘴山市",
    "county": [{
      "countyCode": "640205",
      "countyName": "惠农区" },
    {
      "countyCode": "640202",
      "countyName": "大武口区" },
    {
      "countyCode": "640221",
      "countyName": "平罗县" }] },

  {
    "cityCode": "640300",
    "cityName": "吴忠市",
    "county": [{
      "countyCode": "640323",
      "countyName": "盐池县" },
    {
      "countyCode": "640381",
      "countyName": "青铜峡市" },
    {
      "countyCode": "640302",
      "countyName": "利通区" },
    {
      "countyCode": "640303",
      "countyName": "红寺堡区" },
    {
      "countyCode": "640324",
      "countyName": "同心县" }] },

  {
    "cityCode": "640500",
    "cityName": "中卫市",
    "county": [{
      "countyCode": "640522",
      "countyName": "海原县" },
    {
      "countyCode": "640502",
      "countyName": "沙坡头区" },
    {
      "countyCode": "640521",
      "countyName": "中宁县" }] },

  {
    "cityCode": "640400",
    "cityName": "固原市",
    "county": [{
      "countyCode": "640402",
      "countyName": "原州区" },
    {
      "countyCode": "640423",
      "countyName": "隆德县" },
    {
      "countyCode": "640424",
      "countyName": "泾源县" },
    {
      "countyCode": "640422",
      "countyName": "西吉县" },
    {
      "countyCode": "640425",
      "countyName": "彭阳县" }] },

  {
    "cityCode": "640100",
    "cityName": "银川市",
    "county": [{
      "countyCode": "640106",
      "countyName": "金凤区" },
    {
      "countyCode": "640105",
      "countyName": "西夏区" },
    {
      "countyCode": "640122",
      "countyName": "贺兰县" },
    {
      "countyCode": "640104",
      "countyName": "兴庆区" },
    {
      "countyCode": "640181",
      "countyName": "灵武市" },
    {
      "countyCode": "640121",
      "countyName": "永宁县" }] }] },


{
  "provinceCode": "650000",
  "provinceName": "新疆维吾尔自治区",
  "city": [{
    "cityCode": "650200",
    "cityName": "克拉玛依市",
    "county": [{
      "countyCode": "650203",
      "countyName": "克拉玛依区" },
    {
      "countyCode": "650205",
      "countyName": "乌尔禾区" },
    {
      "countyCode": "650202",
      "countyName": "独山子区" },
    {
      "countyCode": "650204",
      "countyName": "白碱滩区" }] },

  {
    "cityCode": "652800",
    "cityName": "巴音郭楞蒙古自治州",
    "county": [{
      "countyCode": "652829",
      "countyName": "博湖县" },
    {
      "countyCode": "652824",
      "countyName": "若羌县" },
    {
      "countyCode": "652826",
      "countyName": "焉耆回族自治县" },
    {
      "countyCode": "652823",
      "countyName": "尉犁县" },
    {
      "countyCode": "652822",
      "countyName": "轮台县" },
    {
      "countyCode": "652825",
      "countyName": "且末县" },
    {
      "countyCode": "652801",
      "countyName": "库尔勒市" },
    {
      "countyCode": "652827",
      "countyName": "和静县" },
    {
      "countyCode": "652828",
      "countyName": "和硕县" }] },

  {
    "cityCode": "654200",
    "cityName": "塔城地区",
    "county": [{
      "countyCode": "654223",
      "countyName": "沙湾县" },
    {
      "countyCode": "654201",
      "countyName": "塔城市" },
    {
      "countyCode": "654226",
      "countyName": "和布克赛尔蒙古自治县" },
    {
      "countyCode": "654202",
      "countyName": "乌苏市" },
    {
      "countyCode": "654224",
      "countyName": "托里县" },
    {
      "countyCode": "654221",
      "countyName": "额敏县" },
    {
      "countyCode": "654225",
      "countyName": "裕民县" }] },

  {
    "cityCode": "652200",
    "cityName": "哈密市",
    "county": [{
      "countyCode": "652222",
      "countyName": "巴里坤哈萨克自治县" },
    {
      "countyCode": "652201",
      "countyName": "伊州区" },
    {
      "countyCode": "652223",
      "countyName": "伊吾县" }] },

  {
    "cityCode": "654000",
    "cityName": "伊犁哈萨克自治州",
    "county": [{
      "countyCode": "654027",
      "countyName": "特克斯县" },
    {
      "countyCode": "654024",
      "countyName": "巩留县" },
    {
      "countyCode": "654022",
      "countyName": "察布查尔锡伯自治县" },
    {
      "countyCode": "654004",
      "countyName": "霍尔果斯市" },
    {
      "countyCode": "654023",
      "countyName": "霍城县" },
    {
      "countyCode": "654028",
      "countyName": "尼勒克县" },
    {
      "countyCode": "654003",
      "countyName": "奎屯市" },
    {
      "countyCode": "654021",
      "countyName": "伊宁县" },
    {
      "countyCode": "654025",
      "countyName": "新源县" },
    {
      "countyCode": "654002",
      "countyName": "伊宁市" },
    {
      "countyCode": "654026",
      "countyName": "昭苏县" }] },

  {
    "cityCode": "654300",
    "cityName": "阿勒泰地区",
    "county": [{
      "countyCode": "654325",
      "countyName": "青河县" },
    {
      "countyCode": "654326",
      "countyName": "吉木乃县" },
    {
      "countyCode": "654321",
      "countyName": "布尔津县" },
    {
      "countyCode": "654323",
      "countyName": "福海县" },
    {
      "countyCode": "654301",
      "countyName": "阿勒泰市" },
    {
      "countyCode": "654322",
      "countyName": "富蕴县" },
    {
      "countyCode": "654324",
      "countyName": "哈巴河县" }] },

  {
    "cityCode": "652100",
    "cityName": "吐鲁番市",
    "county": [{
      "countyCode": "652122",
      "countyName": "鄯善县" },
    {
      "countyCode": "652101",
      "countyName": "高昌区" },
    {
      "countyCode": "652123",
      "countyName": "托克逊县" }] },

  {
    "cityCode": "650100",
    "cityName": "乌鲁木齐市",
    "county": [{
      "countyCode": "650121",
      "countyName": "乌鲁木齐县" },
    {
      "countyCode": "650109",
      "countyName": "米东区" },
    {
      "countyCode": "650103",
      "countyName": "沙依巴克区" },
    {
      "countyCode": "650105",
      "countyName": "水磨沟区" },
    {
      "countyCode": "650107",
      "countyName": "达坂城区" },
    {
      "countyCode": "650104",
      "countyName": "新市区" },
    {
      "countyCode": "650102",
      "countyName": "天山区" },
    {
      "countyCode": "650106",
      "countyName": "头屯河区" }] },

  {
    "cityCode": "659002",
    "cityName": "阿拉尔市",
    "county": [{
      "countyCode": "659002-1",
      "countyName": "阿拉尔市" }] },

  {
    "cityCode": "653200",
    "cityName": "和田地区",
    "county": [{
      "countyCode": "653222",
      "countyName": "墨玉县" },
    {
      "countyCode": "653226",
      "countyName": "于田县" },
    {
      "countyCode": "653223",
      "countyName": "皮山县" },
    {
      "countyCode": "653221",
      "countyName": "和田县" },
    {
      "countyCode": "653224",
      "countyName": "洛浦县" },
    {
      "countyCode": "653225",
      "countyName": "策勒县" },
    {
      "countyCode": "653227",
      "countyName": "民丰县" },
    {
      "countyCode": "653201",
      "countyName": "和田市" }] },

  {
    "cityCode": "659003",
    "cityName": "图木舒克市",
    "county": [{
      "countyCode": "659003-1",
      "countyName": "图木舒克市" }] },

  {
    "cityCode": "695005",
    "cityName": "北屯市",
    "county": [{
      "countyCode": "695005-1",
      "countyName": "北屯市" }] },

  {
    "cityCode": "652300",
    "cityName": "昌吉回族自治州",
    "county": [{
      "countyCode": "652302",
      "countyName": "阜康市" },
    {
      "countyCode": "652324",
      "countyName": "玛纳斯县" },
    {
      "countyCode": "652325",
      "countyName": "奇台县" },
    {
      "countyCode": "652323",
      "countyName": "呼图壁县" },
    {
      "countyCode": "652301",
      "countyName": "昌吉市" },
    {
      "countyCode": "652327",
      "countyName": "吉木萨尔县" },
    {
      "countyCode": "652328",
      "countyName": "木垒哈萨克自治县" },
    {
      "countyCode": "652303",
      "countyName": "准东开发区" }] },

  {
    "cityCode": "653100",
    "cityName": "喀什地区",
    "county": [{
      "countyCode": "653128",
      "countyName": "岳普湖县" },
    {
      "countyCode": "653129",
      "countyName": "伽师县" },
    {
      "countyCode": "653126",
      "countyName": "叶城县" },
    {
      "countyCode": "653122",
      "countyName": "疏勒县" },
    {
      "countyCode": "653124",
      "countyName": "泽普县" },
    {
      "countyCode": "653121",
      "countyName": "疏附县" },
    {
      "countyCode": "653131",
      "countyName": "塔什库尔干塔吉克自治县" },
    {
      "countyCode": "653130",
      "countyName": "巴楚县" },
    {
      "countyCode": "653123",
      "countyName": "英吉沙县" },
    {
      "countyCode": "653127",
      "countyName": "麦盖提县" },
    {
      "countyCode": "653125",
      "countyName": "莎车县" },
    {
      "countyCode": "653101",
      "countyName": "喀什市" }] },

  {
    "cityCode": "659001",
    "cityName": "石河子市",
    "county": [{
      "countyCode": "659001-1",
      "countyName": "石河子市" }] },

  {
    "cityCode": "695006",
    "cityName": "铁门关市",
    "county": [{
      "countyCode": "695006-1",
      "countyName": "铁门关市" }] },

  {
    "cityCode": "652900",
    "cityName": "阿克苏地区",
    "county": [{
      "countyCode": "652901",
      "countyName": "阿克苏市" },
    {
      "countyCode": "652922",
      "countyName": "温宿县" },
    {
      "countyCode": "652928",
      "countyName": "阿瓦提县" },
    {
      "countyCode": "652929",
      "countyName": "柯坪县" },
    {
      "countyCode": "652925",
      "countyName": "新和县" },
    {
      "countyCode": "652924",
      "countyName": "沙雅县" },
    {
      "countyCode": "652927",
      "countyName": "乌什县" },
    {
      "countyCode": "652923",
      "countyName": "库车县" },
    {
      "countyCode": "652926",
      "countyName": "拜城县" }] },

  {
    "cityCode": "653000",
    "cityName": "克孜勒苏柯尔克孜自治州",
    "county": [{
      "countyCode": "653023",
      "countyName": "阿合奇县" },
    {
      "countyCode": "653022",
      "countyName": "阿克陶县" },
    {
      "countyCode": "653001",
      "countyName": "阿图什市" },
    {
      "countyCode": "653024",
      "countyName": "乌恰县" }] },

  {
    "cityCode": "659004",
    "cityName": "五家渠市",
    "county": [{
      "countyCode": "659004-1",
      "countyName": "五家渠市" }] },

  {
    "cityCode": "652700",
    "cityName": "博尔塔拉蒙古自治州",
    "county": [{
      "countyCode": "652701",
      "countyName": "博乐市" },
    {
      "countyCode": "652723",
      "countyName": "温泉县" },
    {
      "countyCode": "652722",
      "countyName": "精河县" }] },

  {
    "cityCode": "695007",
    "cityName": "双河市",
    "county": [{
      "countyCode": "695007-1",
      "countyName": "双河市" }] }] },


{
  "provinceCode": "330000",
  "provinceName": "浙江省",
  "city": [{
    "cityCode": "330900",
    "cityName": "舟山市",
    "county": [{
      "countyCode": "330922",
      "countyName": "嵊泗县" },
    {
      "countyCode": "330903",
      "countyName": "普陀区" },
    {
      "countyCode": "330902",
      "countyName": "定海区" },
    {
      "countyCode": "330921",
      "countyName": "岱山县" }] },

  {
    "cityCode": "330800",
    "cityName": "衢州市",
    "county": [{
      "countyCode": "330824",
      "countyName": "开化县" },
    {
      "countyCode": "330803",
      "countyName": "衢江区" },
    {
      "countyCode": "330881",
      "countyName": "江山市" },
    {
      "countyCode": "330802",
      "countyName": "柯城区" },
    {
      "countyCode": "330822",
      "countyName": "常山县" },
    {
      "countyCode": "330825",
      "countyName": "龙游县" }] },

  {
    "cityCode": "330700",
    "cityName": "金华市",
    "county": [{
      "countyCode": "330782",
      "countyName": "义乌市" },
    {
      "countyCode": "330784",
      "countyName": "永康市" },
    {
      "countyCode": "330727",
      "countyName": "磐安县" },
    {
      "countyCode": "330702",
      "countyName": "婺城区" },
    {
      "countyCode": "330726",
      "countyName": "浦江县" },
    {
      "countyCode": "330783",
      "countyName": "东阳市" },
    {
      "countyCode": "330781",
      "countyName": "兰溪市" },
    {
      "countyCode": "330723",
      "countyName": "武义县" },
    {
      "countyCode": "330703",
      "countyName": "金东区" }] },

  {
    "cityCode": "330300",
    "cityName": "温州市",
    "county": [{
      "countyCode": "330302",
      "countyName": "鹿城区" },
    {
      "countyCode": "330322",
      "countyName": "洞头区" },
    {
      "countyCode": "330381",
      "countyName": "瑞安市" },
    {
      "countyCode": "330329",
      "countyName": "泰顺县" },
    {
      "countyCode": "330324",
      "countyName": "永嘉县" },
    {
      "countyCode": "330304",
      "countyName": "瓯海区" },
    {
      "countyCode": "330327",
      "countyName": "苍南县" },
    {
      "countyCode": "330328",
      "countyName": "文成县" },
    {
      "countyCode": "330326",
      "countyName": "平阳县" },
    {
      "countyCode": "330382",
      "countyName": "乐清市" },
    {
      "countyCode": "330303",
      "countyName": "龙湾区" }] },

  {
    "cityCode": "330200",
    "cityName": "宁波市",
    "county": [{
      "countyCode": "330204",
      "countyName": "江东区" },
    {
      "countyCode": "330225",
      "countyName": "象山县" },
    {
      "countyCode": "330212",
      "countyName": "鄞州区" },
    {
      "countyCode": "330226",
      "countyName": "宁海县" },
    {
      "countyCode": "330283",
      "countyName": "奉化区" },
    {
      "countyCode": "330282",
      "countyName": "慈溪市" },
    {
      "countyCode": "330281",
      "countyName": "余姚市" },
    {
      "countyCode": "330211",
      "countyName": "镇海区" },
    {
      "countyCode": "330205",
      "countyName": "江北区" },
    {
      "countyCode": "330206",
      "countyName": "北仑区" },
    {
      "countyCode": "330203",
      "countyName": "海曙区" }] },

  {
    "cityCode": "330100",
    "cityName": "杭州市",
    "county": [{
      "countyCode": "330110",
      "countyName": "余杭区" },
    {
      "countyCode": "330106",
      "countyName": "西湖区" },
    {
      "countyCode": "330109",
      "countyName": "萧山区" },
    {
      "countyCode": "330185",
      "countyName": "临安区" },
    {
      "countyCode": "330122",
      "countyName": "桐庐县" },
    {
      "countyCode": "330103",
      "countyName": "下城区" },
    {
      "countyCode": "330182",
      "countyName": "建德市" },
    {
      "countyCode": "330102",
      "countyName": "上城区" },
    {
      "countyCode": "330127",
      "countyName": "淳安县" },
    {
      "countyCode": "330105",
      "countyName": "拱墅区" },
    {
      "countyCode": "330104",
      "countyName": "江干区" },
    {
      "countyCode": "330108",
      "countyName": "滨江区" },
    {
      "countyCode": "330183",
      "countyName": "富阳区" }] },

  {
    "cityCode": "330400",
    "cityName": "嘉兴市",
    "county": [{
      "countyCode": "330482",
      "countyName": "平湖市" },
    {
      "countyCode": "330402",
      "countyName": "南湖区" },
    {
      "countyCode": "330481",
      "countyName": "海宁市" },
    {
      "countyCode": "330421",
      "countyName": "嘉善县" },
    {
      "countyCode": "330424",
      "countyName": "海盐县" },
    {
      "countyCode": "330411",
      "countyName": "秀洲区" },
    {
      "countyCode": "330483",
      "countyName": "桐乡市" }] },

  {
    "cityCode": "330600",
    "cityName": "绍兴市",
    "county": [{
      "countyCode": "330681",
      "countyName": "诸暨市" },
    {
      "countyCode": "330602",
      "countyName": "越城区" },
    {
      "countyCode": "330682",
      "countyName": "上虞区" },
    {
      "countyCode": "330683",
      "countyName": "嵊州市" },
    {
      "countyCode": "330624",
      "countyName": "新昌县" },
    {
      "countyCode": "330621",
      "countyName": "柯桥区" }] },

  {
    "cityCode": "331100",
    "cityName": "丽水市",
    "county": [{
      "countyCode": "331125",
      "countyName": "云和县" },
    {
      "countyCode": "331121",
      "countyName": "青田县" },
    {
      "countyCode": "331126",
      "countyName": "庆元县" },
    {
      "countyCode": "331124",
      "countyName": "松阳县" },
    {
      "countyCode": "331123",
      "countyName": "遂昌县" },
    {
      "countyCode": "331122",
      "countyName": "缙云县" },
    {
      "countyCode": "331127",
      "countyName": "景宁畲族自治县" },
    {
      "countyCode": "331102",
      "countyName": "莲都区" },
    {
      "countyCode": "331181",
      "countyName": "龙泉市" }] },

  {
    "cityCode": "330500",
    "cityName": "湖州市",
    "county": [{
      "countyCode": "330522",
      "countyName": "长兴县" },
    {
      "countyCode": "330503",
      "countyName": "南浔区" },
    {
      "countyCode": "330523",
      "countyName": "安吉县" },
    {
      "countyCode": "330502",
      "countyName": "吴兴区" },
    {
      "countyCode": "330521",
      "countyName": "德清县" }] },

  {
    "cityCode": "331000",
    "cityName": "台州市",
    "county": [{
      "countyCode": "331024",
      "countyName": "仙居县" },
    {
      "countyCode": "331021",
      "countyName": "玉环市" },
    {
      "countyCode": "331082",
      "countyName": "临海市" },
    {
      "countyCode": "331023",
      "countyName": "天台县" },
    {
      "countyCode": "331003",
      "countyName": "黄岩区" },
    {
      "countyCode": "331004",
      "countyName": "路桥区" },
    {
      "countyCode": "331022",
      "countyName": "三门县" },
    {
      "countyCode": "331002",
      "countyName": "椒江区" },
    {
      "countyCode": "331081",
      "countyName": "温岭市" }] }] },


{
  "provinceCode": "320000",
  "provinceName": "江苏省",
  "city": [{
    "cityCode": "320200",
    "cityName": "无锡市",
    "county": [{
      "countyCode": "320282",
      "countyName": "宜兴市" },
    {
      "countyCode": "320205",
      "countyName": "锡山区" },
    {
      "countyCode": "320211",
      "countyName": "滨湖区" },
    {
      "countyCode": "320281",
      "countyName": "江阴市" },
    {
      "countyCode": "320206",
      "countyName": "惠山区" },
    {
      "countyCode": "320207",
      "countyName": "梁溪区" },
    {
      "countyCode": "320214",
      "countyName": "新吴区" }] },

  {
    "cityCode": "320400",
    "cityName": "常州市",
    "county": [{
      "countyCode": "320412",
      "countyName": "武进区" },
    {
      "countyCode": "320405",
      "countyName": "戚墅堰区" },
    {
      "countyCode": "320481",
      "countyName": "溧阳市" },
    {
      "countyCode": "320402",
      "countyName": "天宁区" },
    {
      "countyCode": "320411",
      "countyName": "新北区" },
    {
      "countyCode": "320404",
      "countyName": "钟楼区" },
    {
      "countyCode": "320482",
      "countyName": "金坛区" }] },

  {
    "cityCode": "320500",
    "cityName": "苏州市",
    "county": [{
      "countyCode": "320509",
      "countyName": "吴江区" },
    {
      "countyCode": "320506",
      "countyName": "吴中区" },
    {
      "countyCode": "320582",
      "countyName": "张家港市" },
    {
      "countyCode": "320508",
      "countyName": "姑苏区" },
    {
      "countyCode": "320571",
      "countyName": "苏州工业园区" },
    {
      "countyCode": "320583",
      "countyName": "昆山市" },
    {
      "countyCode": "320581",
      "countyName": "常熟市" },
    {
      "countyCode": "320505",
      "countyName": "虎丘区" },
    {
      "countyCode": "320507",
      "countyName": "相城区" },
    {
      "countyCode": "320585",
      "countyName": "太仓市" }] },

  {
    "cityCode": "320800",
    "cityName": "淮安市",
    "county": [{
      "countyCode": "320811",
      "countyName": "清浦区" },
    {
      "countyCode": "320829",
      "countyName": "洪泽区" },
    {
      "countyCode": "320802",
      "countyName": "清江浦区" },
    {
      "countyCode": "320803",
      "countyName": "淮安区" },
    {
      "countyCode": "320831",
      "countyName": "金湖县" },
    {
      "countyCode": "320804",
      "countyName": "淮阴区" },
    {
      "countyCode": "320830",
      "countyName": "盱眙县" },
    {
      "countyCode": "320826",
      "countyName": "涟水县" }] },

  {
    "cityCode": "320300",
    "cityName": "徐州市",
    "county": [{
      "countyCode": "320381",
      "countyName": "新沂市" },
    {
      "countyCode": "320324",
      "countyName": "睢宁县" },
    {
      "countyCode": "320311",
      "countyName": "泉山区" },
    {
      "countyCode": "320302",
      "countyName": "鼓楼区" },
    {
      "countyCode": "320305",
      "countyName": "贾汪区" },
    {
      "countyCode": "320303",
      "countyName": "云龙区" },
    {
      "countyCode": "320312",
      "countyName": "铜山区" },
    {
      "countyCode": "320321",
      "countyName": "丰县" },
    {
      "countyCode": "320322",
      "countyName": "沛县" },
    {
      "countyCode": "320382",
      "countyName": "邳州市" }] },

  {
    "cityCode": "321200",
    "cityName": "泰州市",
    "county": [{
      "countyCode": "321203",
      "countyName": "高港区" },
    {
      "countyCode": "321202",
      "countyName": "海陵区" },
    {
      "countyCode": "321283",
      "countyName": "泰兴市" },
    {
      "countyCode": "321284",
      "countyName": "姜堰区" },
    {
      "countyCode": "321282",
      "countyName": "靖江市" },
    {
      "countyCode": "321281",
      "countyName": "兴化市" }] },

  {
    "cityCode": "320700",
    "cityName": "连云港市",
    "county": [{
      "countyCode": "320723",
      "countyName": "灌云县" },
    {
      "countyCode": "320721",
      "countyName": "赣榆区" },
    {
      "countyCode": "320705",
      "countyName": "新浦区" },
    {
      "countyCode": "320722",
      "countyName": "东海县" },
    {
      "countyCode": "320706",
      "countyName": "海州区" },
    {
      "countyCode": "320703",
      "countyName": "连云区" },
    {
      "countyCode": "320724",
      "countyName": "灌南县" }] },

  {
    "cityCode": "321100",
    "cityName": "镇江市",
    "county": [{
      "countyCode": "321112",
      "countyName": "丹徒区" },
    {
      "countyCode": "321102",
      "countyName": "京口区" },
    {
      "countyCode": "321182",
      "countyName": "扬中市" },
    {
      "countyCode": "321181",
      "countyName": "丹阳市" },
    {
      "countyCode": "321183",
      "countyName": "句容市" },
    {
      "countyCode": "321111",
      "countyName": "润州区" }] },

  {
    "cityCode": "320600",
    "cityName": "南通市",
    "county": [{
      "countyCode": "320602",
      "countyName": "崇川区" },
    {
      "countyCode": "320684",
      "countyName": "海门市" },
    {
      "countyCode": "320681",
      "countyName": "启东市" },
    {
      "countyCode": "320612",
      "countyName": "通州区" },
    {
      "countyCode": "320621",
      "countyName": "海安市" },
    {
      "countyCode": "320623",
      "countyName": "如东县" },
    {
      "countyCode": "320611",
      "countyName": "港闸区" },
    {
      "countyCode": "320682",
      "countyName": "如皋市" }] },

  {
    "cityCode": "320900",
    "cityName": "盐城市",
    "county": [{
      "countyCode": "320922",
      "countyName": "滨海县" },
    {
      "countyCode": "320981",
      "countyName": "东台市" },
    {
      "countyCode": "320925",
      "countyName": "建湖县" },
    {
      "countyCode": "320903",
      "countyName": "盐都区" },
    {
      "countyCode": "320921",
      "countyName": "响水县" },
    {
      "countyCode": "320924",
      "countyName": "射阳县" },
    {
      "countyCode": "320902",
      "countyName": "亭湖区" },
    {
      "countyCode": "320923",
      "countyName": "阜宁县" },
    {
      "countyCode": "320982",
      "countyName": "大丰区" }] },

  {
    "cityCode": "320100",
    "cityName": "南京市",
    "county": [{
      "countyCode": "320106",
      "countyName": "鼓楼区" },
    {
      "countyCode": "320115",
      "countyName": "江宁区" },
    {
      "countyCode": "320111",
      "countyName": "浦口区" },
    {
      "countyCode": "320116",
      "countyName": "六合区" },
    {
      "countyCode": "320104",
      "countyName": "秦淮区" },
    {
      "countyCode": "320124",
      "countyName": "溧水区" },
    {
      "countyCode": "320125",
      "countyName": "高淳区" },
    {
      "countyCode": "320113",
      "countyName": "栖霞区" },
    {
      "countyCode": "320107",
      "countyName": "下关区" },
    {
      "countyCode": "320102",
      "countyName": "玄武区" },
    {
      "countyCode": "320105",
      "countyName": "建邺区" },
    {
      "countyCode": "320114",
      "countyName": "雨花台区" },
    {
      "countyCode": "320103",
      "countyName": "白下区" }] },

  {
    "cityCode": "321000",
    "cityName": "扬州市",
    "county": [{
      "countyCode": "321084",
      "countyName": "高邮市" },
    {
      "countyCode": "321023",
      "countyName": "宝应县" },
    {
      "countyCode": "321012",
      "countyName": "江都区" },
    {
      "countyCode": "321003",
      "countyName": "邗江区" },
    {
      "countyCode": "321081",
      "countyName": "仪征市" },
    {
      "countyCode": "321002",
      "countyName": "广陵区" }] },

  {
    "cityCode": "321300",
    "cityName": "宿迁市",
    "county": [{
      "countyCode": "321323",
      "countyName": "泗阳县" },
    {
      "countyCode": "321302",
      "countyName": "宿城区" },
    {
      "countyCode": "321311",
      "countyName": "宿豫区" },
    {
      "countyCode": "321324",
      "countyName": "泗洪县" },
    {
      "countyCode": "321322",
      "countyName": "沭阳县" }] }] },


{
  "provinceCode": "440000",
  "provinceName": "广东省",
  "city": [{
    "cityCode": "445100",
    "cityName": "潮州市",
    "county": [{
      "countyCode": "445123",
      "countyName": "潮安县" },
    {
      "countyCode": "445122",
      "countyName": "饶平县" },
    {
      "countyCode": "445121",
      "countyName": "潮安区" },
    {
      "countyCode": "445102",
      "countyName": "湘桥区" }] },

  {
    "cityCode": "441800",
    "cityName": "清远市",
    "county": [{
      "countyCode": "441802",
      "countyName": "清城区" },
    {
      "countyCode": "441825",
      "countyName": "连山壮族瑶族自治县" },
    {
      "countyCode": "441821",
      "countyName": "佛冈县" },
    {
      "countyCode": "441882",
      "countyName": "连州市" },
    {
      "countyCode": "441823",
      "countyName": "阳山县" },
    {
      "countyCode": "441826",
      "countyName": "连南瑶族自治县" },
    {
      "countyCode": "441827",
      "countyName": "清新区" },
    {
      "countyCode": "441881",
      "countyName": "英德市" }] },

  {
    "cityCode": "441300",
    "cityName": "惠州市",
    "county": [{
      "countyCode": "441303",
      "countyName": "惠阳区" },
    {
      "countyCode": "441322",
      "countyName": "博罗县" },
    {
      "countyCode": "441323",
      "countyName": "惠东县" },
    {
      "countyCode": "441324",
      "countyName": "龙门县" },
    {
      "countyCode": "441302",
      "countyName": "惠城区" }] },

  {
    "cityCode": "445200",
    "cityName": "揭阳市",
    "county": [{
      "countyCode": "445221",
      "countyName": "揭东区" },
    {
      "countyCode": "445224",
      "countyName": "惠来县" },
    {
      "countyCode": "445222",
      "countyName": "揭西县" },
    {
      "countyCode": "445281",
      "countyName": "普宁市" },
    {
      "countyCode": "445202",
      "countyName": "榕城区" }] },

  {
    "cityCode": "440300",
    "cityName": "深圳市",
    "county": [{
      "countyCode": "440303",
      "countyName": "罗湖区" },
    {
      "countyCode": "440306",
      "countyName": "宝安区" },
    {
      "countyCode": "440305",
      "countyName": "南山区" },
    {
      "countyCode": "440307",
      "countyName": "龙岗区" },
    {
      "countyCode": "440311",
      "countyName": "光明区" },
    {
      "countyCode": "440309",
      "countyName": "龙华区" },
    {
      "countyCode": "440308",
      "countyName": "盐田区" },
    {
      "countyCode": "440304",
      "countyName": "福田区" },
    {
      "countyCode": "440312",
      "countyName": "坪山区" },
    {
      "countyCode": "440313",
      "countyName": "大鹏新区" }] },

  {
    "cityCode": "441900",
    "cityName": "东莞市",
    "county": [{
      "countyCode": "441900-1",
      "countyName": "东莞市" }] },

  {
    "cityCode": "441400",
    "cityName": "梅州市",
    "county": [{
      "countyCode": "441422",
      "countyName": "大埔县" },
    {
      "countyCode": "441423",
      "countyName": "丰顺县" },
    {
      "countyCode": "441426",
      "countyName": "平远县" },
    {
      "countyCode": "441481",
      "countyName": "兴宁市" },
    {
      "countyCode": "441427",
      "countyName": "蕉岭县" },
    {
      "countyCode": "441421",
      "countyName": "梅县区" },
    {
      "countyCode": "441424",
      "countyName": "五华县" },
    {
      "countyCode": "441402",
      "countyName": "梅江区" }] },

  {
    "cityCode": "440500-1",
    "cityName": "汕头市",
    "county": [{
      "countyCode": "440515",
      "countyName": "澄海区" },
    {
      "countyCode": "440511",
      "countyName": "金平区" },
    {
      "countyCode": "440523",
      "countyName": "南澳县" },
    {
      "countyCode": "440513",
      "countyName": "潮阳区" },
    {
      "countyCode": "440514",
      "countyName": "潮南区" },
    {
      "countyCode": "440507",
      "countyName": "龙湖区" },
    {
      "countyCode": "440512",
      "countyName": "濠江区" }] },

  {
    "cityCode": "441600",
    "cityName": "河源市",
    "county": [{
      "countyCode": "441602",
      "countyName": "源城区" },
    {
      "countyCode": "441621",
      "countyName": "紫金县" },
    {
      "countyCode": "441624",
      "countyName": "和平县" },
    {
      "countyCode": "441622",
      "countyName": "龙川县" },
    {
      "countyCode": "441625",
      "countyName": "东源县" },
    {
      "countyCode": "441623",
      "countyName": "连平县" }] },

  {
    "cityCode": "445300",
    "cityName": "云浮市",
    "county": [{
      "countyCode": "445322",
      "countyName": "郁南县" },
    {
      "countyCode": "445381",
      "countyName": "罗定市" },
    {
      "countyCode": "445302",
      "countyName": "云城区" },
    {
      "countyCode": "445321",
      "countyName": "新兴县" },
    {
      "countyCode": "445323",
      "countyName": "云安区" }] },

  {
    "cityCode": "440400",
    "cityName": "珠海市",
    "county": [{
      "countyCode": "440404",
      "countyName": "金湾区" },
    {
      "countyCode": "440403",
      "countyName": "斗门区" },
    {
      "countyCode": "440402",
      "countyName": "香洲区" }] },

  {
    "cityCode": "440700",
    "cityName": "江门市",
    "county": [{
      "countyCode": "440785",
      "countyName": "恩平市" },
    {
      "countyCode": "440704",
      "countyName": "江海区" },
    {
      "countyCode": "440705",
      "countyName": "新会区" },
    {
      "countyCode": "440784",
      "countyName": "鹤山市" },
    {
      "countyCode": "440703",
      "countyName": "蓬江区" },
    {
      "countyCode": "440783",
      "countyName": "开平市" },
    {
      "countyCode": "440781",
      "countyName": "台山市" }] },

  {
    "cityCode": "441500",
    "cityName": "汕尾市",
    "county": [{
      "countyCode": "441523",
      "countyName": "陆河县" },
    {
      "countyCode": "441502",
      "countyName": "城区" },
    {
      "countyCode": "441581",
      "countyName": "陆丰市" },
    {
      "countyCode": "441521",
      "countyName": "海丰县" }] },

  {
    "cityCode": "441200",
    "cityName": "肇庆市",
    "county": [{
      "countyCode": "441203",
      "countyName": "鼎湖区" },
    {
      "countyCode": "441224",
      "countyName": "怀集县" },
    {
      "countyCode": "441283",
      "countyName": "高要区" },
    {
      "countyCode": "441284",
      "countyName": "四会市" },
    {
      "countyCode": "441202",
      "countyName": "端州区" },
    {
      "countyCode": "441225",
      "countyName": "封开县" },
    {
      "countyCode": "441226",
      "countyName": "德庆县" },
    {
      "countyCode": "441223",
      "countyName": "广宁县" }] },

  {
    "cityCode": "440200",
    "cityName": "韶关市",
    "county": [{
      "countyCode": "440222",
      "countyName": "始兴县" },
    {
      "countyCode": "440281",
      "countyName": "乐昌市" },
    {
      "countyCode": "440203",
      "countyName": "武江区" },
    {
      "countyCode": "440233",
      "countyName": "新丰县" },
    {
      "countyCode": "440224",
      "countyName": "仁化县" },
    {
      "countyCode": "440232",
      "countyName": "乳源瑶族自治县" },
    {
      "countyCode": "440229",
      "countyName": "翁源县" },
    {
      "countyCode": "440282",
      "countyName": "南雄市" },
    {
      "countyCode": "440205",
      "countyName": "曲江区" },
    {
      "countyCode": "440204",
      "countyName": "浈江区" }] },

  {
    "cityCode": "440600",
    "cityName": "佛山市",
    "county": [{
      "countyCode": "440606",
      "countyName": "顺德区" },
    {
      "countyCode": "440604",
      "countyName": "禅城区" },
    {
      "countyCode": "440607",
      "countyName": "三水区" },
    {
      "countyCode": "440608",
      "countyName": "高明区" },
    {
      "countyCode": "440605",
      "countyName": "南海区" }] },

  {
    "cityCode": "440100",
    "cityName": "广州市",
    "county": [{
      "countyCode": "440114",
      "countyName": "花都区" },
    {
      "countyCode": "440111",
      "countyName": "白云区" },
    {
      "countyCode": "440115",
      "countyName": "南沙区" },
    {
      "countyCode": "440113",
      "countyName": "番禺区" },
    {
      "countyCode": "440183",
      "countyName": "增城区" },
    {
      "countyCode": "440112",
      "countyName": "黄埔区" },
    {
      "countyCode": "440106",
      "countyName": "天河区" },
    {
      "countyCode": "440184",
      "countyName": "从化区" },
    {
      "countyCode": "440105",
      "countyName": "海珠区" },
    {
      "countyCode": "440103",
      "countyName": "荔湾区" },
    {
      "countyCode": "440104",
      "countyName": "越秀区" }] },

  {
    "cityCode": "442000",
    "cityName": "中山市",
    "county": [{
      "countyCode": "442000-1",
      "countyName": "中山市" }] },

  {
    "cityCode": "440800",
    "cityName": "湛江市",
    "county": [{
      "countyCode": "440881",
      "countyName": "廉江市" },
    {
      "countyCode": "440804",
      "countyName": "坡头区" },
    {
      "countyCode": "440882",
      "countyName": "雷州市" },
    {
      "countyCode": "440823",
      "countyName": "遂溪县" },
    {
      "countyCode": "440803",
      "countyName": "霞山区" },
    {
      "countyCode": "440825",
      "countyName": "徐闻县" },
    {
      "countyCode": "440802",
      "countyName": "赤坎区" },
    {
      "countyCode": "440811",
      "countyName": "麻章区" },
    {
      "countyCode": "440883",
      "countyName": "吴川市" }] },

  {
    "cityCode": "441700",
    "cityName": "阳江市",
    "county": [{
      "countyCode": "441781",
      "countyName": "阳春市" },
    {
      "countyCode": "441702",
      "countyName": "江城区" },
    {
      "countyCode": "441721",
      "countyName": "阳西县" },
    {
      "countyCode": "441723",
      "countyName": "阳东区" }] },

  {
    "cityCode": "440900",
    "cityName": "茂名市",
    "county": [{
      "countyCode": "440902",
      "countyName": "茂南区" },
    {
      "countyCode": "440923",
      "countyName": "电白区" },
    {
      "countyCode": "440982",
      "countyName": "化州市" },
    {
      "countyCode": "440903",
      "countyName": "茂港区 " },
    {
      "countyCode": "440981",
      "countyName": "高州市" },
    {
      "countyCode": "440983",
      "countyName": "信宜市" }] }] },


{
  "provinceCode": "810000",
  "provinceName": "香港特别行政区",
  "city": [{
    "cityCode": "810000-1",
    "cityName": "香港",
    "county": [{
      "countyCode": "810400",
      "countyName": "离岛" },
    {
      "countyCode": "810100",
      "countyName": "香港岛" },
    {
      "countyCode": "810300",
      "countyName": "新界" },
    {
      "countyCode": "810200",
      "countyName": "九龙" }] }] }];exports.default = _default;

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/context/Java110Context.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {











var _java110Request = __webpack_require__(/*! ../api/java110Request.js */ 9);

var _ownerApi = __webpack_require__(/*! ../api/owner/ownerApi.js */ 22);

var _propertyApi = __webpack_require__(/*! ../api/property/propertyApi.js */ 23);

var _initApi = __webpack_require__(/*! ../api/init/initApi.js */ 25); /**
                                                   * 上下文对象,再其他文件调用常量 方法 时间工具类时 只引入上下文文件
                                                   * 
                                                   * add by wuxw 2019-12-27
                                                   * 
                                                   * the source opened https://gitee.com/java110/WechatOwnerService
                                                   */var constant = __webpack_require__(/*! ../constant/index.js */ 26);var factory = __webpack_require__(/*! ../factory/index.js */ 28);var util = {}; /**
                                                                                                                                                                 * http 请求 加入是否登录判断
                                                                                                                                                                 */var requestObj = function requestObj(_reqObj) {

  //白名单直接跳过检查登录
  if (constant.url.NEED_NOT_LOGIN_URL.includes(_reqObj.url)) {
    _reqObj.communityId = constant.mapping.HC_TEST_COMMUNITY_ID;
    (0, _java110Request.requestNoAuth)(_reqObj);
    return;
  }
  //校验是否登录，如果没有登录跳转至温馨提示页面
  (0, _java110Request.request)(_reqObj);
};
/**
    * 获取位置
    * add by wuxw 2019-12-28
    */


var getLocation = function getLocation() {
  return wx.getStorageSync('location');
};

var getCurrentLocation = function getCurrentLocation() {
  return wx.getStorageSync('currentLocation');
};
/**
    * 获取用户信息
    * 
    * add by wuxw 2019-12-28
    */
var getUserInfo = function getUserInfo() {
  var _userInfo = wx.getStorageSync(constant.mapping.USER_INFO);

  return JSON.parse(_userInfo);
};

/**
    * 登录标记
    * add  by wuxw 2019-12-28
    */
var getLoginFlag = function getLoginFlag() {
  var _loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
  return _loginFlag;
};

var _loadArea = function _loadArea(_level, _parentAreaCode) {var callBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (_areaList) {};
  var areaList = wx.getStorageSync(constant.mapping.AREA_INFO);
  if (areaList) {
    callBack(areaList);
    return;
  }
  uni.request({
    url: constant.url.areaUrl,
    header: (0, _java110Request.getHeaders)(),
    data: {
      areaLevel: _level,
      // 临时登录凭证
      parentAreaCode: _parentAreaCode },

    success: function success(res) {
      res = res.data;
      var province = [],
      city = [],
      area = [];
      var _currentArea = [];
      province = res.areas.filter(function (item) {
        return item.areaLevel == '101';
      });
      city = res.areas.filter(function (item) {
        return item.areaLevel == '202';
      });
      area = res.areas.filter(function (item) {
        return item.areaLevel == '303';
      });
      var provinceList = {};
      province.forEach(function (item) {
        provinceList[item.areaCode] = item.areaName;
      });
      var cityList = {};
      city.forEach(function (item) {
        cityList[item.areaCode] = item.areaName;
      });
      var quyuList = {};
      area.forEach(function (item) {
        quyuList[item.areaCode] = item.areaName;
      });
      var areaList = {
        province_list: provinceList,
        city_list: cityList,
        county_list: quyuList };

      callBack(areaList); //将 地区信息存储起来

      wx.setStorageSync(constant.mapping.AREA_INFO, areaList);
    },
    fail: function fail(error) {
      // 调用服务端登录接口失败
      wx.showToast({
        title: '调用接口失败' });

      console.log(error);
    } });

};

var getOwner = function getOwner() {var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_ownerInfo) {};
  // 从硬盘中获取 业主信息
  (0, _ownerApi.getCurOwner)().
  then(function (_owner) {
    callBack(_owner);
  });
};


/**
    * 获取当前小区信息
    */


var getCurrentCommunity = function getCurrentCommunity() {
  var communityInfo = wx.getStorageSync(constant.mapping.CURRENT_COMMUNITY_INFO);
  return communityInfo;
};
/**
    * add by shil 2020-01-08
    * 获取当前用户的房屋信息
    */


var getRooms = function getRooms() {
  return new Promise(function (resolve, reject) {
    getOwner(function (_owner) {
      (0, _java110Request.request)({
        url: constant.url.queryRoomsByOwner,
        header: (0, _java110Request.getHeaders)(),
        method: "GET",
        data: {
          communityId: _owner.communityId,
          ownerId: _owner.memberId },

        success: function success(res) {
          if (res.statusCode == 200) {
            //将业主信息和房屋信息一起返回
            res.data['owner'] = _owner;

            if (res.data.rooms.length == 0) {
              wx.showToast({
                title: "未查询到房屋信息",
                icon: 'none',
                duration: 2000 });

            }

            resolve(res);
          } else {
            wx.showToast({
              title: '未查询到房屋信息',
              icon: 'none',
              duration: 2000 });

          }
        },
        fail: function fail(res) {
          //  调用服务端登录接口失败
          wx.showToast({
            title: '调用接口失败' });

          reject(res);
        } });

    });
  });
};

//判断当前登录状态，不调跳转登录界面
var checkLoginStatus = function checkLoginStatus() {
  var loginFlag = wx.getStorageSync(constant.mapping.LOGIN_FLAG);
  var nowDate = new Date();
  if (loginFlag && loginFlag.expireTime > nowDate.getTime()) {
    return true;
  } else {
    return false;
  }
};

/**
    * 跳转功能封装
    * @param {Object} _param 跳转入参
    */
var navigateTo = function navigateTo(_param) {
  var _url = _param.url;
  var _tempUrl = _url.indexOf('?') > 0 ? _url.substring(0, _url.indexOf('?')) : _url;
  //是否需要登录
  constant.url.NEED_NOT_LOGIN_PAGE.forEach(function (item) {
    if (item == _tempUrl) {
      uni.navigateTo(_param);
      return;
    }
  });
  console.log('跳转参数', _param);
  //校验是否登录，如果没有登录跳转至温馨提示页面
  factory.login.checkSession().then(function () {
    //有回话 跳转至相应页面
    uni.navigateTo(_param);
  }, function (error) {//回话过期





    //小程序登录

    factory.login.doLogin();














  });
};


module.exports = {
  constant: constant,
  util: util,
  factory: factory,
  getHeaders: _java110Request.getHeaders,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  getLoginFlag: getLoginFlag,
  _loadArea: _loadArea,
  getCurrentLocation: getCurrentLocation,
  getOwner: getOwner,
  getCurrentCommunity: getCurrentCommunity,
  request: requestObj,
  getRooms: getRooms,
  getProperty: _propertyApi.getProperty,
  checkLoginStatus: checkLoginStatus,
  onLoad: _initApi.onLoad,
  navigateTo: navigateTo };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!***********************************************************************!*\
  !*** D:/HbuliderX_workplace/WechatOwnerService/api/java110Request.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getHeaders = getHeaders;exports.request = request;exports.requestNoAuth = requestNoAuth;var _CoreUtil = _interopRequireDefault(__webpack_require__(/*! ../utils/CoreUtil.js */ 10));

var _AppConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/AppConstant.js */ 11));

var _DateUtil = __webpack_require__(/*! ../utils/DateUtil.js */ 13);

var _url = _interopRequireDefault(__webpack_require__(/*! ../constant/url.js */ 14));

var _MappingConstant = _interopRequireDefault(__webpack_require__(/*! ../constant/MappingConstant.js */ 15));

var _Java110Auth = __webpack_require__(/*! ../auth/Java110Auth.js */ 16);

var _H5Login = __webpack_require__(/*! ../auth/H5Login.js */ 17);



var _MpWeixinLogin = __webpack_require__(/*! ../auth/MpWeixinLogin.js */ 18);



var _AppLogin = __webpack_require__(/*! ../auth/AppLogin.js */ 20);





var _LogUtil = __webpack_require__(/*! ../utils/LogUtil.js */ 21);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                             * 获取请求头信息
                                                                                                                                             * add by 吴学文 QQ：928255095
                                                                                                                                             **/
function getHeaders() {
  var _wAppId = uni.getStorageSync(_MappingConstant.default.W_APP_ID);
  return {
    "app-id": _AppConstant.default.appId,
    "transaction-id": _CoreUtil.default.wxuuid(),
    "req-time": (0, _DateUtil.getDateYYYYMMDDHHMISS)(),
    "sign": '1234567',
    "user-id": '-1',
    "cookie": '_java110_token_=' + wx.getStorageSync('token'),
    "Accept": '*/*',
    "w-app-id": _wAppId };

}
/**
   * http 请求 加入是否登录判断
   */
function request(_reqObj) {

  (0, _LogUtil.debug)('java110Request', 'request', _reqObj);

  //这里判断只有在 post 方式时 放加载框
  if (_reqObj.hasOwnProperty("method") && "POST" == _reqObj.method) {
    uni.showLoading({
      title: '加载中',
      mask: true });

    _reqObj.complete = function () {
      uni.hideLoading();
    };
  }


  var _headers = getHeaders();
  if (_reqObj.hasOwnProperty('header')) {
    var _header = _reqObj.header;
    for (var key in _headers) {
      _header.key = _headers[key];
    }
  } else {
    _reqObj.header = _headers;
  }

  //白名单直接跳过检查登录
  if (_url.default.NEED_NOT_LOGIN_URL.includes(_reqObj.url)) {
    _reqObj.communityId = _MappingConstant.default.HC_TEST_COMMUNITY_ID;
    uni.request(_reqObj);
    return;
  }
  //校验是否登录，如果没有登录跳转至温馨提示页面
  (0, _Java110Auth.checkSession)().then(function () {
    //有回话 跳转至相应页面
    //重写token
    _reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
    uni.request(_reqObj);
  }, function (error) {//回话过期





    //小程序登录

    (0, _MpWeixinLogin.doLogin)();














  });
}

/**
   * 
   * 不用鉴权的 HTTP 请求
   * @param {Object} _reqObj 请求参数
   */
function requestNoAuth(_reqObj) {
  (0, _LogUtil.debug)('java110Request', 'requestNoAuth', _reqObj);
  //这里判断只有在 post 方式时 放加载框
  if (_reqObj.hasOwnProperty("method") && "POST" == _reqObj.method) {
    uni.showLoading({
      title: '加载中',
      mask: true });

    _reqObj.complete = function () {
      uni.hideLoading();
    };
  }
  var _headers = getHeaders();
  if (_reqObj.hasOwnProperty('header')) {
    var _header = _reqObj.header;
    for (var key in _headers) {
      _header.key = _headers[key];
    }
  } else {
    _reqObj.header = _headers;
  }

  _reqObj.header.cookie = '_java110_token_=' + wx.getStorageSync('token');
  uni.request(_reqObj);

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map