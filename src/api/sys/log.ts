import { systemLogHttp } from '/@/utils/http/axios';

enum Api {
  LOG_LIST = '/systemLog/logList',
  DELETE_LOG = '/systemLog/deleteLog',
}
export const logList = (data) => {
  return systemLogHttp.get({ url: Api.LOG_LIST, params: data });
};
export const deleteLog = (data) => {
  return systemLogHttp.post({ url: Api.DELETE_LOG, params: data });
};
