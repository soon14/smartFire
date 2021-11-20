import { defHttp } from '/@/utils/http/axios';

// /visitorRecord/visitorRecordList

enum Api {
  VISITOR_RECORD_LIST = '/visitorRecord/visitorRecordList',
  CAR_RECORD_LIST = '/carRecord/carRecordList',
}
export const visitorRecordList = (data) => {
  return defHttp.get({ url: Api.VISITOR_RECORD_LIST, params: data });
};
export const carRecordList = (data) => {
  return defHttp.get({ url: Api.CAR_RECORD_LIST, params: data });
};
