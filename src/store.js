/*
 * @Author: zhanglei
 * @Date: 2019-09-10 16:06:26
 * @LastEditors: zhanglei
 * @LastEditTime: 2019-09-10 16:06:26
 * @Description: 
 */
import Vuex from 'vuex';
import imgDefault from '@/assets/img/avatar.png';
import global from '@/assets/js/global';

Vue.use(Vuex);

export default new Vuex.Store({
    // 仅在开发阶段开启严格模式，避免性能损失
    strict: process.env.NODE_ENV !== 'production',
    debug: true,
    state: {
        nickname: '管理员',
        headimg: imgDefault
    },
    getters: {},
    mutations: {
        setInfo(state, payload) {
            state.nickname = payload.nickname;
            state.headimg = `${global.apiDomain}${payload.headimg}`;
        },
        setNickname(state, payload) {
            state.nickname = payload;
        },
        setHeadimg(state, payload) {
            state.headimg = payload;
        }
    },
    actions: {}
});
