// import { queryCurrent } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    *fetchCurrent(_, { call, put }) {
      // const { success, data } = yield call(queryCurrent);
      // if(!success) return;

      yield put({
        type: 'saveCurrentUser',
        payload: {
          username: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        },
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    // changeNotifyCount(
    //   state = {
    //     currentUser: {},
    //   },
    //   action,
    // ) {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       notifyCount: action.payload.totalCount,
    //       unreadCount: action.payload.unreadCount,
    //     },
    //   };
    // },
  },
};
export default UserModel;
