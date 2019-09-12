<template>
    <div class="container">
        <div class="article post-article clearfix">
            <div class="post-head clearfix">
                <div class="post-title">
                    <h4>{{title}}</h4>
                </div>
                <div class="post-return">
                    <router-link :to="{ name: 'index'}" class="post-return-a">
                        <i class="el-icon-d-arrow-left"></i>返回文章列表
                    </router-link>
                </div>
                <div class="post-meta">
                    <p class="subhead">
                        <span>作者：{{username}}</span>&nbsp
                        <span>最后编辑于 {{time}}</span>
                    </p>
                </div>
            </div>
            <div class="post-abs" v-html="intro"></div>
            <div class="post-cont" v-html="cont"></div>
            <div class="post-footer clearfix">
                <p>版权所有，转载注明出处</p>
            </div>
            <div class="comment">
                <div v-if="comments.length">
                    <div class="head">
                        <h3>评论（{{comments.length}}条）</h3>
                    </div>
                    <div class="wrap">
                        <ul>
                            <li v-for="(item,index) in comments" :key="index">
                                <div class="cont clearfix">
                                    <div class="title">
                                        <span v-if="item.website">
                                            <a
                                                :href="item.website"
                                                target="_blank"
                                            >{{item.nickname}}</a> 说
                                        </span>
                                        <span v-else>{{item.nickname}} 说</span>
                                    </div>
                                    <div class="content">
                                        <div class="markdown-body" v-html="item.content"></div>
                                    </div>
                                    <div class="foot">
                                        <p>
                                            <!-- <span class="expression">
                                                <i
                                                    class="el-icon-star-off"
                                                    :class="{visited:item.isVisited}"
                                                    @click.stop="support(item)"
                                                ></i>
                                                <i v-if="item.agrees != 0">{{item.agrees}}</i>
                                            </span>-->
                                            <span>{{transferTime(Date.parse(item.create_time)/1000)}}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="comments-reply">
                    <h3 class="comments-title">我要发表看法</h3>
                    <div class="comments-content">
                        <form>
                            <div id="comments-open-data">
                                <div class="comments-open-text">
                                    <p>
                                        <label for="comment-text">您的评论</label>
                                    </p>
                                    <!-- <el-input v-model="comment.content" type="textarea" row=5></el-input> -->
                                    <textarea rows="10" cols="50" v-model="comment.content"></textarea>
                                    <p v-if="comment.errTip" class="errorCls">
                                        <span>{{comment.errTip}}</span>
                                    </p>
                                </div>
                                <div id="comment-form-name">
                                    <p>
                                        <label for="comment-author">您的大名：</label>
                                    </p>
                                    <p>
                                        <input size="30" v-model="comment.nickname" />
                                        <span class="hint">«-必填</span>
                                    </p>
                                </div>
                                <div id="comment-form-email">
                                    <p>
                                        <label for="comment-email">电子邮件：</label>
                                    </p>
                                    <p>
                                        <input size="30" v-model="comment.email" />
                                        <span class="hint">«-必填，不公开</span>
                                    </p>
                                </div>
                                <div id="comment-form-url">
                                    <p>
                                        <label for="comment-url">个人网址：</label>
                                    </p>
                                    <p>
                                        <input
                                            size="30"
                                            placeholder="如：www.baidu.com"
                                            v-model="comment.website"
                                        />
                                        <span class="hint">«-你的个人网址</span>
                                    </p>
                                </div>
                                <div id="comment-form-remember-me">
                                    <p>
                                        <label for="comment-bake-cookie">记住个人信息？</label>
                                        <input
                                            type="checkbox"
                                            :data-state="comment.state"
                                            @click="saveCookie()"
                                        />
                                    </p>
                                </div>
                            </div>
                            <div id="comments-open-footer">
                                <el-button
                                    class="submit"
                                    type="primary"
                                    size="medium"
                                    round
                                    @click="updateComments"
                                >发表</el-button>
                                <span class="hint">«- 点击按钮</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getArticle, addMark } from "@/assets/js/apis";
import formatTime from "@/assets/js/utils";

