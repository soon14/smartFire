// import moment from 'moment';
import { uploadApi } from '/@/api/sys/upload';
export function getRecipeForm() {
  return [
    {
      field: 'foodName',
      component: 'Input',
      label: '菜品名称',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'desc',
      component: 'InputTextArea',
      label: '备注',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'path',
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        uploadParams: {
          data: {
            type: 1,
          },
        },
      },
      label: '添加照片',
      colProps: {
        span: 24,
      },
    },
  ];
}
