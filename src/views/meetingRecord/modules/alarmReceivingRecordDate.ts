import { BasicColumn } from '/@/components/Table/src/types/table';
// import moment from 'moment';
export function meetingRecordTable(): BasicColumn[] {
  return [
    {
      title: '会议主题',
      dataIndex: 'mettingTheme',
    },
    {
      title: '参会人数',
      dataIndex: 'personNumber',
    },
    {
      title: '会议时间',
      dataIndex: 'createDate',
    },
    {
      title: '记录人',
      dataIndex: 'recordPersonName',
    },
    {
      title: '会议内容',
      dataIndex: 'content',
    },
  ];
}
export function defaultSchemas() {
  return [
    {
      field: 'mettingTheme',
      component: 'Input',
      label: '会议主题',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'recordPersonName',
      component: 'Input',
      label: '记录人',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'time',
      component: 'RangePicker',
      label: '会议时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['开始时间', '结束时间'],
      },
    },
  ];
}

export function getMeetingRecordForm() {
  return [
    {
      field: 'mettingTheme',
      component: 'Input',
      label: '会议主题',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'personNumber',
      component: 'Input',
      label: '参会人数',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'recordPersonName',
      component: 'Input',
      label: '记录人',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'createDate',
      component: 'DatePicker',
      label: '参会时间',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'content',
      component: 'Input',
      label: '会议内容',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
  ];
}
