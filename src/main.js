/* 项目的入口文件，主要作用是初始化vue实例并使用需要的插件 */
import Vue from 'vue';
import App from './App';


Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({ ...App });
app.$mount();
