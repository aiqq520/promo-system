import React, { useEffect, useState } from 'react'
import { router } from 'umi';
import FormElement from './components/FormElement'
import { queryCategoryList } from '@/services/category'
import { queryBaseDataList } from '@/services/basedata'
import { getItemInfo } from '@/services/item'

function ItemDetail(props) {
  const [categoryList, setCategoryList] = useState([]) // 类目
  const [materialList, setMaterialList] = useState([]) // 材质
  const [themeList, setThemeList] = useState([]) // 主题
  const [methodsList, setMethodsList] = useState([]) // 印刷方式
  const [dataInfo, setDataInfo] = useState({})
  const [loading, setLoading] = useState(false)

  const getEmunList = async () => {
    const params = { page: 1, size: 100 }
    const res = await queryCategoryList(params)
    const { rows } = (res && res.data || {})
    setCategoryList(rows || [])
  }

  const getBaseList = async () => {
    const params = { page: 1, size: 10000 }
    const res = await queryBaseDataList(params)
    const { rows } = (res && res.data || {})
    const list1 = rows && rows.filter(item => item.type === 1) || [] // 材质
    const list2 = rows && rows.filter(item => item.type === 2) || [] // 主题
    const list3 = rows && rows.filter(item => item.type === 3) || [] // 印刷方式

    setMaterialList(list1)
    setThemeList(list2)
    setMethodsList(list3)
  }

  const getItemInfos = async () => {
    const { id } = props.location && props.location.query
    if (id) {
      setLoading(true)
      const res = await getItemInfo(id)
      setLoading(false)
      const data = JSON.parse(JSON.stringify(res && res.data)) || {}
      const { itemImageVOList, itemPriceVOList } = (data || {})
      data.itemImageRequestList = itemImageVOList && itemImageVOList.map(item => item.url)
      data.itemPriceRequests = itemPriceVOList
      setDataInfo(data)
    }
  }

  useEffect(() => {
    getEmunList()
    getBaseList()
    getItemInfos()
  }, [])

  const handleCancel = () => {
    router.push('/item/list')
    setDataInfo({})
  }

  return (
    <>
      <h3>商品配置</h3>
      <FormElement
        loading={loading}
        dataInfo={dataInfo}
        categoryList={categoryList}
        materialList={materialList}
        themeList={themeList}
        methodsList={methodsList}
        handleCancel={handleCancel}
      />
    </>
  )
}

export default ItemDetail
