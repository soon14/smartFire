import { defHttp } from '/@/utils/http/axios';

// /visitorRecord/visitorRecordList

enum Api {
  // 新增车辆
  ADD_CAR = '/car/addCar',
  // 车辆列表
  CAR_LIST = '/car/carList',
  //carDetails
  CAR_DETAILS = '/car/carDetails',
  // 删除车辆
  DELETE_CAR = '/car/deleteCar',
  //修改车辆
  UPDATE_CAR = '/car/updateCar',
}
export const addCar = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.buyDate !== '' && data.buyDate !== null && data.buyDate !== undefined) {
    params.append('buyDate', data.buyDate);
  }
  if (data.carName !== '' && data.carName !== null && data.carName !== undefined) {
    params.append('carName', data.carName);
  }
  if (data.categoryId !== '' && data.categoryId !== null && data.categoryId !== undefined) {
    params.append('categoryId', data.categoryId);
  }
  if (data.color !== '' && data.color !== null && data.color !== undefined) {
    params.append('color', data.color);
  }
  if (data.engineNumber !== '' && data.engineNumber !== null && data.engineNumber !== undefined) {
    params.append('engineNumber', data.engineNumber);
  }
  if (data.license !== '' && data.license !== null && data.license !== undefined) {
    params.append('license', data.license);
  }
  if (data.path !== '' && data.path !== null && data.path !== undefined) {
    params.append('path', data.path);
  }
  if (
    data.registrationNumber !== '' &&
    data.registrationNumber !== null &&
    data.registrationNumber !== undefined
  ) {
    params.append('registrationNumber', data.registrationNumber);
  }
  if (data.type !== '' && data.type !== null && data.type !== undefined) {
    params.append('type', data.type);
  }
  return defHttp.post({ url: Api.ADD_CAR, params: params, headers: { uuid: uuid } });
};

export const carDetails = (data) => {
  return defHttp.get({ url: Api.CAR_DETAILS, params: data });
};
export const carList = (data) => {
  return defHttp.get({ url: Api.CAR_LIST, params: data });
};
export const deleteCar = (data) => {
  return defHttp.post({ url: Api.DELETE_CAR, params: data });
};
export const updateCar = (data) => {
  return defHttp.post({ url: Api.UPDATE_CAR, params: data });
};
