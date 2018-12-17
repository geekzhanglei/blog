import Vue from 'vue';
import Router from 'vue-router';
// 业务子页
import Index from '@/views/index';
import Article from '@/views/article';
import About from '@/views/about';
import Msg from '@/views/msg';
import Login from '@/views/login';
import Admin from '@/views/admin/admin';
import AdminDelete from '@/views/admin/delete';
import AdminRelease from '@/views/admin/release';
import AdminComments from '@/views/admin/comments';
import AdminMsg from '@/views/admin/msg';
import AdminInfo from '@/views/admin/info';
import AdminOption from '@/views/admin/option';
import NotFoundComponent from '@/components/common/NotFoundComponent';
// 公共组件
import Header from "@/components/common/header";
import Footer from '@/components/common/footer';
import Canvas from '@/components/common/canvas';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            // 首页即列表页
            path: '/',
            name: 'index',
            components: {
                default: Index,
                header: Header,
                footer: Footer,
                canvas: Canvas
            }
        },
        {
            // 文章详情
            path: '/article/:id',
            name: 'article',
            components: {
                default: Article,
                header: Header,
                footer: Footer,
                canvas: Canvas
            }
        },
        {
            // 微言大义
            path: '/msg',
            name: 'msg',
            components: {
                default: Msg,
                header: Header,
                footer: Footer,
                canvas: Canvas
            }
        },
        {
            // 关于
            path: '/about',
            name: 'about',
            components: {
                default: About,
                header: Header,
                footer: Footer,
                canvas: Canvas
            }
        },
        // admin部分
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [{
                    path: '/admin/delete',
                    name: 'delete',
                    component: AdminDelete
                },
                {
                    path: '/admin/release',
                    name: 'release',
                    component: AdminRelease
                },
                {
                    path: '/admin/comments',
                    name: 'comments',
                    component: AdminComments
                },
                {
                    path: '/admin/msg',
                    name: 'adminmsg',
                    component: AdminMsg
                },
                {
                    path: '/admin/info',
                    name: 'info',
                    component: AdminInfo
                },
                {
                    path: '/admin/option',
                    name: 'option',
                    component: AdminOption
                }
            ]
        },
        {
            path: '*',
            component: NotFoundComponent
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    }
});
