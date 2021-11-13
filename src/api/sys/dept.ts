import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETDEPTLISTALL = '/dept/deptList',
  GETDEPTLISTFIRST = '/dept/deptList2',
  GETDEPTLISTBYID = '/dept/deptList3',
  ADDDEPT = '/dept/addDept',
  DELETEDEPT = '/dept/deleteDept',
  UPDATEDEPT = '/dept/updateDept',
}

export const getDeptListAll = (data) => {
  return defHttp.get({ url: Api.GETDEPTLISTALL, params: data });
};

export const getDeptListFirstLevel = (data) => {
  return defHttp.post({ url: Api.GETDEPTLISTFIRST, params: data });
};

export const getDeptListById = (data) => {
  return defHttp.post({ url: Api.GETDEPTLISTBYID, params: data });
};

export const addDept = (data) => {
  return defHttp.post({ url: Api.ADDDEPT, params: data });
};

export const updateDept = (data) => {
  return defHttp.post({ url: Api.DELETEDEPT, params: data });
};

export const deleteDept = (data) => {
  return defHttp.post({ url: Api.UPDATEDEPT, params: data });
};
