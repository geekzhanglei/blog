/*
 * @Author: zhanglei
 * @Date: 2019-09-16 15:29:44
 * @LastEditors: zhanglei
 * @LastEditTime: 2019-09-16 15:57:43
 * @Description:
 */
module.exports = {
    // 基本路径
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,

    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 3000,
        https: false,
        proxy: {
            '/api/': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/imgapi': {
                target: 'https://api.feroad.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/imgapi': ''
                }
            }
        },
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    // 配置多入口
    pages: {
        index: {
            // page 的入口
            entry: 'src/conf/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
        // admin: {
        //     // page 的入口
        //     entry: 'src/conf/admin.js',
        //     // 模板来源
        //     template: 'public/admin.html',
        //     // 在 dist/index.html 的输出
        //     filename: 'admin.html',
        //     // 当使用 title 选项时，
        //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        //     title: 'Admin Page',
        //     // 在这个页面中包含的块，默认情况下会包含
        //     // 提取出来的通用 chunk 和 vendor chunk。
        //     chunks: ['chunk-vendors', 'chunk-common', 'admin']
        // }
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/conf/main.js'
    }
};
