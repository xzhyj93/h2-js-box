export type IID = number | string;

export interface IDBItem {
  id: IID;
  title: string;
  content: string;
}

export type IDBItemWithIdAndTitle = {
  id: IID;
  title: string;
};

export type IMessage = {
  content: string;
  time: Date;
  type: 'error' | 'log';
};

export type IDemo = {
  title: string;
  id: string;
  content: string;
};

export interface IStore {
  codeHeight: number;
  currItem: IDBItem | null;
  allIdTitles: { id: number; title: string }[];
  messages: IMessage[];
  demos: IDemo[];
}
