export const mapToList = map => {
  const list = []
  Object.keys(map).forEach(key => {
    list.push({
      key,
      name: map[key],
    })
  })
  return list
}

export const importantMap = {
  1: '是',
  0: '否',
}

export const statusMap = {
  0: '停用',
  1: '可用',
}

export const statusList = [{
  key: '',
  name: '全部',
}].concat(mapToList(statusMap))

export const importantList = [{
  key: '',
  name: '全部',
}].concat(mapToList(importantMap))

export const sourceData = [
  {
    key: 'categoryId',
    type: 'cascader',
    label: '类目',
    labelKey: 'name',
    valueKey: 'id',
    loadData: params => {
      // return queryCatagoryList(params)
      //   .then(data => {
      //     if (data && data instanceof Array) {
      //       return data.map(item => ({
      //         value: item.id,
      //         label: item.name,
      //         isLeaf: item.booleanIsLeaf,
      //       }))
      //     }
      //     return []
      //   })
    },
    antdOptions: {
      placeholder: '请选择类目',
      changeOnSelect: true,
    },
  },
  {
    key: 'status',
    type: 'select',
    label: '状态',
    labelKey: 'name',
    valueKey: 'key',
    data: statusList,
    antdOptions: {
      placeholder: '状态',
      changeOnSelect: true,
    },
  },
  {
    key: 'important',
    type: 'select',
    label: '是否重点类目',
    labelKey: 'name',
    valueKey: 'key',
    data: importantList,
    antdOptions: {
      placeholder: '请选择是否重点类目',
    },
  }
]

export const columns = [
  {
    title: '类目ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '叶子类目',
    dataIndex: 'pathName',
    key: 'pathName',
    render: value => value.replace(/\//g, ' / '),
  },
  {
    title: '是否高危类目',
    dataIndex: 'important',
    key: 'important',
    render: value => importantMap[value]
  },
  {
    title: '技术服务费',
    dataIndex: 'popularRate',
    key: 'popularRate',
  },
  {
    title: '推广费用比例',
    dataIndex: 'leastRate',
    key: 'leastRate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: value => statusMap[value]
  },
  {
    title: '渠道',
    dataIndex: 'channelDesc',
    key: 'channelDesc',
  }
]
