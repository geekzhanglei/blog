import Vue from 'vue';
import Router from 'vue-router';
// 业务子页
import Index from '@/views/index';
import Article from '@/views/article';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            // 首页即列表页
            path: '/',
            name: 'index',
            component: Index
        },
        {
            // 文章详情
            path: '/article/:id',
            name: 'article',
            components: Article
        }
        // {
        //     path: '/login',
        //     name: 'login',
        //     components: {
        //         login: {
        //             template: '<blog-login></blog-login>'
        //         }
        //     }
        // },
        // {
        //     path: '/admin',
        //     name: 'admin',
        //     components: {
        //         admin: {
        //             template: '<blog-admin></blog-admin>'
        //         }
        //     },
        //     children: [
        //         {
        //             path: '/admin/delete',
        //             name: 'delete',
        //             components: {
        //                 delete: {
        //                     template: '<blog-delete></blog-delete>'
        //                 }
        //             }
        //         },
        //         {
        //             path: '/admin/release',
        //             name: 'release',
        //             components: {
        //                 release: {
        //                     template: '<blog-release></blog-release>'
        //                 }
        //             }
        //         },
        //         {
        //             path: '/admin/comments',
        //             name: 'comments',
        //             components: {
        //                 comments: {
        //                     template: '<blog-comments></blog-comments>'
        //                 }
        //             }
        //         },
        //         {
        //             path: '/admin/msg',
        //             name: 'adminmsg',
        //             components: {
        //                 msg: {
        //                     template: '<blog-msg></blog-msg>'
        //                 }
        //             }
        //         },
        //         {
        //             path: '/admin/info',
        //             name: 'info',
        //             components: {
        //                 info: {
        //                     template: '<blog-info></blog-info>'
        //                 }
        //             }
        //         },
        //         {
        //             path: '/admin/option',
        //             name: 'option',
        //             components: {
        //                 option: {
        //                     template: '<blog-option></blog-option>'
        //                 }
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '/article',
        //     name: 'article',
        //     components: {
        //         list: {
        //             template: '<blog-articlelist></blog-articlelist>'
        //         }
        //     }
        // },
        // {
        //     // 文章详情
        //     path: '/article/:id',
        //     name: 'articleid',
        //     components: {
        //         article: {
        //             template: '<blog-article></blog-article>'
        //         }
        //     }
        // },
        // {
        //     path: '/about',
        //     name: 'about',
        //     components: {
        //         about: {
        //             template: '<blog-about></blog-about>'
        //         }
        //     }
        // },
        // {
        //     path: '/msg',
        //     name: 'msg',
        //     components: {
        //         msg: {
        //             template: '<blog-msg></blog-msg>'
        //         }
        //     }
        // }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    }
    // routes: [
    //     {
    //         path: '/',
    //         name: 'home',
    //         component: Home
    //     },
    //     {
    //         path: '/about',
    //         name: 'about',
    //         // route level code-splitting
    //         // this generates a separate chunk (about.[hash].js) for this route
    //         // which is lazy-loaded when the route is visited.
    //         component: () =>
    //             import(/* webpackChunkName: "about" */ './views/About.vue')
    //     }
    // ]
});
