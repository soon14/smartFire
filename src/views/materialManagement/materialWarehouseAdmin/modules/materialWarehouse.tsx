import { BasicColumn } from '/@/components/Table/src/types/table';
export function getmaterialWarehouseTable(): BasicColumn[] {
  return [
    {
      title: '操作时间',
      dataIndex: 'carName',
    },
    {
      title: '品名',
      dataIndex: 'goodsName',
    },
    {
      title: '规格型号',
      dataIndex: 'model',
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
    },
    {
      title: '库存数量',
      dataIndex: 'quantity',
    },
  ];
}

export function getMaterialWarehouseForm() {
  return [
    {
      field: 'goodsName',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'model',
      component: 'Input',
      label: '型号规格',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'unit',
      component: 'Select',
      label: '计量单位',
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: '个',
            value: '个',
          },
          {
            label: '套',
            value: '套',
          },
          {
            label: '台',
            value: '台',
          },
          {
            label: '件',
            value: '件',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'quantity',
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
      dataIndex: 'applyPersonName',
    },
    {
      title: '领取时间',
      dataIndex: 'date',
    },
    {
      title: '领取数量',
      dataIndex: 'number',
    },
    {
      title: '确认人',
      dataIndex: 'confirmPersonName',
    },
    {
      title: '确认时间',
      dataIndex: 'confirmDate',
    },
  ];
}

export function getMaterialWarehouseLookForm() {
  return [
    {
      field: 'goodsName',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'model',
      component: 'Input',
      label: '型号规格',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'unit',
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
            value: '个',
          },
          {
            label: '套',
            value: '套',
          },
          {
            label: '台',
            value: '台',
          },
          {
            label: '件',
            value: '件',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'quantity',
      component: 'Input',
      label: '数量',
      colProps: {
        span: 12,
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
      field: 'goodsName',
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
      field: 'unit',
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
            value: '个',
          },
          {
            label: '套',
            value: '套',
          },
          {
            label: '台',
            value: '台',
          },
          {
            label: '件',
            value: '件',
          },
        ],
      },
      rules: [{ required: true }],
    },
    {
      field: 'quantity',
      component: 'Input',
      label: '库存数量',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      rules: [{ required: true }],
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '操作时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['起始时间', '结束时间'],
      },
    },
    // {
    //   field: 'time1',
    //   component: 'RangePicker',
    //   label: '确认时间',
    //   colProps: {
    //     span: 24,
    //   },
    //   componentProps: {
    //     style: { width: '100%' },
    //     placeholder: ['起始时间', '结束时间'],
    //   },
    // },
  ];
}
