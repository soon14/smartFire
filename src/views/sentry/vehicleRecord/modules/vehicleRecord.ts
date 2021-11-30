import { BasicColumn } from '/@/components/Table/src/types/table';
import { getJobList } from '/@/api/sys/job';
import { carList } from '/@/api/vehicle/vehicle';
// import moment from 'moment';
// const carUseType = {
//   1: '公差',
//   2: '维修',
// };
export function getVehicleRecordColumns(): BasicColumn[] {
  return [
    {
      title: '用车人',
      dataIndex: 'personName',
    },
    {
      title: '职务',
      dataIndex: 'postName',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '用车单位',
      dataIndex: 'deptName',
    },
    {
      title: '牌号',
      dataIndex: 'registrationNumber',
    },
    {
      title: '用车类型',
      dataIndex: 'useType',
      // customRender: ({ record }) => {
      //   return carUseType[record.useType];
      // },
    },
    {
      title: '实际出发时间',
      dataIndex: 'outTime',
    },
    {
      title: '实际归来时间',
      dataIndex: 'inTime',
    },
    {
      title: '乘车人数',
      dataIndex: 'ridingNum',
    },
    {
      title: '用车事由',
      dataIndex: 'goal',
    },
    // {
    //   title: '审批人',
    //   dataIndex: 'approverName',
    // },
  ];
}
export function vehicleRecordFrom() {
  return [
    {
      field: 'condition',
      component: 'Input',
      label: '用车人',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
      },
    },
    {
      field: 'useType',
      component: 'Select',
      label: '用车类型',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
        options: [
          {
            label: '公差',
            value: '1',
          },
          {
            label: '维修',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'datetime',
      component: 'RangePicker',
      label: '出发时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['来访起始时间', '结束时间'],
      },
    },
    {
      field: 'datetime1',
      component: 'RangePicker',
      label: '归来时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['离开起始时间', '离开结束时间'],
      },
    },
    {
      field: 'registrationNumber',
      component: 'ApiSelect',
      label: '牌号',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
        api: carList,
        resultField: 'list',
        labelField: 'registrationNumber',
        valueField: 'id',
        numberToString: true,
        searchInfo: {
          pageSize: 999999,
        },
      },
    },
    {
      field: 'postId',
      component: 'ApiSelect',
      label: '职务',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: { width: '100%' },
        api: getJobList,
        resultField: 'list',
        labelField: 'postName',
        valueField: 'id',
        numberToString: true,
        searchInfo: {
          pageSize: 999999,
        },
      },
    },
  ];
}
