export const getRules = (text) => {
  return [{ required: true, message: `请输入${text}` }]
}

export const getFormConfigs = (dataInfo, categoryList) => {
  const config = [
    {
      key: 'title',
      type: 'input',
      label: '商品名称',
      decorator: {
        rules: getRules('商品名称'),
        initialValue: dataInfo && dataInfo.title || undefined
      },
    },
    {
      key: 'itemSn',
      type: 'input',
      label: '商品货号',
      decorator: {
        rules: getRules('商品货号'),
        initialValue: dataInfo && dataInfo.itemSn || undefined
      },
    },
    {
      key: 'categoryId',
      type: 'select',
      label: '平台类别',
      decorator: {
        rules: [{
          required: true,
          message: '请选择平台类别'
        }],
        initialValue: dataInfo && dataInfo.categoryId || undefined
      },
      items: categoryList
    },
    {
      key: 'imprintSize',
      type: 'input',
      label: 'logo尺寸',
      decorator: {
        rules: getRules('logo尺寸'),
        initialValue: dataInfo && dataInfo.imprintSize || undefined
      },
    },
    {
      key: 'imprintLocation',
      type: 'input',
      label: '印刷位置',
      decorator: {
        rules: getRules('印刷位置'),
        initialValue: dataInfo && dataInfo.imprintLocation || undefined
      },
    },
    {
      key: 'imprintingMethods',
      type: 'input',
      label: '印刷方式',
      decorator: {
        rules: getRules('印刷方式'),
        initialValue: dataInfo && dataInfo.imprintingMethods || undefined
      },
    },
    {
      key: 'insidePacking',
      type: 'input',
      label: '产品包装方式',
      decorator: {
        rules: getRules('产品包装方式'),
        initialValue: dataInfo && dataInfo.insidePacking || undefined
      },
    },
    {
      key: 'material',
      type: 'input',
      label: '材质',
      decorator: {
        rules: getRules('材质'),
        initialValue: dataInfo && dataInfo.material || undefined
      },
    },
    {
      key: 'packageCount',
      type: 'input',
      label: '装箱数量',
      decorator: {
        rules: getRules('装箱数量'),
        initialValue: dataInfo && dataInfo.packageCount || undefined
      },
    },
    {
      key: 'productColor',
      type: 'input',
      label: '产品颜色',
      decorator: {
        rules: getRules('产品颜色'),
        initialValue: dataInfo && dataInfo.productColor || undefined
      },
    },
    {
      key: 'productSize',
      type: 'input',
      label: '产品尺寸',
      decorator: {
        rules: getRules('产品尺寸'),
        initialValue: dataInfo && dataInfo.productSize || undefined
      },
    },
    {
      key: 'setupCharge',
      type: 'input',
      label: '订制费用',
      decorator: {
        rules: getRules('订制费用'),
        initialValue: dataInfo && dataInfo.setupCharge || undefined
      },
    }
  ]
  return config
}
