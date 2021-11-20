import { BasicColumn } from '/@/components/Table/src/types/table';
import { uploadApi } from '/@/api/sys/upload';
import { isEmpty, isUnDef } from '/@/utils/is';
const categoryMap = {
  1: '消防车',
  2: '行政车',
};
const carTypeMap = {
  1: '中型水罐消防车',
  2: '泡沫消防车',
  3: '干粉消防车',
  4: '云梯消防车',
};
export function getFireEngineTable(): BasicColumn[] {
  return [
    {
      title: '车辆名称',
      dataIndex: 'carName',
    },
    {
      title: '牌号',
      dataIndex: 'registrationNumber',
    },
    {
      title: '行驶证编号',
      dataIndex: 'license',
    },
    {
      title: '类别',
      dataIndex: 'type',
      customRender: ({ record }) => {
        return categoryMap[record.type];
      },
    },
    {
      title: '颜色',
      dataIndex: 'color',
    },
    {
      title: '购买日期',
      dataIndex: 'buyDate',
    },
    {
      title: '车型',
      dataIndex: 'categoryId',
      customRender: ({ record }) => {
        return carTypeMap[record.categoryId];
      },
    },
    {
      title: '发动机号',
      dataIndex: 'engineNumber',
    },
    {
      title: '车辆图片',
      dataIndex: 'path',
      slots: { customRender: 'path' },
    },
  ];
}

export function getFireEngineForm() {
  return [
    {
      field: 'carName',
      component: 'Input',
      label: '车辆名称',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'registrationNumber',
      component: 'Input',
      label: '牌号',
      colProps: {
        span: 12,
      },
      rules: [
        {
          type: 'number',
          validator: async (_, value) => {
            if (isUnDef(value) || isEmpty(value)) {
              return Promise.resolve();
            }
            const phoneReg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
            if (!phoneReg.test(value)) {
              return Promise.reject('请输入正确格式车牌号');
            }
            return Promise.resolve();
          },
          trigger: ['change', 'blur'],
          required: true,
        },
      ],
    },
    {
      field: 'license',
      component: 'Input',
      label: '行驶证号',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'type',
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '消防车',
            value: '1',
          },
          {
            label: '行政车',
            value: '2',
          },
        ],
      },
      label: '类别',
      defaultValue: '1',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'buyDate',
      component: 'DatePicker',
      label: '购买日期',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'categoryId',
      component: 'Select',
      label: '车型',
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '中型水罐消防车',
            value: '1',
          },
          {
            label: '泡沫消防车',
            value: '2',
          },
          {
            label: '干粉消防车',
            value: '3',
          },
          {
            label: '云梯消防车',
            value: '4',
          },
        ],
      },
    },
    {
      field: 'engineNumber',
      component: 'Input',
      label: '发动机号',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'color',
      component: 'Input',
      label: '颜色',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'path',
      component: 'Upload',
      label: '添加图片',
      colProps: {
        span: 24,
      },
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        uploadParams: {
          data: {
            type: 2,
          },
        },
      },
    },
  ];
}
export function getScrapReasonForm() {
  return [
    {
      field: 'reason',
      component: 'Input',
      label: '报修原因',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
  ];
}

export function getLookUpVehicleForm() {
  return [
    {
      field: 'carName',
      component: 'Input',
      label: '车辆名称',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'registrationNumber',
      component: 'Input',
      dynamicDisabled: true,
      label: '牌号',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'license',
      component: 'Input',
      dynamicDisabled: true,
      label: '行驶证号',
      colProps: {
        span: 12,
      },
      rules: [{ required: true }],
    },
    {
      field: 'type',
      component: 'Select',
      dynamicDisabled: true,
      componentProps: {
        options: [
          {
            label: '消防车',
            value: '1',
          },
          {
            label: '行政车',
            value: '2',
          },
        ],
      },
      label: '类别',
      colProps: {
        span: 12,
      },
      required: true,
    },
    {
      field: 'buyDate',
      component: 'DatePicker',
      dynamicDisabled: true,
      label: '购买日期',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'categoryId',
      component: 'Select',
      dynamicDisabled: true,
      label: '车型',
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '中型水罐消防车',
            value: '1',
          },
          {
            label: '泡沫消防车',
            value: '2',
          },
          {
            label: '干粉消防车',
            value: '3',
          },
          {
            label: '云梯消防车',
            value: '4',
          },
        ],
      },
    },
    {
      field: 'engineNumber',
      component: 'Input',
      dynamicDisabled: true,
      label: '发动机号',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'color',
      component: 'Input',
      dynamicDisabled: true,
      label: '颜色',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'path',
      component: 'Upload',
      label: '添加图片',
      colProps: {
        span: 24,
      },
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        uploadParams: {
          data: {
            type: 2,
          },
        },
      },
    },
    {
      label: ' ',
      field: 'table',
      slot: 'table',
      component: 'Input',
    },
  ];
}

export function carDetailsTable(): BasicColumn[] {
  return [
    {
      title: '用车人',
      dataIndex: 'personName',
    },
    // {
    //   title: '用车时间',
    //   dataIndex: 'registrationNumber',
    // },
    {
      title: '出发时间',
      dataIndex: 'outTime',
    },
    {
      title: '归来时间',
      dataIndex: 'inTime',
    },
    {
      title: '实际出发时间',
      dataIndex: 'actualOutTime',
    },
    {
      title: '实际归来时间',
      dataIndex: 'actualInTime',
    },
    {
      title: '用车事由',
      dataIndex: 'goal',
    },
  ];
}
