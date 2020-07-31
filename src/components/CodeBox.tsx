import React, { useContext, useEffect, useRef } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { JSBoxContext } from '../store/context';
import { setCurrItem } from '../store/actions';
import { IDBItem } from '../types';
import debounce from 'lodash/debounce';
import { putCode } from '../utils/model';
import 'codemirror/theme/base16-dark.css';
import { IDemo } from '../types.d';

//主题：https://codemirror.net/demo/theme.html#base16-dark
const options = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'base16-dark',
};

const updateCodeInDB = debounce((item: IDBItem) => {
  putCode(item);
}, 200);

export default function() {
  const { store, dispatch } = useContext(JSBoxContext);
  const { currItem, codeHeight } = store;
  const editor = useRef(null);

  function updateCode(content) {
    const newItem = {
      ...(currItem as IDBItem | IDemo),
      content,
    };
    dispatch(setCurrItem(newItem));

    if (typeof currItem?.id === 'string' && currItem?.id.startsWith('demo-')) {
      return;
    }
    updateCodeInDB(newItem);
  }

  return (
    <div style={{ height: codeHeight + 'px' }} id="code-box">
      <CodeMirror
        ref={editor}
        key={currItem?.id}
        value={currItem?.content}
        options={options}
        onChange={updateCode}
      />
    </div>
  );
}
