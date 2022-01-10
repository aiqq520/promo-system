import { connect } from 'dva'
import React, { Component } from 'react'
import SearchGroup from '@/components/SearchGroup'
import { Table } from 'antd'
import { columns, sourceData } from './configs'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class CategoryMove extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { dispatch } = this.props
    // dispatch({
    //   type: 'categoryMove/init',
    //   payload: {
    //     page: DEFAULT_PARAMS.page,
    //     pageSize: DEFAULT_PARAMS.pageSize
    //   }
    // })
  }

  // pageHandle = (page, size) => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'categoryMove/init',
  //     payload: {
  //       pageIndex: page,
  //       pageSize: size
  //     }
  //   })
  // }

  onSearch = () => { }

  onReset = () => { }

  render() {
    const { loading, dataSource, pagination } = this.props.categoryMove

    return (
      <div className='layout-section'>
        <div className="layout-moduleTitle">类目管理</div>

        <SearchGroup
          sourceData={sourceData}
          onSubmit={this.onSearch}
          onReset={this.onReset}
        />

        <Table
          bordered
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={record => record.id}
          // rowSelection={{
          //   selectedRowKeys,
          //   onChange: this.setSelectedRowKeys,
          // }}
        />
      </div>
    )
  }
}

export default connect(({ categoryMove }) => ({ categoryMove }))(CategoryMove)

