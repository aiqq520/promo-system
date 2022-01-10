import { parse } from 'qs'
import { message } from 'antd'
import { queryPropertyKey, fuzzyQueryPropertyName } from '@/services/propertyKey'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

export default {
  namespace: 'propertyKey',
  state: {
    dataSource: [
      {
        id: 5855,
        inputType: 5,
        isGoodsProperty: true,
        isKeyProperty: false,
        isSellProperty: false,
        modifyType: 1,
        name: "一灯商品属性",
        valueCount: 0,
      },
      {
        id: 5854,
        inputType: 3,
        isGoodsProperty: false,
        isKeyProperty: false,
        isSellProperty: true,
        modifyType: 1,
        name: "一灯属性",
        valueCount: 0
      }
    ],
    loading: false,
    currentAction: '',
    propertyList: [],
    pagination: {
      total: 0,
      current: DEFAULT_PARAMS.page,
      pageSize: DEFAULT_PARAMS.pageSize,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20'],
      showTotal: total => `总共 ${total} 条`,
    }
  },
  subscriptions: {
    // setup({ dispatch, history }) {}
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const paginationTran = yield select(state => state.propertyKey.pagination);
      const res = yield call(queryPropertyKey, parse(payload))
      if (!res || !res.success) {
        yield put({ type: 'showLoading' })
        message.error(res && res.message)
        return
      }

      const { rows, total } = res
      yield put({
        type: 'initDataSource',
        payload: {
          dataSource: rows || [],
          pagination: {
            ...paginationTran,
            total: total || 0,
            showTotal: total => `总共 ${total} 条`,
          }
        }
      })
    },
    *searchPropertyList({ payload }, { call, put, select }) {
      const res = yield call(fuzzyQueryPropertyName, parse(payload))
      if (!res || !res.success) {
        message.error(res && res.message)
        return
      }

      const { propertyList } = res
      yield put({
        type: 'initPropertyList',
        payload: { propertyList }
      })
    }
  },

  reducers: {
    showLoading(state) {
      const { loading } = state
      return {
        ...state,
        loading: !loading
      }
    },
    initDataSource(state, action) {
      const { dataSource, pagination } = action.payload
      return {
        ...state,
        dataSource,
        pagination,
        loading: false
      }
    },
    initPropertyList(state, action) {
      const { propertyList } = action.payload
      return {
        ...state,
        propertyList
      }
    },
    showModal(state, action) {
      const { type, data } = action.payload
      return {
        ...state,
        currentAction: type
      }
    },
  }
}
