import React, { useState, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, message, Popconfirm } from 'antd'
import FromElement from './components/FromElement'
import { queryCategoryList, postDelete } from '@/services/category'

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
    const params = {
      page: pageIndex,
      size: pageSize
    }
    const res = await queryCategoryList(params)
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
    setVisible(!visible)
    setDataInfo(record)
  }

  // 删除
  const handleDelete = async (record) => {
    const res = await postDelete(record.id)
    if(!res || !res.success) return
    message.success('操作成功')
    getDataList()
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      width: 60
    },
    {
      title: '类目名称',
      dataIndex: 'name',
      align: 'center',
      width: 200
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
      align: 'center',
      width: 300
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 180
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 140,
      className: 'ant-table-cell-option',
      render: (text, record) => (
        <div>
          <Button type='link' onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title='确定删除？'
            okText='确定'
            cancelText='取消'
            onConfirm={() => handleDelete(record)}
          >
            <Button type='link'>删除</Button>
          </Popconfirm>
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
      <Card bordered={false}>
        <div className='table-bar'>
          <div className='table-bar-title'>配置项列表</div>
          <div>
            <Button type='primary' onClick={() => setVisible(true)}>新增</Button>
          </div>
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
            cancel={() => handleEdit({})}
            success={() => getDataList()}
          />
        }
      </Card>
    </PageHeaderWrapper>
  )
}

export default FrontCategory
