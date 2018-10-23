<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="admin"><a href="@/../admin.html">管理后台</a></el-menu-item>
            <el-menu-item index="me">
                <router-link tag="li" :to="{name:'about'}" class="h_msg ani-menulist" exact>
                    <a>关于博客</a>
                </router-link>
            </el-menu-item>
            <el-menu-item index="word">
                <router-link tag="li" :to="{name:'msg'}" class="h_msg ani-menulist" exact>
                    <a>微言大义</a>
                </router-link>
            </el-menu-item>
            <el-menu-item index="message">
                <router-link tag="li" :to="{name: 'index'}" class="h_article ani-menulist">
                    <a>连篇累牍</a>
                </router-link>
            </el-menu-item>
        </el-menu>
    </div>

    <!-- <nav class="navbar navbar-default nav-bgcolor">,
        <div class="navbar-header">,
            <a href="/html/admin.html" class="navbar-brand">管理后台</a>,
            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">,
                <span class="sr-only">Toggle navigation</span>,
                <span class="icon-bar"></span>,
                <span class="icon-bar"></span>,
                <span class="icon-bar"></span>,
            </button>,
        </div>,
        <div class="collapse navbar-collapse">,
            <ul class="nav navbar-nav navbar-right">,
                <router-link tag="li" :to="{name: \'article\'}" class="h_article ani-menulist">,
                    <a>连篇累牍</a>,
                </router-link>,
                <router-link tag="li" :to="{name:\'msg\'}" class="h_msg ani-menulist" exact>,
                    <a>微言大义</a>,
                </router-link>,
                <router-link tag="li" :to="{name:\'about\'}" class="h_msg ani-menulist" exact>,
                    <a>关于</a>,
                </router-link>,
            </ul>,
        </div>,
    </nav> -->
</template>
<script>
export default {
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
<style scoped>
.el-menu-item {
    float: right;
}
.el-menu-item:first-child {
    float: left;
}
</style>


