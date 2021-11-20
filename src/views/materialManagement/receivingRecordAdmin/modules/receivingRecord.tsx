import { BasicColumn } from '/@/components/Table/src/types/table';
export function getreceivingRecordTable(): BasicColumn[] {
  return [
    {
      title: '申请时间',
      dataIndex: 'carName',
    },
    {
      title: '申请人',
      dataIndex: 'registrationNumber',
    },
    {
      title: '部门',
      dataIndex: 'license3',
    },
    {
      title: '品名',
      dataIndex: 'license2',
    },
    {
      title: '规格型号',
      dataIndex: 'licenseq',
    },
    {
      title: '申请数量',
      dataIndex: 'license1sa',
    },
    {
      title: '确认人',
      dataIndex: 'license1aa',
    },
    {
      title: '确认时间',
      dataIndex: 'licenseg1',
    },
    {
      title: '用途',
      dataIndex: 'licdense1',
    },
  ];
}
export function receivingSchemas() {
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
