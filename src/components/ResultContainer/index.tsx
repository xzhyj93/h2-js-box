import React, { useContext } from 'react';
import { JSBoxContext } from '../../store/context';
import styles from './index.module.less';

export default function() {
  const { store } = useContext(JSBoxContext);
  const { messages } = store;

  return (
    <div className={styles.results}>
      {messages.map((item, index) => (
        <div className={styles.result} key={index}>
          <div className={styles.time}>{item.time.toLocaleString('ch', {hour12: false})} : </div>
          <pre
            className={styles.message}
            style={{ color: item.type === 'error' ? 'red' : '' }}
          >
            {item.content}
          </pre>
        </div>
      ))}
    </div>
  );
}
