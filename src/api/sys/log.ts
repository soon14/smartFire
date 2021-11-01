import { systemLogHttp } from '/@/utils/http/axios';

enum Api {
  LOG_LIST = '/systemLog/logList',
}
export const logList = (data) => {
  return systemLogHttp.get({ url: Api.LOG_LIST, params: data });
};
