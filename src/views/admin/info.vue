<template>
    <div class="wrap-info">
        <div class="tips">
            <span>
                <i class="el-icon-service"></i> 用户信息-修改管理员信息
            </span>
        </div>
        <el-row>
            <el-col :span="6" class="info-sidebar">
                <ul @click="switchBar">
                    <li :class="{visited:visitedNum == 1}">基础信息</li>
                    <li :class="{visited:visitedNum == 2}">修改密码</li>
                </ul>
            </el-col>
            <el-col :span="18" class="info-main">
                <div v-if="visitedNum==1" class="base-info">
                    <div v-if="!showEditInfo" class="info-headinfo">
                        <span @click="editInfo" class="edit-link">编辑</span>
                        <div class="info-avatar">
                            <img :src="imgsrc" alt="img is gone" />
                        </div>
                        <div class="info-nickname">{{nickname}}</div>
                    </div>
                    <div v-else class="edit-info">
                        <div class="info-avatar">
                            <div @click="clickInput" class="info-img">
                                <img :src="imgsrc" />
                            </div>
                            <input @change="uploadImg" type="file" style="display:none" ref="input" />
                            <div class="edit-username">
                                <input type="text" v-model="inputName" placeholder="请输入您的昵称" />
                                <em v-if="showNicknameErr&&showNameErr" class="err">昵称不能为空</em>
                            </div>
                            <div class="edit-confirm">
                                <a @click="saveName" href="javascript:;">保存</a>
                                <a @click="editInfo" href="javascript:;">取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="visitedNum==2" class="modify-pswd">
                    <dl v-if="!showModifyPwOK">
                        <dt>
                            <p>当前账号：{{nickname}}</p>
                        </dt>
                        <dd>
                            <input
                                type="password"
                                v-model="oldPswd"
                                @input="showPwErr(1)"
                                placeholder="请输入当前密码"
                            />
                            <span v-if="errTip.one" class="info-err">请输入6-16位密码，字母区分大小写</span>
                            <span v-if="errTip.pswdErr" class="info-err">原密码输入错误，请核对后再输入</span>
                        </dd>
                        <dd>
                            <input
                                type="password"
                                v-model="newPswd"
                                @input="showPwErr(2)"
                                placeholder="请输入新密码"
                            />
                            <span v-if="errTip.two" class="info-err">请输入6-16位密码，字母区分大小写</span>
                        </dd>
                        <dd>
                            <input
                                type="password"
                                v-model="confirmPswd"
                                @input="showPwErr(3)"
                                placeholder="确认新密码"
                            />
                            <span v-if="errTip.three" class="info-err">两次输入的密码不一致，请重新输入</span>
                        </dd>
                        <dd>
                            <input @click="savePswd" type="submit" value="保存" />
                        </dd>
                    </dl>
                    <div v-else class="updatePw">
                        <h3>修改密码成功，请重新登录</h3>
                        <h4>
                            <span>{{countdown}}</span>s后自动退出
                        </h4>
                        <a href="javascript:;" @click="loginout()" class="modifyPw-btn">直接退出</a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { loginOut, modifyPsw, modifyAdministerInfo } from "@/assets/js/apis";
import { mapState } from "vuex";
import { Message } from "element-ui";
const Base64 = require("js-base64").Base64;

