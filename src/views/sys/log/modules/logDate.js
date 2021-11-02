export function getBaseTableColumns() {
  return [
    {
      title: '标题',
      dataIndex: 'content',
    },
    {
      title: '操作人',
      dataIndex: 'userName',
    },
    {
      title: '操作时间',
      dataIndex: 'createDate',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
  ];
}
export function logDataSchemas() {
  return [
    {
      field: 'datetime1',
      component: 'RangePicker',
      label: '操作时间',
      colProps: {
        span: 24,
      },
      componentProps: {
        style: { width: '100%' },
        placeholder: ['操作开始时间', '操作结束时间'],
      },
    },
  ];
}
