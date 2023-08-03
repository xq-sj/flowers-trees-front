import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

// axios 基础配置
const config = {
  // 默认地址，可以使用 process Node内置的，项目根目录下新建 .env.development
  baseURL: import.meta.env.VITE_BASE_API
}

class Request {
  /**
   * service属性 类型为 AxiosInstance
   */
  readonly service: AxiosInstance;


  // 构造方法
  constructor(config: AxiosRequestConfig) {
    // 实例化当前属性，通过axios创建实例
    this.service = axios.create(config)

    // 配置请求拦截器
    this.service.interceptors.request.use(config => {
      // 在这里处理携带token逻辑
      return config;
    })

    // 配置响应拦截器
    this.service.interceptors.response.use(response => {
      const {data, config} = response;
      return Promise.resolve(data);
    }, error => {
      const res = error.response;
      if (res) {
        let data = res.data;
        console.log("响应拦截器中的错误钩子：", data)
      }
      return Promise.reject(res)
    })
  }

  /**
   * get请求
   * @param config
   */
  get(config: AxiosRequestConfig): Promise<any> {
    //需要给LYRequestConfig传入T类型 否则是默认AxiosResponse类型 与实际不匹配
    return this.service({...config, method: 'GET'})
  }

  /**
   * post请求
   * @param config
   */
  post(config: AxiosRequestConfig): Promise<any> {
    return this.service({...config, method: 'POST'})
  }

  /**
   * put请求
   * @param config
   */
  put(config: AxiosRequestConfig): Promise<any> {
    return this.service({...config, method: 'PUT'})
  }

  /**
   * delete请求
   * @param config
   */
  delete(config: AxiosRequestConfig): Promise<any> {
    return this.service({...config, method: 'DELETE'})
  }
}

/**
 * 导出一个携带基础请求路径的request实例
 */
export default new Request(config)