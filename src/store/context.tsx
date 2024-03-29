import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { setAllIdAndTitle, setCurrItem } from './actions';
import { IStore } from '../types';
import { getAllIdsAndTitles, getCodeById } from '../utils/model';
import { demos } from '../demos/index';
import { LANG_LOCAL_STORAGE_KEY } from './consts';
import { updateLang } from '../utils/lang';

const initialLang = localStorage.getItem(LANG_LOCAL_STORAGE_KEY) || 'zh-CN';

updateLang(initialLang);

const initContext: IStore = {
  currItem: null,
  allIdTitles: [],
  messages: [],
  demos: demos(),
  codeHeight: 600,
  lang: initialLang,
};

const JSBoxContext = createContext<{
  store: IStore;
  dispatch: (arg0: any) => void;
}>({
  store: initContext,
  dispatch: () => {},
});

interface IProps {
  children: JSX.Element;
}

const JSBoxProvider = (props: IProps) => {
  const [store, dispatch] = useReducer(reducer, initContext);
  const { currItem, demos } = store;

  useEffect(() => {
    getAllIdsAndTitles().then(all => {
      dispatch(setAllIdAndTitle(all));
      if (demos.length) {
        dispatch(
          setCurrItem({
            ...demos[0],
          }),
        );
      }
    });
  }, []);

  return (
    <JSBoxContext.Provider value={{ store, dispatch }}>
      {props.children}
    </JSBoxContext.Provider>
  );
};

const JSBoxConsumer = JSBoxContext.Consumer;

export { JSBoxContext, JSBoxProvider, JSBoxConsumer };
