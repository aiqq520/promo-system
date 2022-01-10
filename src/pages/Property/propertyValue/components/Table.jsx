import React, { Component } from 'react'
import { Table } from 'antd'

export default class TableBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dataSource, loading, pagination } = this.props
    const columns = [
      {
        title: '属性值ID',
        dataIndex: 'propertyValueId',
        key: 'propertyValueId',
      },
      {
        title: '属性值名称',
        dataIndex: 'propertyValueName',
        key: 'propertyValueName',
      },
      {
        title: '配对属性项',
        dataIndex: 'propertyNameList',
        key: 'propertyNameList',
        render: value => value && value.map && value.map(item => item.name).join(';')
      }
    ]

    return (
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={record => record.propertyValueId}
      />
    )
  }
}
