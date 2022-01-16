/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { Card, Button, Table, message } from 'antd'
import SearchGroup from '@/components/SearchGroup'
import EditModal from './component/EditModal'
import { searchConfigs, getColumnConfig } from './config'
import { queryItemList, postDelete } from '@/services/item'
import { queryCategoryList } from '@/services/category'

function ItemList() {
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pageIndex, setPageIndex] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [searchParams, setSearchParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState({})

  const [categoryList, setCategoryList] = useState([]) // 类别list

  const getEmunList = async () => {
    const params = { page: 1, size: 20 }
    const res = await queryCategoryList(params)
    const { rows } = (res && res.data || {})
    const arr = rows && rows.map(item => ({ value: item.id, label: item.name })) || []
    setCategoryList(arr)
  }

  useEffect(() => {
    getEmunList()
  }, [])

  const getDataList = async () => {
    setLoading(true)
    const params = {
      page: pageIndex,
      size: pageSize,
      ...searchParams
    }
    const res = await queryItemList(params)
    const { count, rows } = (res && res.data || {})
    setLoading(false)
    setTotal(count || 0)
    setDataSource(rows || [])
  }

  useEffect(() => {
    getDataList()
  }, [pageSize, pageIndex, searchParams])

  const pageHandle = (pagination) => {
    setPageIndex(pagination.current)
    setPageSize(pagination.pageSize)
  }

  // 查询
  const onSearch = (values) => {
    setPageIndex(1)
    setSearchParams(values)
  }

  // 重置
  const onReset = () => {
    onSearch({})
  }

  // const handleAdd = () => {
  //   router.push('/item/detail')
  // }

  const handle = async (type, record) => {
    if (type === 'edit') { // 编辑
      setVisible(true)
      setDataInfo(record)
    }

    if (type === 'delete') { // 删除
      const res = await postDelete(record.id)
      if(!res || !res.success) return
      message.success('操作成功')
      getDataList()
    }
  }

  const cancel = () => {
    setVisible(false)
    setDataInfo({})
  }

  const pagination = {
    total,
    pageSize,
    current: pageIndex,
    showSizeChanger: true,
    showTotal: total => `共${total}条`,
  }

  return (
    <PageHeaderWrapper title={false}>
      <SearchGroup
        configs={searchConfigs}
        onSubmit={onSearch}
        onReset={onReset}
      />

      <Card bordered={false}>
        <div className='table-bar'>
          <div className='table-bar-title'>商品列表</div>
          <div>
            <Button type='primary' onClick={() => setVisible(true)}>新增</Button>
          </div>
        </div>

        <Table
          bordered
          loading={loading}
          columns={getColumnConfig(handle)}
          dataSource={dataSource}
          pagination={pagination}
          onChange={pageHandle}
          rowKey='id'
          scroll={{ x: 2600 }}
        />
      </Card>

      {visible &&
        <EditModal
          visible={visible}
          dataInfo={dataInfo}
          categoryList={categoryList}
          cancel={cancel}
          success={() => getDataList()}
        />
      }
    </PageHeaderWrapper>
  )
}

export default ItemList
