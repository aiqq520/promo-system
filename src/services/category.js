import request from '@/utils/request';

/**
 * 获取列表
 */
export async function queryCategoryList(params) {
  return request('/frontCategory/list', {
    method: 'POST',
    data: params
  })
}

/**
 * 保存
 */
export async function postSave(params) {
  return request('/frontCategory/save', {
    method: 'POST',
    data: params
  })
}

/**
 * 修改
 */
export async function postUpdate(params) {
  return request('/frontCategory/update', {
    method: 'POST',
    data: params
  })
}

/**
 * 删除
 */
export async function postDelete(params) {
  return request(`/frontCategory/delete/${params}`, {
    method: 'POST',
  })
}