export default {
    data: function() {
        return {
            visitedNum: 1,
            showEditInfo: false,
            inputName: "",
            showNameErr: false,
            showModifyPwOK: false,
            errTip: {
                one: false,
                two: false,
                three: false,
                pswdErr: false
            },
            oldPswd: "",
            newPswd: "",
            confirmPswd: "",
            countdown: 5,
            file: ""
        };
    },
    computed: {
        showNicknameErr() {
            if (this.showNameErr && this.inputName) {
                return false;
            } else {
                return true;
            }
        },
        countdownJump() {
            console.log(typeof this.countdown);
            console.log("测试");
            if (!this.countdown) {
                this.countdown = 5;
                this.loginout();
            }
        },
        ...mapState({
            nickname: state => state.nickname,
            imgsrc: state => state.headimg
        })
    },

    methods: {
        switchBar: function(e) {
            var name = e.target.innerText;
            this.showEditInfo = false;
            switch (name) {
                case "基础信息":
                    this.visitedNum = 1;
                    break;
                case "修改密码":
                    this.visitedNum = 2;
                    break;
                default:
                    break;
            }
        },
        editInfo: function() {
            this.showNameErr = false;
            this.showEditInfo = !this.showEditInfo;
            this.inputName = "";
        },
        saveName: function() {
            if (this.inputName) {
                // 请求接口
                this.$store.commit("setNickname", this.inputName);
                // 上传头像接口
                // xhr2标准实现的FormData接口通过上传文件
                var formdata = new FormData();
                formdata.append("nickname", this.$store.state.nickname);
                formdata.append("token", window.localStorage.token);
                formdata.append("headImg", this.file);
                modifyAdministerInfo(formdata).then(res => {
                    console.log(res);
                });
                // 更新个人信息到页眉右上角
                this.showEditInfo = false;
            } else {
                this.showNameErr = true;
            }
        },
        clickInput: function() {
            this.$refs.input.click();
        },
        uploadImg: function(e) {
            this.file = e.target.files[0];
            // 图片预览
            this.$store.commit(
                "setHeadimg",
                window.URL.createObjectURL(this.file)
            );
        },
        showPwErr: function(n) {
            switch (n) {
                case 1:
                    if (this.oldPswd.length < 6 || this.oldPswd.length > 16) {
                        this.errTip.pswdErr = false;
                        this.errTip.one = true;
                    } else {
                        this.errTip.one = false;
                    }
                    break;
                case 2:
                    if (this.newPswd.length < 6 || this.newPswd.length > 16) {
                        this.errTip.two = true;
                    } else {
                        this.errTip.two = false;
                    }
                    break;
                case 3:
                    if (this.newPswd != this.confirmPswd) {
                        this.errTip.three = true;
                    } else {
                        this.errTip.three = false;
                    }
                    break;
                default:
                    break;
            }
        },
        savePswd: function() {
            var bool = this.errTip.one && this.errTip.two && this.errTip.three;
            if (!bool) {
                if (this.oldPswd == this.newPswd) {
                    alert("新密码不能与旧密码相同");
                }
                // 发送原密码和新密码，原密码是否正确，不正确给提示
                modifyPsw({
                    token: window.localStorage.token,
                    password: Base64.encode(this.oldPswd),
                    newpassword: Base64.encode(this.newPswd)
                }).then(res => {
                    if (res.result.status == 0) {
                        this.errTip.pswdErr = true;
                    } else if (res.result.status == 1) {
                        console.log(res.result.msg);
                        this.oldPswd = "";
                        this.newPswd = "";
                        this.confirmPswd = "";
                        this.showModifyPwOK = true;
                        this.countStart(this.countdown);
                    } else {
                        this.errTip.pswdErr = true;
                        console.log(res.result.msg);
                    }
                });
            }
        },
        countStart: function(n) {
            var timeId;
            var _this = this;
            for (var i = 1; i <= n; i++) {
                timeId = setTimeout(function() {
                    _this.countdown -= 1;
                    console.log(_this.countdown);
                    if (_this.countdown == 0) {
                        _this.loginout();
                    }
                }, 1000 * i);
            }
        },
        loginout: function() {
            if (!window.localStorage.token) {
                this.$message({
                    message: "游客无权操作，请登录后重试",
                    type: "error"
                });
                return;
            }
            // 通知后台注销
            loginOut({ token: window.localStorage.token }).then(res => {
                if (res.result.status) {
                    window.localStorage.clear();
                    this.$router.replace({
                        path: "/login"
                    });
                }
            });
        }
    },
    mounted: function() {
        var _this = this;
        _this.showModifyPwOK = false;
        _this.visitedNum = 1;
    }
};
</script>
<style scoped>
/* 个人信息组件 */
.wrap-info {
    width: 100%;
}
.el-row {
    margin: 2rem 0;
}
.info-sidebar {
    border-right: 1px solid #e6e8ea;
    text-align: right;
    line-height: 40px;
}
.info-sidebar ul {
    margin-bottom: 0;
    /* width: 100%; */
}
.info-sidebar li {
    padding-right: 30px;
    list-style: none;
}
.info-sidebar .visited {
    border-right: 2px solid #409eff;
    padding-right: 28px;
    color: #409eff;
}
.info-sidebar li:hover {
    border-right: 2px solid #409eff;
    padding-right: 28px;
    color: #409eff;
    cursor: pointer;
}
.info-main {
    width: 20rem;
    margin-left: 8rem;
}
/* old code */
.base-info {
    margin: 30px auto;
    width: 100%;
}
.info-headinfo {
    position: relative;
}
.info-avatar {
    text-align: center;
}
.info-img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    text-align: center;
}
.edit-info .info-img:hover:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5) url("~@/assets/img/camera.png") center center
        no-repeat;
    background-size: 41px 30px;
    cursor: pointer;
}
.info-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.edit-link {
    text-align: left;
    position: absolute;
    left: 50%;
    top: 2px;
    margin-left: 70px;
    padding-left: 20px;
    line-height: 18px;
    color: #409eff;
    font-size: 16px;
    background: url("~@/assets/img/edit.png") no-repeat left center;
    background-size: 16px 16px;
    cursor: pointer;
}
.info-nickname {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    color: #333;
}
.edit-info .edit-username {
    margin: 20px 0;
    position: relative;
}
.edit-username input[type="text"] {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    margin-top: 0;
    padding: 12px 0;
    font-size: 14px;
    color: #555;
    outline: none;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #ededed;
    transition: border 0.2s ease-in 0s;
}
.edit-username input[type="text"]:focus {
    color: #333;
    border-color: #409eff;
}
.edit-username .err {
    position: absolute;
    right: 13px;
    bottom: 13px;
    font-size: 12px;
    font-style: normal;
    line-height: 14px;
    color: #fd5f39;
    background-color: #fff;
    box-shadow: 0 0 2px 2px #fff;
}
.edit-confirm {
    display: flex;
    justify-content: space-around;
    height: 46px;
    line-height: 46px;
}
.edit-confirm a {
    width: 49%;
    display: inline-block;
    box-sizing: border-box;
    min-width: 66px;
    height: 40px;
    padding: 0 10px;
    margin: 0 2px;
    font-size: 14px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    border: 0;
    border-radius: 3px;
    text-decoration: none;
    background-color: #409eff;
}

