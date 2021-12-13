import {
  store,
  storeCollection,
  storeDoc,
  storeGetDoc,
  storeUpdateDoc,
  storeSetDoc,
} from "./Firebase";

export default class CommonFireStoreApi {
  constructor(public tablePath: string) {}
  async get<T>(id: string): Promise<Array<T>> {
    const docSnap = await this.getSnap(id);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.info;
    } else {
      return [];
    }
  }
  async post<T>(id: string, data: Array<T>): Promise<void> {
    const doc = await this.getDoc(id);
    const snap = await storeGetDoc(doc);
    if (snap.exists()) {
      await storeUpdateDoc(doc, {
        info: data,
      });
    } else {
      await storeSetDoc(doc, {
        info: data,
      });
    }
  }
  private getSnap = async (id: string) => {
    return await storeGetDoc(this.getDoc(id));
  };
  
  private getDoc = (id: string) => {
    return storeDoc(this.getCollection(), id);
  };
  
  private getCollection = () => {
    return storeCollection(store, this.tablePath);
  };
}


