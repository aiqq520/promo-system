/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { postSave, postUpdate } from '@/services/category'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

function FormElement(props) {
  const [loading, setLoading] = useState(false)
  const { visible, dataInfo, form, success, cancel } = props
  const { getFieldDecorator } = form

  const onOk = () => {
    form.validateFields(async (err, values) => {
      if(err) return
      setLoading(true)

      values.id = dataInfo && dataInfo.id || undefined
      const isUpdate = !!(dataInfo && dataInfo.id)
      const res = isUpdate ? await postUpdate(values) : await postSave(values)
      setLoading(false)

      if (!res || !res.success) return
      message.success('操作成功')
      success && success()
      onCancel()
    })
  }

  const onCancel = () => {
    cancel && cancel()
  }

  return (
    <Modal
      visible={visible}
      title={`${dataInfo && dataInfo.id ? '编辑' : '新增'}类目`}
      destroyOnClose
      okText='确定'
      cancelText='取消'
      confirmLoading={loading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label='类目名称'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入类目名称' }],
            initialValue: dataInfo && dataInfo.name || undefined
          })(
            <Input placeholder='请输入类目名称' />
          )}
        </Form.Item>

        <Form.Item label='关键词'>
          {getFieldDecorator('keyword', {
            rules: [{ required: true, message: '请输入关键词' }],
            initialValue: dataInfo && dataInfo.keyword || undefined
          })(
            <Input placeholder='请输入关键词' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(FormElement)
