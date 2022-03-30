import request from '@/utils/request';

// 上传文件 formData
export async function uploadFile(data) {
  return request('/file/upload', {
    method: 'POST',
    body: data
  })
}

// 删除文件
export async function deleteFile(data) {
  return request('/file/delete', {
    method: 'POST',
    data
  })
}

// 上传多文件
export async function uploadMultipleFile(data) {
  return request('/file/uploadMul', {
    method: 'POST',
    data
  })
}
