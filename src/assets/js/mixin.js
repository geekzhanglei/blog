/**
 * @description 动态管理与评论管理的公共可混用数据
 */
export default {
    data: function() {
        return {
            tableData: [],
            sourceData: [],
            selectedPage: true,
            flag: 1,
            // 分页数据
            showPages: true,
            curPage: 1,
            perPage: 5,
            total: 5
        };
    },
    methods: {
        // 是否分页方法
        changeStatus(callback) {
            if (this.selectedPage == 1) {
                this.perPage = 5;
                this.showPages = true;
            } else {
                this.perPage = 9999;
                this.showPages = false;
            }
            callback();
        },
        // 验证是否为数字
        isValid(val) {
            if (val && !isNaN(Number(val))) {
                return true;
            } else {
                return false;
            }
        },
        // 搜索函数
        search(e) {
            if (e) {
                Object.assign(this.sourceData, this.tableData);
                this.tableData = this.tableData.filter(
                    (currentValue, index, arr) => {
                        return this.traversalObj(currentValue, e);
                    }
                );
            } else {
                this.tableData = this.sourceData;
            }
        },
        // 防抖函数
        debounce(fn, ctx, interval = 5000) {
            fn.id = setTimeout(() => {
                clearTimeout(fn.id);
                fn.call(ctx);
            }, interval);
        }
    }
};
