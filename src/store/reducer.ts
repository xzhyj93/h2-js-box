import {
  SET_ALLIDANDTITLE,
  SET_CURRITEM,
  SET_MESSAGES,
  PUT_MESSAGE,
  CREATE_CODE,
  SET_CODEHEIGHT,
} from './actionTypes';
import { IStore } from '../types';

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
  }
}
