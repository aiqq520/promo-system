import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SelectShell, InputWithResult, CascaderEcho } from './comps'
import { Input, Checkbox, Button, Form, DatePicker, Row, Col } from 'antd'
import utils from './utils/index'
import styles from './index.less'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const formlayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const searchGroupLayout = {
  xxl: 6,
  xl: 8,
  lg: 12,
  col: 24,
}

const filterUndefined = params => {
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })
  return params
}

class SearchGroup extends Component {
  state = {
    btnLoading: false
  }

  static propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onExport: PropTypes.func,
    sourceData: PropTypes.array.isRequired,
  }

  getParams = () => {
    const { form: { getFieldsValue } } = this.props
    return getFieldsValue()
  }

  searchHandle = e => {
    e.preventDefault()
    const { onSubmit } = this.props
    const params = this.getParams()
    const searchObj = utils.filterSearchObj(params)
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
    const { sourceData, form: { getFieldDecorator } } = this.props

    return (
      <Form>
        <Row>
          {sourceData && sourceData.map(item => {
            const { type, label, key, initialValue, antdOptions } = item
            const options = {
              rules: item.rules
            }
            if (initialValue !== undefined) {
              options.initialValue = initialValue
            }

            return (
              <Col key={key} {...searchGroupLayout}>
                <FormItem
                  label={(label && <span>{label}</span>)}
                  {...formlayout}
                >
                  {getFieldDecorator(key, options)(
                    (() => {
                      switch (type) {
                        case 'input':
                          return <Input {...antdOptions}></Input>
                        case 'select':
                          return (
                            <SelectShell propKey={key} {...item} ></SelectShell>
                          )
                        case 'inputWithResult':
                          return (
                            <InputWithResult propKey={key} {...item}></InputWithResult>
                          )
                        case 'cascader':
                          return (
                            <CascaderEcho ref={ref => this.cascaderRef = ref} {...item} />
                          )
                        case 'checkbox':
                          return (
                            <CheckboxGroup {...antdOptions} options={item.data}></CheckboxGroup>
                          )
                        case 'dateTime':
                          return (
                            <DatePicker
                              {...antdOptions}
                              showTime={true}
                            />
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

        <FormItem className={styles.buttonRow}>
          <Button
            type='primary'
            className={styles.btn}
            onClick={this.searchHandle}
          >
            查询
            </Button>
          <Button
            className={styles.btn}
            onClick={this.resetHandle}
          >
            重置
            </Button>
          {
            this.props.onExport &&
            <Button
              className={styles.btn}
              onClick={this.exportHandle}
              loading={btnLoading}
            >
              导出
              </Button>
          }
        </FormItem>
      </Form>
    )
  }
}

const WrappedForm = Form.create()(SearchGroup)

export default WrappedForm
