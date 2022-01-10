import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FormElement from './components/FormElement'

function IndexConfig() {
  return (
    <PageHeaderWrapper title={false}>
      <Card>
        <FormElement />
      </Card>
    </PageHeaderWrapper>
  )
}

export default IndexConfig
