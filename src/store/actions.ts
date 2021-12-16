import {
  SET_ALLIDANDTITLE,
  SET_CURRITEM,
  SET_MESSAGES,
  PUT_MESSAGE,
  CREATE_CODE,
  SET_CODEHEIGHT,
  SET_LANG,
} from './actionTypes';
import { IID, IDBItem, IDBItemWithIdAndTitle, IMessage } from '../types';
import { IDemo } from '../types.d';

export const setAllIdAndTitle = (param: IDBItemWithIdAndTitle[]) => ({
  type: SET_ALLIDANDTITLE,
  param,
});

export const setCurrItem = (param: IDBItem | IDemo) => ({
  type: SET_CURRITEM,
  param,
});

export const setMessages = (param: IMessage[]) => ({
  type: SET_MESSAGES,
  param,
});

export const putMessage = (param: IMessage) => ({
  type: PUT_MESSAGE,
  param,
});

export const createCode = (param: IDBItem) => ({
  type: CREATE_CODE,
  param,
});

export const setCodeHeight = (param: number) => ({
  type: SET_CODEHEIGHT,
  param,
});

export const setLang = (param: string) => ({
  type: SET_LANG,
  param,
});
