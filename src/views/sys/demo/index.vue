<template>
  <BasicTable @register="registerTable">
    <template #action="{ record }">
      <TableAction
        v-if="isShowById === record.createId"
        :Actions="[
          {
            label: '修改',
            icon: 'carbon:edit',
          },
          {
            label: '删除',
            icon: 'carbon:delete',
          },
          {
            label: '撤回',
            icon: 'ic:outline-delete-outline',
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getBasicData, getBusinessData } from './modules/tableData';
  const [registerTable] = useTable({
    dataSource: getBasicData(),
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getBusinessData(),
    bordered: false,
    actionColumn: {
      width: 250,
      bordered: false,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
</script>
<style lang=""></style>
