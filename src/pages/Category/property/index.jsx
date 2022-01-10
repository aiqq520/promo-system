import { connect } from 'dva'
import React, { Component } from 'react'
import SearchBar from './components/Search'
import TableBar from './components/Table'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class CategoryProperty extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categoryProperty/init',
      payload: {
        page: DEFAULT_PARAMS.page,
        pageSize: DEFAULT_PARAMS.pageSize
      }
    })
  }

  // pageHandle = (page, size) => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'categoryProperty/init',
  //     payload: {
  //       pageIndex: page,
  //       pageSize: size
  //     }
  //   })
  // }

  onSearch = () => {}

  onReset = () => {}

  render() {
    const { loading, dataSource, pagination } = this.props.categoryProperty

    const searchProps = {
      onSearch: this.onSearch,
      onReset: this.onReset,
    }

    const listProps = {
      loading,
      dataSource,
      pagination
    }

    return (
      <div className='layout-section'>
        <div className="layout-moduleTitle">类目属性管理</div>
        <SearchBar {...searchProps} />
        <TableBar {...listProps} />
      </div>
    )
  }
}

export default connect(({ categoryProperty }) => ({ categoryProperty }))(CategoryProperty)

