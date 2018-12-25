<template>
    <div class="admin-options-wrap">
        <div class="tips">
            <span>
                <i class="el-icon-menu"></i> 常用选项-博客基本选项设置
            </span>
        </div>
        <div class="admin-options">
            <el-button class="option-save" type="primary" @click="saveConfig" plain>保存设置</el-button>
            <span v-if="saveConErr" class="save-config-err">莫名其妙就保存失败了，要不再试试？</span>
            <span v-if="saveConOK" class="save-config-ok">保存成功了</span>
        </div>
        <div class="tips">
            <span>
                <i class="el-icon-setting"></i> 文章列表设置
            </span>
        </div>
        <el-row class="form-inline">
            <el-col :span="12">
                <el-col :span="12">是否分页</el-col>
                <el-col :span="12">
                    <el-switch
                        v-model="selectedArtPage"
                        active-color="#13ce66"
                        inactive-color="#ddd"
                    ></el-switch>
                </el-col>
            </el-col>
            <el-col :span="12">
                <el-col :span="12">每页条数</el-col>
                <el-col :span="10">
                    <el-input
                        type="text"
                        id="pagesize1"
                        class="form-control"
                        :disabled="!selectedArtPage"
                        @input="changePageNum($event,1)"
                        placeholder="输入整数（默认5）"
                    ></el-input>
                </el-col>
            </el-col>
        </el-row>
        <div class="tips">
            <span>
                <i class="el-icon-setting"></i> 留言板设置
            </span>
        </div>
        <el-row class="form-inline">
            <el-col :span="12">
                <el-col :span="12">是否分页</el-col>
                <el-col :span="12">
                    <el-switch
                        v-model="selectedMsgPage"
                        active-color="#13ce66"
                        inactive-color="#ddd"
                    ></el-switch>
                </el-col>
            </el-col>
            <el-col :span="12">
                <el-col :span="12">每页条数</el-col>
                <el-col :span="10">
                    <el-input
                        type="text"
                        id="msgAdminInput"
                        class="form-control"
                        :disabled="!selectedMsgPage"
                        @input="changePageNum($event,2)"
                        placeholder="输入整数（默认5）"
                    ></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row class="form-inline">
            <el-col :span="12">
                <el-col :span="12">动态默认昵称</el-col>
                <el-col :span="10">
                    <el-input type="text" @input="modifyName($event,1)" placeholder="输入留言默认昵称"></el-input>
                </el-col>
            </el-col>
            <el-col :span="12">
                <el-col :span="12">动态回复默认昵称</el-col>
                <el-col :span="10">
                    <el-input type="text" @input="modifyName($event,2)" placeholder="输入回复默认昵称"></el-input>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {
    setDefaultArticlePages,
    setDefaultCommentInfos
} from "@/assets/js/apis";
import { Message } from "element-ui";

export default {
    data: function() {
        return {
            selectedArtPage: 0,
            selectedMsgPage: 0,
            artPageSize: 5,
            msgPageSize: 5,
            msgNickname: "管理员",
            replyNickname: "小管理员",
            saveConErr: false,
            saveConOK: false
        };
    },
    methods: {
        changePageNum: function(value, n) {
            // 判断必须是整数
            if (parseInt(value) == value && value > 0) {
                if (n == 1) {
                    this.artPageSize = value;
                } else {
                    this.msgPageSize = value;
                }
            }
        },
        modifyName: function(value, n) {
            if (n == 1) {
                this.msgNickname = value;
            } else {
                this.replyNickname = value;
            }
        },
        saveConfig: function() {
            if (!window.localStorage.token) {
                this.$message({
                    message: "游客无权操作，请登录后重试",
                    type: "error"
                });
                return;
            }
            this.modifyArtInfo();
            this.modifyMsgInfo();
        },
        modifyArtInfo: function() {
            // 更新文章接口数据
            setDefaultArticlePages({
                token: window.localStorage.token,
                type: this.selectedArtPage ? 1 : 2,
                curpage: 1,
                perpage: this.artPageSize
            }).then(res => {
                if (res.result.status) {
                    console.log("文章列表设置成功，返回：" + res.result.data);
                    this.saveConErr = false;
                    this.saveConOK = true;
                } else {
                    this.saveConOK = false;
                    this.saveConErr = true;
                }
            });
        },
        modifyMsgInfo: function() {
            if (!this.replyNickname) {
                this.replyNickname = "许攸";
            }
            if (!this.msgNickname) {
                this.msgNickname = "荀彧";
            }
            // 更新留言板接口数据
            setDefaultCommentInfos({
                token: window.localStorage.token,
                type: this.selectedMsgPage ? 1 : 2,
                perpage: this.msgPageSize,
                defaultCommentName: this.msgNickname,
                defaultReplyName: this.replyNickname
            }).then(res => {
                if (res.result.status) {
                    console.log("留言板内容设置成功，返回：" + res.result.data);
                    this.saveConOK = true;
                    this.saveConErr = false;
                } else {
                    this.saveConOK = false;
                    this.saveConErr = true;
                }
            });
        }
    },
    created: function() {
        this.saveConErr = false;
        this.saveConOK = false;
    }
};
</script>
<style scoped>
.el-col {
    display: flex;
    align-items: center;
}
.el-row {
    display: flex;
    align-items: center;
    margin: 1rem 0;
}
.admin-options-wrap {
    width: 100%;
}
.admin-options .save-config-err {
    color: #fd5f39;
    margin-left: 5rem;
    /* background: url(../img/err.png) 0 center no-repeat; */
    background-size: 1.4rem;
    padding-left: 2rem;
}
.admin-options .save-config-ok {
    color: rgb(39, 187, 25);
    margin-left: 5rem;
}
.form-inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
}
</style>
