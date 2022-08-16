export const getRules = (text) => {
  return [{ required: true, message: `请输入${text}` }]
}

export const getFormModules = (dataInfo, enmuList) => {
  const { categoryList } = enmuList
  const modules = [
    {
      moduleName: '商品基本信息',
      components: [
        {
          key: 'title',
          type: 'input',
          label: 'Item Name',
          decorator: {
            rules: getRules('商品名称'),
            initialValue: dataInfo && dataInfo.title || undefined
          },
          antdOptions: {
            placeholder: '请输入商品名称'
          }
        },
        {
          key: 'itemSn',
          type: 'input',
          label: 'Item No.',
          decorator: {
            rules: getRules('商品货号'),
            initialValue: dataInfo && dataInfo.itemSn || undefined
          },
          antdOptions: {
            placeholder: '请输入商品货号'
          }
        },
        {
          key: 'categoryId',
          type: 'select',
          label: 'Category',
          decorator: {
            rules: [{
              required: true,
              message: '请选择平台类别'
            }],
            initialValue: dataInfo && dataInfo.categoryId || undefined
          },
          items: categoryList,
          antdOptions: {
            showSearch: true,
            optionFilterProp: 'children',
            placeholder: '请选择平台类别'
          }
        },
        {
          key: 'description',
          type: 'textarea',
          label: 'Item Description',
          decorator: {
            rules: getRules('商品描述'),
            initialValue: dataInfo && dataInfo.description || undefined
          },
          antdOptions: {
            placeholder: '请输入商品描述'
          }
        },
        // {
        //   key: 'extra',
        //   type: 'textarea',
        //   label: '商品扩展信息',
        //   decorator: {
        //     rules: getRules('商品扩展信息'),
        //     initialValue: dataInfo && dataInfo.extra || undefined
        //   }
        // },
        {
          key: 'features',
          type: 'textarea',
          label: 'Features',
          decorator: {
            rules: getRules('概要'),
            initialValue: dataInfo && dataInfo.features || undefined
          },
          antdOptions: {
            placeholder: '请输入概要'
          }
        },
        {
          key: 'keyword',
          type: 'input',
          label: 'Key Words',
          decorator: {
            rules: getRules('商品关键词'),
            initialValue: dataInfo && dataInfo.keyword || undefined
          },
          antdOptions: {
            placeholder: '请输入商品关键词'
          }
        },
        {
          key: 'itemImageRequestList',
          type: 'upload',
          label: 'Images',
          decorator: {
            rules: [{ required: true, message: '请上传商品图片' }],
            initialValue: dataInfo && dataInfo.itemImageRequestList || undefined
          }
        },
        // {
        //   key: 'itemPriceRequests',
        //   type: 'input',
        //   label: '商品价格（分）',
        //   decorator: {
        //     rules: getRules('商品价格'),
        //     initialValue: dataInfo && dataInfo.itemPriceRequests || undefined
        //   },
        //   antdOptions: {
        //     placeholder: '请输入商品价格，以逗号,隔开'
        //   }
        // },
        {
          key: 'price',
          type: 'price',
          label: '商品价格/数量/时间',
        },
        {
          key: 'setupCharge',
          type: 'input',
          label: 'Set Up Charge',
          decorator: {
            rules: getRules('打样费'),
            initialValue: dataInfo && dataInfo.setupCharge || undefined
          },
          antdOptions: {
            placeholder: '请输入打样费'
          }
        }
      ]
    },
    {
      moduleName: '基础数据配置',
      components: [
        {
          key: 'material',
          type: 'input',
          label: 'Material',
          decorator: {
            rules: getRules('材质'),
            initialValue: dataInfo && dataInfo.material || undefined
          },
          // items: materialList,
          antdOptions: {
            // showSearch: true,
            // optionFilterProp: 'children',
            placeholder: '请选择材质'
          }
        },
        // {
        //   key: 'theme',
        //   type: 'select',
        //   label: '主题',
        //   decorator: {
        //     rules: getRules('主题'),
        //     initialValue: dataInfo && dataInfo.theme || undefined
        //   },
        //   items: themeList,
        //   antdOptions: {
        //     showSearch: true,
        //     optionFilterProp: 'children'
        //   }
        // },
        {
          key: 'imprintingMethods',
          type: 'input',
          label: 'Imprint Method',
          decorator: {
            rules: getRules('印刷方式'),
            initialValue: dataInfo && dataInfo.imprintingMethods || undefined
          },
          // items: methodsList,
          antdOptions: {
            // showSearch: true,
            // optionFilterProp: 'children',
            placeholder: '请选择印刷方式'
          }
        },
      ]
    },
    {
      moduleName: '其他属性配置',
      components: [
        {
          key: 'imprintSize',
          type: 'input',
          label: 'Imprint Size',
          decorator: {
            rules: getRules('logo尺寸'),
            initialValue: dataInfo && dataInfo.imprintSize || undefined
          },
          antdOptions: {
            placeholder: '请输入logo尺寸'
          }
        },
        // {
        //   key: 'imprintLocation',
        //   type: 'input',
        //   label: '印刷位置',
        //   decorator: {
        //     rules: getRules('印刷位置'),
        //     initialValue: dataInfo && dataInfo.imprintLocation || undefined
        //   },
        // },
        {
          key: 'insidePacking',
          type: 'input',
          label: 'Packing',
          decorator: {
            rules: getRules('产品包装方式'),
            initialValue: dataInfo && dataInfo.insidePacking || undefined
          },
          antdOptions: {
            placeholder: '请输入产品包装方式'
          }
        },
        {
          key: 'productColor',
          type: 'input',
          label: 'Colors',
          decorator: {
            rules: getRules('产品颜色'),
            initialValue: dataInfo && dataInfo.productColor || undefined
          },
          antdOptions: {
            placeholder: '请输入产品颜色'
          }
        },
        {
          key: 'productSize',
          type: 'input',
          label: 'Spec.',
          decorator: {
            rules: getRules('产品尺寸'),
            initialValue: dataInfo && dataInfo.productSize || undefined
          },
          antdOptions: {
            placeholder: '请输入产品尺寸'
          }
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
          key: 'shippingWeight',
          type: 'input',
          label: '装箱重量',
          decorator: {
            rules: getRules('装箱重量'),
            initialValue: dataInfo && dataInfo.shippingWeight || undefined
          },
        },
        {
          key: 'shippingDimensionsHeight',
          type: 'input',
          label: '装箱尺寸高度',
          decorator: {
            rules: getRules('装箱尺寸高度'),
            initialValue: dataInfo && dataInfo.shippingDimensionsHeight || undefined
          },
        },
        {
          key: 'shippingDimensionsLength',
          type: 'input',
          label: '装运尺寸长度',
          decorator: {
            rules: getRules('装运尺寸长度'),
            initialValue: dataInfo && dataInfo.shippingDimensionsLength || undefined
          },
        },
        {
          key: 'shippingDimensionsWidth',
          type: 'input',
          label: '装箱尺寸宽度',
          decorator: {
            rules: getRules('装箱尺寸宽度'),
            initialValue: dataInfo && dataInfo.shippingDimensionsWidth || undefined
          },
        },
        {
          key: 'importantNote',
          type: 'textarea',
          label: 'Important Note',
          decorator: {
            initialValue: dataInfo && dataInfo.importantNote || undefined
          },
          antdOptions: {
            placeholder: '请输入Important Note'
          }
        }
      ]
    }
  ]
  return modules
}
