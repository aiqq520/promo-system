import React from 'react'
import { Card } from 'antd'
import { router } from 'umi';
import FormGroup from '@/components/FormGroup'
import { getFormConfigs } from './config/index'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

const wrapperCol = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 4 },
}

function ItemDetail() {

  const handleSubmit = (values) => {

  }

  const handleReturn = () => {
    router.push('/item/list')
  }

  return (
    <Card title='商品编辑'>

      {/* <FormGroup
        showBtn
        configs={getFormConfigs()}
        formProps={formItemLayout}
        btnLayout={{ wrapperCol }}
        onCancel={handleReturn}
        onSubmit={handleSubmit}
      /> */}
    </Card>
  )
}

export default ItemDetail
