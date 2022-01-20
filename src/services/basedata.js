import request from '@/utils/request';

/**
 * 获取列表
 */
export function queryBaseDataList(params) {
  return request('/metadata/list', {
    method: 'POST',
    data: params
  })
}

/**
 * 保存
 */
export function postSave(params) {
  return request('/metadata/save', {
    method: 'POST',
    data: params
  })
}

/**
 * 修改
 */
export function postUpdate(params) {
  return request('/metadata/update', {
    method: 'POST',
    data: params
  })
}

/**
 * 删除
 */
export function postDelete(params) {
  return request(`/metadata/delete/${params}`, {
    method: 'POST',
  })
}
