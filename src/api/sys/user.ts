import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/user/login',
  Logout = '/logout',
  GetUserInfo = '/user/userInfo',
  GetPermCode = '/getPermCode',
  // 查询个人信息
  USER_INFO2 = '/user/userInfo2',
  //修改密码
  UPDATE_PERSON_PASSWORD = '/user/updatePersonPassword',
  //修改个人资料
  UPDATE_USER = '/user/updateUser',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export const userInfo2 = (data) => {
  return defHttp.get({ url: Api.USER_INFO2, params: data });
};
export const updatePersonPassword = (data) => {
  return defHttp.post({ url: Api.UPDATE_PERSON_PASSWORD, params: data });
};
export const updateUser = (data) => {
  return defHttp.post({ url: Api.UPDATE_USER, params: data });
};
