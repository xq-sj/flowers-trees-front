/**
 * 认证模块请求接口
 */
import request from "../config/request";

/**
 * 表单登录接口
 */
export function login(data) {
  return request.post({
    url: '/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}