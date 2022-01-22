/* eslint-disable */
import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd'
import { uploadFile } from '@/services/common'
import { looseEqual } from '@/utils/utils';
class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      loading: false,
      fileList: []
    }
  }

  UNSAFE_componentWillMount() {
    this.initData(this.props.value)
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (!looseEqual(nextProps.value, this.props.value)) {
      this.initData(nextProps.value)
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.value && !looseEqual(nextProps.value, this.props.value)) {
  //     this.initData(nextProps.value)
  //   }
  // }

  initData(data) {
    let arr = []
    if (Array.isArray(data) && data.length) {
      data.map((item, i) => {
        if (typeof item === 'string') {
          arr[i] = { name: i, uid: i, url: item, status: 'done' }
        } else {
          arr[i] = item
        }
      })
    } else if(!Array.isArray(data) && data) {
      return [{ uid: 0, url: data, status: 'done' }]
    } else {
      return []
    }
    this.setState({ fileList: arr })
  }

  // 图片上传
  beforeUpload = (file) => {
    const maxM = 10
    const isLimitType =
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    if (!isLimitType) {
      message.error('上传失败，图片上传格式为jpg、png')
    }

    const isLt1M = file.size / 1024 / 1024 <= maxM
    if (!isLt1M) {
      message.error('上传失败，图片大小限制为10M')
    }

    return isLimitType && isLt1M
  }

  // 状态变更
  uploadChange = ({ fileList }) => {
    this.setState({ fileList })
    const arr = fileList && fileList.map(item => (item.response ? item.response.url : item.url)).filter(item => item)
    this.props.onChange(arr)
  }

  handleCustomRequest = async ({ file, onSuccess, onError }) => {
    this.setState({ loading: true })
    const data = new FormData()
    data.append('file_data', file)
    uploadFile(data)
    .then(res => {
      this.setState({ loading: false })
      onSuccess(res && res.data || {})
    })
    .catch(err => {
      this.setState({ loading: false })
      onError(err)
    })
  }

  // 图片预览
  uploadPreview = async file => {
    this.setState({
      previewImage: file.response ? file.response.url : file.url || file.thumbUrl ,
      previewVisible: true
    })
  }

  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      previewVisible: false,
      previewImage: ''
    })
  }

  // 上传按钮
  renderUploadBtn = () => {
    const { fileList, loading } = this.state
    if (fileList.length >= (this.props.maxCount || 10)) return null
    return (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
  }

  render() {
    const { fileList, previewVisible, previewImage } = this.state
    return (
      <>
        <Upload
          {...this.props}
          listType="picture-card"
          accept="image/png,image/jpg,image/jpeg"
          fileList={fileList}
          withCredentials
          onPreview={this.uploadPreview}
          onChange={this.uploadChange}
          beforeUpload={this.beforeUpload}
          customRequest={this.handleCustomRequest}
        >
          {this.renderUploadBtn()}
        </Upload>

        {previewVisible &&
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        }
      </>
    )
  }
}

export default UploadImage
