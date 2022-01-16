import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';

const welcome = require('@/assets/welcome.jpg');

export default function IndexPage() {
  return (
    <PageHeaderWrapper title={false}>
      <div className={styles.page}>
        <img alt="欢迎" className={styles.image} src={welcome} />

        <div className={styles.welcome}>WELCOME</div>

        <div className={styles.desc}>欢迎进入后台管理系统</div>
      </div>
    </PageHeaderWrapper>
  )
}
