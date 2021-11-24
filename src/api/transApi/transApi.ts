import { defHttp } from '/@/utils/http/axios';

enum Api {
  //台账列表
  ADD_RECORD = '/record/addRecord',
}
export const addRecord = (data) => {
  return defHttp.post({ url: Api.ADD_RECORD, params: data });
};
