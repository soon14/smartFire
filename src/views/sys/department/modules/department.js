import { deptList } from '/@/api/sys/department';
export function getBaseTableColumns() {
  return [
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '创建人',
      dataIndex: 'personName',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
    },
    {
      title: '备注',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'stat',
    },
  ];
}

export function getDepartmentForm() {
  return [
    {
      field: 'deptName',
      component: 'Input',
      label: '部门名称',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'parentId',
      component: 'ApiSelect',
      label: '所属部门',
      colProps: {
        span: 24,
      },
      componentProps: {
        api: deptList,
        labelField: 'deptName',
        valueField: 'id',
        placeholder: '所属部门',
      },
      required: true,
    },
    {
      field: 'description',
      component: 'InputTextArea',
      label: '备注',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'stat',
      component: 'RadioGroup',
      componentProps: {
        defaultValue: '1',
        options: [
          {
            label: '启动',
            value: '1',
          },
          {
            label: '禁用',
            value: '0',
          },
        ],
      },
      label: '状态',
      colProps: {
        span: 24,
      },
    },
  ];
}
