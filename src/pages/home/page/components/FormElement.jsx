/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { Modal, message } from 'antd'
import FormGroup from '@/components/FormGroup'
import { getConfigs } from '../config/index'
import { postSave, postUpdate } from '@/services/home'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

function FromElement(props) {
  const [loading, setLoading] = useState(false)
  const [initialInfo, setInitialInfo] = useState({})
  const formRef = useRef()
  const { visible, dataInfo, itemList, categoryList, success, cancel } = props

  useEffect(() => {
    if (dataInfo && dataInfo.id) {
      const arr = JSON.parse(JSON.stringify(dataInfo))
      const { categoryConfig, newItemConfig, topSaleConfig, youMayLikeConfig, bannerConfig } = (arr || {})
      arr.categoryConfig = categoryConfig &&
        categoryConfig.split(',').map(item => item && Number(item))
      arr.newItemConfig = newItemConfig &&
        newItemConfig.split(',').map(item => item && Number(item))
      arr.topSaleConfig = topSaleConfig &&
        topSaleConfig.split(',').map(item => item && Number(item))
      arr.youMayLikeConfig = youMayLikeConfig &&
        youMayLikeConfig.split(',').map(item => item && Number(item))
      arr.bannerConfig = bannerConfig && JSON.parse(bannerConfig).map(item => item.image).filter(item => !!item) || undefined
      setInitialInfo(arr)
    }
  }, [props.dataInfo])

  const onOk = () => {
    const { validateFields } = formRef.current.props.form
    validateFields(async (err, values) => {
      if(err) return
      const { bannerConfig } = (values || {})
      const list = bannerConfig && bannerConfig.map(item => ({
        image: (item.response ? item.response.url : item.url) || item,
        website: 'www.baidu.com'
      }))

      values.categoryConfig = values.categoryConfig.join()
      values.newItemConfig = values.newItemConfig.join()
      values.topSaleConfig = values.topSaleConfig.join()
      values.youMayLikeConfig = values.youMayLikeConfig.join()
      values.bannerConfig = JSON.stringify(list)

      values.id = dataInfo && dataInfo.id || undefined
      const isUpdate = !!(dataInfo && dataInfo.id)
      setLoading(true)
      const res = isUpdate ? await postUpdate(values) : await postSave(values)
      setLoading(false)
      if(!res || !res.success) return
      message.success('操作成功')
      success && success()
    })
  }

  const onCancel = () => {
    cancel && cancel()
  }

  return (
    <Modal
      width={600}
      visible={visible}
      title={`${dataInfo && dataInfo.id ? '编辑' : '新增'}首页配置`}
      destroyOnClose={true}
      okText='确定'
      cancelText='取消'
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <FormGroup
        configs={getConfigs(initialInfo, itemList, categoryList)}
        formProps={formItemLayout}
        wrappedComponentRef={formRef}
      />
    </Modal>
  )
}

export default FromElement
