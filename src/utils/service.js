/*
 * 封装了一个带有拦截器的axios实例
 */
import axios from 'axios'

// Process.env.NODE_ENV能指示目前是development还是production
let axiosurl = ''
if (process.env.NODE_ENV === "development") {
    axiosurl = process.env.VUE_APP_API
} else {
    axiosurl = process.env.VUE_APP_API
}

// 创建axios实例
const service = axios.create({
    baseURL: axiosurl
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("service.js拦截请求", config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    // console.log("请求拦截器:错误");
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log("响应拦截器:错误", error);
    ElNotification({
        title: `失败 ${error.response.status}`,
        message: `${error.message}`,
        type: 'error',
    })
    console.log("是否转到静态页面");
    return Promise.reject(error);
});

export default service