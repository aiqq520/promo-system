/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import { postSave, postUpdate } from '@/services/basedata'
import { typeMap } from '../config/index'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

function EditModal(props) {
  const [loading, setLoading] = useState(false)
  const { visible, dataInfo, form, success, cancel } = props
  const { getFieldDecorator } = form

  const onOk = () => {
    form.validateFields(async (err, values)=> {
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
      title={`${dataInfo && dataInfo.id ? '编辑' : '新增'}数据`}
      destroyOnClose
      okText='确定'
      cancelText='取消'
      confirmLoading={loading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form {...formItemLayout}>
        <Form.Item label='名称'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入名称' }],
            initialValue: dataInfo && dataInfo.name || undefined
          })(
            <Input placeholder='请输入名称' />
          )}
        </Form.Item>

        <Form.Item label='类型'>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择类型' }],
            initialValue: dataInfo && dataInfo.type || undefined
          })(
            <Select placeholder='请选择类型' disabled={!!(dataInfo && dataInfo.id)}>
              {typeMap && Object.keys(typeMap).map(item => (
                <Select.Option value={Number(item)} key={item}>{typeMap[item]}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='描述信息'>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入描述信息' }],
            initialValue: dataInfo && dataInfo.description || undefined
          })(
            <Input placeholder='请输入描述信息' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(EditModal)