export default {
    data() {
        return {
            comment: {
                id: "",
                nickname: "",
                email: "",
                website: "",
                content: "",
                errTip: "",
                state: false
            },
            title: "这里一片荒芜",
            username: "没作者",
            cont: "没内容",
            time: "时间没了",
            intro: "介绍丢了",
            comments: [],
            // 私有变量
            clickFlag: 1
        };
    },
    methods: {
        // 请求文章数据接口
        reqArticleDataApi: function(id) {
            getArticle({ id: id }).then(res => {
                if (res.result && res.result.status) {
                    this.init(res.result);
                } else {
                    console.log("接口请求返回错误");
                    this.$router.replace({
                        path: "/"
                    });
                }
            });
        },
        // 发表评论
        updateComments() {
            // var _this = this;
            if (!this.verifyInput(this.comment)) {
                console.log("输入合法性校验失败");
                return;
            } else {
                this.comment.errTip = "";
                if (this.comment.website) {
                    this.comment.website = "http://" + this.comment.website;
                }
            }
            addMark({
                articleId: this.comment.id,
                nickname: this.comment.nickname,
                email: this.comment.email,
                website: this.comment.website,
                content: this.comment.content
            }).then(res => {
                var flag = res.result.status;
                var _data = res.result.msg;
                if (flag) {
                    var _obj = {
                        id: this.comment.id,
                        nickname: this.comment.nickname,
                        website: this.comment.website,
                        content: this.comment.content,
                        create_time: Date.parse(new Date()) / 1000
                    };
                    this.comments.push(_obj);
                    this.comment.email = "";
                    this.comment.nickname = "";
                    this.comment.website = "";
                    this.comment.content = "";
                } else {
                    console.log("后台返回提示：" + _data);
                }
            });
        },
        // 用户输入校验
        verifyInput: function(cet) {
            var _reg,
                res = true;
            if (cet.content.length === 0 || cet.content.length > 1000) {
                res = false;
                this.comment.errTip = "评论内容不可为空或过长";
                return res;
            }
            if (cet.nickname.length <= 0 || cet.nickname.length > 12) {
                res = false;
                this.comment.errTip = "您的大名不可为空或过长";
                return res;
            }
            if (cet.email && cet.email.length < 30) {
                _reg = /^(\w)+(\.(\w)+)*@((\w)+)+((\.\w+)+)$/;
                res = _reg.test(cet.email);
                if (!res) {
                    this.comment.errTip = "email格式不合法";
                }
                return res;
            } else {
                res = false;
                this.comment.errTip = "email不可为空或过长";
                return res;
            }
            if (cet.website) {
                let reg = /^(\w)+(\.(\w)+)+/g;
                res = reg.test(cet.website);
                if (!res) {
                    this.comment.errTip =
                        "网址格式错误，需直接输入类似www.baidu.com的网址";
                }
                return res;
            }
            return res;
        },
        // 时间戳转换
        transferTime: function(unixTime) {
            return formatTime(unixTime * 1000, "yyyy年MM月dd日 hh:mm:ss");
        },
        // cookie操作
        saveCookie: function() {
            var time, date, UTCtime;
            this.comment.state = !this.comment.state;
            if (this.comment.state) {
                if (!this.verifyInput(this.comment)) {
                    console.log("输入校验失败，数据不合法");
                    return;
                }
                this.comment.errTip = "";
                // 设置30天为过期时间
                time = 3600 * 24 * 30 * 1000;
                date = new Date();
                date.setTime(date.getTime() + time);
                UTCtime = date.toUTCString();
                this.setCookie("email", this.comment.email, UTCtime);
                this.setCookie("nickname", this.comment.nickname, UTCtime);
                this.setCookie("website", this.comment.website, UTCtime);
            } else {
                this.deleteCookie("email", "");
                this.deleteCookie("nickname", "");
                this.deleteCookie("website", "");
            }
        },
        setCookie: function(name, value, expires, path, domain, secure) {
            document.cookie =
                name +
                "=" +
                encodeURI(value) +
                (expires ? "; expires=" + expires : "") +
                (path ? "; path=" + path : "") +
                (domain ? "; domain=" + domain : "") +
                (secure ? "; secure=" + secure : "");
        },
        getCookie: function(name) {
            var cookies = decodeURI(document.cookie).split(";");
            var c;
            for (var i = 0; i < cookies.length; i++) {
                c = cookies[i].split("=");
                if (c[0].replace(" ", "") == name) {
                    return c[1];
                }
            }
        },
        deleteCookie: function(name, value) {
            var date = new Date();
            date.setTime(date.getTime() - 1000);
            this.setCookie(name, value, date.toGMTString(), "", "", "");
        },
        // 点赞
        // support: function(item) {
        //     var _this = this,
        //         bool = false,
        //         storage = window.localStorage,
        //         category;
        //     if (item.isVisited) {
        //         item.isVisited = false;
        //         storage.removeItem("comment_id" + item.id);
        //     } else {
        //         item.isVisited = true;
        //         storage.setItem(
        //             "article_id" + item.article_id,
        //             item.article_id
        //         );
        //         storage.setItem("comment_id" + item.id, item.id);
        //     }
        //     item.agrees = Number(item.agrees);
        //     item.isVisited ? (item.agrees += 1) : (item.agrees -= 1);
        //     item.isVisited ? (category = 1) : (category = 2);
        //     // 请求接口category1点赞，2取消
        //     if (this.clickFlag) {
        //         this.clickFlag = 0;
        //         addSupport(item.id, { category }).then(res => {
        //             console.log(res);
        //         });
        //         setTimeout(function() {
        //             _this.clickFlag = 1;
        //         }, 1000);
        //     }
        // },
        init: function(_data) {
            var _this = this,
                comLen = _data.comments.length,
                bool;
            this.comment.id = _data.data.id;
            this.title = _data.data.title;
            this.username = _data.data.username;
            this.time = this.transferTime(_data.data.created_at);
            this.cont = _data.data.content;
            this.intro = _data.data.introduction;
            this.comments = _data.comments;
            if (this.comments[0]) {
                this.comments.forEach(function(item) {
                    _this.$set(item, "isVisited", false);
                });
                this.comments.forEach(function(element) {
                    bool =
                        element.id ==
                        window.localStorage["comment_id" + element.id];
                    bool =
                        bool &&
                        element.article_id ==
                            window.localStorage[
                                "article_id" + element.article_id
                            ];
                    if (bool) {
                        _this.$set(element, "isVisited", true);
                    }
                }, this);
            }
            // 读取cookie填写评论内容
            this.comment.email = this.getCookie("email");
            this.comment.nickname = this.getCookie("nickname");
            this.comment.website = this.getCookie("website");
        }
    },
    mounted: function() {
        var article_id = this.$router.currentRoute.params.id;
        this.reqArticleDataApi(article_id);
    }
};
</script>
<style scoped>
/*文章详情*/
.article {
    background: #f8f8f8;
    margin-bottom: 20px;
    border-left: 8px #ccc solid;
    box-shadow: 0 1px 4px #aaa;
}

