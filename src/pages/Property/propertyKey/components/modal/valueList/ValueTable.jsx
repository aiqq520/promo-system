import React, { Component } from 'react'
import { Table, Button } from 'antd'

export default class TableBar extends Component {
  constructor(props) {
    super(props)
  }

  updateHandle = (data) => {

  }

  showHandle = (type) => {
    console.log(type, 'dmksmdks')
    this.props.showHandle(type)
  }

  render() {
    const { dataSource, loading, pagination } = this.props

    const columns = [{
      title: '属性项名称',
      dataIndex: 'pnName',
      key: 'pnName',
    }, {
      title: '属性值ID',
      dataIndex: 'propertyValueId',
      key: 'propertyValueId',
    }, {
      title: '属性值名称',
      dataIndex: 'pvName',
      key: 'pvName',
    }, {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
    }, {
      title: '操作',
      key: 'action',
      nofix: true,
      render: (text, record) => {
        return (
          <div className="operateBtn-container">
            <a
              onClick={e => this.showHandle('edit', record)}
            >
              编辑
          </a>
          </div>
        )
      }
    }]

    return (
      <div>
        <div className='table-hoc'>
          <Button type='primary' onClick={() => this.showHandle('add')}>新增属性值</Button>
          <Button type='primary' style={{ marginLeft: 20 }} onClick={() => this.showHandle('import')}>导入属性值</Button>
        </div>
        <Table
          bordered
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={pagination}
          rowKey='propertyValueId'
          scroll={{ x: 800 }}
        />
      </div>
    )
  }
}
