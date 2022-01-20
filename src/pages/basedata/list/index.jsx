import React, { useState, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs, Button, Table, message } from 'antd'
import SearchGroup from '@/components/SearchGroup'
import EditModal from './component/EditModal'
import { queryBaseDataList, postDelete } from '@/services/basedata'
import { searchConfigs, getColumnConfigs, typeMap } from './config/index'

const { TabPane } = Tabs;

function BaseData() {
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pageIndex, setPageIndex] = useState(1)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState({})
  const [activeKey, setActiveKey] = useState('1') // 默认tab key
  const [searchParams, setSearchParams] = useState({})

  // 获取列表
  const getDataList = async () => {
    setLoading(true)
    const params = {
      page: pageIndex,
      size: pageSize,
      type: activeKey && Number(activeKey),
      ...searchParams
    }
    const res = await queryBaseDataList(params)
    const { count, rows } = (res && res.data || {})
    setLoading(false)
    setTotal(count || 0)
    setDataSource(rows || [])
  }

  useEffect(() => {
    getDataList()
  }, [pageSize, pageIndex, searchParams, activeKey])

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

  const handle = async (type, record) => {
    if (type === 'edit') {
      setVisible(true)
      setDataInfo(record)
    }

    if (type === 'delete') {
      const res = await postDelete(record.id)
      if (!res || !res.success) return
      message.success('操作成功')
      getDataList()
    }
  }

  // tab change事件
  const onChange = (key) => {
    setPageIndex(1)
    setActiveKey(key)
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
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
        <div className="table-bar">
          <div className="table-bar-title">数据配置</div>
          <div>
            <Button type='primary' onClick={() => setVisible(true)}>新增</Button>
          </div>
        </div>

        <Tabs activeKey={activeKey} onChange={onChange}>
          {typeMap && Object.keys(typeMap).map(item => (
            <TabPane tab={typeMap[item]} key={item} />
          ))}
        </Tabs>

        <Table
          loading={loading}
          columns={getColumnConfigs(handle)}
          dataSource={dataSource}
          pagination={pagination}
          onChange={pageHandle}
          rowKey='id'
        />
      </Card>

      {visible &&
        <EditModal
          visible={visible}
          dataInfo={dataInfo}
          success={() => getDataList()}
          cancel={cancel}
        />
      }
    </PageHeaderWrapper>
  )
}

export default BaseData
