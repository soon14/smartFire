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
      dataIndex: 'createPersonName',
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
        return statMap[record.stat];
      },
    },
  ];
}
export function standingBookSchemas() {
  return [
    {
      field: 'flowNumber',
      component: 'Input',
      label: '流程编号',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'createPersonName',
      component: 'Input',
      label: '创建人',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'createDate',
      component: 'DatePicker',
      label: '创建时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'flowName',
      component: 'Input',
      label: '所属流程',
      colProps: {
        span: 12,
      },
    },

    {
      field: 'evacuateNum',
      component: 'Input',
      label: '办理人',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'stat',
      component: 'Select',
      label: '状态',
      colProps: {
        span: 12,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '草稿',
            value: '0',
          },
          {
            label: '审批中',
            value: '1',
          },
          {
            label: '办理完成',
            value: '2',
          },
        ],
      },
    },
  ];
}
