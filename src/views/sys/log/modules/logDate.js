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