/*文章详情*/

.post-article {
    border: 0;
}

.post-title {
    border-left: 5px solid #ea6753;
}
.post-article img {
    max-width: 100%;
}
.post-title h4 {
    color: #2ca6cb;
    padding: 15px 35px;
    margin: 0;
    font-size: 30px;
    font-weight: 300;
    text-align: left;
}
.post-meta {
    display: flex;
    justify-content: flex-end;
}
.post-meta .subhead {
    font-size: 15px;
    float: right;
    color: #777;
    margin-right: 40px;
    margin-bottom: 10px;
    padding-top: 5px;
}

p.subhead span {
    padding: 0 15px;
}

.post-abs {
    border-top: 1px dashed #726caf;
    border-bottom: 1px dashed #726caf;
    font-size: 1.2em;
    padding: 15px 0;
    margin: 5px 50px;
}

.post-cont {
    margin: 5px 50px;
    padding: 15px 0;
    font-size: 16px;
}

.post-footer {
    margin-bottom: 10px;
}

.post-footer p {
    font-size: 15px;
    float: right;
    color: #777;
    margin-right: 40px;
    margin-bottom: 10px;
    padding-top: 5px;
}

.post-return {
    margin: 15px 0 15px 45px;
}

.post-return-a {
    text-decoration: none;
    padding: 8px 10px;
    color: #2ca6cb;
    font-size: 16px;
}

.post-return-a:link,
.post-return-a:hover {
    text-decoration: none;
}

.post-return-a:hover {
    background-color: #2ca6cb;
    color: white;
}
/* 评论区 */

.comment {
    margin: 25px 50px;
    overflow: hidden;
}
.comment .head {
    margin: 20px 0;
    border-bottom: 2px solid #d3d3d3;
}
.comment .wrap ul {
    list-style: none;
    padding-left: 0;
}
.comment .wrap li {
    border-bottom: 1px dashed #d3d3d3;
}
.comment .wrap .content {
    margin: 20px 0;
    text-indent: 2em;
}
.comment .wrap .title {
    font-weight: 700;
}
.comment .wrap .foot {
    display: flex;
    justify-content: flex-end;
    font-size: 90%;
}
.comment .wrap .foot .expression {
    margin-right: 20px;
    font-size: 16px;
}
.comment .wrap .foot .expression i:first-child {
    margin-right: 4px;
    cursor: pointer;
}
.comment .wrap .foot .visited {
    color: #da3e3c;
}
.comment .comments-title {
    padding: 2rem 0 1rem 0;
    color: #000000;
    font-weight: 500;
    letter-spacing: -0.03em;
    border-bottom: 0.1rem solid #d3d3d3;
}
.comment textarea {
    border: 1px solid #d3d3d3;
    padding: 0.5em;
    width: 90%;
}
.comment input,
.comment textarea {
    font-size: 1.5rem;
}
.comment input {
    border: 1px solid #d3d3d3;
    margin-top: 0;
    line-height: 1.2;
    padding: 0.4em 0.3em;
}

#comments-open-footer .submit {
    width: 22%;
    margin: 2rem 0 3rem;
}
#wait p {
    background: #fefefe;
}
/* 错误提示 */
.errorCls {
    overflow: hidden;
    width: 90%;
}
.errorCls span {
    font-size: 90%;
    font-weight: 400;
    color: red;
    position: relative;
    width: 100%;
    display: inline-block;
    animation: horse 15s ease-in 0s infinite;
}
@keyframes horse {
    0% {
        left: 0;
    }
    100% {
        left: 100%;
    }
}
@media screen and (max-width: 900px) {
    .comment {
        min-height: 2rem;
    }
    .comments-reply {
        display: none;
    }
}
/* 文章中设置图片 */
</style>
<style>
.container .article img {
    max-width: 95%;
}
.article .subhead {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.article code {
    white-space: normal;
    word-break: break-all;
}
@media screen and (max-width: 900px) {
    .article .post-abs,
    .article .post-cont {
        margin: 0.5rem 1rem;
    }
}
</style>
