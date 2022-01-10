import request from '@/utils/request'

export function queryManagerList(params) {
  return request('/category/manage/group/page', params)
}

export function exportManager(data) {
  return request('/category/managerGroup/export', {
    method: 'post',
    data,
  })
}

export function queryManagerDetail(parentId) {
  return request(`/category/list/${parentId}`)
}

export function queryManagerGroup() {
  return request('/category/manage/group/list')
}

export function updateManager(data) {
  return request('/category/manage/group/update', {
    method: 'post',
    data,
  })
}
