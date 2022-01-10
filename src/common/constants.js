const inputTypeMap = {
  '1': '单选(不可自定义)',
  '2': '单选(允许自定义)',
  '3': '多选(不可自定义)',
  '4': '多选(允许自定义)',
  '5': '文本输入框',
  '6': '日期选择器',
  '7': '时间选择器',
}

const inputTypeSelectData =
  Object
    .keys(inputTypeMap)
    .map(key => {
      return {
        value: key,
        label: `${inputTypeMap[key]}`,
      }
    })

export {
  inputTypeMap,
  inputTypeSelectData
}
