/*
 * @Author: zhanglei
 * @Date: 2019-09-20 14:45:34
 * @LastEditors: zhanglei
 * @LastEditTime: 2019-09-20 15:16:21
 * @Description:
 */
// import Vue from 'vue';
import App from '../App.vue';
import router from '../router';
import store from '../store';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
// Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
