/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getAuthorization, goToLogin } from '@/utils/user'
import serverHost from './hostName'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const businessMessage = {
  100000000: '参数异常',
  100000001: '状态异常',
  100000002: '业务异常',
  100000003: '未登录',
  100000004: '用户不存在',
  100000005: '未授权',
  100000999: '系统异常'
}

/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});

request.use(async (ctx, next) => {
  await next()

  const { options } = ctx.req;
  // 文件流，直接返回
  if (options.responseType === 'arrayBuffer') {
    ctx.res = {
      code: 1,
      status: 1,
      success: true,
      data: ctx.res
    }
    return;
  }

  const result = ctx.res;
  const { status } = result;
  const success = status === 1;

  ctx.res = {
    ...result,
    success
  };
});

// 处理业务层请求
request.interceptors.request.use((url, options) => {
  // 这里作为外部地址处理
  if (/^http(s)?:\/\//.test(url)) {
    return {
      url,
      options,
    };
  }

  return {
    url: `${serverHost}${url}`,
    options: {
      ...options,
      headers: {
        ...options.headers,
        token: getAuthorization() || ''
      },
      credentials: 'include'
    }
  }
});

// 处理业务层想要
request.interceptors.response.use(async (response, options) => {
  const { responseType } = (options || {})
  if (responseType === 'arrayBuffer') {
    return response
  }

  // application/json
  if (response.status === 200) {
    const result = await response.clone().json()
    const { status, code, message } = result;
    if (status === 0 && code !== 1) {
      notification.error({
        description: businessMessage[code],
        message: message || '未知错误'
      })
    }

    // 未登录或登录过期，这里跳转到登录页面
    if (code === 100000003) {
      goToLogin();
    }
  }

  return response
})

export default request;
