import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 新增物资
  ADD_GOODS = '/goods/addGoods',
  // 删除物资
  DELETE_GOODDS = '/goods/deleteGoods',
  // 物资列表
  GOODS_LIST = '/goods/goodsList',
  // 修改物资
  UPDATE_GOODS = '/goods/updateGoods',
  //物资领取记录
  GOODS_APPLY_LIST2 = '/goodsApply/goodsApplyList2',

  //物资领取详情
  GOODS_DETAIL = '/goods/goodsDetail',
}
// 物资列表
export const goodsList = (data) => {
  return defHttp.get({ url: Api.GOODS_LIST, params: data });
};
// 新增物资
export const addGoods = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.goodsName !== '' && data.goodsName !== null && data.goodsName !== undefined) {
    params.append('goodsName', data.goodsName);
  }
  if (data.model !== '' && data.model !== null && data.model !== undefined) {
    params.append('model', data.model);
  }
  if (data.unit !== '' && data.unit !== null && data.unit !== undefined) {
    params.append('unit', data.unit);
  }
  if (data.quantity !== '' && data.quantity !== null && data.quantity !== undefined) {
    params.append('quantity', data.quantity);
  }
  return defHttp.post({ url: Api.ADD_GOODS, params: params, headers: { uuid: uuid } });
};
//删除物资
export const deleteGoods = (data) => {
  return defHttp.post({ url: Api.DELETE_GOODDS, params: data });
};
//修改物资
export const updateGoods = (data) => {
  return defHttp.post({ url: Api.UPDATE_GOODS, params: data });
};

//物资领取记录
export const goodsApplyList2 = (data) => {
  return defHttp.get({ url: Api.GOODS_APPLY_LIST2, params: data });
};

//物资领取详情
export const goodsDetail = (data) => {
  return defHttp.get({ url: Api.GOODS_DETAIL, params: data });
};
