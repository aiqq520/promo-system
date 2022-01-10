import request from '@/utils/request'

export function queryPropertyKey(params) {
  return request('/property/name/page', params)
}

export function addProperty(data) {
  return request('/property/name/add', {
    method: 'post',
    data,
  })
}

export function queryPropertyDetail(id) {
  return request(`/property/name/edit/${id}`)
}

export function updateProperty(data) {
  return request('/property/name/update', {
    method: 'post',
    data,
  })
}

export function fuzzyQueryPropertyName(data) {
  return request('/property/name/search', {
    method: 'post',
    data,
  })
}
