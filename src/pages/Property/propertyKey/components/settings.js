export {
  inputTypeMap,
  inputTypeSelectData,
} from '@/common/constants'

export const keyEditTitleMap = {
  add: '新增属性项',
  edit: '编辑属性项',
}

export const propertyKeyTypeMap = {
  isSellProperty: '销售',
  isGoodsProperty: '商品',
}

export const modifyTypeMap = {
  '1': '可修改',
  '2': '不可修改',
}

export const modifyTypeRadioData =
  Object.keys(modifyTypeMap).map(key => {
    return {
      value: key,
      label: `${modifyTypeMap[key]}`,
    }
  })
