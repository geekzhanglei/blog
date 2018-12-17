<template>
    <div class="not-found">
        <p class="expression">o(╥﹏╥)o</p>
        <h1>404</h1>
        <h1>哎呀，页面发生了错误</h1>
        <hr>
        <div class="content">
            <div class="left">
                <h4>可能原因：</h4>
                <ol>
                    <li>网络太差或断网了</li>
                    <li>输入的网址不正确</li>
                    <li>这个服务器魔怔了</li>
                </ol>
            </div>
            <div class="right">
                <h4>可以尝试：</h4>
                <ol>
                    <li>
                        <a href="https://www.feroad.com/">返回首页</a>
                    </li>
                    <li>
                        <a href="javascript:history.back(-1)">返回上页</a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=IRAQERISERYTERRhUFAPQk5M"
                            style="text-decoration:none;"
                        >联系站长</a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
<style scoped>
body {
    width: 35em;
    margin: 0 auto;
    font-family: Tahoma, Verdana, Arial, sans-serif;
    text-align: center;
}
.not-found {
    width: 80%;
    margin: 2rem auto;
}
.expression {
    font-size: 5rem;
    line-height: 5rem;
    margin-top: 5rem;
}

.content {
    margin: 0 auto;
}

.content .left {
    float: left;
}

.content .right {
    float: right;
}
</style>
