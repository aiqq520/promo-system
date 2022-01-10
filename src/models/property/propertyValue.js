import { parse } from 'qs'
import { message } from 'antd'
import { queryPropertyValue, fuzzySearchPropertyValue } from '@/services/propertyValue'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

export default {
  namespace: 'propertyValue',
  state: {
    dataSource: [],
    loading: false,
    propertyValueList: [],
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
      const paginationTran = yield select(state => state.propertyValue.pagination);
      const res = yield call(queryPropertyValue, parse(payload))
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
    *searchPropertyValueHandle({ payload }, { call, put, select }) {
      const res = yield call(fuzzySearchPropertyValue, parse(payload))
      if (!res || !res.success) {
        message.error(res && res.message)
        return
      }

      const { resData } = res
      yield put({
        type: 'initPropertyValue',
        payload: { resData }
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
    initPropertyValue(state, action) {
      const { propertyValueList } = action.payload
      return {
        ...state,
        propertyValueList
      }
    },
  }
}
