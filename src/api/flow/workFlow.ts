import { workFlowHttp } from '/@/utils/http/axios';

enum Api {
  //台账列表
  FLOW_LIST = '/flowHandler/flowList',
  //流程模板
  FLOW_TEMPLATE_LIST = '/flow/flowTemplateList',
  //流程详情
  FLOW_DETAIL = '/flowHandler/flowDetail',
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
