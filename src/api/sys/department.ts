import { defHttp } from '/@/utils/http/axios';

// POST /dept/addDept
// 新建部门

// POST /dept/deleteDept
// 删除部门

// GET /dept/deptList
// 部门列表分级展示

// POST /dept/deptList2
// 部门列表(不分级)

// POST /dept/deptList3
// 当前部门的子集

// POST /dept/updateDept
// 修改部门

//部门列表分级展示2 可以条件查询
//GET /dept/deptList2
enum Api {
  ABBDEPT = '/dept/addDept',
  DELETE_DEPT = '/dept/deleteDept',
  DEPT_LIST = '/dept/deptList',
  DEPT_LIST2 = '/dept/deptList2',
  DEPT_LIST3 = '/dept/deptList3',
  UPDATE_DEPT = '/dept/updateDept',
  //部门列表分级展示2 可以条件查询
  GET_DEPT_LIST2 = '/dept/deptList2',
}
export const addDept = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.deptName !== '' && data.deptName !== null && data.deptName !== undefined) {
    params.append('deptName', data.deptName);
  }
  if (data.description !== '' && data.description !== null && data.description !== undefined) {
    params.append('description', data.description);
  }
  if (data.parentId !== '' && data.parentId !== null && data.parentId !== undefined) {
    params.append('parentId', data.parentId);
  }
  if (data.stat !== '' && data.stat !== null && data.stat !== undefined) {
    params.append('stat', data.stat);
  }
  return defHttp.post({ url: Api.ABBDEPT, params: params, headers: { uuid: uuid } });
};
export const deleteDept = (data) => {
  return defHttp.post({ url: Api.DELETE_DEPT, params: data });
};
export const deptList = (data) => {
  return defHttp.get({ url: Api.DEPT_LIST, params: data });
};
export const deptList2 = (data) => {
  return defHttp.post({ url: Api.DEPT_LIST2, params: data });
};
export const deptList3 = (data) => {
  return defHttp.post({ url: Api.DEPT_LIST3, params: data });
};
export const updateDept = (data) => {
  return defHttp.post({ url: Api.UPDATE_DEPT, params: data });
};
//部门列表分级展示2 可以条件查询
export const getDeptList2 = (data) => {
  return defHttp.get({ url: Api.GET_DEPT_LIST2, params: data });
};
