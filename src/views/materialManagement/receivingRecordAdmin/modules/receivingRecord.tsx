import { BasicColumn } from '/@/components/Table/src/types/table';
import { getDeptListAll } from '/@/api/sys/dept';
export function getreceivingRecordTable(): BasicColumn[] {
  return [
    {
      title: '申请时间',
      dataIndex: 'date',
    },
    {
      title: '申请人',
      dataIndex: 'applyPersonName',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '品名',
      dataIndex: 'goodsName',
    },
    {
      title: '规格型号',
      dataIndex: 'model',
    },
    {
      title: '申请数量',
      dataIndex: 'number',
    },
    {
      title: '确认人',
      dataIndex: 'confirmPersonName',
    },
    {
      title: '确认时间',
      dataIndex: 'confirmDate',
    },
    {
      title: '用途',
      dataIndex: 'purpose',
    },
  ];
}
export function receivingSchemas() {
  return [
    {
      field: 'applyPersonName',
      component: 'Input',
      label: '申请人',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'deptId',
      component: 'ApiTreeSelect',
      label: '部门',
      colProps: {
        span: 12,
      },
      componentProps: {
        // xxxx props
        api: getDeptListAll,
        replaceFields: {
          label: 'deptName',
          value: 'id',
          children: 'deptVos',
        },
      },
    },
    {
      field: 'goodsName',
      component: 'Input',
      label: '品名',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'confirmPerson',
      component: 'Input',
      label: '确认人',
      colProps: {
        span: 12,
      },
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
