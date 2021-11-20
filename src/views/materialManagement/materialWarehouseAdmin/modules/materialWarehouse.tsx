import { BasicColumn } from '/@/components/Table/src/types/table';
export function getmaterialWarehouseTable(): BasicColumn[] {
  return [
    {
      title: '操作时间',
      dataIndex: 'carName',
    },
    {
      title: '品名',
      dataIndex: 'registrationNumber',
    },
    {
      title: '规格型号',
      dataIndex: 'license3',
    },
    {
      title: '计量单位',
      dataIndex: 'license2',
    },
    {
      title: '库存数量',
      dataIndex: 'license1',
    },
  ];
}

export function getMaterialWarehouseForm() {
  return [
    {
      field: 'reasona',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'reasonc',
      component: 'Input',
      label: '型号规格',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'reasonq',
      component: 'Select',
      label: '计量单位',
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: '个',
            value: '1',
          },
          {
            label: '套',
            value: '2',
          },
          {
            label: '台',
            value: '2',
          },
          {
            label: '件',
            value: '2',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'reasonw',
      component: 'Input',
      label: '数量',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
  ];
}

export function MaterialWarehouseTable(): BasicColumn[] {
  return [
    {
      title: '领取人',
      dataIndex: 'personName',
    },
    {
      title: '领取时间',
      dataIndex: 'personName',
    },
    {
      title: '领取数量',
      dataIndex: 'personName',
    },
    {
      title: '确认人',
      dataIndex: 'personName',
    },
    {
      title: '确认时间',
      dataIndex: 'personName',
    },
  ];
}

export function getMaterialWarehouseLookForm() {
  return [
    {
      field: 'reasona',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 24,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'reasonc',
      component: 'Input',
      label: '型号规格',
      colProps: {
        span: 24,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'reasonq',
      component: 'Select',
      label: '计量单位',
      colProps: {
        span: 24,
      },
      dynamicDisabled: true,
      componentProps: {
        options: [
          {
            label: '个',
            value: '1',
          },
          {
            label: '套',
            value: '2',
          },
          {
            label: '台',
            value: '2',
          },
          {
            label: '件',
            value: '2',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'reasonw',
      component: 'Input',
      label: '数量',
      colProps: {
        span: 24,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      label: ' ',
      field: 'table',
      slot: 'table',
      component: 'Input',
    },
  ];
}
export function materialSchemas() {
  return [
    {
      field: 'reasona',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'reasonc',
      component: 'Input',
      label: '型号规格',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'reasonq',
      component: 'Select',
      label: '计量单位',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      componentProps: {
        options: [
          {
            label: '个',
            value: '1',
          },
          {
            label: '套',
            value: '2',
          },
          {
            label: '台',
            value: '2',
          },
          {
            label: '件',
            value: '2',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'reasonw',
      component: 'Input',
      label: '数量',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '领取时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['起始时间', '结束时间'],
      },
    },
    {
      field: 'time1',
      component: 'RangePicker',
      label: '确认时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['起始时间', '结束时间'],
      },
    },
  ];
}
