import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

function BasicConfig() {
  return (
    <PageHeaderWrapper title={false}>
      <Card>基础配置</Card>
    </PageHeaderWrapper>
  )
}

export default BasicConfig
