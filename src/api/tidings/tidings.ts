import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 消息通知列表
  MESSAGE_LIST = '/message/messageList',
}
export const messageList = (data) => {
  return defHttp.get({ url: Api.MESSAGE_LIST, params: data });
};
