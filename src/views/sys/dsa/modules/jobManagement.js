import { updateJob } from '/@/api/sys/job';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
export function getBaseTableColumns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      // fixed: 'left',
      flex: 1,
    },
    {
      title: '职务名称',
      dataIndex: 'postName',
    },
    {
      title: '职务职责',
      dataIndex: 'duty',
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
      title: '状态',
      dataIndex: 'stat',
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.stat === '1',
          checkedChildren: '已启用',
          unCheckedChildren: '已禁用',
          loading: record.pendingStatus,
          onChange(checked) {
            record.pendingStatus = true;
            const newStatus = checked ? '1' : '0';
            const { createMessage } = useMessage();
            const transData = {
              id: record.id,
              stat: newStatus,
            };
            updateJob(transData)
              .then(() => {
                record.stat = newStatus;
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

export function getBaseAddForm() {
  return [
    {
      field: 'postName',
      component: 'Input',
      label: '职务名称',
      colProps: {
        span: 24,
      },
      rules: [{ required: true }],
    },
    {
      field: 'duty',
      component: 'InputTextArea',
      label: '职务职责',
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
