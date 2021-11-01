export function getVisitorsTableColumns() {
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
      field: 'postName',
      component: 'Input',
      label: 'cs',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
  ];
}
