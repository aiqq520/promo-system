import React from 'react';
import { Alert, Form, Input, Icon, Button } from 'antd';
// import { Link } from 'umi';
import { connect } from 'dva';
import styles from './style.less';

const renderMessage = (content) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

function Login(props) {
  const { userLogin = {}, submitting, form: { getFieldDecorator } } = props
  const { status } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) return
      const { dispatch } = props;
      dispatch({
        type: 'login/login',
        payload: { ...values },
      });
    });
  }

  return (
    <div className={styles.main}>
      <Form onSubmit={handleSubmit} className={styles.loginForm}>
        {status === 'error' && !submitting && renderMessage('账户或密码错误，如忘记密码联系管理员重新设置')}

        <div className={styles.title}>账户密码登录</div>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginBtn}
            loading={submitting}
          >
            登录
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

const WrappedLoginForm = Form.create()(Login)

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(WrappedLoginForm);
