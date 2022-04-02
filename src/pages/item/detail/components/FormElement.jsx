import React, { useEffect, useState } from 'react'
import { Spin, Card, Input, Form, Select, Button, Radio, message, InputNumber, Table, Popconfirm } from 'antd'
import UploadImage from '@/components/Upload'
import { getFormModules } from '../config'
import { postSave, postUpdate } from '@/services/item'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

function FormElement(props) {
  const [btnloading, setBtnLoading] = useState(false)
  const [dataList, setDataList] = useState([{ price: undefined, level: undefined }])

  useEffect(() => {
    if (props.dataInfo && props.dataInfo.id) {
      setDataList(props.dataInfo.itemPriceRequests)
    }
  }, [props.dataInfo])

  // 添加
  const handleAdd = () => {
    const rawData = [...dataList]
    rawData.push({ price: undefined, level: undefined })
    setDataList(rawData)
  }

  // 删除
  const handleDelete = (index) => {
    const { getFieldValue, setFieldsValue } = props.form
    const rawPriceList = getFieldValue('itemPriceRequests')
    const rawList = [...dataList]

    if (rawList && rawList.length === 1) {
      message.error('至少添加一条数据')
      return
    }

    setFieldsValue({
      itemPriceRequests: rawPriceList && rawPriceList.filter((v, key) => key !== index)
    })

    const arr = rawList && rawList.filter((v, i) => i !== index)
    setDataList(arr)
  }

  // 提交
  const handleSubmit = () => {
    const { validateFieldsAndScroll } = props.form
    validateFieldsAndScroll(async (err, values) => {
      if (err) return

      setBtnLoading(true)
      const { dataInfo } = props
      const { itemImageRequestList: list } = values
      const data = JSON.parse(JSON.stringify(values))
      data.itemImageRequestList = list && list.map((item) => ({ url: item }))

      data.id = dataInfo && dataInfo.id || undefined
      data.version = dataInfo && dataInfo.version
      const isUpdate = !!(dataInfo && dataInfo.id)
      const res = isUpdate ? await postUpdate(data) : await postSave(data)
      setBtnLoading(false)
      if (!res || !res.success) return
      message.success('操作成功')
      props.handleCancel()
    })

  }

  const handleCancel = () => {
    props.handleCancel()
  }

  const { loading, dataInfo, categoryList, materialList, themeList, methodsList } = props
  const enumList = { categoryList, materialList, themeList, methodsList }
  const modules = getFormModules(dataInfo, enumList)
  const { getFieldDecorator } = props.form

  const columns = [
    {
      title: '价格(分)',
      dataIndex: 'price',
      align: 'center',
      render: (text, record, index) => (
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator(`itemPriceRequests[${index}].price`, {
            rules: [{
              required: true,
              message: '请输入商品价格'
            }],
            initialValue: record.price
          })(<InputNumber placeholder='请输入商品价格' style={{ width: '100%' }} />)}
        </Form.Item>
      )
    },
    {
      title: '数量',
      dataIndex: 'level',
      align: 'center',
      render: (text, record, index) => (
        <Form.Item style={{ marginBottom: 0 }}>
          {getFieldDecorator(`itemPriceRequests[${index}].level`, {
            rules: [{
              required: true,
              message: '请输入商品数量'
            }],
            initialValue: record.level
          })(<InputNumber placeholder='请输入商品数量' style={{ width: '100%' }} />)}
        </Form.Item>
      )
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      className: 'ant-table-cell-option',
      render: (text, record, index) => {
        const len = dataList && dataList.length
        return (
          <div style={{ textAlign: 'center' }}>
            <Popconfirm title='确认删除？' onConfirm={() => handleDelete(index)}>
              <Button type='link'>删除</Button>
            </Popconfirm>
            {((index + 1) === len) && <Button type='link' onClick={() => handleAdd()}>添加</Button>}
          </div>
        )
      }
    }
  ]

  return (
    <Spin spinning={loading}>
      <Form {...formItemLayout}>
        {
          modules instanceof Array &&
          modules.map((md, i) => {
            const { moduleName, components } = md
            return (
              <Card bordered={false} key={i} style={{ marginBottom: 10 }}>
                <h4>{moduleName}</h4>
                {components && components.map(item => {
                  const { label, key, type, decorator, antdOptions, items } = item
                  return (
                    <Form.Item label={label} key={key}>
                      {getFieldDecorator(key, { ...decorator })(
                        (() => {
                          switch (type) {
                            case 'input':
                              return <Input placeholder={label && `请输入${label}`} {...antdOptions} />
                            case 'textarea':
                              return <Input.TextArea autoSize placeholder={label && `请输入${label}`} {...antdOptions} />
                            case 'select':
                              return (
                                <Select
                                  {...antdOptions}
                                  placeholder={label && `请选择${label}`}
                                  optionLabelProp='label'
                                >
                                  {items && items.map((v) => (
                                    <Select.Option value={v.id} key={v.id} label={v.name}>
                                      {v.description ? `${v.name} - ${v.description}` : `${v.name}`}
                                    </Select.Option>
                                  ))}
                                </Select>
                              )
                            case 'upload':
                              return (
                                <UploadImage />
                              )
                            case 'price':
                              return (
                                <Table
                                  bordered
                                  columns={columns}
                                  rowClassName={() => 'editable-row'}
                                  dataSource={dataList}
                                  pagination={false}
                                  rowKey={(r, _i) => _i.toString()}
                                />
                              )
                            default:
                              return <Input {...antdOptions} />
                          }
                        })()
                      )}
                    </Form.Item>
                  )
                })}
              </Card>
            )
          })
        }

        <Card bordered={false}>
          <Form.Item {...formItemLayout} label='状态'>
            {getFieldDecorator('shelf', {
              rules: [{ required: true, message: '请选择上下架状态' }],
              initialValue: dataInfo && dataInfo.shelf || undefined
            })(
              <Radio.Group>
                <Radio value={0}>下架</Radio>
                <Radio value={1}>上架</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button loading={btnloading} type='primary' onClick={handleSubmit}>保存</Button>
            <Button style={{ marginLeft: 10 }} onClick={handleCancel}>取消</Button>
          </Form.Item>
        </Card>
      </Form>
    </Spin>
  )
}

export default Form.create()(FormElement)
