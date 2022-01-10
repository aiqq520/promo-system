import { history } from 'umi';
import { stringify } from 'querystring';
import { getPageQuery } from '@/utils/utils'

const KEY = 'authorization'

/**
 * 获取登录鉴权KEY
 */
export const getAuthorization = () => {
  return localStorage.getItem(KEY)
}

/**
 * 设置登录鉴权KEY
 */
export const setAuthorization = (authorization) => {
  localStorage.setItem(KEY, authorization)
}

/**
 * 清空KEY
 */
export const clearAuthorization = () => {
  localStorage.removeItem(KEY)
}

/**
 * 获取是否登录
 */
export const getIsLogin = () => {
  // const userInfo = getUserInfo()

  // if (userInfo && userInfo.status !== 0) {
  //   return false
  // }

  return !!getAuthorization()
}

/**
 * 跳转去登录
 */
export const goToLogin = () => {
  const { redirect } = getPageQuery(); // Note: There may be security issues, please note
  // 清空授权key
  localStorage.removeItem('authorization')

  // 去登录
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
}
