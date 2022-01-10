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

  onExport = () => {}

  loadCategory = () => {

  }

  render() {
    const sourceData = [
      {
        key: 'categoryId',
        type: 'cascader',
        label: '类目',
        labelKey: 'name',
        valueKey: 'id',
        loadData: this.loadCategory,
        antdOptions: {
          placeholder: '请选择类目',
          changeOnSelect: true,
        },
      },
      {
        key: 'managerGroupId',
        type: 'select',
        label: '商品类目分组',
        labelKey: 'groupName',
        valueKey: 'id',
        // data: categoryGroupList,
        antdOptions: {
          placeholder: '请选择类目分组',
        },
      }
    ]

    return (
      <SearchGroup
        sourceData={sourceData}
        onExport={this.onExport}
        onSubmit={this.onSearch}
        onReset={this.onReset}
      />
    )
  }
}
