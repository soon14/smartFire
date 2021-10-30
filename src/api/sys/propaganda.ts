import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETPICTURELIST = '/picture/pictureList',
  ADDPICTURE = '/picture/addPicture',
  DELETEPICTURE = '/picture/deletePicture',
}

export const getPictureList = () => {
  return defHttp.get({ url: Api.GETPICTURELIST });
};

export const addPicture = (data) => {
  return defHttp.post({ url: Api.ADDPICTURE, params: data });
};
export const deletePicture = (data) => {
  return defHttp.post({ url: Api.DELETEPICTURE, params: data });
};