.modify-pswd dt {
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 20px;
    border-bottom: 1px dashed #d9d9d9;
}
.modify-pswd dd {
    margin-top: 20px;
}
.modify-pswd dd input[type="password"] {
    height: 45px;
    width: 100%;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom-width: 1px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 6px 10px;
    margin: 0;
    transition: border 0.2s ease-in 0s;
}
.modify-pswd dd input[type="password"]:focus {
    outline: none;
    border-bottom: 1px solid #409eff;
}
.modify-pswd .info-err {
    display: block;
    margin: 5px 0 10px;
    font-size: 12px;
    color: #fd5f39;
    text-align: left;
    background: url("~@/assets/img/err.png") 0 center no-repeat;
    background-size: 14px;
    padding-left: 20px;
    line-height: 22px;
}
.modify-pswd input[type="submit"] {
    text-align: center;
    width: 100%;
    height: 46px;
    margin: 0;
    background-color: #409eff;
    color: #fff;
    font-size: 16px;
    border: 2px solid #409eff;
    border-radius: 3px;
}
.modify-pswd input[type="submit"]:focus {
    outline: none;
    background: #168e71;
    border-color: #168e71;
}
.modify-pswd input[type="submit"]:hover {
    background-color: rgb(32, 175, 166);
    border-color: rgb(32, 175, 166);
}
.updatePw {
    color: #555;
    font-weight: 300;
    text-align: center;
}
.updatePw h3 {
    font-size: 22px;
    margin: 0 0 20px;
}
.updatePw h4 {
    font-size: 16px;
    margin: 0 0 10px;
}
.updatePw .modifyPw-btn {
    font-size: 16px;
    background: #409eff;
    padding: 0 25px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    height: 37px;
    color: #fff;
    border: 0;
    line-height: 37px;
    transition: background 0.2s ease-in 0s;
}
</style>
