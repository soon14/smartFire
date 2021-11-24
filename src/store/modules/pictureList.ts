import { userInfo2 } from '/@/api/sys/user';
import { defineStore } from 'pinia';
import { store } from '/@/store';

interface UserState {
  headPath?: any;
}
export const nodeStore = defineStore({
  id: 'app-node',
  state: (): UserState => ({
    headPath: '',
  }),
  getters: {
    getPath(): any {
      console.log('this.logPath=aaa=>', this.headPath);
      return this.headPath;
    },
  },
  actions: {
    setPath(headPath) {
      this.headPath = headPath;
      console.log('logPathSet==>', headPath);
    },
    async getNodeList(id) {
      const nodeList = await userInfo2({ userId: id });
      console.log('nodeList=>', nodeList);
      const { headPath } = nodeList;
      // this.setName(businessName);
      this.setPath(headPath);
      return nodeList;
    },
  },
});
export function useNoticeStoreWidthOut() {
  return nodeStore(store);
}
