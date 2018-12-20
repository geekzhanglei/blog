<template>
    <div class="msg-wrap">
        <div class="tips">
            <span>
                <i class="el-icon-news"></i> 动态管理-删除动态
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
                        @change="changeStatus(reqMsgData)"
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
                        <el-table :data="props.row.reply">
                            <el-table-column prop="rId" label="回复id"></el-table-column>
                            <el-table-column prop="content" label="回复内容"></el-table-column>
                            <el-table-column prop="replyUserName" label="作者"></el-table-column>
                            <el-table-column prop="createTime" label="时间"></el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" sortable width="80" align="center"></el-table-column>
                <el-table-column
                    prop="content"
                    label="评论"
                    sortable
                    fit
                    align="center"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="userName" label="作者" sortable width="150" align="center"></el-table-column>
                <el-table-column prop="createTime" label="时间" sortable width="180" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="triggerModal(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
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
import { getAdminMsgList, deleteMsg } from "@/assets/js/apis";
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
        // 配合css选择性显示展开行图标
        getRowClass(row, index) {
            let expandClass = row.row.reply.length ? "" : "hide-expand";
            return expandClass;
        },
        // 改变默认table显示行数
        changePageNum(e) {
            if (this.isValid(e)) {
                this.perPage = Number(e);
                this.debounce(this.reqMsgData);
            } else {
                return;
            }
        },
        // 请求留言数据接口
        reqMsgData: function(e = 1) {
            getAdminMsgList({
                curpage: e,
                perpage: this.perPage
            }).then(res => {
                var flag = res.result.status;
                if (flag) {
                    this.tableData = this.handleData(res.result.data);
                    // 分页初始化
                    this.initPage(res.result);
                } else {
                    this.tableData = [];
                }
            });
        },
        handleData(arr) {
            arr.forEach(item => {
                this.$set(item, "showMesg", false);
            });
            // 转换数据中所有unix时间戳
            this.transferTime(arr);
            return arr;
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
        // 删除留言
        handleDelete() {
            this.tableData.splice(this.deleteCont.index, 1);
            // 再请求删除留言接口
            deleteMsg(this.deleteCont.row.id, {
                token: window.localStorage.token
            });
        },
        traversalObj: function(curValue, searchStr) {
            var i, j, k, tostr, tmp;
            for (i in curValue) {
                if (curValue.hasOwnProperty(i)) {
                    switch (i) {
                        case "reply":
                            // curValue[i] 动态下的回复数组
                            tmp = curValue[i];
                            for (j in tmp) {
                                // curValue[i][j] 回复数组的元素（对象格式）

                                for (k in tmp[j]) {
                                    switch (k) {
                                        case "replyType": // 检测到这个字段不返回
                                            break;

                                        default:
                                            // 其他key的value中如果包含检索字符，返回true
                                            tostr = tmp[j][k].toString();
                                            if (
                                                tostr.indexOf(searchStr) != -1
                                            ) {
                                                return true;
                                            }
                                            break;
                                    }
                                }
                            }
                            break;
                        case "showMesg":
                            break;
                        default:
                            tostr = curValue[i].toString();
                            if (tostr.indexOf(searchStr) != -1) {
                                return true;
                            }
                            break;
                    }
                }
            }
        },
        transferTime(obj) {
            obj.forEach((e, i, arr) => {
                for (i in e) {
                    if (i == "createTime") {
                        e[i] = formatTime(e[i] * 1000, "yyyy/MM/dd hh:mm:ss");
                    }
                    if (i == "reply" && e[i].length) {
                        this.transferTime(e[i]);
                    }
                }
            }, this);
        },
        handleCurrentChange(val) {
            this.reqMsgData(val);
        },
        initPage: function(data) {
            this.total = Number(data.rows);
            this.perPage = Number(data.perpage);
        }
    },
    mounted: function() {
        this.reqMsgData();
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
.msg-wrap {
    width: 100%;
}
</style>
<style>
</style>

