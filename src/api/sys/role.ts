import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETROLELIST = '/role/roleList',
  GETROLEBYID = '/role/getRoleInfo',
  ADDROLE = '/role/addRole',
  DELETEROLE = '/role/deleteRole',
  UPDATEROLE = '/role/updateRole',
}

export const getRoleList = (data) => {
  return defHttp.get({ url: Api.GETROLELIST, params: data });
};

export const addRole = (data) => {
  return defHttp.post({ url: Api.ADDROLE, params: data });
};

export const updateRole = (data) => {
  return defHttp.post({ url: Api.DELETEROLE, params: data });
};

export const deleteRole = (data) => {
  return defHttp.post({ url: Api.UPDATEROLE, params: data });
};
