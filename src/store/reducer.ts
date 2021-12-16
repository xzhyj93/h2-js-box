import {
  SET_ALLIDANDTITLE,
  SET_CURRITEM,
  SET_MESSAGES,
  PUT_MESSAGE,
  CREATE_CODE,
  SET_CODEHEIGHT,
  SET_LANG,
} from './actionTypes';
import { IStore } from '../types';
import { LANG_LOCAL_STORAGE_KEY } from './consts';
import { updateLang } from '../utils/lang';
import { demos } from '../demos/index';

interface IAction {
  type: string;
  param: any;
}

export default function reducer(state: IStore, action: IAction) {
  switch (action.type) {
    case SET_ALLIDANDTITLE:
      return {
        ...state,
        allIdTitles: action.param,
      };
    case SET_CURRITEM:
      return {
        ...state,
        currItem: action.param,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.param,
      };
    case PUT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.param],
      };
    case CREATE_CODE:
      const { id, title } = action.param;
      return {
        ...state,
        currItem: action.param,
        allIdTitles: [
          ...state.allIdTitles,
          {
            id,
            title,
          },
        ],
      };
    case SET_CODEHEIGHT:
      return {
        ...state,
        codeHeight: action.param,
      };
    case SET_LANG:
      localStorage.setItem(LANG_LOCAL_STORAGE_KEY, action.param);
      updateLang(action.param);
      return {
        ...state,
        demos: demos(),
        lang: action.param,
      };
  }
}
