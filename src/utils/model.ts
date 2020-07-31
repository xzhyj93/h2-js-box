import { IID, IDBItem, IDBItemWithIdAndTitle } from '../types';
import { resolveConfig } from 'prettier';

// 使用 IndexDB 存储用户代码，数据库操作相关
const DB_NAME = 'amap-helper-js-box-db'; // 数据库名
const DB_STORE_NAME = 'js-box-table'; // 表名。主键:id; title：标题；content: 文件内容

const openRequest: IDBOpenDBRequest = window.indexedDB.open(DB_NAME, 4);

function onupgradeneeded(this: IDBRequest) {
  const db = this.result;

  if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
    const table = db.createObjectStore(DB_STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true,
    });
    table.createIndex('title', 'title', { unique: true });

    return new Promise(resolve => {
      table.transaction.oncomplete = function(event) {
        // 将数据保存到新创建的对象仓库
        var customerObjectStore = db
          .transaction([DB_STORE_NAME], 'readwrite')
          .objectStore(DB_STORE_NAME);

        resolve();
      };
    });
  } else {
    return Promise.resolve();
  }
}

// 打开数据库的回调promise。返回开启的数据库
const openDB: Promise<IDBDatabase> = new Promise((resolve, reject) => {
  // 如果打开成功，则说明已有表
  openRequest.onsuccess = function() {
    console.log('打开数据库成功');
    const db = openRequest.result;

    if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
      console.log('not contain');
      const request = window.indexedDB.open(DB_NAME, db.version + 1);
      console.log(request);
      request.onupgradeneeded = function() {
        console.log('新建表操作');
        onupgradeneeded.call(this).then(() => {
          resolve(request.result);
        });
      };

      request.onerror = function() {
        console.log('打开新版本数据库失败');
      };

      request.onsuccess = function() {
        console.log('打开新版本数据库成功');
      };
    } else {
      console.log(' contain');
      resolve(db);
    }
  };

  // 升级成功，则需新建表
  openRequest.onupgradeneeded = function() {
    const db = openRequest.result;
    onupgradeneeded.call(this).then(() => resolve(db));
  };

  openRequest.onerror = function(ev) {
    console.log('打开数据库失败！' + (<any>ev?.target)?.errorCode!);
  };
});

type IOpenTransationReturn = {
  transaction: IDBTransaction;
  objectStore: IDBObjectStore;
};

function openTransaction(): Promise<IOpenTransationReturn> {
  return openDB.then(db => {
    const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(DB_STORE_NAME);
    return { transaction, objectStore };
  });
}

// 获取数据内容
export function getCodeById(id: IID): Promise<IDBItem> {
  return openDB.then(db => {
    return new Promise(async (resolve, reject) => {
      const { objectStore } = await openTransaction();
      const request = objectStore.get(id);

      request.onerror = function(event) {
        reject('获取数据失败');
      };

      request.onsuccess = function(event) {
        if (request.result) {
          console.log(request.result);
          resolve(request.result);
        } else {
          reject('未获得数据记录');
          console.log('未获得数据记录');
        }
      };
    });
  });
}

// 增加一条数据
export function addCode(title: string, content: string): Promise<IID> {
  return openDB.then(async db => {
    return new Promise(async (resolve, reject) => {
      const { objectStore } = await openTransaction();
      const request = objectStore.add({
        title,
        content,
      });

      request.onerror = function(event) {
        console.log(request, event);
        reject('写入失败');
      };

      request.onsuccess = function(event) {
        console.log(request.result);
        resolve(request.result);
      };
    });
  });
}

// 修改一条数据
export function putCode(item: IDBItem): Promise<any> {
  return openDB.then(async db => {
    return new Promise(async (resolve, reject) => {
      const { objectStore } = await openTransaction();
      const request = objectStore.put(item);

      request.onerror = function(event) {
        reject('写入失败');
      };

      request.onsuccess = function(event) {
        console.log('写入成功');
        resolve();
      };
    });
  });
}

// 删除一条数据
export function delCode(id: IID): Promise<any> {
  return openDB.then(async db => {
    return new Promise(async (resolve, reject) => {
      const { objectStore } = await openTransaction();
      const request = objectStore.delete(id);

      request.onerror = function(event) {
        reject('删除失败');
      };

      request.onsuccess = function(event) {
        console.log('删除成功');
        resolve();
      };
    });
  });
}

// 获取全部数据ID和titles
export function getAllIdsAndTitles(): Promise<IDBItemWithIdAndTitle[]> {
  return openDB.then(async db => {
    return new Promise(async (resolve, reject) => {
      const { objectStore } = await openTransaction();
      const request = objectStore.openCursor();
      const result: IDBItemWithIdAndTitle[] = [];

      request.onsuccess = function(ev) {
        const cursor = request.result;

        if (cursor) {
          result.push({
            id: cursor.value.id,
            title: cursor.value.title,
          });
          cursor.continue();
        } else {
          console.log('getAllIdsAndTitles 没有更多数据了...');
          resolve(result);
        }
      };

      request.onerror = function(ev) {
        console.log('getAllIdsAndTitles 获取全部数据失败', ev);
      };
    });
  });
}
