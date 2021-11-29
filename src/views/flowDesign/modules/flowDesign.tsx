import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { updateTemplate } from '/@/api/flow/workFlow';
const flowGroupMap = {
  1: '用车申请单',
  2: '接处警登记',
  3: '物资申领',
};
export function flowTable(): BasicColumn[] {
  return [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'flowName',
    },
    {
      title: '类型',
      dataIndex: 'flowGroup',
      customRender: ({ record }) => {
        return flowGroupMap[record.flowGroup];
      },
    },
    // {
    //   title: '业务单据',
    //   dataIndex: 'nowAction',
    // },
    {
      title: '状态',
      dataIndex: 'stat',
      ifShow: () => {
        // return hasPermission(['1-17-22']);
        return true;
      },
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.isEffective === 1,
          checkedChildren: '已启用',
          unCheckedChildren: '已禁用',
          loading: record.pendingStatus,
          onChange(checked) {
            record.pendingStatus = true;
            const newStatus = checked ? 1 : 0;
            const { createMessage } = useMessage();
            const transData = {
              id: record.id,
              isEffective: newStatus,
            };
            updateTemplate(transData)
              .then(() => {
                record.isEffective = newStatus;
                createMessage.success(`已成功修改模板状态`);
              })
              .catch(() => {
                createMessage.error('修改模板状态失败');
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
