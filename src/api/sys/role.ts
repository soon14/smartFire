import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETROLELIST = '/role/roleList',
  GETROLEBYID = '/role/getRoleInfo',
  ADDROLE = '/role/addRole',
  DELETEROLE = '/role/deleteRole',
  UPDATEROLE = '/role/updateRole',
  SELECT_ROLE = '/role/selectRole',
  GET_AUTHORITY_DETAIL_LIST = '/role/getAuthorityDetailList',
}

export const getRoleList = (data) => {
  return defHttp.get({ url: Api.GETROLELIST, params: data });
};

export const addRole = (data, uuid) => {
  console.log('data==>', data);
  const params = new URLSearchParams();
  if (data !== '' && data !== null && data !== undefined) {
    params.append('roleName', data);
  }
  return defHttp.post({ url: Api.ADDROLE, params: params, headers: { uuid: uuid } });
};

export const updateRole = (data) => {
  return defHttp.post({ url: Api.UPDATEROLE, params: data });
};

export const deleteRole = (data) => {
  return defHttp.post({ url: Api.DELETEROLE, params: data });
};
export const selectRole = (data) => {
  return defHttp.post({ url: Api.SELECT_ROLE, params: data });
};
export const getAuthorityDetailList = (data) => {
  return defHttp.post({ url: Api.GET_AUTHORITY_DETAIL_LIST, params: data });
};
