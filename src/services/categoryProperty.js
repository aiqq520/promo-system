import request from '@/utils/request'

export function queryCategoryPropertyList(params) {
  return request('/category/property/page', params)
}

export function queryCategoryPropertyDetail(categoryId) {
  return request(`/category/property/${categoryId}`, {
  })
}

export function saveCategoryProperty(data) {
  return request('/category/property/save', {
    method: 'post',
    data,
  })
}
