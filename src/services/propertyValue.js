import request from '@/utils/request'

export function queryPropertyValue(params) {
  return request('/property/value/page', params)
}

export function queryPropValueByPropKey(data) {
  return request('/property/pair/page', {
    method: 'post',
    data,
  })
}

export function addPropertyValue(data) {
  return request('/property/value/add', {
    method: 'post',
    data,
  })
}

export function downloadPropertyValueTemplate(data) {
  return request('/property/value/template')
}

export function uploadImportFile(data) {
  return request('/property/value/importPropertyValue', {
    method: 'post',
    body: data,
    filename: '属性导入结果.xls',
  })
}

export function fuzzySearchPropertyValue(data) {
  return request('/property/value/search', {
    method: 'post',
    data,
  })
}

export function updatePropertyValue(data) {
  return request('/property/value/update', {
    method: 'post',
    data,
  })
}
