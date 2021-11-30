import { defHttp } from '/@/utils/http/axios';

enum Api {
  // 菜谱列表
  FOOD_MENU_LIST = '/foodMenu/foodMenuList',
  //删除菜谱
  DELETE_FOOD_MENU = '/foodMenu/deleteFoodMenu',
  // 新增菜谱
  ADD_FOOD_MENU = '/foodMenu/addFoodMenu',
  //修改菜谱
  UPDATE_FOOD_MENU = '/foodMenu/updateFoodMenu',
  // 评价列表
  COMMENT_LIST = '/food/commentList',
  //被喜欢菜
  LIKE_FOOD_LIST = '/food/likeFoodList',

  //设置食谱 列表（以下）
  //设置食谱列表
  FOOD_LIST = '/food/foodList',
  // 删除食谱
  DELETE_FOOD = '/food/deleteFood',
  //新增食谱
  ADD_FOOD = '/food/addFood',
  //修改食谱
  UPDATE_FOOD = '/food/updateFood',
}
// 菜谱列表
export const foodMenuList = (data) => {
  return defHttp.get({ url: Api.FOOD_MENU_LIST, params: data });
};
//删除菜单
export const deleteFoodMenu = (data) => {
  return defHttp.post({ url: Api.DELETE_FOOD_MENU, params: data });
};
// 新增菜谱
export const addFoodMenu = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.foodName !== '' && data.foodName !== null && data.foodName !== undefined) {
    params.append('foodName', data.foodName);
  }
  if (data.desc !== '' && data.desc !== null && data.desc !== undefined) {
    params.append('desc', data.desc);
  }
  if (data.path !== '' && data.path !== null && data.path !== undefined) {
    params.append('path', data.path);
  }
  if (data.type !== '' && data.type !== null && data.type !== undefined) {
    params.append('type', data.type);
  }
  return defHttp.post({ url: Api.ADD_FOOD_MENU, params: params, headers: { uuid: uuid } });
};
//修改菜谱
export const updateFoodMenu = (data) => {
  return defHttp.post({ url: Api.UPDATE_FOOD_MENU, params: data });
};

//评价列表
export const commentList = (data) => {
  return defHttp.get({ url: Api.COMMENT_LIST, params: data });
};

//被喜欢菜
export const likeFoodList = (data) => {
  return defHttp.get({ url: Api.LIKE_FOOD_LIST, params: data });
};

//设置食谱列表
export const foodList = (data) => {
  return defHttp.get({ url: Api.FOOD_LIST, params: data });
};
// 删除食谱
export const deleteFood = (data) => {
  return defHttp.post({ url: Api.DELETE_FOOD, params: data });
};

// 新增食谱
export const addFood = (data, uuid) => {
  const params = new URLSearchParams();
  if (data.foodDate !== '' && data.foodDate !== null && data.foodDate !== undefined) {
    params.append('foodDate', data.foodDate);
  }
  if (data.foodMenuIds !== '' && data.foodMenuIds !== null && data.foodMenuIds !== undefined) {
    params.append('foodMenuIds', data.foodMenuIds);
  }
  if (data.type !== '' && data.type !== null && data.type !== undefined) {
    params.append('type', data.type);
  }
  return defHttp.post({ url: Api.ADD_FOOD, params: params, headers: { uuid: uuid } });
};
// 修改食谱
export const updateFood = (data) => {
  return defHttp.post({ url: Api.UPDATE_FOOD, params: data });
};
