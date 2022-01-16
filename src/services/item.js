import request from '@/utils/request';

/**
 * 获取列表
 */
export async function queryItemList(params) {
  return request('/item/list', {
    method: 'POST',
    data: params
  })
}

/**
 * 保存
 */
export async function postSave(params) {
  return request('/item/save', {
    method: 'POST',
    data: params
  })
}

/**
 * 修改
 */
export async function postUpdate(params) {
  return request('/item/update', {
    method: 'POST',
    data: params
  })
}

/**
 * 删除
 */
export async function postDelete(params) {
  return request(`/item/delete/${params}`, {
    method: 'POST',
  })
}

/**
 * 详情
 */
export async function getInfo(params) {
  return request(`/item/info/${params}`, {
    method: 'POST',
  })
}
