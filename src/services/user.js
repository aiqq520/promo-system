import request from '@/utils/request';

// 获取当前用户
export async function queryCurrent(params) {
  return request('/', {
    method: 'POST',
    data: params
  })
}

export async function query() {
  return request('/api/users');
}

// export async function queryNotices() {
//   return request('/api/notices');
// }
