import { defHttp } from '/@/utils/http/axios';

enum Api {
  GETJOBLIST = '/post/postList',
  ADDJOB = '/post/addPost',
  DELETEJOB = '/post/deletePost',
  UPDATEJOB = '/post/updatePost',
}

/**
 * @description: Get user menu based on id
 */

export const getJobList = (data) => {
  return defHttp.post({ url: Api.GETJOBLIST, params: data });
};

export const addJob = (data) => {
  return defHttp.post({ url: Api.ADDJOB, params: data });
};

export const deleteJob = (data) => {
  return defHttp.post({ url: Api.DELETEJOB, params: data });
};

export const updateJob = (data) => {
  return defHttp.post({ url: Api.UPDATEJOB, params: data });
};
