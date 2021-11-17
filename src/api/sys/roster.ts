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
export const addRoster = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.account !== '' && data.account !== null && data.account !== undefined) {
    params.append('account', data.account);
  }
  if (data.birth !== '' && data.birth !== null && data.birth !== undefined) {
    params.append('birth', data.birth);
  }
  if (data.contactPhone !== '' && data.contactPhone !== null && data.contactPhone !== undefined) {
    params.append('contactPhone', data.contactPhone);
  }
  if (data.deptId !== '' && data.deptId !== null && data.deptId !== undefined) {
    params.append('deptId', data.deptId);
  }
  if (
    data.detailedAddress !== '' &&
    data.detailedAddress !== null &&
    data.detailedAddress !== undefined
  ) {
    params.append('detailedAddress', data.detailedAddress);
  }
  if (
    data.eduBackground !== '' &&
    data.eduBackground !== null &&
    data.eduBackground !== undefined
  ) {
    params.append('eduBackground', data.eduBackground);
  }
  if (
    data.enlistmentTime !== '' &&
    data.enlistmentTime !== null &&
    data.enlistmentTime !== undefined
  ) {
    params.append('enlistmentTime', data.enlistmentTime);
  }
  if (
    data.enlistmentYears !== '' &&
    data.enlistmentYears !== null &&
    data.enlistmentYears !== undefined
  ) {
    params.append('enlistmentYears', data.enlistmentYears);
  }
  if (data.gender !== '' && data.gender !== null && data.gender !== undefined) {
    params.append('gender', data.gender);
  }
  if (data.headPath !== '' && data.headPath !== null && data.headPath !== undefined) {
    params.append('headPath', data.headPath);
  }
  if (data.idCard !== '' && data.idCard !== null && data.idCard !== undefined) {
    params.append('idCard', data.idCard);
  }
  if (data.joinDate !== '' && data.joinDate !== null && data.joinDate !== undefined) {
    params.append('joinDate', data.joinDate);
  }
  if (data.major !== '' && data.major !== null && data.major !== undefined) {
    params.append('major', data.major);
  }
  if (data.nowAddress !== '' && data.nowAddress !== null && data.nowAddress !== undefined) {
    params.append('nowAddress', data.nowAddress);
  }
  if (data.nowDivision !== '' && data.nowDivision !== null && data.nowDivision !== undefined) {
    params.append('nowDivision', data.nowDivision);
  }
  if (data.password !== '' && data.password !== null && data.password !== undefined) {
    params.append('password', data.password);
  }
  if (data.personName !== '' && data.personName !== null && data.personName !== undefined) {
    params.append('personName', data.personName);
  }
  if (data.postId !== '' && data.postId !== null && data.postId !== undefined) {
    params.append('postId', data.postId);
  }
  if (data.reDivision !== '' && data.reDivision !== null && data.reDivision !== undefined) {
    params.append('reDivision', data.reDivision);
  }
  if (
    data.registeredAddress !== '' &&
    data.registeredAddress !== null &&
    data.registeredAddress !== undefined
  ) {
    params.append('registeredAddress', data.registeredAddress);
  }
  if (data.roleId !== '' && data.roleId !== null && data.roleId !== undefined) {
    params.append('roleId', data.roleId);
  }
  if (
    data.serviceTroops !== '' &&
    data.serviceTroops !== null &&
    data.serviceTroops !== undefined
  ) {
    params.append('serviceTroops', data.serviceTroops);
  }
  if (
    data.signaturePath !== '' &&
    data.signaturePath !== null &&
    data.signaturePath !== undefined
  ) {
    params.append('signaturePath', data.signaturePath);
  }
  if (data.stat !== '' && data.stat !== null && data.stat !== undefined) {
    params.append('stat', data.stat);
  }
  return defHttp.post({ url: Api.ADDROSTER, params: params, headers: { uuid: uuid } });
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
