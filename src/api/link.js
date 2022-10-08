/*
 * 向本地服务器发送请求并处理返回结果
 */
import service from '../utils/service'
// 封装相关的数据请求
let link = (url, method = "get", data, params) => {
    return new Promise((resolve, reject) => {
        service.request({
            url,
            method,
            data,
            params
        }).then((value) => {
            // console.log("link.js:正确", value);
            resolve(value)
        }).catch((err) => {
            // console.log("link.js:错误", err);
            reject(err)
        })
    })
    // console.log("service:", service.interceptors);
}

export default link