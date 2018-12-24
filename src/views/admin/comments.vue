<template>
    <div class="comments-wrap">
        <div class="tips">
            <span>
                <i class="el-icon-date"></i> 评论管理-删除文章评论
            </span>
        </div>
        <div class="tips">
            <span>
                <i class="el-icon-menu"></i> 列表展示选项
            </span>
        </div>
        <el-row>
            <el-col :span="12">
                <el-col :span="12">是否分页</el-col>
                <el-col :span="12">
                    <el-switch
                        v-model="selectedPage"
                        @change="changeStatus(requestArticle)"
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
                        :disabled="!selectedPage"
                        @input="changePageNum"
                        placeholder="输入整数（默认5）"
                    ></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="22">
                <el-col :span="3" :offset="2">数据搜索</el-col>
                <el-col :span="12">
                    <el-input type="text" @input="search" placeholder="请输入关键词（仅搜索当前页）"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <div class="tips">
            <span>
                <i class="el-icon-tickets"></i> 列表
            </span>
        </div>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort="{prop: 'id', order: 'descending'}"
                :row-class-name="getRowClass"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.marks">
                            <el-table-column prop="id" label="回复id"></el-table-column>
                            <el-table-column prop="content" label="回复内容"></el-table-column>
                            <el-table-column prop="nickname" label="作者"></el-table-column>
                            <el-table-column prop="create_time" label="时间"></el-table-column>
                            <el-table-column label="操作" align="center" width="150">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        v-if="scope.row.status==1"
                                        type="danger"
                                        @click="triggerModal(scope.$index, scope.row)"
                                    >删除</el-button>
                                    <el-button size="mini" v-else type="primary">已删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" sortable width="80" align="center"></el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    sortable
                    fit
                    align="center"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="username" label="作者" sortable width="150" align="center"></el-table-column>
                <el-table-column prop="created_at" label="时间" sortable width="180" align="center"></el-table-column>
                <el-table-column prop="markNum" label="评论数" sortable width="180" align="center"></el-table-column>
            </el-table>
        </el-row>
        <el-pagination
            v-if="showPages"
            background
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-size="perPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        <!-- dialog -->
        <el-dialog title="操作提示" :visible.sync="dialogVisible" width="30%">
            <span>您确定要删除这条评论么？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDelete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { deleteComms, getArticleListWithMark } from "@/assets/js/apis";
import formatTime from "@/assets/js/utils";
import msgAndCommentsMixin from "@/assets/js/mixin";
import { Message } from "element-ui";

export default {
    mixins: [msgAndCommentsMixin],
    data: function() {
        return {
            dialogVisible: false,
            deleteCont: {}
        };
    },
    methods: {
        getRowClass(row, index) {
            let expandClass = row.row.marks.length ? "" : "hide-expand";
            return expandClass;
        },
        triggerModal: function(index, row) {
            if (!window.localStorage.token) {
                this.$message({
                    message: "游客无权操作，请登录后重试",
                    type: "error"
                });
                return;
            }
            this.dialogVisible = true;
            this.deleteCont = {
                index: index,
                row: row
            };
        },
        handleDelete: function() {
            deleteComms(this.deleteCont.row.id, {
                token: window.localStorage.token
            }).then(res => {
                this.deleteCont.row.status = 2;
                if (res.result.status) {
                    console.log("删除成功");
                } else {
                    console.log("该条目已删除，不可重复删除");
                }
                this.dialogVisible = false;
            });
        },
        requestArticle: function(e = 1) {
            getArticleListWithMark({
                curpage: e,
                perpage: this.perPage,
                token: window.localStorage.token
            }).then(res => {
                if (res.result.status) {
                    this.tableData = res.result.data;
                    // 转换数据中所有unix时间戳
                    this.transferTime(this.tableData);
                    // 分页初始化
                    this.initPage(res.result);
                } else {
                    console.log("请求接口错误");
                }
            });
        },
        transferTime: function(obj) {
            for (var i = 0; i < obj.length; i++) {
                for (var j in obj[i]) {
                    if (j == "created_at") {
                        obj[i][j] = formatTime(
                            obj[i][j] * 1000,
                            "yyyy/MM/dd hh:mm:ss"
                        );
                    }
                    if (j == "create_time") {
                        obj[i][j] = formatTime(
                            obj[i][j] * 1000,
                            "yyyy/MM/dd hh:mm:ss"
                        );
                    }
                    if (j == "marks") {
                        if (obj[i][j]) {
                            this.transferTime(obj[i][j]);
                        }
                    }
                }
            }
        },
        changePageNum: function(e) {
            this.perPage = Number(e);
            if (!this.perPage) {
                return;
            }
            this.debounce(this.requestArticle);
        },
        traversalObj: function(curValue, inValue) {
            var i,
                j,
                k,
                tostr,
                _this = this;
            for (i in curValue) {
                if (curValue.hasOwnProperty(i)) {
                    switch (i) {
                        case "marks":
                            for (j in curValue[i]) {
                                for (k in curValue[i][j]) {
                                    switch (k) {
                                        case "website":
                                        case "status":
                                        case "email":
                                            break;
                                        default:
                                            tostr = curValue[i][j][
                                                k
                                            ].toString();
                                            if (tostr.indexOf(inValue) != -1) {
                                                console.log(tostr);
                                                return true;
                                            }
                                            break;
                                    }
                                }
                            }
                            break;
                        case "showComments":
                            break;
                        default:
                            tostr = curValue[i].toString();
                            if (tostr.indexOf(inValue) != -1) {
                                return true;
                            }
                            break;
                    }
                }
            }
        },
        handleCurrentChange(val) {
            this.requestArticle(val);
        },
        initPage: function(data) {
            // 分页组件赋值
            this.total = Number(data.rows);
            this.perPage = 5; // 神仙数字，接口未提供
        }
    },
    mounted: function() {
        this.requestArticle();
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
.comments-wrap {
    width: 100%;
}
</style>
