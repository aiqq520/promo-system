import React, { Component } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import utils from '../utils/index'

const Option = Select.Option

class SelectShell extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      return true
    }
    if (!utils.looseEqual(nextProps.data, this.props.data)) {
      return true
    }
    return false
  }

  searchHandle = value => {
    const { onSearch } = this.props
    onSearch && onSearch(value)
  }

  render() {
    const defaultAntdOptions = {
      allowClear: true,
    }
    const defaultStyle = {
      width: '100%'
    }
    const { disabled, value, style, data, valueKey = 'value', labelKey = 'label', antdOptions, onChange, linkStr = '-' } = this.props
    const mergedOptions = Object.assign({}, defaultAntdOptions, antdOptions)
    return(
      <Select
        allowClear
        disabled={disabled}
        value={typeof value === 'number' ? String(value) : value}
        onChange={onChange}
        style={Object.assign({}, defaultStyle, style)}
        onSearch={this.searchHandle}
        {...mergedOptions}
      >
        {
          data && data.map(i =>
            <Option
              key={i[valueKey] || i[valueKey]}
              value={typeof i[valueKey] === 'number' ? String(i[valueKey]) : i[valueKey]}
            >
              {
                labelKey instanceof Array ?
                  labelKey.map(l => i[l]).join(linkStr) :
                  i[labelKey]
              }
            </Option>
          )
        }
      </Select>
    )
  }
}

SelectShell.propTypes = {
  data: PropTypes.array,
  antdOptions: PropTypes.object,
  onChange: PropTypes.func,
  propKey: PropTypes.string,
  valueKey: PropTypes.string,
  disabled: PropTypes.bool,
  labelKey: PropTypes.any,
  style: PropTypes.object,
  value: PropTypes.any,
  onSearch: PropTypes.any,
}

export default SelectShell
