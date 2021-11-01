import { BasicColumn } from '/@/components/Table/src/types/table';
// import moment from 'moment';
export function getVisitorsTableColumns(): BasicColumn[] {
  return [
    {
      title: '来访者',
      dataIndex: 'visitorName',
    },
    {
      title: '被访问人',
      dataIndex: 'personName',
    },
    {
      title: '来访时间',
      dataIndex: 'inTime',
    },
    {
      title: '离开时间',
      dataIndex: 'outTime',
    },
    {
      title: '电话',
      dataIndex: 'contactPhone',
    },
    {
      title: '照片',
      dataIndex: 'path',
      slots: { customRender: 'path' },
    },
    {
      title: '事由',
      dataIndex: 'goal',
    },
  ];
}
export function defaultSchemas() {
  return [
    {
      field: 'intervieweeName',
      component: 'Input',
      label: '被访人',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
    {
      field: 'visitorName',
      component: 'Input',
      label: '来访人',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
    {
      field: 'inTime',
      component: 'RangePicker',
      label: '进入时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['来访起始时间', '结束时间'],
      },
    },
    {
      field: 'outTime',
      component: 'RangePicker',
      label: '离开时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['离开起始时间', '离开结束时间'],
      },
    },
  ];
}
