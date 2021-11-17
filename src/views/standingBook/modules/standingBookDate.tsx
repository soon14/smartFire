import { BasicColumn } from '/@/components/Table/src/types/table';
export function standingBookTable(): BasicColumn[] {
  return [
    {
      title: '流程编号',
      dataIndex: 'time',
    },
    {
      title: '发起人',
      dataIndex: 'callType',
    },
    {
      title: '创建时间',
      dataIndex: 'fireType',
    },
    {
      title: '当前节点',
      dataIndex: 'outCar',
    },
    {
      title: '所属流程',
      dataIndex: 'outPersonsName',
    },
    {
      title: '当前办理人',
      dataIndex: 'evacuateNum',
    },
    {
      title: '状态',
      dataIndex: 'saveMoney',
    },
  ];
}
export function standingBookSchemas() {
  return [
    {
      field: 'callType41',
      component: 'Input',
      label: '标题',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'callType4',
      component: 'DatePicker',
      label: '创建时间',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'callType3',
      component: 'Input',
      label: '所属流程',
      colProps: {
        span: 12,
      },
    },

    {
      field: 'callType2',
      component: 'Input',
      label: '办理人',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'callType1',
      component: 'Input',
      label: '状态',
      colProps: {
        span: 12,
      },
    },
  ];
}
