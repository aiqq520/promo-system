import { parse } from 'qs'
import { message } from 'antd'
import { queryCategoryPropertyList } from '@/services/categoryProperty'

const DEFAULT_PARAMS = {
  page: 1,
  pageSize: 20
}

export default {
  namespace: 'categoryProperty',
  state: {
    dataSource: [],
    loading: false,
    pagination: {
      total: 0,
      current: DEFAULT_PARAMS.page,
      pageSize: DEFAULT_PARAMS.pageSize,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20'],
      showTotal: total => `总共 ${total} 条`,
    }
  },
  subscriptions: {},
  effects: {
    *init({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const paginationTran = yield select(state => state.categoryProperty.pagination);
      const res = yield call(queryCategoryPropertyList, parse(payload))
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
  }
}
