import { workFlowHttp } from '/@/utils/http/axios';

enum Api {
  //台账列表
  FLOW_LIST = '/flowHandler/flowList',
  //流程模板
  FLOW_TEMPLATE_LIST = '/flow/flowTemplateList',
  //流程详情
  FLOW_DETAIL = '/flowHandler/flowDetail',
  // 删除流程
  DELETE_FLOWTEMPLATE = '/flow/deleteFlowTemplate',
  // 修改流程
  UPDATE_FLOWTEMPLATE = '/flow/updateFlowTemplate',
}
export const flowList = (data) => {
  return workFlowHttp.post({ url: Api.FLOW_LIST, params: data });
};
export const flowTemplateList = (data) => {
  return workFlowHttp.post({ url: Api.FLOW_TEMPLATE_LIST, params: data });
};
export const flowDetail = (data) => {
  return workFlowHttp.post({ url: Api.FLOW_DETAIL, params: data });
};
export const deleteTemplate = (data) => {
  return workFlowHttp.post({ url: Api.DELETE_FLOWTEMPLATE, params: data });
};
export const updateTemplate = (data) => {
  return workFlowHttp.post({ url: Api.UPDATE_FLOWTEMPLATE, params: data });
};
