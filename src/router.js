/*
 * @Author: zhanglei
 * @Date: 2019-09-10 16:06:26
 * @LastEditors: zhanglei
 * @LastEditTime: 2019-09-20 15:20:05
 * @Description: 路由组件
 */
import Router from 'vue-router';
// 业务子页
const Index = () =>
    import(/* webpackChunkName: "IndexChunk" */ '@/views/index');
const Article = () =>
    import(/* webpackChunkName: "ArticleChunk" */ '@/views/article');
const About = () =>
    import(/* webpackChunkName: "AboutChunk" */ '@/views/about');
const Msg = () => import(/* webpackChunkName: "MsgChunk" */ '@/views/msg');
const Login = () =>
    import(/* webpackChunkName: "loginChunk" */ '@/views/login');
const Admin = () =>
    import(/* webpackChunkName: "AdminChunk" */ '@/views/admin/admin');
const AdminDelete = () =>
    import(/* webpackChunkName: "AdminDeleteChunk" */ '@/views/admin/delete');
const AdminRelease = () =>
    import(/* webpackChunkName: "AdminReleaseChunk" */ '@/views/admin/release');
const AdminComments = () =>
    import(/* webpackChunkName: "AdminCommentsChunk" */ '@/views/admin/comments');
const AdminMsg = () =>
    import(/* webpackChunkName: "AdminMsgChunk" */ '@/views/admin/msg');
const AdminInfo = () =>
    import(/* webpackChunkName: "AdminInfoChunk" */ '@/views/admin/info');
const AdminOption = () =>
    import(/* webpackChunkName: "AdminOptionChunk" */ '@/views/admin/option');
// const NotFoundComponent = () =>
//     import(/* webpackChunkName: "NotFoundComponentChunk" */ '@/views/admin/NotFoundComponent');

// 公共组件
const Header = () =>
    import(/* webpackChunkName: "HeaderChunk" */ '@/components/common/header');
const Footer = () =>
    import(/* webpackChunkName: "FooterChunk" */ '@/components/common/footer');
const Canvas = () =>
    import(/* webpackChunkName: "CanvasChunk" */ '@/components/common/canvas');

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
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
            children: [
                {
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
        }
        // {
        //     path: '*',
        //     component: NotFoundComponent
        // }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    }
});
