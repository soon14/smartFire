import { defHttp } from '/@/utils/http/axios';

// /visitorRecord/visitorRecordList

enum Api {
  VISITOR_RECORD_LIST = '/visitorRecord/visitorRecordList',
}
export const visitorRecordList = (data) => {
  return defHttp.get({ url: Api.VISITOR_RECORD_LIST, params: data });
};
