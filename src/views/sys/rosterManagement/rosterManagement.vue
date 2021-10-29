<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="人员花名册" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增人员"
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
              onClick: handleView.bind(null, record),
            },
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
  import { getBaseTableColumns } from './modules/rosterManagement.tsx';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getRosterList } from '/@/api/sys/roster';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/AddRosterModal.vue';
  const [registerTable, { reload, setProps }] = useTable({
    api: getRosterList,
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
  const handleView = (record) => {
    console.log('🚀 ~ file: rosterManagement.vue ~ line 66 ~ handleView ~ record', record);
  };
  const handleUpdata = (record) => {
    console.log('🚀 ~ file: jobManagement.vue ~ line 46 ~ handleUpdata ~ record', record);
  };
  const handleAddEvent = () => {
    openModal();
  };
  const handleSearch = (val) => {
    setProps({
      searchInfo: {
        condition: val,
      },
    });
    reload();
  };
  const handleRefresh = () => {
    reload();
  };
  const [registerModal, { openModal }] = useModal();
</script>
<style lang="less"></style>
