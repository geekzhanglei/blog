<template>
    <div class="container">
        <div class="msg-wrap">
            <div class="msg-header">
                <h2>动态 | Words</h2>
            </div>
            <div class="msg-cont">
                <div class="msg-input clearfix">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="有什么想说呢"
                        v-model="inputMsg"
                        maxlength="400"
                    ></el-input>
                    <el-button
                        type="button"
                        class="btn btn-default"
                        data-toggle="modal"
                        data-target="#inputNameModal"
                        @click="dialogVisible = true"
                    >评论一下</el-button>
                </div>
                <div class="msg-split"></div>
                <div v-if="showMsgCont" class="msg-comment">
                    <div class="comment-header">
                        <h4>最新动态</h4>
                    </div>
                    <div class="cont-list">
                        <div class="comments" v-for="(item,index) in list" :key="index">
                            <div class="comment-wrap">
                                <div class="clearfix">
                                    <span class="uid">{{item.username}}</span>
                                    <span class="curTime">{{transferTime(item.created_at)}}</span>
                                </div>
                                <p class="comment">{{item.content}}</p>
                                <div class="action clearfix">
                                    <a
                                        href="javascript:;"
                                        class="answer"
                                        v-on:click="displayInput(item)"
                                    >{{item.isAnswer}}</a>
                                    <a
                                        href="javascript:;"
                                        class="unfold-answer"
                                        v-show="item.reply.length === 0 ?false:true"
                                        v-on:click="displayAnswers(item)"
                                    >{{item.isUnfoldAnswers}}({{item.reply.length}})</a>
                                    <span class="expression">
                                        <i
                                            class="el-icon-star-off"
                                            :class="{visited:item.isVisited}"
                                            @click.stop="support(item)"
                                        ></i>
                                        <i v-if="item.agrees != 0">{{item.agrees}}</i>
                                    </span>
                                </div>
                            </div>
                            <div class="write-answer" v-show="item.isShowInput">
                                <div class="msg-input clearfix">
                                    <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="这里可以评论动态"
                                        v-model="item.replyCont"
                                        maxlength="200"
                                    ></el-input>
                                    <div class="replyWrap clearfix">
                                        <span>昵称：</span>
                                        <el-input
                                            type="text"
                                            v-model="item.replyName"
                                            maxlength="10"
                                            v-bind:placeholder="phReplyCont"
                                        ></el-input>
                                        <el-button
                                            size="small"
                                            type="button"
                                            v-on:click="addReply(item.id,item)"
                                        >回复一下</el-button>
                                        <span class="replyErrTip">{{item.replyErr}}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="answers"
                                v-show="item.isShowAnswers"
                                v-for="(answer,i) in item.reply"
                                :key="i"
                            >
                                <div class="clearfix">
                                    <span
                                        v-if="answer.replyType==='1'"
                                        class="uid"
                                    >{{answer.replyUserName}}</span>
                                    <div v-else>
                                        <span class="uid">{{answer.replyUserName}}</span>
                                        <!-- <span class="uid reply">回复:</span>
                                        <span class="uid">{{answer.toReplyUserName}}</span>-->
                                        <span class="curTime">{{transferTime(answer.createTime)}}</span>
                                    </div>
                                </div>
                                <p class="comment">{{answer.content}}</p>
                                <div class="action clearfix">
                                    <!-- <a
                                        href="javascript:;"
                                        v-on:click="displayReplyInput(item,i)"
                                        class="answer"
                                    >{{item.reply[i].isAnswer}}</a>-->
                                    <a v-if="answer.agrees != 0">{{answer.agrees}}</a>
                                    <a
                                        class="glyphicon glyphicon-thumbs-up"
                                        :class="{ansVisited:answer.isVisited}"
                                        @click.stop="support(answer)"
                                    ></a>
                                </div>
                                <!-- <div class="write-answer" v-show="answer.isShowReplyInput">
                                    <div class="msg-input clearfix">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="回复本条评论"
                                            v-model="item.replyCont"
                                            maxlength="100"
                                        ></el-input>
                                        <div class="replyWrap clearfix">
                                            <span>昵称：</span>
                                            <el-input
                                                type="text"
                                                v-model="item.replyName"
                                                maxlength="10"
                                                v-bind:placeholder="phcont"
                                            ></el-input>
                                            <el-button
                                                size="small"
                                                type="button"
                                                v-on:click="addReply(item.id,item,i)"
                                            >回复一下</el-button>
                                            <span class="replyErrTip">{{item.replyErr}}</span>
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination
                    v-if="showPages"
                    class="blog-page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page="pagingData.curPage"
                    :page-size="pagingData.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="pagingData.total"
                ></el-pagination>
            </div>
        </div>
        <!-- Dialog -->
        <el-dialog
            title="请留下您的大名"
            :visible.sync="dialogVisible"
            width="18rem"
            @close="closeDialog()"
        >
            <el-input type="text" v-model="inputName" maxlength="10" :placeholder="phcont"></el-input>
            <span class="errorTips">{{errTips}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="sendComment()"
                    show-close
                    close-on-click-modal
                    close-on-press-escape
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getMsgList, addMsg, addReplyMsg, msgSupport } from "@/assets/js/apis";
import formatTime from "@/assets/js/utils";
import Vue from "vue";

