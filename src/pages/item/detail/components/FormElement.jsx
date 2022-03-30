import React, { useState } from 'react'
import { Spin, Card, Input, Form, Select, Button, Radio, message } from 'antd'
import UploadImage from '@/components/Upload'
import { getFormModules } from '../config'
import { postSave, postUpdate } from '@/services/item'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

function FormElement(props) {
  const [btnloading, setBtnLoading] = useState(false)

  const handleSubmit = () => {
    const { validateFieldsAndScroll } = props.form
    validateFieldsAndScroll(async (err, values) => {
      if (err) return
      setBtnLoading(true)
      const { dataInfo } = props
      const { itemImageRequestList: list, itemPriceRequests } = values
      const data = JSON.parse(JSON.stringify(values))
      data.itemImageRequestList = list && list.map((item) => ({ url: item }))
      data.itemPriceRequests = itemPriceRequests.toString().split(',').map(item => ({ price: item }))

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
                                  {items && items.map((v, index) => (
                                    <Select.Option value={v.id} key={index} label={v.name}>
                                      {v.description ? `${v.name} - ${v.description}` : `${v.name}`}
                                    </Select.Option>
                                  ))}
                                </Select>
                              )
                            case 'upload':
                              return (
                                <UploadImage />
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
