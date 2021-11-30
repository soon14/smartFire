import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 会议列表
  Metting_List = '/metting/mettingList',
}
// 会议列表
export const mettingList = (data) => {
  return defHttp.get({ url: Api.Metting_List, params: data });
};
