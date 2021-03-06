import { BasicColumn } from '/@/components/Table/src/types/table';
// import moment from 'moment';
export function getVisitorsTableColumns(): BasicColumn[] {
  return [
    {
      title: '时间',
      dataIndex: 'createDate',
    },
    {
      title: '出警类型',
      dataIndex: 'callType',
    },
    {
      title: '火灾类型',
      dataIndex: 'fireType',
    },
    {
      title: '出动车辆',
      dataIndex: 'registrationNumber',
    },
    {
      title: '出动人员',
      dataIndex: 'outPersons',
    },
    {
      title: '疏散人员',
      dataIndex: 'evacuateNum',
    },
    {
      title: '抢救财产',
      dataIndex: 'saveMoney',
    },
    {
      title: '人员伤亡',
      dataIndex: 'injuredNum',
    },
    {
      title: '人员死亡',
      dataIndex: 'deathNum',
    },
  ];
}
export function defaultSchemas() {
  return [
    {
      field: 'time',
      component: 'RangePicker',
      label: '查询时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['起始时间', '结束时间'],
      },
    },
    {
      field: 'callType',
      component: 'Select',
      label: '出警类型',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        options: [
          {
            label: '火灾',
            value: '火灾',
          },
          {
            label: '社会救助',
            value: '社会救助',
          },
          {
            label: '抢险救援',
            value: '抢险救援',
          },
        ],
      },
    },
  ];
}
