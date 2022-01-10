import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { getIsLogin } from '@/utils/user'
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLoadUser = !!(currentUser && currentUser.username);
    const isLogin = getIsLogin();
    const isLoginPage = window.location.pathname === '/user/login'

    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLoadUser && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && !isLoginPage) {
      return <Redirect to={`/user/login?${queryString}`} />;
      // history.replace({
      //   pathname: '/user/login',
      // });
      // return null;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
