import Vue from 'vue';
import Admin from '../Admin.vue';
import router from '../router';
import store from '../store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(Admin)
}).$mount('#admin');
