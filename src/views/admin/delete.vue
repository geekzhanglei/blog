<template>
    <div class="delete-wrap">
        <div class="tips">
            <span>
                <i class="el-icon-delete"></i> 删除文章-删除不需要的文章
            </span>
        </div>
        <ul class="manage-articles">
            <li v-for="(item,index) in items" :key="index">
                <h4 class="adm-title" :title="item.title">{{item.title}}</h4>
                <div class="adm-meta">{{item.created_at}}</div>
                <div class="adm-cont" v-html="handleIntro(item.introduction)"></div>
                <div class="adm-footer">
                    <el-button type="primary" @click="triggerModal(item.id)" plain>删除文章</el-button>
                </div>
            </li>
        </ul>
        <div style="text-align:center" v-if="showLoadMore">
            <el-button type="primary" @click="loadMore()" plain>加载更多...</el-button>
        </div>
        <!-- dialog -->
        <el-dialog title="操作提示" :visible.sync="dialogVisible" width="30%">
            <span>您确定要删除这篇文章么？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteArticle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getArticleList, deleteArticle } from "@/assets/js/apis";
import { Message } from "element-ui";

export default {
    data: function() {
        return {
            deleteId: -1,
            items: [],
            perpage: 6,
            curpage: 1,
            endFetch: false,
            showLoadMore: true,
            dialogVisible: false
        };
    },
    methods: {
        // 请求文章列表
        reqArticleList: function(curpage = 1) {
            getArticleList({
                curpage: curpage,
                perpage: this.perpage
            }).then(res => {
                var flag = res.result.status;
                if (flag) {
                    this.items = this.items.concat(res.result.data);
                    if (this.curpage * this.perpage > res.result.rows) {
                        this.endFetch = true;
                        this.showLoadMore = false;
                    }
                }
            });
        },
        // 时间戳转换
        transferTime: function(unixTime) {
            return atom.transfer(unixTime);
        },
        triggerModal: function(id) {
            this.deleteId = id;
            this.dialogVisible = true;
        },
        // 删除文章
        deleteArticle: function() {
            if (!window.localStorage.token) {
                this.$message({
                    message: "游客无权操作，请登录后重试",
                    type: "error"
                });
                return;
            }
            if (this.deleteId == -1) {
                return;
            }

            deleteArticle({
                token: window.localStorage.token,
                id: this.deleteId
            }).then(res => {
                if (res.result.status) {
                    this.dialogVisible = false;
                    this.items = this.items.filter(element => {
                        if (element.id === this.deleteId) {
                            return false;
                        }
                        return true;
                    });
                }
            });
        },
        // 处理过长的文章简介
        handleIntro: function(inputHTML) {
            if (
                typeof inputHTML === "string" &&
                inputHTML.constructor === String
            ) {
                if (inputHTML.length > 100) {
                    inputHTML = inputHTML.slice(0, 100);
                    return inputHTML + " ...";
                }
                return inputHTML;
            }
        },
        loadMore: function() {
            if (!this.endFetch) {
                // 假如到最后一页了，不再请求
                this.reqArticleList(this.curpage++);
            }
        }
    },
    mounted() {
        this.reqArticleList();
    }
};
</script>
<style scoped>
.delete-wrap {
    width: 100%;
}
.manage-articles {
    list-style: none;
    margin-bottom: 0;
    padding: 0.5rem;
    font-size: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

.manage-articles li {
    font-size: 1.4rem;
    display: inline-block;
    vertical-align: top;
    margin: 1rem;
    padding: 1rem;
    width: 20rem;
    background-color: white;
    border-radius: 0.3rem;
    box-shadow: 0 0.1rem 0.2rem rgba(151, 151, 151, 0.58);
}

.manage-articles li:hover {
    background-color: #eaf0f7;
}

.adm-title {
    margin: 0;
    padding: 1rem 0.5rem;
    border-bottom: 0.1rem solid #ddd;
    /*文本超出一行省略号  */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.adm-meta {
    padding: 1rem 0.5rem;
}

.adm-cont {
    margin: 1rem 0.2rem;
    overflow: hidden;
    height: 6rem;
    /* border-bottom: 0.1rem solid #ddd; */
}

.adm-footer {
    margin: 0.5rem 0;
}

.adm-footer button {
    float: right;
}
</style>
