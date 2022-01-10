import React, { Component } from 'react'
import { Modal, Button } from 'antd'

class ValueImport extends Component {
  constructor(props) {
    super(props)
  }

  submit = () => {

  }

  onCancel = () => {
    this.props.showHandle()
  }

  render() {
    const { currentType } = this.props
    return (
      <Modal
        title={'导入属性值'}
        visible={currentType === 'import'}
        width={600}
        onCancel={this.onCancel}
        footer={
          <Button
            onClick={this.submit}
          >
            提交
          </Button>
        }
      >

      </Modal>
    )
  }
}

export default ValueImport
