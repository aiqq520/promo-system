import { connect } from 'dva'
import React, { Component } from 'react'
import SearchBar from './components/Search'
import TableBar from './components/Table'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class PropertyValue extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'propertyValue/init',
      payload: {
        page: DEFAULT_PARAMS.page,
        pageSize: DEFAULT_PARAMS.pageSize
      }
    })
  }

  pageHandle = (page, size) => {
    const { dispatch } = this.props
    dispatch({
      type: 'propertyValue/init',
      payload: {
        pageIndex: page,
        pageSize: size
      }
    })
  }

  onSearch = (data) => {
    console.log(data, 'dskdms')
  }

  onReset = () => { }

  searchPropertyValueHandle = async value => {
    if (value === '') {
      return
    }
    this.props.dispatch({
      type: 'propertyValue/searchPropertyValue',
      payload: {
        propertyValueName: value
      }
    })
  }

  render() {
    const { loading, dataSource, pagination, propertyValueList } = this.props.propertyValue

    const searchProps = {
      propertyValueList,
      onSearch: this.onSearch,
      onReset: this.onReset,
      searchHandle: this.searchPropertyValueHandle
    }

    const listProps = {
      loading,
      dataSource,
      pagination
    }

    return(
      <div className='layout-section'>
        <div className="layout-moduleTitle">属性值列表</div>
        <SearchBar {...searchProps} />
        <TableBar {...listProps} />
      </div>
    )
  }
}

export default connect(({ propertyValue }) => ({ propertyValue }))(PropertyValue)

