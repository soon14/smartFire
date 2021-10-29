<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="职务管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增职务"
        :hasAddBtn="true"
        :hasMoreSearch="true"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
      />
    </div>

    <BasicTable @register="registerTable">
      <template #action="{ record }">
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
      </template>
    </BasicTable>
    <Modal @register="registerModal" @requestFinish="handleRefresh" />
  </div>
</template>
<script setup>
  // import { Input, Space } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBaseTableColumns } from './modules/jobManagement.js';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getJobList } from '/@/api/sys/job';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/AddJobModal.vue';
  const [registerTable, { reload }] = useTable({
    api: getJobList,
    showIndexColumn: false,
    columns: getBaseTableColumns(),
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const handleDelete = (record) => {
    console.log('🚀 ~ file: jobManagement.vue ~ line 43 ~ handleDelete ~ record', record);
  };
  const handleUpdata = (record) => {
    console.log('🚀 ~ file: jobManagement.vue ~ line 46 ~ handleUpdata ~ record', record);
  };
  const handleAddEvent = () => {
    console.log('添加添加');
    openModal();
  };
  const handleSearch = (val) => {
    console.log('val====', val);
  };
  const handleRefresh = () => {
    reload();
  };
  const [registerModal, { openModal }] = useModal();
</script>
<style lang="less"></style>
