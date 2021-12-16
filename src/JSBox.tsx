import React, { useEffect, useContext } from 'react';
import CodeBox from './components/CodeBox';
import { Layout, Radio } from 'antd';
import CodeList from './components/CodeList/';
import CommandLine from './components/CommandLine/';
import ResultContainer from './components/ResultContainer/';
import styles from './index.module.less';
import { JSBoxContext } from './store/context';
import { setLang } from './store/actions';
import { LANG_TYPE } from './utils/lang';

const { Sider } = Layout;

export default function() {
  const {
    store: { lang },
    dispatch,
  } = useContext(JSBoxContext);

  function handleLangChange(e) {
    dispatch(setLang(e.target.value));
  }

  return (
    <Layout className={styles.jsbox}>
      <Sider>
        <div className={styles.sider}>
          <CodeList />
          <Radio.Group
            value={lang}
            size="small"
            onChange={handleLangChange}
            style={{ marginTop: 'auto', flexShrink: 1, margin: '10px' }}
            buttonStyle="solid"
          >
            <Radio.Button value={LANG_TYPE.CN}>中</Radio.Button>
            <Radio.Button value={LANG_TYPE.EN}>En</Radio.Button>
          </Radio.Group>
        </div>
      </Sider>
      <Layout className="site-layout">
        <CodeBox />
        <CommandLine />
        <ResultContainer />
      </Layout>
    </Layout>
  );
}
