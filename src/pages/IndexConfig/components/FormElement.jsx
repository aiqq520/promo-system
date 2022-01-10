import React, { Component } from 'react'
import { Button, Form, Select, Upload, Icon, Modal } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const { Option } = Select

class FromElement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },],
      previewVisible: false,
      previewImage: '',

    }
  }

  uploadPreview = async file => {
    // if (!file.url && !file.preview) {
    // file.preview = await getBase64(file.originFileObj);
    // }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  uploadChange = ({ fileList }) => {
    this.setState({ fileList })
  }

  // 图片上传
  beforeUpload = (file) => {
    const isLimitType = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isLimitType) {
      message.error('上传失败，图片上传格式为jpg、png')
    }
    const isLt1M = file.size / 1024 / 1024 <= 1
    if (!isLt1M) {
      message.error('上传失败，图片大小限制为1M')
    }
    return isLimitType && isLt1M
  }


  handleCancel = () => {
    this.setState({ previewVisible: false, previewImage: '' })
  }

  beforeSubmit = () => {
    const { form: { validateFields } } = this.props
    validateFields((err, values) => {
      console.log(values,'dsmdksm')

      // if (values.actStartDisplayBean.img && values.actStartDisplayBean.img.file) {
      //   if (values.actStartDisplayBean.img.file.status === 'done') {
      //     values.actStartDisplayBean.img = values.actStartDisplayBean.img.file.response.url
      //   } else {
      //     values.actStartDisplayBean.img = ''
      //   }
      // }
    })
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const { form: { getFieldDecorator } } = this.props

    return (
      <div>
        <Form {...formItemLayout}>
          <FormItem label='猜你喜欢'>
            {getFieldDecorator('guess', {
              rules: [{
                required: true,
                message: '请选择'
              }]
            })(
              <Select
                style={{ width: 500 }}
                placeholder='请选择'
              >
                <Option value={'cat'}>cat</Option>
                <Option value={'apple'}>apple</Option>
                <Option value={'demo'}>demo</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label='热销商品'>
            {getFieldDecorator('hot', {
              rules: [{
                required: true,
                message: '请选择'
              }]
            })(
              <Select
                style={{ width: 500 }}
                placeholder='请选择'
              >
                <Option value={'cat'}>cat</Option>
                <Option value={'apple'}>apple</Option>
                <Option value={'demo'}>demo</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label='首页类目'>
            {getFieldDecorator('category', {
              rules: [{
                required: true,
                message: '请选择'
              }]
            })(
              <Select
                style={{ width: 500 }}
                placeholder='请选择'
              >
                <Option value={'cat'}>cat</Option>
                <Option value={'apple'}>apple</Option>
                <Option value={'demo'}>demo</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label='banner图配置'>
            {getFieldDecorator('banner', {
              rules: [{
                required: true,
                message: '请配置banner图'
              }]
            })(
              <Upload
                name={'picFile'}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                withCredentials={true}
                onPreview={this.uploadPreview}
                onChange={this.uploadChange}
                beforeUpload={this.beforeUpload}
              >
                {fileList.length >= 6 ? null :
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                }
              </Upload>
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 4 }}>
            <Button type='primary' style={{ width: 100 }} onClick={this.beforeSubmit}>保存</Button>
          </FormItem>
        </Form>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default Form.create()(FromElement)
