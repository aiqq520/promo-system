import React, { Component } from 'react'
import { InputWithResult, SelectShell } from '@/components/SearchGroup/comps'
import { Form, Modal, Checkbox, Radio } from 'antd'
import { keyEditTitleMap, modifyTypeRadioData, inputTypeSelectData } from '../settings'

const Item = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
class KeyEdit extends Component {
  constructor(props) {
    super(props)
  }

  searchHandle = value => {
    this.props.searchHandle(value)
  }

  onOk = () => {
    const { form: { validateFields } } = this.props
    validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  onCancel = () => {
    const { form: { resetFields } } = this.props
    resetFields()
    this.props.showHandle()
  }

  render() {
    const {
      currentAction,
      propertyList,
      form: { getFieldDecorator },
    } = this.props
    const propertyKeyTypeMap = [
      {
        label: '销售属性',
        value: 'isSellProperty',
        // disabled: relatedToCategorySellProperty
      }, {
        label: '商品属性',
        value: 'isGoodsProperty',
        // disabled: relatedToCategoryGoodsProperty
      }
    ]

    return (
      <Modal
        width={666}
        visible={currentAction === 'add' || currentAction === 'edit'}
        title={keyEditTitleMap[currentAction]}
        onOk={this.onOk}
        onCancel={this.onCancel}
        destroyOnClose
      >
        <Form {...formLayout}>
          <Item label='属性项名称'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入属性项名称'
                }, {
                  // validator: (rule, value, callback) => {
                  //   if (value === this.originPnName) {
                  //     callback()
                  //   }
                  //   if (propertyList.findIndex(item => item.name.toLowerCase() === value.toLowerCase()) > -1) {
                  //     return callback('属性项名称已存在')
                  //   }
                  //   callback()
                  // }
                }]
            })(
              <InputWithResult
                data={propertyList}
                onSearch={this.searchHandle}
                labelKey="name"
                valueKey="code"
                antdOptions={{
                  placeholder: '属性项名称',
                  filterOption: false,
                }}
              >
              </InputWithResult>
            )}
          </Item>
          <Item label='属性项类型'>
            {getFieldDecorator('propertyType', {
              rules: [
                {
                  required: true,
                  message: '请选择属性项类型'
                }
              ]
            })(
              <CheckboxGroup options={propertyKeyTypeMap} />
            )}
          </Item>
          <Item label='属性值输入方式'>
            {getFieldDecorator('inputType', {
              rules: [
                {
                  required: true,
                  message: '请选择输入方式'
                }
              ]
            })(
              <SelectShell
                data={inputTypeSelectData}
                antdOptions={{
                  placeholder: '请选择输入方式'
                }}
              >
              </SelectShell>
            )}
          </Item>
          <Item label='输入方式是否可修改'>
            {getFieldDecorator('modifyType', {
              rules: [
                {
                  required: true,
                  message: '请选择是否可修改'
                }
              ]
            })(
              <RadioGroup options={modifyTypeRadioData} />
            )}
          </Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(KeyEdit)
