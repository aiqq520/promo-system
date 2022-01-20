import React from 'react'
import { Button, Popconfirm } from 'antd'

export const typeMap = {
  1: '材质',
  2: '主题',
  3: '印刷方式'
}

export const searchConfigs = [
  {
    key: 'name',
    label: '数据名称',
    type: 'input'
  },
  {
    key: 'description',
    label: '描述',
    type: 'input'
  }
]

export const getColumnConfigs = (handle) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: 200
    },
    {
      title: '描述信息',
      dataIndex: 'description',
      align: 'center',
      width: 200
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      align: 'center',
      width: 120,
      render: (text) => <>{text && typeMap[text] || ''}</>
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 120,
      className: 'ant-table-cell-option',
      render: (text, record) => (
        <>
          <Button type='link' onClick={() => handle('edit', record)}>编辑</Button>
          <Popconfirm
            title='确定删除？'
            okText='确定'
            cancelText='取消'
            onConfirm={() => handle('delete', record)}
          >
            <Button type='link'>删除</Button>
          </Popconfirm>
        </>
      )
    }
  ]
  return columns
}
