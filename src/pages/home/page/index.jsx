import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, message } from 'antd';
import FormElement from './components/FormElement'
import { queryList, postDelete } from '@/services/home'
import { queryItemList } from '@/services/item'
import { queryCategoryList } from '@/services/category'
import { getColumnConfig } from './config/index'

function HomePage() {
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pageIndex, setPageIndex] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState({})

  const [itemList, setItemList] = useState([]) // 商品list
  const [categoryList, setCategoryList] = useState([]) // 类别list

  // 获取首页配置
  const getDataList = async () => {
    setLoading(true)
    const params = { page: pageIndex, size: pageSize }
    const res = await queryList(params)
    const { count, rows } = (res && res.data || {})
    setLoading(false)
    setTotal(count || 0)
    setDataSource(rows || [])
  }

  useEffect(() => {
    getDataList()
  }, [pageSize, pageIndex])

  // 获取枚举值
  const getEnumList = async () => {
    const params = { page: 1, size: 20 }
    const res1 = await queryItemList(params)
    const { rows } = (res1 && res1.data || {})
    const arr = rows && rows.map(item => ({ value: item.id, label: item.title })) || []
    setItemList(arr)

    const res = await queryCategoryList(params)
    const { rows: data } = (res && res.data || {})
    const list = data && data.map(_item => ({ value: _item.id, label: _item.name })) || []
    setCategoryList(list)
  }

  useEffect(() => {
    getEnumList()
  }, [])

  const pageHandle = (pagination) => {
    setPageIndex(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const handle = async (type, record) => {
    if (type === 'edit') {
      setVisible(true)
      setDataInfo(record)
    }
    if (type === 'delete') {
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

  const success = () => {
    cancel()
    getDataList()
  }

  const pagination = {
    total,
    pageSize,
    current: pageIndex,
    showSizeChanger: true,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    showTotal: total => `共${total}条`,
  }

  return (
    <PageHeaderWrapper title={false}>
      <Card bordered={false}>
        <div className='table-bar'>
          <div className='table-bar-title'>基础配置</div>
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
        />

        {visible &&
          <FormElement
            visible={visible}
            dataInfo={dataInfo}
            itemList={itemList}
            categoryList={categoryList}
            cancel={cancel}
            success={success}
          />
        }
      </Card>
    </PageHeaderWrapper>
  )
}

export default HomePage
