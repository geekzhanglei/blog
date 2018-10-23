<template>
    <div class="container">
        <a class="aboutBgImg" href="javascript:;"><img src="@/assets/img/programmer.gif"></a>
        <div class="cont">
            <h2 id="intro">项目概述</h2>
            <p>这是一个为学习和实践前后端技术而搭建的博客</p>
            <p>当前技术栈：vue/cli@3.0+vue+element-ui+nodejs+mongodb（过渡期保留php+mysql的后端）</p>
            <p>前端：geekzl <a href="https://github.com/geekzhanglei/blog">(重构前端源码)</a></p>
            <p>后端：大民哥</p>
            <p>联系方式:</p>
            <ul>
                <li>qq: <code>1103307205</code></li>
                <li>电子邮箱: <code>1103307205@qq.com</code></li>
            </ul>
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
}
</style>
