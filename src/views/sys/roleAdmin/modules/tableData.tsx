import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumnsRole(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'personName',
      width: 150,
    },
    {
      title: '职务',
      dataIndex: 'postName',
    },
    {
      title: '所属部门',
      dataIndex: 'deptName',
    },
  ];
}
