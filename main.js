import Vue from 'vue';
import App from './App';

import vc from './core/vcFramework.js'
// 小程序全局分享设置
import share from './common/mixin/shareMixin.js'
Vue.mixin(share)

Vue.config.productionTip = false;

Vue.prototype.vc = vc;  

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
