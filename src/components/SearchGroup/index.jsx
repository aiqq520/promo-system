/* eslint-disable */
import React, { Component } from 'react'
import { Input, Button, Form, Row, Col, Select } from 'antd'

const FormItem = Form.Item

const formlayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const filterUndefined = params => {
  params && Object.keys(params).forEach(key => {
    if (params[key] === undefined || params[key] === '') {
      delete params[key]
    }
  })

  return params
}

class SearchGroup extends Component {
  state = {
    btnLoading: false
  }

  getParams = () => {
    const { form: { getFieldsValue } } = this.props
    return getFieldsValue()
  }

  searchHandle = e => {
    e.preventDefault()
    const { onSubmit } = this.props
    const params = this.getParams()
    const searchObj = filterUndefined(params)
    onSubmit && onSubmit(searchObj)
  }

  resetHandle = e => {
    e.preventDefault()
    const { form, onReset } = this.props
    form.resetFields()
    onReset && onReset()
  }

  exportHandle = e => {
    e.preventDefault()
    const params = this.getParams()
    const { onExport } = this.props
    if (onExport) {
      this.setState({
        btnLoading: true
      })

      onExport(params).then(res => {
        this.setState({ btnLoading: false })
      })
    }
  }

  render() {
    const { btnLoading } = this.state
    const { configs, extendBtnsConfigs, form } = this.props
    const { getFieldDecorator, getFieldsValue } = form

    return (
      <Row className='search-form'>
        <Form>
          <Row gutter={24}>
            {configs && configs.map(item => {
              const { type, label, key, decorator, antdOptions, colSpan, items } = item

              return (
                <Col span={colSpan || 6} key={key}>
                  <FormItem
                    label={(label && <span>{label}</span>)}
                    {...formlayout}
                  >
                    {getFieldDecorator(key, { ...decorator })(
                      (() => {
                        switch (type) {
                          case 'input':
                            return <Input {...antdOptions} placeholder={label && `请输入${label}`} />
                          case 'select':
                            return (
                              <Select {...antdOptions} placeholder={label && `请选择${label}`}>
                                {items && items.map((v, i) => (
                                  <Select.Option value={v.value} key={i}>{v.label}</Select.Option>
                                ))}
                              </Select>
                            )
                          default:
                            return <Input {...antdOptions}></Input>
                        }
                      })()
                    )}
                  </FormItem>
                </Col>
              )
            })}
          </Row>

          <Row style={{ textAlign: 'right', marginBottom: 12 }}>
            <Button type='primary' onClick={this.searchHandle.bind(this)}>
              查询
            </Button>
            <Button style={{ marginLeft: 10 }} onClick={this.resetHandle.bind(this)}>
              重置
            </Button>

            {extendBtnsConfigs &&
              extendBtnsConfigs.map((config, i) => {
                let { antd, buttonText, handle } = config
                const values = filterUndefined(getFieldsValue())

                return <Button {...antd} onClick={() => handle(values)} key={i} style={{ marginLeft: 8 }}>{buttonText}</Button>
              })}
            {
              this.props.onExport &&
                <Button onClick={this.exportHandle} loading={btnLoading}>
                  导出
                </Button>
            }
          </Row>
        </Form>
      </Row>
    )
  }
}

const WrappedForm = Form.create()(SearchGroup)

export default WrappedForm
