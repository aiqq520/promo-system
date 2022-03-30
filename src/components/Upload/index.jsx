/* eslint-disable */
import React, { Component } from 'react'
import { Upload, Icon, message, Modal } from 'antd'
import { uploadFile } from '@/services/common'
import { looseEqual } from '@/utils/utils';
import Sortable from 'sortablejs'

class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
    this.rootId = `rootId${String((new Date().valueOf() * Math.random()).toFixed(0))}`
  }

  UNSAFE_componentWillMount() {
    const { value = [] } = this.props
    const fileList = value ? value.map(item => {
      return {
        uid: item,
        url: item,
        status: 'done'
      }
    }) : []
    this.setState({ fileList })
  }

  componentDidMount() {
    const container = document.querySelector(`.${this.rootId} .uploadImage-root .ant-upload-list-picture-card`)
    this.sortableList = new Sortable(container, {
      animation: 300,
      onSort: this.sortChangeHandle,
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.props
    if (!looseEqual(nextProps.value, value)) {
      const fileList = nextProps.value ? nextProps.value.map(item => {
        return {
          uid: item,
          url: item,
          status: 'done'
        }
      }) : []
      this.setState({ fileList })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !looseEqual(nextProps.value || [], this.props.value) ||
      !looseEqual(nextState.fileList, this.state.fileList) ||
      nextState.previewVisible !== this.state.previewVisible ||
      nextState.previewImage !== this.state.previewImage
    ) {
      return true
    }
    return false
  }

  // UNSAFE_componentWillUpdate(nextProps) {
  //   if (!looseEqual(nextProps.value, this.props.value)) {
  //     this.initData(nextProps.value)
  //   }
  // }

  // initData(data) {
  // let arr = []
  // if (Array.isArray(data) && data.length) {
  //   data.map((item, i) => {
  //     if (typeof item === 'string') {
  //       arr[i] = { name: i, uid: i, url: item, status: 'done' }
  //     } else {
  //       arr[i] = item
  //     }
  //   })
  // } else if(!Array.isArray(data) && data) {
  //   return [{ uid: 0, url: data, status: 'done' }]
  // } else {
  //   return []
  // }
  // this.setState({ fileList: arr })
  // }

  sortChangeHandle = e => {
    const { newIndex, oldIndex } = e
    const { onChange } = this.props
    const fileList = this.state.fileList.slice()
    const oldFile = fileList.splice(oldIndex, 1)[0]
    fileList.splice(newIndex, 0, oldFile)
    this.setState({ fileList })

    const value = fileList.filter(item => item.url || item.response).map(i => i.url || i.response.url)
    onChange(value)
  }

  // 图片上传
  beforeUpload = (file) => {
    const maxM = 10
    const isLimitType =
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    if (!isLimitType) {
      message.error('上传失败，图片上传格式为jpg、png、jpeg')
    }

    const isLt1M = file.size / 1024 / 1024 <= maxM
    if (!isLt1M) {
      message.error('上传失败，图片大小限制为10M')
    }

    return isLimitType && isLt1M
  }

  // 状态变更
  uploadChange = ({ fileList }) => {
    // this.setState({ fileList })
    // const arr = fileList && fileList.map(item => (item.response ? item.response.url : item.url)).filter(item => item)
    // this.props.onChange(arr)
    if (fileList.some(i => i.status === 'uploading')) {
      this.sortableList.option('disabled', true)
      return this.setState({ fileList })
    }

    const { onChange } = this.props
    fileList = fileList
      .filter(file => {
        if (file.status === 'error') {
          message.error('上传失败')
          return false
        }
        return true
      })
      .map(file => {
        if (file.response && file.response.url) {
          file.url = file.response.url
        }
        return file
      })

    this.setState({ fileList })

    this.sortableList.option('disabled', false)
    const value = fileList.filter(item => item.url || item.response).map(i => i.url || i.response.url)
    onChange(value)
  }

  handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const data = new FormData()
    data.append('file_data', file)
    uploadFile(data)
      .then(res => {
        onSuccess(res && res.data || {})
      })
      .catch(err => {
        onError(err)
      })
  }

  // 图片预览
  uploadPreview = async file => {
    this.setState({
      previewImage: file.response ? file.response.url : file.url || file.thumbUrl,
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
    const { fileList } = this.state
    if (fileList.length >= (this.props.maxCount || 10)) return null
    return (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
  }

  render() {
    const { fileList, previewVisible, previewImage } = this.state

    return (
      <div className={`clearfix ${this.rootId}`}>
        <div className='uploadImage-root'>
          <Upload
            {...this.props}
            multiple
            // name="file_data"
            listType="picture-card"
            className='uploadImage-antdRoot'
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
        </div>

        {previewVisible &&
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        }
      </div>
    )
  }
}

export default UploadImage
