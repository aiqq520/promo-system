import React, { Component } from 'react'
import { Modal } from 'antd'

const keyTitleMap = {
  'add': '新增属性值',
  'edit': '编辑属性值'
}

class ValueEdit extends Component {
  constructor(props) {
    super(props)
  }

  onOk = () => {

  }

  onCancel = () => {
    this.props.showHandle()
  }

  render() {
    const { currentType } = this.props
    return (
      <Modal
        title={`${keyTitleMap[currentType]}属性值`}
        visible={currentType === 'add' || currentType === 'edit'}
        width={600}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <div></div>
      </Modal>
    )
  }
}

export default ValueEdit
