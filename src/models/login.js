import { router } from 'umi';
import { message } from 'antd';
import { login, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setAuthorization, clearAuthorization, goToLogin } from '@/utils/user';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // 预处理数据结构，符合antd design pro
      const isSuccess = response.success && response.status === 1;
      const result = {
        status: isSuccess ? 'ok' : 'error',
        currentAuthority: 'user'
      }

      // 登录成功
      if (isSuccess) {
        setAuthorization(response.data)
      } else {
        clearAuthorization()
      }

      yield put({
        type: 'changeLoginStatus',
        payload: result,
      });

      // Login successfully
      if (result.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');

        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    *logout(_, { call, put }) {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      const response = yield call(logout)
      if (!response.success) return;

      message.success('退出登录成功！');
      // 清空登录态：比如authority
      localStorage.clear();

      // 清除用户数据
      yield put({
        type: 'user/saveCurrentUser',
        payload: null,
      });

      // 去登录
      goToLogin()
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status
      };
    },
  },
};
export default Model;
