<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="日志管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增日志"
        :hasAddBtn="false"
        :hasMoreSearch="false"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
        style="padding-left: 1300px"
      />
      <a-button type="primary">清空日志</a-button>
    </div>
    <BasicTable @register="registerTable">
      <!-- <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
            },
            {
              label: '',
              icon: 'clarity:note-edit-line',
              onClick: handleUpdata.bind(null, record),
            },
          ]"
        />
      </template> -->
    </BasicTable>
  </div>
</template>
<script setup>
  // import { Input, Space } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { logList } from '/@/api/sys/log';
  import { getBaseTableColumns } from './modules/logDate.js';

  const [registerTable] = useTable({
    api: logList,
    showIndexColumn: false,
    columns: getBaseTableColumns(),
    // actionColumn: {
    //   width: 160,
    //   title: '操作',
    //   dataIndex: 'action',
    //   slots: { customRender: 'action' },
    // },
  });
  const handleAddEvent = () => {
    console.log('添加添加');
    // openModal();
  };
  const handleSearch = (val) => {
    setProps({
      searchInfo: {
        condition: val,
      },
    });
  };
</script>
<style lang="less"></style>
