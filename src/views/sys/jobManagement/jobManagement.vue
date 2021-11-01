<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="职务管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增职务"
        :hasAddBtn="true"
        :hasMoreSearch="false"
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
  import { getBaseTableColumns } from './modules/jobManagement';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getJobList, deleteJob } from '/@/api/sys/job';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/AddJobModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm, createMessage } = useMessage();
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
    createConfirm({
      iconType: 'error',
      title: '提示',
      content: '是否确认删除当前职务！',
      onOk: async () => {
        await deleteJob({
          postId: record.id,
        });
        createMessage.success('删除成功');
        handleRefresh();
      },
    });
  };
  const handleUpdata = (record) => {
    const tempData = Object.assign({}, record);
    openModal(true, tempData);
  };
  const handleAddEvent = () => {
    const tempData = Object.assign(
      {},
      {
        id: null,
      },
    );
    openModal(true, tempData);
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
