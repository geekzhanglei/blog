<template>
    <div>
        <div class="admin-editor-wrap">
            <div class="tips">
                <span><i class="el-icon-edit-outline"></i> 写文章-发表您的文章</span>
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
        <mavon-editor v-model="mdInput" :ishljs="true" :toolbars="toolbars" :boxShadow="false" @save="commit()" @change="commitHtml" @imgAdd="$imgAdd" />
        <!-- </div> -->
        <el-button class="commit" type="primary" @click="saveArticle()" plain>确认发表</el-button>
    </div>
</template>
<script>
import { releaseArt } from '@/assets/js/apis';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import Vue from 'vue';

Vue.use(mavonEditor);

export default {
    data: function() {
        return {
            title: '',
            digest: '',
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
            mdInput: '',
            htmlInput: ''
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
                alert('游客无权操作');
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
                    this.title = '';
                    this.digest = '';
                    this.mdInput = '';
                } else {
                    if (res.result.data === '没有token值') {
                        alert('游客无权操作');
                        return;
                    }
                }
            });
        },
        // markdown上传图片功能
        $imgAdd(pos, $file) {
            // 关闭查看html源码按钮，这个按钮有图片时会造成浏览器假死
            this.toolbars.htmlcode = false;
            // 第一步.将图片上传到服务器.
            let formdata = new FormData();
            formdata.append('image', $file);
            markdownImgUpload(formdata).then(url => {
                console.log(url);
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                // $vm.$img2Url 详情见本页末尾
                $vm.$img2Url(pos, url);
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
