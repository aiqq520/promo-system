import React, { Component } from 'react'
import ValueTable from './ValueTable'
import ValueEdit from '../ValueModals/ValueEdit'
import ValueImport from '../ValueModals/ValueImport'
import { Modal } from 'antd'
import { connect } from 'dva'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

class PropertyValueManage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { dispatch } = this.props
    // dispatch({
    //   type: 'propertyValueModal/init',
    //   payload: {
    //     page: DEFAULT_PARAMS.page,
    //     pageSize: DEFAULT_PARAMS.pageSize
    //   }
    // })
  }

  showModal = (type, data) => {
    this.props.dispatch({
      type: 'propertyValueModal/showModal',
      payload: {
        type,
        data
      }
    })
  }

  onOk = () => {
    this.props.showHandle()
  }


  render() {
    const { currentAction } = this.props
    const { dataSource, pagination, loading, currentType } = this.props.propertyValueModal

    const listProps = {
      loading,
      dataSource,
      pagination,
      showHandle: this.showModal
    }

    const modalProps = {
      currentType,
      showHandle: this.showModal
    }

    return (
      <Modal
        title='管理属性值'
        visible={currentAction === 'manage'}
        width={1000}
        onOk={this.onOk}
        onCancel={this.onOk}
      >
        <ValueTable {...listProps} />

        {(currentType === 'add' || currentType === 'edit') &&
          <ValueEdit {...modalProps} />
        }

        {(currentType === 'import') && <ValueImport {...modalProps} />}
      </Modal>
    )
  }
}

export default connect(({ propertyValueModal }) => ({ propertyValueModal }))(PropertyValueManage)
