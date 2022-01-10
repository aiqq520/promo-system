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
        title: '叶子类目',
        dataIndex: 'pathName',
        key: 'pathName',
      },
      {
        title: '所属商品分组',
        dataIndex: 'groupName',
        key: 'groupName',
      },
      {
        title: '类目ID路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '主营类目',
        dataIndex: 'majorName',
        key: 'majorName',
      }
    ]

    return (
      <Table
        bordered
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={record => record.id}
      />
    )
  }
}
