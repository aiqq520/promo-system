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
        render: value => value.replace(/,/g, '-')
      },
      {
        title: '销售属性（属性值）',
        dataIndex: 'sellProperties',
        key: 'sellProperties',
        render: value => {
          return value instanceof Array && value.map((item, index) =>
            <span key={index}>
              {item &&
                `${item.propertyName}
                ${item.pairCount ? '(' + item.pairCount + ')' : ''}`
              };
            </span>
          )
        }
      },
      {
        title: '商品属性（属性值）',
        dataIndex: 'goodsProperties',
        key: 'goodsProperties',
        width: '400px',
        render: value => {
          return value instanceof Array && value.map((item, index) =>
            <span key={index}>
              {item &&
                `${item.propertyName}
                ${item.pairCount ? '(' + item.pairCount + ')' : ''}`
              };
            </span>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (value, record) => {
          return (
            <div>
              <a
                // onClick={e => this.categoryManageHandle(record.id)}
              >
                类目属性明细
            </a>
            </div>
          )
        }
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
