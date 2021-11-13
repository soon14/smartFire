import { updateDept } from '/@/api/sys/department';
import { getDeptListAll } from '/@/api/sys/dept';
import { h, ref } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { usePermission } from '/@/hooks/web/usePermission';
const { hasPermission } = usePermission();
export function getBaseTableColumns() {
  return [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      fixed: 'left',
      width: 200,
      align: 'left',
    },
    {
      title: '创建人',
      dataIndex: 'personName',
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      align: 'left',
    },
    {
      title: '备注',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'stat',
      ifShow: (_column) => {
        return hasPermission(['1-24-29']);
      },
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
                createMessage.success(`已成功修改部门状态`);
              })
              .catch(() => {
                createMessage.error('修改部门状态失败');
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
export const refreshComp = ref(true);
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
      component: 'ApiTreeSelect',
      componentProps: {
        style: {
          width: '100%',
        },
        // xxxx props
        api: getDeptListAll,
        replaceFields: {
          label: 'deptName',
          value: 'id',
          children: 'deptVos',
        },
        params: {
          stat: 1,
        },
      },
      label: '部门',
      colProps: {
        span: 24,
      },
      ifShow: () => {
        return refreshComp.value;
      },
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
