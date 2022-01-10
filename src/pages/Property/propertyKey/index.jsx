import React from 'react';
import SearchBar from './components/Search'
import TableBar from './components/Table'
import KeyEdit from './components/modal/KeyEdit'
import PropertyValueList from './components/modal/valueList/index'
import { connect } from 'dva';

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class PropertyKey extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'propertyKey/init',
      payload: {
        page: DEFAULT_PARAMS.page,
        pageSize: DEFAULT_PARAMS.pageSize
      }
    })
  }

  onSearch = (data) => {
    console.log(data,'dskdms')
  }

  onReset = () => { }

  pageHandle = (page, size) => {
    const { dispatch } = this.props
    dispatch({
      type: 'propertyKey/init',
      payload: {
        pageIndex: page,
        pageSize: size
      }
    })
  }

  searchPropertyListHandle = async value => {
    if (value === '') {
      return
    }
    this.props.dispatch({
      type: 'propertyKey/searchPropertyList',
      payload: {
        propertyName: value
      }
    })
  }

  showHandle = (type, data) => {
    this.props.dispatch({
      type: 'propertyKey/showModal',
      payload: {
        type,
        data
      }
    })
  }

  render() {
    const {
      loading,
      dataSource,
      pagination,
      currentAction,
      propertyList
    } = this.props.propertyKey

    pagination.onChange = (currentPage, pageSize) => {
      this.pageHandle(currentPage, pageSize)
    }

    pagination.onShowSizeChange = (currentPage, pageSize) => {
      this.pageHandle(currentPage, pageSize)
    }

    const searchProps = {
      propertyList,
      onSearch: this.onSearch,
      onReset: this.onReset,
      searchHandle: this.searchPropertyListHandle
    }

    const listProps = {
      loading,
      dataSource,
      pagination,
      showHandle: this.showHandle
    }

    const modalProps = {
      currentAction,
      propertyList,
      showHandle: this.showHandle,
      searchHandle: this.searchPropertyListHandle,
    }

    return (
      <div className='layout-section'>
        <div className="layout-moduleTitle">属性项列表</div>
        <SearchBar {...searchProps} />
        <TableBar {...listProps} />
        {
          (currentAction === 'add' || currentAction === 'edit') &&
          <KeyEdit {...modalProps} />
        }
        {
          (currentAction === 'manage') &&
          <PropertyValueList
            currentAction={currentAction}
            showHandle={this.showHandle}
          />
        }
      </div>
    )
  }
}

export default connect(({ propertyKey }) => ({ propertyKey }))(PropertyKey)
