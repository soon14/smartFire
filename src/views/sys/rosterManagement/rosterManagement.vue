<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="人员花名册" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增人员"
        :hasAddBtn="hasPermission(['1-17-18'])"
        :hasMoreSearch="true"
        :schemas="rosterSearchSchemas"
        :fieldMapToTime="fieldTimeMap"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
        @handleMoreSearch="handleMoreSearch"
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
              ifShow: () => {
                return hasPermission(['1-17-20']);
              },
            },
            {
              label: '',
              icon: 'clarity:note-edit-line',
              onClick: handleUpdata.bind(null, record),
              ifShow: () => {
                return hasPermission(['1-17-19']);
              },
            },
            {
              label: '',
              icon: 'icon-park-outline:eyes',
              onClick: handleView.bind(null, record),
            },
            {
              label: '',
              icon: 'icon-park-outline:key',
              onClick: handleResetPassword.bind(null, record),
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
  import { getBaseTableColumns, rosterSearchSchemas } from './modules/rosterManagement.tsx';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getRosterList, deleteRoster, updateRosterPassword } from '/@/api/sys/roster';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/AddRosterModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const fieldTimeMap = [
    // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间于结束时间
    // 'YYYY-MM-DD'为时间格式，参考moment
    ['datetime', ['enlistmentTimeBegin', 'enlistmentTimeEnd'], 'YYYY-MM-DD'],
    // 支持多个字段
    ['datetime1', ['joinDateBegin', 'joinDateEnd'], 'YYYY-MM-DD'],
  ];
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
  const { createConfirm, createMessage } = useMessage();
  const handleDelete = (record) => {
    createConfirm({
      iconType: 'error',
      title: '提示',
      content: '是否确认删除当前人员！',
      onOk: async () => {
        await deleteRoster({
          userId: record.id,
        });
        createMessage.success('删除成功');
        handleRefresh();
      },
    });
  };
  const handleView = () => {
    createMessage.warning('功能正在施工，waiting！');
  };
  const handleResetPassword = (record) => {
    createConfirm({
      iconType: 'warning',
      title: '你确定要回复此人密码吗？',
      content: '密码将重置为 123456 ！',
      onOk: async () => {
        await updateRosterPassword({
          userId: record.id,
        });
        createMessage.success('重置成功');
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
  const handleMoreSearch = (val) => {
    setProps({
      searchInfo: val,
    });
    handleRefresh();
  };
</script>
<style lang="less"></style>
