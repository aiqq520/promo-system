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
      const list = bannerConfig && JSON.parse(bannerConfig)

      arr.banner = list && list.map(item => item.image)
      arr.site = list && list.map(item => item.website)
      arr.categoryConfig = categoryConfig &&
        categoryConfig.split(',').map(item => item && Number(item))
      arr.newItemConfig = newItemConfig &&
        newItemConfig.split(',').map(item => item && Number(item))
      arr.topSaleConfig = topSaleConfig &&
        topSaleConfig.split(',').map(item => item && Number(item))
      arr.youMayLikeConfig = youMayLikeConfig &&
        youMayLikeConfig.split(',').map(item => item && Number(item))
      setInitialInfo(arr)
    }
  }, [props.dataInfo])

  const onOk = () => {
    const { validateFields } = formRef.current.props.form
    validateFields(async (err, values) => {
      if(err) return

      const data = JSON.parse(JSON.stringify(values))
      const { categoryConfig, newItemConfig, topSaleConfig, youMayLikeConfig, banner, site } = (data || {})
      const arr = site && site.toString().split(',').filter(item => item)
      const list = banner && banner.map((item, i) => ({
        image: item,
        website: arr[i] || ''
      }))

      data.categoryConfig = categoryConfig && categoryConfig.join()
      data.newItemConfig = newItemConfig && newItemConfig.join()
      data.topSaleConfig = topSaleConfig && topSaleConfig.join()
      data.youMayLikeConfig = youMayLikeConfig && youMayLikeConfig.join()
      data.bannerConfig = JSON.stringify(list)
      delete data.banner
      delete data.site

      data.id = dataInfo && dataInfo.id || undefined
      const isUpdate = !!(dataInfo && dataInfo.id)
      setLoading(true)
      const res = isUpdate ? await postUpdate(data) : await postSave(data)
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
