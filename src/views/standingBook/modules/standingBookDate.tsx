import { BasicColumn } from '/@/components/Table/src/types/table';
const statMap = {
  1: '审批中',
  2: '办理完成',
};
export function standingBookTable(): BasicColumn[] {
  return [
    {
      title: '流程编号',
      dataIndex: 'flowNumber',
    },
    {
      title: '发起人',
      dataIndex: 'nowAction',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '当前节点',
      dataIndex: 'nowAction',
    },
    {
      title: '所属流程',
      dataIndex: 'flowName',
    },
    //目前后端没数据
    {
      title: '当前办理人',
      dataIndex: 'evacuateNum',
    },
    {
      title: '状态',
      dataIndex: 'stat',
      customRender: ({ record }) => {
        return statMap[record.type];
      },
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
      field: 'callType41',
      component: 'Input',
      label: '创建人',
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
      component: 'RadioGroup',
      label: '状态',
      colProps: {
        span: 24,
      },
      componentProps: {
        defaultValue: '1',
        options: [
          {
            label: '启动',
            value: '1',
          },
          {
            label: '禁用',
            value: '0',
          },
        ],
      },
    },
  ];
}
