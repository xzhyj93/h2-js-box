import React, { useEffect } from 'react';
import CodeBox from './components/CodeBox';
import { Layout } from 'antd';
import CodeList from './components/CodeList/';
import CommandLine from './components/CommandLine/';
import ResultContainer from './components/ResultContainer/';
import styles from './index.module.less';

const { Sider } = Layout;

export default function() {
  return (
    <Layout className={styles.jsbox}>
      <Sider>
        <CodeList />
      </Sider>
      <Layout className="site-layout">
        <CodeBox />
        <CommandLine />
        <ResultContainer />
      </Layout>
    </Layout>
  );
}
