/*
 * @Author: zhanglei
 * @Date: 2019-09-16 15:29:44
 * @LastEditors: zhanglei
 * @LastEditTime: 2019-09-16 16:23:50
 * @Description: axios配置
 */
/**
 * @author zhanglei25@le.com
 * @date 2018.10.19
 */
import axios from 'axios';
import Promise from 'promise';
import Qs from 'qs';

// axios.defaults.baseURL = '/'
axios.defaults.responseType = 'json';
axios.defaults.timeout = 10000; // 该值不宜过小，请求一定概率会出错

const errCode = {
    400: '错误请求',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求错误，未找到该资源',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器端出错',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'http版本不支持该请求'
};

// 拦截器的作用是将promise的成功失败响应放到同一级，都在请求的回调函数中
// 请求拦截器

axios.interceptors.request.use(
    request => {
        // 可以显示loading
        // Qs对参数的格式化在拦截器中处理
        if (request.method === 'post' && !(request.data instanceof FormData)) {
            request.data = Qs.stringify(request.data);
            return request;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

/* eslint-disable */
// 响应拦截器用来异常处理
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    err => {
        if (err && err.response) {
            errCode[err.response.status]
                ? (err.message = errCode[err.response.status])
                : (err.message = `连接错误${err.response.status}`);
        } else {
            err.message = '连接到服务器失败';
        }
        return Promise.resolve(err.message);
    }
);

/* api 列表 */
let Prefix =
    process.env.NODE_ENV === 'production'
        ? 'https://blogapi.feroad.com'
        : '/api';
let ImgPrefix =
    process.env.NODE_ENV === 'production'
        ? 'https://api.feroad.com'
        : '/imgapi';

// 获取某篇文章
export const getArticle = params => {
    return axios.get(`${Prefix}/blogapi/article/detail`, { params });
};
// 获取文章列表
export const getArticleList = params => {
    return axios.get(`${Prefix}/blogapi/article`, { params });
};
// 文章增加评论功能
export const addMark = params => {
    return (
        axios
            // 如果不用Qs转变为字符串，传入对象会导致请求类型不是Form Data，而是Request Payload
            .post(`${Prefix}/blogapi/article/marks/add`, params)
        // .then(res => res.data)
    );
};
// 文章评论点赞和取消点赞功能
// export const addSupport = (articleId, params) => {
//     return axios.get(`${Prefix}/article/agreeForArticleMarks/${articleId}`, {
//         params: params
//     });
// };
// 获取动态列表
export const getMsgList = params => {
    return axios.get(`${Prefix}/blogapi/msg`, { params });
};
// 添加动态
export const addMsg = params => {
    return axios.post(`${Prefix}/blogapi/msg/add`, params);
};
// 动态下添加评论
export const addReplyMsg = params => {
    return axios.post(`${Prefix}/blogapi/msg/replyadd`, params);
};
// 动态点赞功能
export const msgSupport = params => {
    return axios.get(`${Prefix}/blogapi/msg/agree`, { params });
};
// 登录接口
export const adminLogin = params => {
    return axios.post(`${Prefix}/blogapi/admin/login`, params);
};
// 判断是否登录态
export const isLogin = params => {
    return axios.get(`${Prefix}/blogapi/admin/isLogin`, {
        params: params
    });
};
// 获取个人信息
export const getAdminInfo = params => {
    return axios.get(`${Prefix}/blogapi/admin/adminInfo`, {
        params: params
    });
};
// 登录注销
export const loginOut = params => {
    return axios.get(`${Prefix}/blogapi/admin/loginout`, {
        params: params
    });
};
// 修改密码
export const modifyPsw = params => {
    return axios.post(`${Prefix}/blogapi/admin/modifypw`, params);
};
// 修改个人信息
export const modifyAdministerInfo = params => {
    return axios.post(`${Prefix}/blogapi/admin/modifyAdminInfo`, params);
};

// 设置默认文章页数
export const setDefaultArticlePages = params => {
    return axios.post(`${Prefix}/blogapi/admin/setDefaultArticlePages`, params);
};
// 修改留言板单页条数与默认留言昵称、默认回复昵称接口
export const setDefaultCommentInfos = params => {
    return axios.post(`${Prefix}/blogapi/admin/setDefaultCommentInfos`, params);
};
// 获取默认文章与留言配置
export const getOptions = () => {
    return axios.get(`${Prefix}/blogapi/admin/options`);
};
// 获取带回复的动态
export const getAdminMsgList = params => {
    return axios.get(`${Prefix}/blogapi/admin/msgwithmarks`, {
        params: params
    });
};
// 删除留言
export const deleteMsg = params => {
    return axios.post(`${Prefix}/blogapi/msg/delete`, params);
};
// 发布文章
export const releaseArt = params => {
    return axios.post(`${Prefix}/blogapi/article/release`, params);
};
// 删除评论
export const deleteComms = params => {
    return axios.get(`${Prefix}/blogapi/admin/deleteMark`, { params });
};
// 获取带评论的文章
export const getArticleListWithMark = params => {
    return axios.get(`${Prefix}/blogapi/admin/articlesWithMarks`, { params });
};
// 获取带摘要的文章列表
// export const getArticleIntroList = params => {
//     return axios.get(`${Prefix}/admin/getArticleIntroList`, {
//         params: params
//     });
// };
// 删除文章
export const deleteArticle = params => {
    return axios.post(`${Prefix}/blogapi/article/delete`, params);
};

// markdown内图片逐一上传
export const markdownImgUpload = params => {
    return axios.post(`${ImgPrefix}/upload`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
