import axios from 'axios'
import { resReject, resResolve, reqReject, reqResolve } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    timeout: 12000,
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  // 请求拦截器，响应拦截器
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(resResolve, resReject)
  return service
}
// ... 运算符用于将多个对象合并成一个新对象，属性相同的会被后面的对象覆盖。
// 在 axios.create() 中，使用 ...defaultOptions 和 ...options 可以动态合并多个配置，灵活地设置 Axios 实例的配置。

export const request = createAxios({
  baseURL: import.meta.env.VITE_BASE_API,
})
