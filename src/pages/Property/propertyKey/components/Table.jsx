import React, { Component } from 'react'
import { Table, Tag, Button } from 'antd'
import { propertyKeyTypeMap, inputTypeMap, modifyTypeMap } from './settings'

export default class TableBar extends Component {
  constructor(props) {
    super(props)
  }

  showHandle = (type, data) => {
    this.props.showHandle(type, data)
  }

  render() {
    const { dataSource, loading, pagination } = this.props
    const columns = [
      {
        title: '属性项ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '属性项名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '属性项类型',
        dataIndex: 'propertyType',
        key: 'propertyType',
        render: (value, record) => {
          const { isSellProperty, isGoodsProperty } = record
          return (
            <span>
              { isSellProperty && <Tag color="#87d068">{propertyKeyTypeMap.isSellProperty}</Tag>}
              { isGoodsProperty && <Tag color="#108ee9">{propertyKeyTypeMap.isGoodsProperty}</Tag>}
            </span>
          )
        }
      },
      {
        title: '属性值输入方式',
        dataIndex: 'inputType',
        key: 'inputType',
        render: value => inputTypeMap[String(value)]
      },
      {
        title: '输入方式是否可修改',
        dataIndex: 'modifyType',
        key: 'modifyType',
        render: value => modifyTypeMap[String(value)]
      },
      {
        title: '属性值数量',
        dataIndex: 'valueCount',
        key: 'valueCount',
      },
      {
        title: '操作',
        key: 'operate',
        align: 'center',
        // fixed: 'right',
        // width: 200,
        render: (text, record) => {
          return (
            <div>
              <a style={{ marginRight: 10 }} onClick={e => this.showHandle('edit', record)}>编辑</a>
              <a onClick={e => this.showHandle('manage', record)}>管理属性值</a>
            </div>
          )
        }
      }
    ]

    return (
      <div>
        <div className='table-hoc'>
          <Button type='primary' onClick={() => this.showHandle('add')}>新增属性项</Button>
        </div>
        <Table
          bordered
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={record => record.id}
        />
      </div>
    )
  }
}
