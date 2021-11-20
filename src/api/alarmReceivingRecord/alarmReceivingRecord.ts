import { defHttp } from '/@/utils/http/axios';

enum Api {
  CALL_POLICE_REORD_LIST = '/callPoliceRecord/callPoliceRecordList',
}
export const callPoliceRecordList = (data) => {
  return defHttp.get({ url: Api.CALL_POLICE_REORD_LIST, params: data });
};
