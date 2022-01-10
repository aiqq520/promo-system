import request from '@/utils/request';

/**
 * 获取列表
 */
export async function queryList(params) {
  return request('/homeResource/list', {
    method: 'POST',
    data: params
  })
}

