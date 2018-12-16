<template>
    <div>
        <div class="admin-editor-wrap">
            <div class="tips">
                <span>
                    <i class="el-icon-edit-outline"></i> 写文章-发表您的文章
                </span>
            </div>
            <el-row>
                <el-input type="text" v-model="title" autofocus placeholder="请输入标题(必填)"></el-input>
            </el-row>
            <el-row>
                <el-input type="textarea" :rows="3" v-model="digest" placeholder="请输入摘要(必填)"></el-input>
            </el-row>
            <div class="admin-editor"></div>
        </div>
        <!-- <div id="main"> -->
        <mavon-editor @imgAdd="$imgAdd" ref="md"></mavon-editor>
        <!-- </div> -->
        <el-button class="commit" type="primary" @click="saveArticle()" plain>确认发表</el-button>
    </div>
</template>
<script>
import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { releaseArt, markdownImgUpload } from "@/assets/js/apis";

Vue.use(mavonEditor);
export default {
    data: function() {
        return {
            title: "",
            digest: "",
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: false, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true // 预览
            },
            mdInput: "",
            htmlInput: ""
        };
    },
    methods: {
        commitHtml(a, b) {
            this.htmlInput = b;
        },
        commit() {
            this.saveArticle();
        },
        saveArticle: function() {
            var isEmpty = this.title && this.digest && this.mdInput;
            if (!window.localStorage.token) {
                alert("游客无权操作");
                return;
            }
            if (!isEmpty) {
                // 弹出框
                return;
            }
            // 上传文章
            releaseArt({
                token: window.localStorage.token,
                username: this.$store.state.nickname,
                title: this.title,
                introduction: this.digest,
                content: this.htmlInput
            }).then(res => {
                if (res.result.status) {
                    // 清空输入
                    this.title = "";
                    this.digest = "";
                    this.mdInput = "";
                } else {
                    if (res.result.data === "没有token值") {
                        alert("游客无权操作");
                        return;
                    }
                }
            });
        },
        // markdown上传图片功能
        $imgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append("file", $file);
            markdownImgUpload(formdata).then(res => {
                let url = res.imgUrl;
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                /**
                 * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                 * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                 * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                 */
                this.$refs.md.$img2Url(pos, url);
            });
        }
    }
};
</script>
<style scoped>
.el-row {
    margin: 2rem 0;
}
.commit {
    float: right;
    margin: 2rem 0;
}
</style>
