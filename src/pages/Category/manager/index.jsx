import React, { Component } from 'react'
import SearchBar from './components/Search'
import TableBar from './components/Table'
import { connect } from 'dva'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class CategoryManager extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categoryManager/init',
      payload: {
        page: DEFAULT_PARAMS.page,
        pageSize: DEFAULT_PARAMS.pageSize
      }
    })
  }

  // pageHandle = (page, size) => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'categoryManager/init',
  //     payload: {
  //       pageIndex: page,
  //       pageSize: size
  //     }
  //   })
  // }

  onSearch = () => { }

  onReset = () => { }

  render() {
    const { loading, dataSource, pagination } = this.props.categoryManager

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
        <div className="layout-moduleTitle">类目经营者列表</div>
        <SearchBar {...searchProps} />
        <TableBar {...listProps} />
      </div>
    )
  }
}

export default connect(({ categoryManager }) => ({ categoryManager }))(CategoryManager)

