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
    config => {
        // 显示loading
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/* eslint-disable */
// 响应拦截器用来异常处理
axios.interceptors.response.use(
    response => {
        return response;
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
// let Prefix = 'api';
// 获取某篇文章
export const getArticle = params => {
    return axios
        .get(`/article/newGetArticleDetails/${params}`)
        .then(res => res.data);
};
// 获取文章列表
export const getArticleList = params => {
    return axios
        .get(`/article/getArticleList`, {
            params: params
        })
        .then(res => res.data);
};
// 文章增加评论功能
export const addMark = params => {
    return (
        axios
            // 如果不用Qs转变为字符串，传入对象会导致请求类型不是Form Data，而是Request Payload
            .post(`/article/addMark`, Qs.stringify(params))
            .then(res => res.data)
    );
};
// 文章评论点赞功能
export const addSupport = (articleId, params) => {
    return axios
        .get(`/article/agreeForArticleMarks/${articleId}`, {
            params: params
        })
        .then(res => res.data);
};
