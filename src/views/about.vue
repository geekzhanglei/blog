<template>
    <div class="container">
        <a class="aboutBgImg" href="javascript:;">
            <img src="http://img.feroad.com/programmer.gif" />
        </a>
        <div class="cont">
            <h2 id="intro">项目概述</h2>
            <p>这是一个为学习和实践前后端技术而搭建的博客</p>
            <h3>技术栈演进：</h3>
            <h4>1. 当前技术栈(vue/cli@3.0+vue+element-ui+nodejs(koa2)+mysql)</h4>
            <p>
                不想理解后端的前端不是好前端，我重写了后端接口，对后端有了基础了解，源码在这里：
                <a
                    href="https://github.com/geekzhanglei/blog"
                >前端源码</a> ----
                <a href="https://github.com/geekzhanglei/beta_mysql">后端源码</a>
            </p>
            <h4>2. 中期迭代技术栈(nuxtjs+php+mysql)</h4>
            <p>
                实践了vue的服务端渲染nuxtjs，试图提高加载速度，源码在这里:
                <a
                    href="https://github.com/geekzhanglei/blog-nuxt"
                >前端源码</a>
                后端还是民哥
            </p>
            <h4>3. 中期技术栈(vue+vue-router+vuex+vue-cli@2.0+axios+php+mysql)</h4>
            <p>上vue全家桶，抛弃jquery、grunt，后端依然是民哥</p>
            <h4>4. 初期技术栈(lithe(seajs)+grunt+vue+jquery+bootstrap+php+mysql)</h4>
            <p>
                <span>我是前端，这套比较"杂"的技术栈来源于工作实践，源码在这里：</span>
                <a href="https://github.com/geekzhanglei/blogbeta">初代前端源码传送门</a>
                后端是不愿意透露姓名的民哥
            </p>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.aboutBgImg {
    display: block;
    background: transparent;
    border: 1px solid #d0c2c2;
    width: 60%;
    margin: 0 auto;
}

.aboutBgImg:hover {
    border: 1px solid #8990d8;
}

.aboutBgImg img {
    width: 60%;
    height: 225px;
    display: block;
    margin: 0.5em auto;
}
.cont {
    margin: 0 auto;
    width: 80%;
    height: 50vh;
    overflow-y: auto;
}
@media screen and (max-width: 600px) {
    .container {
        width: 90%;
    }
    .aboutBgImg {
        width: 100%;
    }
    .aboutBgImg img {
        width: 90%;
    }
    .cont {
        width: 90%;
    }
}
</style>
