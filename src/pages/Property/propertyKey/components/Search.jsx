import React, { Component } from 'react'
import SearchGroup from '@/components/SearchGroup'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  onSearch = query => {
    this.props.onSearch(query)
  }

  onReset = () => {
    this.props.onReset()
  }

  searchHandle = value => {
    this.props.searchHandle(value)
  }

  render() {
    const { propertyList } = this.props
    const sourceData = [
      {
        key: 'id',
        type: 'input',
        label: '属性项ID',
        antdOptions: {
          placeholder: '请输入属性项ID',
        }
      },
      {
        key: 'name',
        type: 'inputWithResult',
        label: '属性项名称',
        valueKey: 'code',
        labelKey: 'name',
        onSearch: this.searchHandle,
        antdOptions: {
          placeholder: '属性项名称',
          filterOption: false,
        },
        data: propertyList
      },
      {
        key: 'properties',
        type: 'checkbox',
        label: '属性项类型',
        data: [
          {
            value: 'isSellProperty',
            label: '销售属性',
          }, {
            value: 'isGoodsProperty',
            label: '商品属性',
          }
        ],
      }
    ]

    return (
      <SearchGroup
        sourceData={sourceData}
        onSubmit={this.onSearch}
        onReset={this.onReset}
      />
    )
  }
}
