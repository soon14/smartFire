import { deepMerge } from '/@/utils';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETROSTERLIST = '/user/userList',
  ADDROSTER = '/user/addUser',
  DELETEROSTER = '/user/deleteUser',
  UPDATEROSTER = '/user/updateUser',
  UPDATEPASSWORD = '/user/updatePassword',
}

export const getRosterList = (data) => {
  const defaultData = {
    pageNum: 1,
    pageSize: 99999,
  };
  const transData = deepMerge(defaultData, data || {});
  return defHttp.get({ url: Api.GETROSTERLIST, params: transData });
};

export const addRoster = (data) => {
  return defHttp.post({ url: Api.ADDROSTER, params: data });
};

export const updateRoster = (data) => {
  return defHttp.post({ url: Api.UPDATEROSTER, params: data });
};

export const deleteRoster = (data) => {
  return defHttp.post({ url: Api.DELETEROSTER, params: data });
};

export const updateRosterPassword = (data) => {
  return defHttp.post({ url: Api.UPDATEPASSWORD, params: data });
};
