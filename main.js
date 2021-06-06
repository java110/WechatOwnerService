import Vue from 'vue';
import App from './App';

import vc from './core/vcFramework.js'


Vue.config.productionTip = false;

Vue.prototype.vc = vc;  

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
