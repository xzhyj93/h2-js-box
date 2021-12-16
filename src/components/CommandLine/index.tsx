import React, { useContext, useEffect, useRef } from 'react';
import { Button } from 'antd';
import styles from './index.module.less';
import { JSBoxContext } from '../../store/context';
import { setMessages, putMessage, setCodeHeight } from '../../store/actions';
import { IMessage } from '../../types';
import getLangText from '../../utils/lang';

export default function() {
  const { store, dispatch } = useContext(JSBoxContext);
  const { currItem, messages, codeHeight } = store;
  const line = useRef(null);

  useEffect(() => {
    if (line?.current) {
      const codeBox = document.getElementById('code-box');
      line.current.addEventListener!('mousedown', e => {
        line.current.onmousemove = e => {
          const height = codeBox?.offsetHeight;
          dispatch(setCodeHeight(height + e.movementY));
        };

        line.current.onmouseup = e => {
          line.current.onmousemove = null;
        };

        document.onmousemove = e => {
          if (e.target !== line.current) {
            line.current.onmousemove = null;
          }
        };
      });
    }
  }, []);

  useEffect(() => {
    window.print = (...args) => {
      dispatch(
        putMessage({
          type: 'log',
          time: new Date(),
          content: args
            .map(arg => {
              try {
                return JSON.stringify(arg);
              } catch (e) {
                return arg;
              }
            })
            .join(' '),
        }),
      );
    };
  }, []);

  function run() {
    try {
      const result = eval(currItem?.content || '');
    } catch (e) {
      dispatch(
        putMessage({
          time: new Date(),
          type: 'error',
          content: e.toString(),
        }),
      );
    }
  }

  function clear() {
    dispatch(setMessages([]));
  }

  return (
    <div className={styles.line} ref={line}>
      <label>
        {getLangText('notice')}
        <a
          target="_blank"
          href="https://github.com/xzhyj93/h2-js-box/blob/master/README.md"
        >
          （{getLangText('help')}）
        </a>
      </label>
      <Button ghost onClick={clear} style={{ marginLeft: 'auto' }}>
        {getLangText('clear')}
      </Button>
      <Button style={{ margin: '0 10px' }} onClick={run} ghost>
        {getLangText('run')}
      </Button>
    </div>
  );
}
