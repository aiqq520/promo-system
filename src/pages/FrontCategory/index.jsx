import React, { useState, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, message } from 'antd'
import FromElement from './components/FromElement'
import { queryList, postDelete } from '@/services/frontCategory'

function FrontCategory() {
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pageIndex, setPageIndex] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState({}) // 弹窗

  const getDataList = async () => {
    setLoading(true)
    const res = await queryList({ page: pageIndex, size: pageSize })
    const { count, rows } = (res && res.data || {})
    setLoading(false)
    setTotal(count || 0)
    setDataSource(rows || [])
  }

  useEffect(() => {
    getDataList()
  }, [pageSize, pageIndex])

  const pageHandle = (pagination) => {
    setPageIndex(pagination.current)
    setPageSize(pagination.pageSize)
  }

  // 编辑
  const handleEdit = (record) => {
    setVisible(true)
    setDataInfo(record)
  }

  // 删除
  const handleDelete = async (record) => {
    const res = await postDelete(record.id)
    if(!res || !res.success) return
    message.success('操作成功')
    getDataList()
  }

  const cancel = () => {
    setVisible(false)
    setDataInfo({})
  }

  const success = () => {
    getDataList()
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '类目名称',
      dataIndex: 'name',
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => (
        <div>
          <Button type='link' onClick={() => handleEdit(record)}>编辑</Button>
          <Button type='link' onClick={() => handleDelete(record)}>删除</Button>
        </div>
      )
    }
  ]

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
      <Card title='配置项列表'>
        <div style={{ marginBottom: 24 }}>
          <Button type='primary' onClick={() => setVisible(true)}>新增</Button>
        </div>

        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={pageHandle}
          rowKey='id'
        />

        {visible &&
          <FromElement
            visible={visible}
            dataInfo={dataInfo}
            cancel={cancel}
            success={success}
          />
        }
      </Card>
    </PageHeaderWrapper>
  )
}

export default FrontCategory
