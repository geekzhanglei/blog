<template>
    <el-container>
        <el-header style="height:4rem">
            <div class="admin-title"><a href="https://blog.feroad.com">传送门</a></div>
            <div class="admin-info">
                <div class="infos">
                    <img :src="imgsrc">
                    <span class="avatar-name">{{nickname}}</span>
                </div>
                <div class="layer">
                    <i class="arrow"></i>
                    <ul>
                        <li>
                            <router-link :to="{name: 'info'}" replace>设置</router-link>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li><a @click="loginout">退出登录</a></li>
                    </ul>
                </div>
            </div>
        </el-header>
        <el-container class="main-wrap">
            <el-aside :width="asideWidth">
                <el-menu default-active="3" class="el-menu-vertical" text-color="#fff" background-color="#2e363f" :router="true" :collapse="isCollapse">
                    <el-menu-item index="info">
                        <i class="el-icon-service"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-submenu index="admin">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>文章管理</span>
                        </template>
                        <el-menu-item index="release">
                            <template slot="title">
                                <i class="el-icon-edit-outline"></i>
                                <span>发表文章</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="delete">
                            <template slot="title">
                                <i class="el-icon-delete"></i>
                                <span>删除文章</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="comments">
                        <i class="el-icon-date"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="msg">
                        <i class="el-icon-news"></i>
                        <span slot="title">动态管理</span>
                    </el-menu-item>
                    <el-menu-item index="option">
                        <i class="el-icon-menu"></i>
                        <span slot="title">常用选项</span>
                    </el-menu-item>
                </el-menu>
                <div class="aside-tips">
                    <i @click="isSidebar()" v-if="isCollapse" class="el-icon-upload2"></i>
                    <i @click="isSidebar()" v-else class="el-icon-download"></i>
                </div>
            </el-aside>
            <el-main class="admin-content">
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>

</template>
<script>
import { getAdminInfo, loginOut } from '@/assets/js/apis';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            isCollapse: false,
            asideWidth: '200px',
            articleAdm: false
        };
    },
    computed: mapState({
        nickname: state => state.nickname,
        imgsrc: state => state.headimg
    }),
    methods: {
        toggleAticleAdm: function() {
            this.articleAdm = !this.articleAdm;
        },
        // 收起展开侧边栏
        isSidebar: function() {
            if (this.isCollapse) {
                this.isCollapse = false;
                this.asideWidth = '200px';
            } else {
                this.isCollapse = true;
                this.asideWidth = '64px';
            }
        },
        getInfo: function() {
            getAdminInfo({}).then(res => {
                var data = res.result.data;
                if (res.result.status == 1) {
                    this.$store.commit({
                        type: 'setInfo',
                        nickname: data.nickname,
                        headimg: data.head_img
                    });
                }
            });
        },
        loginout: function() {
            if (!window.localStorage.token) {
                alert('游客无权操作');
                return;
            }
            // 通知后台注销
            loginOut({ token: window.localStorage.token }).then(res => {
                if (res.stat) {
                    // 清除本地token
                    window.localStorage.removeItem('token');
                    this.$router.replace({
                        path: '/login'
                    });
                }
            });
        },
        init: function() {
            this.getInfo();
        }
    },
    mounted: function() {
        this.init();
        // 跳转到文章发布页
        if (this.$router.currentRoute.path === '/admin') {
            this.$router.replace({
                path: '/admin/info'
            });
        }
    }
};
</script>

<style>
/* header */
.el-header {
    height: 4rem;
    line-height: 4rem;
    padding: 0;
    background-color: #242f42;
    display: flex;
    justify-content: space-between;
}
.admin-title {
    float: left;
    text-align: center;
    width: 200px;
}
.admin-title a {
    color: #fff;
}
.admin-title a:hover {
    cursor: pointer;
}
.admin-info {
    margin-right: 2rem;
    padding-right: 1rem;
    /* font-size: 1.6rem; */
    color: #fff !important;
    cursor: pointer;
    position: relative;
}
.admin-info:hover .layer {
    visibility: visible;
    opacity: 1;
}
.infos {
    display: flex;
    align-items: center;
}
.infos img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
.infos .avatar-name {
    padding-left: 2.5rem;
}
.layer {
    color: #0692fb;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    z-index: 100;
    min-width: 8rem;
    font-size: 1.2rem;
    text-align: center;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
}
.layer .router-link-active {
    background-color: transparent !important;
}
.layer ul li a {
    width: 100%;
    display: inline-block;
}
.layer ul {
    border: 0.1rem solid #ccc;
    border: 0.1rem solid rgba(0, 0, 0, 0.15);
    border-top: 0;
    background-color: #fff;
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    border-radius: 0.4rem;
    -webkit-box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.175);
    box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.175);
}
.layer .arrow {
    margin: 0 auto;
    display: block;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    color: #666;
    border-top: 0.5rem dashed transparent;
    border-left: 1rem dashed transparent;
    border-right: 1rem dashed transparent;
    border-bottom: 1rem solid #fff;
}
.layer .divider {
    height: 0.1rem;
    margin: 0.5rem 0;
    overflow: hidden;
    background-color: #e5e5e5;
}
.layer li {
    line-height: 3rem;
}
.layer li:hover {
    background-color: #bfcbd9;
}
/* main-wrap */
.main-wrap {
    position: absolute;
    bottom: 0;
    top: 4rem;
    width: 100%;
}
/* aside */
.el-aside {
    height: 100%;
    background: #2e363f;
    position: relative;
}
.aside-tips {
    border-top: 0.1rem solid #48576a;
    color: #909399;
    height: 3rem;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    width: 100%;
}
.aside-tips i {
    transform: rotate(90deg);
    vertical-align: middle;
    float: right;
    margin-right: 1.8rem;
    font-size: 1.5rem;
    cursor: pointer;
}
.aside-tips i:hover {
    color: #9ec4e7;
}
.el-menu {
    border-right: none;
}
/* main */
.el-main {
    display: flex;
    flex: 1;
    background: #fbfbfb;
    position: relative;
    background-color: #fbfbfb;
    height: 100%;
    overflow: auto;
}
/* 内容部分 */
.admin-content {
    padding: 2rem 3rem;
}
</style>
<style>
/*admin common css*/
.tips {
    margin: 2rem 0 1rem 0;
}
.tips:first-child {
    margin-top: 0;
}
.el-pagination {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
/* 覆盖element table展开行标志 */
.hide-expand .el-table__expand-column .el-icon {
    visibility: hidden;
}
/* common css end */
</style>

