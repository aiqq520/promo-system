/* eslint-disable */
import React, { Component } from 'react'
import { Input, Form, Select, Button } from 'antd'
import UploadImage from '@/components/Upload'

const FormItem = Form.Item

class FormGroup extends Component {
  state = {}

  beforeSubmit = () => {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((err, values) => {
      if(err) return
      onSubmit && onSubmit(values)
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { form, configs, formProps, showBtn, btnLayout } = this.props
    const { getFieldDecorator } = form
    return (
      <Form {...formProps}>
        {configs && configs.map(item => {
          const { label, key, type, decorator, antdOptions, items } = item
          return (
            <FormItem label={label} key={key}>
              {getFieldDecorator(key, { ...decorator })(
                (() => {
                  switch (type) {
                    case 'input':
                      return <Input {...antdOptions} placeholder={label && `请输入${label}`} />
                    case 'select':
                      return (
                        <Select
                          {...antdOptions}
                          placeholder={label && `请选择${label}`}
                        >
                          {items && items.map((v, i) => (
                            <Select.Option value={v.value} key={i}>{v.label}</Select.Option>
                          ))}
                        </Select>
                      )
                    case 'upload':
                      return (
                        <UploadImage />
                      )
                    case 'textarea':
                      return (
                        <Input.TextArea placeholder={label && `请输入${label}`} {...antdOptions} rows={4} />
                      )
                    default:
                      return <Input {...antdOptions} />
                  }
                })()
              )}
            </FormItem>
          )
        })}

        {showBtn &&
          <FormItem {...btnLayout}>
            <Button type='primary' onClick={this.beforeSubmit}>保存</Button>
            <Button style={{ marginLeft: 10 }} onClick={this.handleCancel}>取消</Button>
          </FormItem>
        }
      </Form>
    )
  }
}


export default Form.create()(FormGroup)
