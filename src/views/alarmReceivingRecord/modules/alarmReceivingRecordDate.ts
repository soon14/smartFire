import { BasicColumn } from '/@/components/Table/src/types/table';
// import moment from 'moment';
export function getVisitorsTableColumns(): BasicColumn[] {
  return [
    {
      title: '时间',
      dataIndex: 'time',
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
      dataIndex: 'outCar',
    },
    {
      title: '出动人员',
      dataIndex: 'outPersonsName',
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
      label: '出发时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['出发时间起始时间', '出发结束时间'],
      },
    },
    {
      field: 'time2',
      component: 'RangePicker',
      label: '归来时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['归来起始时间', '归来结束时间'],
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
            value: '1',
          },
          {
            label: '社会救助',
            value: '2',
          },
        ],
      },
    },
  ];
}
