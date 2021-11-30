import { defHttp } from '/@/utils/http/axios';

enum Api {
  // PC排班列表
  WORK_LIST = '/work/workList',
  //设置排班
  SET_WORK = '/work/setWork',
}

export const workList = (data) => {
  return defHttp.get({ url: Api.WORK_LIST, params: data });
};

export const setWork = (data) => {
  return defHttp.post({ url: Api.SET_WORK, params: data });
};
