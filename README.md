# blog 重构项目

## 简介

-   计划使用 vue/cli@3.0 开发工具、vue、vue-router、vuex
-   摒弃 blogbeta 项目中 bootstrap、jquery 等利用率不高的库
-   精简代码结构，提高加载速度

## 工期

### 一期内容

-   [ ] 重构项目的前端部分，分为前台和后台
    -   [ ] 原 blogbeta 重构
    -   [ ] 上传图片功能
    -   [ ] markdown 优化
    -   [ ] 留言通知功能

### 二期内容

-   [ ] 替换原来已分离的后端架构 php+mysql，使用 nodejs 框架 koa 和 mongodb，涉及数据库的迁移等问题

### 三期内容

-   [ ] 联动优化
    -   [ ] 通知自动发送到微信模板消息
    -   [ ] 文章自动同步到微信公众号

## bash

```
yarn
yarn serve
yarn build
```
