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
export const addCar = (data) => {
  return defHttp.post({ url: Api.ADD_CAR, params: data });
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
