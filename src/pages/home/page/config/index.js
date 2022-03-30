import React from 'react'
import { Button, Popconfirm } from 'antd'

export const getRules = (text) => {
  return [{ required: true, message: text && `请选择${text}` || '请选择' }]
}

export const getConfigs = (dataInfo, itemList, categoryList) => {
  const config = [
    {
      key: 'name',
      type: 'input',
      label: '配置名称',
      decorator: {
        rules: [{ required: true, message: '请输入配置名称' }],
        initialValue: dataInfo && dataInfo.name || undefined
      }
    },
    {
      key: 'youMayLikeConfig',
      type: 'select',
      label: '猜你喜欢',
      antdOptions: {
        mode: 'multiple',
        showSearch: true,
        optionFilterProp: 'children',
      },
      decorator: {
        rules: getRules('猜你喜欢'),
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
        showSearch: true,
        optionFilterProp: 'children',
      },
      decorator: {
        rules: getRules('热销商品'),
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
        showSearch: true,
        optionFilterProp: 'children',
      },
      decorator: {
        rules: getRules('新品配置'),
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
        showSearch: true,
        optionFilterProp: 'children',
      },
      decorator: {
        rules: getRules('类目配置'),
        initialValue: dataInfo && dataInfo.categoryConfig || undefined
      },
      items: categoryList
    },
    {
      key: 'banner',
      type: 'upload',
      label: 'banner图配置',
      decorator: {
        rules: [{
          required: true,
          message: '请上传banner图配置'
        }],
        initialValue: dataInfo && dataInfo.banner || undefined
      },
    },
    {
      key: 'site',
      type: 'textarea',
      label: '跳转链接',
      decorator: {
        rules: [{
          required: true,
          message: '请输入跳转链接'
        }],
        initialValue: dataInfo && dataInfo.site || undefined
      },
      antdOptions: {
        placeholder: '请输入banner图对应的跳转链接，以,隔开'
      }
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
      width: 180,
      fixed: 'left'
    },
    {
      title: '猜你喜欢',
      dataIndex: 'youMayLikeConfigStr',
      align: 'center',
      width: 250,
    },
    {
      title: '热销商品',
      dataIndex: 'topSaleConfigStr',
      align: 'center',
      width: 250
    },
    {
      title: '新品配置',
      dataIndex: 'newItemConfigStr',
      align: 'center',
      width: 250
    },
    {
      title: '类目配置',
      dataIndex: 'categoryConfigStr',
      align: 'center',
      width: 250,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 120
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      width: 120,
      className: 'ant-table-cell-option',
      fixed: 'right',
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
