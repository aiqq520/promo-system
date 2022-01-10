import request from '@/utils/request';

/**
 * 登录
 */
export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 退出
 */
export async function logout() {
  return request('/auth/logout', {
    method: 'POST',
  })
}
