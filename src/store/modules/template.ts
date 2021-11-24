import { defineStore } from 'pinia';
import { store } from '/@/store';

export const useTemplateStore = defineStore({
  id: 'app-template',
  state: () => ({
    // user info
    templateInfo: null,
  }),
  getters: {
    getTemplateInfo() {
      return this.templateInfo;
    },
  },
  actions: {
    setTemplateInfo(info) {
      this.templateInfo = info;
    },
  },
});

// Need to be used outside the setup
export function useTemplateStoreWidthOut() {
  return useTemplateStore(store);
}
