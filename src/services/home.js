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

/**
 * 保存
 */
export async function postSave(params) {
  return request('/homeResource/save', {
    method: 'POST',
    data: params
  })
}

/**
 * 修改
 */
export async function postUpdate(params) {
  return request('/homeResource/update', {
    method: 'POST',
    data: params
  })
}

/**
 * 删除
 */
export async function postDelete(params) {
  return request(`/homeResource/delete/${params}`, {
    method: 'POST',
  })
}
