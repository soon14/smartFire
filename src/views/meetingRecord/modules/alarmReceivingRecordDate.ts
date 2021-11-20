import { BasicColumn } from '/@/components/Table/src/types/table';
// import moment from 'moment';
export function meetingRecordTable(): BasicColumn[] {
  return [
    {
      title: '会议主题',
      dataIndex: 'time',
    },
    {
      title: '参会人数',
      dataIndex: 'callType',
    },
    {
      title: '会议时间',
      dataIndex: 'fireType',
    },
    {
      title: '记录人',
      dataIndex: 'outCar',
    },
    {
      title: '会议内容',
      dataIndex: 'outPersonsName',
    },
  ];
}
export function defaultSchemas() {
  return [
    {
      field: 'callType',
      component: 'Input',
      label: '会议主题',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'callType',
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
      field: 'callType',
      component: 'Input',
      label: '会议主题',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'callType',
      component: 'Input',
      label: '参会人数',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'callType',
      component: 'Input',
      label: '记录人',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'callType',
      component: 'DatePicker',
      label: '参会时间',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
    {
      field: 'callType',
      component: 'Input',
      label: '会议内容',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
    },
  ];
}
