# blog 重构项目

## 简介

-   计划使用 vue/cli@3.0 开发工具、vue、vue-router、vuex
-   摒弃 blogbeta 项目中 bootstrap、jquery 等利用率不高的库
-   精简代码结构，提高加载速度

## 工期

### 一期内容

-   [ ] 重构项目的前端部分，分为前台和后台
    -   [x] 原 blogbeta 重构
    -   [x] 上传图片功能
            目前仅自己用，使用自己服务器存放图片
    -   [x] markdown 优化
            换用 mavon-editor 开源编辑器
    -   [ ] 细节优化
        -   [ ] 删除提示
        -   [ ] 回复通知

### 二期内容

-   [ ] nuxt 服务端渲染

### 三期内容

-   [ ] 替换原来已分离的后端架构 php+mysql，使用 nodejs 框架 koa 和 mongodb，涉及数据库的迁移等问题

### 四期内容

-   [ ] 联动优化
    -   [ ] 通知自动发送到微信模板消息
    -   [ ] 文章自动同步到微信公众号

## bash

```
yarn
yarn serve
yarn build
```
