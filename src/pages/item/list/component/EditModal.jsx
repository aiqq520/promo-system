/* eslint-disable */
import React, { useState, useRef } from 'react'
import FormGroup from '@/components/FormGroup'
import { Modal, message } from 'antd'
import { postSave, postUpdate } from '@/services/item'
import { getFormConfigs } from './index'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

function EditModal(props) {
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const { visible, dataInfo, categoryList, cancel, success } = props

  const onOk = () => {
    const { validateFields } = formRef.current.props.form
    validateFields(async (err, values) => {
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
      width={650}
      visible={visible}
      title={`${dataInfo && dataInfo.id ? '编辑' : '新增'}商品`}
      destroyOnClose
      okText='确定'
      cancelText='取消'
      confirmLoading={loading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <FormGroup
        configs={getFormConfigs(dataInfo, categoryList)}
        formProps={formItemLayout}
        wrappedComponentRef={formRef}
      />
    </Modal>
  )
}

export default EditModal
