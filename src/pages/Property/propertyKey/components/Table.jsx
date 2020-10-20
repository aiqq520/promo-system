import React, { Component } from 'react'
import { Tag } from 'antd'
import { propertyKeyTypeMap, inputTypeMap, modifyTypeMap } from './settings'

export default class TableBar extends Component {
  constructor(props) {
    super(props)
  }

  columns = [
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
            { isSellProperty && <Tag color="#87d068">{propertyKeyTypeMap.isSellProperty}</Tag> }
            { isGoodsProperty && <Tag color="#87d068">{propertyKeyTypeMap.isGoodsProperty}</Tag> }
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
      key: 'action',
      width: 300,
      render: (text, record) => {
        <div>
          <a onClick={e => this.updateHandle(record)}>编辑</a>
          <a onClick={e => this.managePropertyVal(record)}>管理属性值</a>
        </div>
      }
    }
  ]

  updateHandle = (data) => {
    //
  }

  managePropertyVal = (data) => {
    //
  }

  render() {
    return (
      <div></div>
    )
  }
}
