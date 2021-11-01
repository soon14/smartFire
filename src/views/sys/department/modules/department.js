import { deptList, updateDept } from '/@/api/sys/department';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
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
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.stat === 1,
          checkedChildren: '已启用',
          unCheckedChildren: '已禁用',
          loading: record.pendingStatus,
          onChange(checked) {
            record.pendingStatus = true;
            const newStatus = checked ? 1 : 0;
            const { createMessage } = useMessage();
            const transData = {
              id: record.id,
              stat: newStatus,
            };
            updateDept(transData)
              .then(() => {
                record.stat = newStatus;
                console.log(
                  '🚀 ~ file: jobManagement.tsx ~ line 52 ~ .then ~ record.stat',
                  record.stat,
                );
                createMessage.success(`已成功修改角色状态`);
              })
              .catch(() => {
                createMessage.error('修改角色状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          },
        });
      },
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
