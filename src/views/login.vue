<template>
    <div class="login-wrap">
        <div class="login-title">博客管理后台</div>
        <div class="login-panel" @keyup.13="loginConfirm()">
            <el-input class="login-name" v-model="loginname" placeholder="username" maxlength="14"></el-input>
            <el-input
                class="login-pwd"
                v-model="loginpwd"
                placeholder="password"
                maxlength="12"
                type="password"
            ></el-input>
            <div class="btn-wrap">
                <el-button class="login-submit left" type="primary" v-on:click="loginConfirm()">登录</el-button>
                <el-button
                    class="login-submit right"
                    type="primary"
                    v-on:click="visitorLogin()"
                >游客登录</el-button>
            </div>
            <div class="case-number" :class="{errTip:isErr}">{{tips}}</div>
        </div>
    </div>
</template>
<script>
import { adminLogin, isLogin } from "@/assets/js/apis";

export default {
    data: function() {
        return {
            loginname: "",
            loginpwd: "",
            isErr: false,
            tips: "内测，仅允许管理员登陆"
        };
    },
    methods: {
        loginConfirm: function() {
            var _this = this;
            if (this.loginname && this.loginpwd) {
                this.isErr = false;

                adminLogin({
                    username: _this.loginname,
                    password: _this.loginpwd
                }).then(res => {
                    if (res.stat) {
                        var storage = window.localStorage;
                        storage.setItem("token", res.token);
                        _this.loginname = "";
                        _this.loginpwd = "";
                        _this.$router.replace({
                            name: "admin"
                        });
                    } else {
                        _this.isErr = true;
                        _this.tips = "账号或密码错误";
                    }
                });
            } else {
                // 错误信息提示
                this.isErr = true;
                this.tips = "帐号或密码不能为空";
                return;
            }
        },
        visitorLogin: function() {
            this.$router.replace({
                name: "admin"
            });
        },
        init: function() {
            var _this = this;
            //判断是否登陆,请求后端验证token
            if (window.localStorage.token) {
                isLogin({ token: window.localStorage.token }).then(res => {
                    if (res.stat) {
                        console.log(res.data);
                        _this.loginname = "";
                        _this.loginpwd = "";
                        this.$router.replace({
                            name: "admin"
                        });
                    } else {
                        console.log("重新登陆");
                    }
                });
            }
        }
    },
    mounted: function() {
        this.init();
    }
};
</script>
<style scoped>
#login {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#admin {
    font-size: 62.5%;
}
.login-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #335465;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-title {
    font-size: 2rem;
    color: #fff;
}

.login-panel {
    width: 20%;
    margin-top: 2rem;
    padding: 3rem;
    border-radius: 0.5rem;
    background: #fff;
    text-align: center;
    font-size: 1.4rem;
}

.login-name {
    margin-bottom: 1rem;
}
.login-pwd {
    margin-bottom: 2rem;
}
.btn-wrap {
    display: flex;
    justify-content: space-around;
}
.login-submit {
    width: 10rem;
    cursor: pointer;
    background-color: #20a0ff;
}
.case-number {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #5d5d5d;
}

/*tips  */
.errTip {
    color: red;
}
</style>
