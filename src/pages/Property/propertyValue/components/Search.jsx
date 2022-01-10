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
    const { propertyValueList } = this.props
    const sourceData = [
      {
        key: 'propertyValueId',
        label: '属性值ID',
        type: 'input',
        antdOptions: {
          placeholder: '属性值ID',
        },
      },
      {
        key: 'propertyValueName',
        type: 'inputWithResult',
        label: '属性值名称',
        valueKey: 'propertyValueId',
        labelKey: 'propertyValueName',
        onSearch: this.searchHandle,
        antdOptions: {
          placeholder: '属性值名称',
          filterOption: false,
        },
        data: propertyValueList
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
