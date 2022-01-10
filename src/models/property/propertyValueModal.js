import { parse } from 'qs'
import { message } from 'antd'
import { queryPropValueByPropKey } from '@/services/propertyValue'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 10
}

export default {
  namespace: 'propertyValueModal',
  state: {
    dataSource: [],
    loading: false,
    currentType: '',
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
      const paginationTran = yield select(state => state.propertyValueModal.pagination);
      const res = yield call(queryPropValueByPropKey, parse(payload))
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
    showModal(state, action) {
      const { type, data } = action.payload
      return {
        ...state,
        currentType: type
      }
    },
  }
}
