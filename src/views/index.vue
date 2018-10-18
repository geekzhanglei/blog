<template>
    <div class="list">
        <div class="container">
            <div class="row" v-for="(item,index) in items" :key="index">
                <div class="col-md-12">
                    <div class="articlelist">
                        <h4>
                            <router-link :to="{name:'article',params:{id: item.id}}" class="article-l">{{item.title}}</router-link>
                        </h4>
                        <p v-html="item.introduction"></p>
                        <!-- <p class="time">{{transferTime(item.createTime)}}</p> -->
                        <p class="time">{{item.createTime}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showPages" class="blog-page">
            <!-- <paging v-bind:datasource="pagingData"></paging> -->
        </div>
    </div>
</template>

<script>
// import Vue from 'vue';
import { getArticleList } from '@/assets/js/apis';
import { transfer } from '@/assets/js/utils';

export default {
    data() {
        return {
            // 每页展示多少条
            pagesize: 5,
            items: [],
            showPages: false,
            pagingData: {
                total: 5,
                pages: [],
                page: 1,
                page_total: 5
            }
        };
    },
    methods: {
        // 请求文章数据接口
        reqArticleDataApi: function(e) {
            getArticleList({
                curpage: e
            }).then(res => {
                if (res.result && res.result.status) {
                    this.items = res.result.data;
                    // if (res.result.isPagination) {
                    //     this.showPages = true;
                    //     this.pagingData.page = e;
                    //     if (this.items[0]) {
                    //         this.showPages = true;
                    //     }
                    //     this.pagingData.total = res.result.rows;
                    //     this.pagesize = res.result.perpage;
                    // } else {
                    //     this.showPages = false;
                    // }
                } else {
                    this.items = [];
                    // this.pagingData.total = 0;
                    // this.pagingData.page = 0;
                    // this.showPages = false;
                }
                this.init();
            });
        },
        // 时间戳转换
        // transferTime: function(unixTime) {
        //     return transfer(unixTime);
        // },
        // 分页组件
        init: function() {
            var _this = this;
            var i,
                itemsLen = this.items.length;
            var page_total,
                page = _this.pagingData.page;
            var _temp = parseInt(_this.pagingData.total) / _this.pagesize;
            page_total = Math.ceil(_temp);

            // 初始化每个评论下会用到的私有属性
            // for (i = 0; i < itemsLen; i++) {
            //     Vue.set(this.items[i], 'isAnswer', '回复');
            //     Vue.set(this.items[i], 'isUnfoldAnswers', '查看回复');
            //     Vue.set(this.items[i], 'isShowInput', false);
            //     Vue.set(this.items[i], 'isShowAnswers', false);
            // }
            // 获取分页组件数据
            // this.pagingData = handlePage({
            //     page: page,
            //     total: _this.pagingData.total,
            //     page_total: page_total,
            //     clickPageCb: function(targetPage) {
            //         _this.reqArticleDataApi(targetPage);
            //     }
            // });
        }
    },
    created: function() {
        var _this = this;
        console.log('list加载');
        // 后期接口放这里，请求一遍接口就完成初始化了
        this.reqArticleDataApi(_this.pagingData.page);
    }
};
</script>

<style scoped>
/*文章列表与文章详情*/

.articlelist,
.article {
    background: #f8f8f8;
    margin-bottom: 20px;
    border-left: 8px #ccc solid;
    box-shadow: 0 1px 4px #aaa;
}

/*文章列表*/
.articlelist img {
    max-width: 100%;
}
.articlelist h4 {
    padding: 10px 10px 0 20px;
    color: #2ca6cb;
    font-size: 24px;
    font-weight: 300;
}

.articlelist h4 a {
    text-decoration: none;
}

.articlelist h4 a:hover {
    color: #f4645f;
    text-shadow: 0px 0px 10px #f4645f;
}

.articlelist p {
    margin-bottom: 0;
    padding: 5px 20px 0px 20px;
    color: #817c7c;
    line-height: 1.6;
    word-wrap: break-word;
    font-size: 16px;
}

.articlelist p.time {
    margin-right: 50px;
    height: auto;
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>
