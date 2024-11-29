const DB_NAME = 'CalorieTrackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'foods';

let db: IDBDatabase | null = null;

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve();
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
    };
  });
};

export const executeSql = (operation: string, data?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      return reject(new Error('Database not initialized. Call initDatabase() first.'));
    }
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    switch(operation) {
      case 'INSERT':
        const addRequest = store.add({
          ...data,
          created_at: new Date().toISOString()
        });
        addRequest.onsuccess = () => resolve(addRequest.result);
        addRequest.onerror = () => reject(addRequest.error);
        break;
      case 'SELECT':
        const getAllRequest = store.getAll();
        getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        getAllRequest.onerror = () => reject(getAllRequest.error);
        break;
      case 'DELETE':
        const deleteRequest = store.delete(data.id);
        deleteRequest.onsuccess = () => resolve(deleteRequest.result);
        deleteRequest.onerror = () => reject(deleteRequest.error);
        break;
      case 'UPDATE':
        const getRequest = store.get(data.id);
        getRequest.onsuccess = () => {
          const item = getRequest.result;
          if (item) {
            const updateRequest = store.put({
              ...item,
              name: data.name,
              calories: data.calories
            });
            updateRequest.onsuccess = () => resolve(updateRequest.result);
            updateRequest.onerror = () => reject(updateRequest.error);
          } else {
            reject(new Error('Item not found'));
          }
        };
        getRequest.onerror = () => reject(getRequest.error);
        break;
      default:
        reject(new Error('Unsupported operation'));
    }
  });
};

export interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  created_at: string;
}