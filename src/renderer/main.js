import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件需要单独引入
import axios from 'axios';

import App from './App';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    template: '<App/>'
}).$mount('#app');