export default {
    data: function() {
        return {
            //输入内容与名字
            inputMsg: "",
            inputName: "",
            // 显示留言列表
            showMsgCont: true,
            // 留言列表
            list: [],
            // 非法留言提示
            errTips: "",
            // 留言和回复的默认用户名
            phcont: "默认值",
            phReplyCont: "默认值",
            // 每页默认条数
            pagesize: 3,
            // 分页组件数据
            showPages: true,
            pagingData: {
                curPage: 1,
                pageSize: 1,
                total: 1
            },
            clickFlag: 1,
            // 对话框
            dialogVisible: false
        };
    },
    methods: {
        // 请求列表数据接口
        reqMsgData(e) {
            getMsgList({ curpage: e }).then(
                res => {
                    if (res.result.status) {
                        this.showMsgCont = true;
                        this.list = res.result.data;
                        this.pagingData.total = res.result.rows;
                        this.pagingData.curPage = e;
                        this.showPages = res.result.isPagination;
                        this.pagingData.pageSize = Number(res.result.perpage);
                        // 默认评论名、默认回复名
                        // this.phcont = res.result.defaultCommentName;
                        // this.phReplyCont = res.result.defaultReplyName;
                    } else {
                        this.list = [];
                        this.pagingData.total = 0;
                        this.pagingData.curPage = 0;
                        this.showPages = false;
                        this.showMsgCont = false;
                    }
                    this.init();
                },
                res => {
                    this.showMsgCont = false;
                    this.showPages = false;
                    console.log("接口请求失败，错误码：" + err.status);
                }
            );
        },
        // 分页
        handleCurrentChange(val) {
            this.reqMsgData(val);
        },

        // 回复按钮
        displayInput: function(item) {
            if (item.isAnswer === "回复") {
                this.closeAnswerList(item);
                item.isAnswer = "取消回复";
                item.isShowInput = true;
            } else {
                item.isAnswer = "回复";
                item.isShowInput = false;
            }
        },
        // 回复的回复按钮
        // displayReplyInput: function(item, index) {
        //     if (item.reply[index].isShowReplyInput === false) {
        //         // 关闭回复留言框
        //         item.isAnswer = "回复";
        //         item.isShowInput = false;
        //         this.closeAnswerList(item);
        //         // 自身逻辑
        //         item.reply[index].isAnswer = "取消回复";
        //         item.reply[index].isShowReplyInput = true;
        //     } else {
        //         item.reply[index].isShowReplyInput = false;
        //         item.reply[index].isAnswer = "回复";
        //     }
        // },
        // 展开回复列表
        displayAnswers: function(item) {
            if (item.isUnfoldAnswers === "查看回复") {
                this.closeAnswerList(item);
                item.isUnfoldAnswers = "收起回复";
                item.isShowAnswers = true;
            } else {
                item.isUnfoldAnswers = "查看回复";
                item.isShowAnswers = false;
            }
        },
        // 关闭回复列表清空回复数据
        closeAnswerList: function(item) {
            let _l = item.reply.length;
            if (_l) {
                for (var _q = 0; _q < _l; _q++) {
                    item.reply[_q].isShowReplyInput = false;
                    item.reply[_q].isAnswer = "回复";
                }
            }
            item.replyName = "";
            item.replyCont = "";
        },

        // 时间戳转换
        transferTime: function(unixTime) {
            return formatTime(unixTime * 1000, "yyyy年MM月dd日 hh:mm:ss");
        },
        // 添加回复
        addReply: function(id, item, index) {
            var _this = this;
            var data = {};
            item.replyErr = "";
            if (item.replyCont === "") {
                item.replyErr = "总得写点啥吧";
                return;
            }
            // 默认名字
            if (item.replyName === "") {
                item.replyName = this.phcont;
            }
            if (typeof index !== "undefined") {
                data = {
                    username: item.replyName,
                    content: item.replyCont,
                    comment_id: id
                    // username: item.replyName,
                    // reply_id: item.reply[index].rId,
                    // reply_type: 2
                };
            } else {
                data = {
                    comment_id: id,
                    username: item.replyName,
                    content: item.replyCont
                    // username: item.replyName,
                    // reply_id: id,
                    // reply_type: 1,
                };
            }
            addReplyMsg(data).then(res => {
                item.replyName = "";
                item.replyCont = "";
                // 刷新列表
                this.reqMsgData(this.pagingData.curPage);
            });
        },
        // 增加动态
        sendComment: function() {
            var _this = this;
            this.errTips = "";

            var commentLength = _this.inputMsg.length;
            var comNameLength = _this.inputName.length;
            if (
                commentLength === 0 ||
                commentLength > 400 ||
                comNameLength > 10
            ) {
                this.errTips = "总得写点啥吧";
                return;
            }

            // 默认名字为东方三侠
            if (this.inputName === "") {
                this.inputName = this.phcont;
            }
            addMsg({
                username: this.inputName,
                content: this.inputMsg
            }).then(res => {
                // 清空留言输入框
                this.inputMsg = "";
                // 刷新列表
                this.reqMsgData(this.pagingData.curPage);
                // 成功之后关闭模态框
                this.dialogVisible = false;
            });
        },
        // 关闭对话框回调：清除错误提示
        closeDialog() {
            this.errTips = "";
        },
        // 点赞
        support: function(item) {
            var _this = this,
                bool = false,
                storage = window.localStorage,
                id = item.id || item.rId,
                category,
                typeid;
            // 判断点击是评论1还是回复2
            item.id ? (typeid = 1) : (typeid = 2);
            if (item.isVisited) {
                item.isVisited = false;
                if (item.commentId) {
                    window.localStorage.removeItem("msgMarkRid" + item.rId);
                } else {
                    window.localStorage.removeItem("msgMarkId" + item.id);
                }
            } else {
                item.isVisited = true;
                // 根据commentId判断是回复的回复还是评论的回复
                if (item.commentId) {
                    storage.setItem("msgMarkRid" + item.rId, item.rId);
                } else {
                    storage.setItem("msgMarkId" + item.id, item.id);
                }
            }
            item.agrees = Number(item.agrees);
            item.isVisited ? (item.agrees += 1) : (item.agrees -= 1);
            item.isVisited ? (category = 1) : (category = 2);

            // 请求接口，修改点赞信息
            if (this.clickFlag) {
                this.clickFlag = 0;
                msgSupport(id, {
                    type: typeid,
                    category: category
                }).then(res => {
                    console.log(res);
                });
                var tId = setTimeout(function() {
                    _this.clickFlag = 1;
                }, 1000);
            }
        },
        // 初始化数据与分页组件
        init: function() {
            var _this = this;
            var i,
                j,
                replyLen,
                id,
                rId,
                listLen = this.list.length;
            var page_total,
                page = _this.pagingData.curPage;
            var _temp = parseInt(_this.pagingData.total) / this.pagesize;
            page_total = Math.ceil(_temp);

            // 初始化每个评论下会用到的私有属性
            for (i = 0; i < listLen; i++) {
                Vue.set(this.list[i], "isAnswer", "回复");
                Vue.set(this.list[i], "isUnfoldAnswers", "查看回复");
                Vue.set(this.list[i], "isShowInput", false);
                Vue.set(this.list[i], "isShowAnswers", false);
                Vue.set(this.list[i], "replyErr", "");
                Vue.set(this.list[i], "replyName", "");
                Vue.set(this.list[i], "replyCont", "");
                Vue.set(this.list[i], "isVisited", false);
                // 回复用到的私有属性，开启关闭回复框用
                replyLen = this.list[i].reply.length;
                if (replyLen) {
                    for (j = 0; j < replyLen; j++) {
                        Vue.set(
                            this.list[i].reply[j],
                            "isShowReplyInput",
                            false
                        );
                        Vue.set(this.list[i].reply[j], "isAnswer", "回复");
                        Vue.set(this.list[i].reply[j], "isVisited", false);
                    }
                }
            }
            // 判断当前游客有的点赞记录
            for (i = 0; i < listLen; i++) {
                id = this.list[i].id;
                if (id == window.localStorage["msgMarkId" + id]) {
                    this.list[i].isVisited = true;
                }
                replyLen = this.list[i].reply.length;
                if (replyLen) {
                    for (j = 0; j < replyLen; j++) {
                        rId = this.list[i].reply[j].rId;
                        if (rId == window.localStorage["msgMarkRid" + rId]) {
                            this.list[i].reply[j].isVisited = true;
                        }
                    }
                }
            }
        }
    },
    mounted: function() {
        this.reqMsgData(this.pagingData.page);
    }
};
</script>
<style scoped>
.container {
    margin-bottom: 20px;
}
.clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
}
.msg-wrap {
    background-color: #f8f8f8;
    margin: 20px 0;
    box-shadow: 0px 1px 2px #aaa;
    overflow: hidden;
}

