import React from 'react'
import { Button, Popconfirm } from 'antd'

export const getConfigs = (dataInfo, itemList, categoryList) => {
  const config = [
    {
      key: 'namme',
      type: 'input',
      label: '配置名称',
      decorator: {
        rules: [{
          required: true,
          message: '请输入'
        }],
        initialValue: dataInfo && dataInfo.name || undefined
      }
    },
    {
      key: 'youMayLikeConfig',
      type: 'select',
      label: '猜你喜欢',
      antdOptions: {
        mode: 'multiple',
      },
      decorator: {
        rules: [{
          required: true,
          message: '请选择'
        }],
        initialValue: dataInfo && dataInfo.youMayLikeConfig || undefined
      },
      items: itemList
    },
    {
      key: 'topSaleConfig',
      type: 'select',
      label: '热销商品',
      antdOptions: {
        mode: 'multiple',
      },
      decorator: {
        rules: [{
          required: true,
          message: '请选择'
        }],
        initialValue: dataInfo && dataInfo.topSaleConfig || undefined
      },
      items: itemList
    },
    {
      key: 'newItemConfig',
      type: 'select',
      label: '新品配置',
      antdOptions: {
        mode: 'multiple',
      },
      decorator: {
        rules: [{
          required: true,
          message: '请选择'
        }],
        initialValue: dataInfo && dataInfo.newItemConfig || undefined
      },
      items: itemList
    },
    {
      key: 'categoryConfig',
      type: 'select',
      label: '类目配置',
      antdOptions: {
        mode: 'multiple',
      },
      decorator: {
        rules: [{
          required: true,
          message: '请选择'
        }],
        initialValue: dataInfo && dataInfo.categoryConfig || undefined
      },
      items: categoryList
    },
    {
      key: 'bannerConfig',
      type: 'upload',
      label: 'banner图配置',
      decorator: {
        rules: [{
          required: true,
          message: '请上传banner图配置'
        }],
        initialValue: dataInfo && dataInfo.bannerConfig || undefined
      },
    }
  ]

  return config
}

export const getColumnConfig = (handle) => {
  const columns = [
    {
      title: '配置名称',
      dataIndex: 'name',
      align: 'center',
      width: 100
    },
    {
      title: '猜你喜欢',
      dataIndex: 'youMayLikeConfig',
      align: 'center',
      width: 160
    },
    {
      title: '热销商品',
      dataIndex: 'topSaleConfig',
      align: 'center',
      width: 160
    },
    {
      title: '新品配置',
      dataIndex: 'newItemConfig',
      align: 'center',
      width: 160
    },
    {
      title: '类目配置',
      dataIndex: 'categoryConfig',
      align: 'center',
      width: 160
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 160
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 120,
      className: 'ant-table-cell-option',
      render: (text, record) => (
        <div>
          <Button type='link' onClick={() => handle('edit', record)}>编辑</Button>
          <Popconfirm
            title='确定删除？'
            okText='确定'
            cancelText='取消'
            onConfirm={() => handle('delete', record)}
          >
            <Button type='link'>删除</Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  return columns
}
