import React from 'react'
import { Button, Popconfirm, Typography, Tooltip } from 'antd'

const { Paragraph } = Typography

export const shelfMap = {
  0: '下架',
  1: '上架'
}

export const searchConfigs = (categoryList) => {
  return [
    {
      key: 'categoryId',
      label: '前台类目',
      type: 'select',
      items: categoryList,
      antdOptions: {
        allowClear: true,
        showSearch: true,
        optionFilterProp: 'children',
        dropdownMatchSelectWidth: false
      }
    },
    {
      key: 'title',
      label: '商品名称',
      type: 'input',
    },
    {
      key: 'itemSn',
      label: '商品货号',
      type: 'input',
    },
  ]
}

export function getColumnConfigs(handle) {
  const columns = [
    {
      title: '商品id',
      dataIndex: 'id',
      align: 'center',
      fixed: 'left',
      width: 120,
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      align: 'center',
      fixed: 'left',
      width: 140,
    },
    {
      title: '商品图片',
      dataIndex: 'mainImage',
      align: 'center',
      width: 120,
      render: (text) => {
        return (text ? <img src={text} style={{ width: 80, height: 80 }} alt='' /> : null)
      }
    },
    {
      title: '商品货号',
      dataIndex: 'itemSn',
      align: 'center',
      width: 120
    },
    {
      title: '平台类别',
      dataIndex: 'category',
      align: 'center',
      width: 120
    },
    {
      title: '前台类目id',
      dataIndex: 'categoryId',
      align: 'center',
      width: 120
    },
    {
      title: '类目id全路径',
      dataIndex: 'categoryPath',
      align: 'center',
      width: 120
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
      align: 'center',
      width: 100,
      render: (text) => (
        <Tooltip title={text}><Paragraph ellipsis>{text}</Paragraph></Tooltip>
      )
    },
    {
      title: '商品描述',
      dataIndex: 'description',
      align: 'center',
      width: 120,
      render: (text) => (
        <Tooltip title={text}><Paragraph ellipsis>{text}</Paragraph></Tooltip>
      )
    },
    // {
    //   title: '商品扩展信息',
    //   dataIndex: 'extra',
    //   align: 'center',
    //   width: 120,
    //   render: (text) => (
    //     <Tooltip title={text}><Paragraph ellipsis>{text}</Paragraph></Tooltip>
    //   )
    // },
    {
      title: '概要',
      dataIndex: 'features',
      align: 'center',
      width: 100,
      render: (text) => (
        <Tooltip title={text}><Paragraph ellipsis>{text}</Paragraph></Tooltip>
      )
    },
    {
      title: 'logo尺寸',
      dataIndex: 'imprintSize',
      align: 'center',
      width: 100
    },
    // {
    //   title: '印刷位置',
    //   dataIndex: 'imprintLocation',
    //   align: 'center',
    //   width: 100
    // },
    {
      title: '印刷方式',
      dataIndex: 'imprintingMethods',
      align: 'center',
      width: 100
    },
    {
      title: '产品包装方式',
      dataIndex: 'insidePacking',
      align: 'center',
      width: 120
    },
    {
      title: '商品价格（元）',
      dataIndex: 'price',
      align: 'center',
      width: 140,
      render: (text, record) => <span>{record.lowPrice} - {record.highPrice}</span>
    },
    {
      title: '材质',
      dataIndex: 'material',
      align: 'center',
      width: 100
    },
    {
      title: '产品颜色',
      dataIndex: 'productColor',
      align: 'center',
      width: 100
    },
    {
      title: '产品尺寸',
      dataIndex: 'productSize',
      align: 'center',
      width: 100
    },
    {
      title: '订制费用',
      dataIndex: 'setupCharge',
      align: 'center',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'shelf',
      align: 'center',
      width: 100,
      render: (text) => <>{shelfMap[text] || ''}</>
    },
    {
      title: '装箱数量',
      dataIndex: 'packageCount',
      align: 'center',
      width: 100
    },
    {
      title: '装箱重量',
      dataIndex: 'shippingWeight',
      align: 'center',
      width: 100
    },
    {
      title: '装箱尺寸高度',
      dataIndex: 'shippingDimensionsHeight',
      align: 'center',
      width: 120
    },
    {
      title: '装运尺寸长度',
      dataIndex: 'shippingDimensionsLength',
      align: 'center',
      width: 120
    },
    {
      title: '装箱尺寸宽度',
      dataIndex: 'shippingDimensionsWidth',
      align: 'center',
      width: 120
    },
    // {
    //   title: '主题',
    //   dataIndex: 'theme',
    //   align: 'center',
    //   width: 100
    // },
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