.msg-header {
    border-left: 5px solid #ea6753;
    color: #2ca6cb;
    padding: 15px 35px;
    margin: 0 0 20px 0;
    text-align: left;
}

.msg-header h2 {
    margin-top: 10px;
}

.msg-cont {
    margin: 30px 50px;
}

.msg-input .el-textarea {
    resize: none;
    float: left;
}

.msg-input .el-button {
    margin: 10px 5px;
    float: right;
}

.msg-split {
    margin: 10px 0;
    border-top: 2px #2ca6cb solid;
    box-shadow: 0px 1px 2px #2ca6cb;
}

.msg-comment .comment-header {
    padding-left: 15px;
    border-left: 5px solid #ea6753;
}

.msg-comment .cont-list {
    margin: 15px 10px;
}

.msg-comment .cont-list .comments {
    margin: 1em 0;
    border-bottom: 1px dashed #b5b5b5;
}

.comment-wrap .div,
p {
    margin: 6px 0;
}

.comments .uid {
    font-size: 1.2em;
    color: #2ca6cb;
    float: left;
}

.comments .reply {
    padding: 0 6px;
    font-size: 1em;
    color: #a79292;
}

.comments .curTime {
    float: right;
    font-size: 1.1em;
}
.comments .action .expression {
    float: right;
    margin: 5px 10px;
}
.comments .action .expression i:first-child {
    margin-right: 4px;
    cursor: pointer;
}
.comments .action .expression .visited,
.comments .action .ansVisited {
    color: #da3e3c;
}
.comments .action a {
    margin: 5px 10px;
    float: right;
    text-decoration: none;
}

.comments .answers {
    margin: 10px 20px;
    padding: 10px;
    border: 1px #aaa dotted;
}

.comments .write-answer {
    margin: 10px 20px;
    padding: 10px 10px 0 10px;
    border: 1px #aaa dotted;
}

.answers .uid,
.curTime {
    font-size: 1em;
}

.answers div {
    margin: 0;
}

.replyWrap {
    margin-top: 10px;
}

.replyWrap span,
.replyWrap .el-input {
    float: left;
    margin: 10px 5px;
}

.replyWrap span {
    padding: 6px 12px;
    /*font-size: 1.2em;*/
    color: gray;
}

.replyWrap .el-input {
    width: 20%;
}
.blog-page {
    text-align: center;
}
</style>
<style>
@media screen and (max-width: 900px) {
    .el-pagination .btn-prev,
    .el-pagination .btn-next,
    .el-pagination .el-pager {
        display: none;
    }
}
@media screen and (max-width: 500px) {
    .container .msg-cont {
        margin: 1rem;
    }
}
</style>

