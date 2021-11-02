<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="部门管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增部门"
        :hasMoreSearch="false"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
        :hasAddBtn="hasPermission(['1-24-25'])"
      />
    </div>
    <BasicTable @register="registerTable" @expand="subsidiaryDataList">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
              ifShow: () => {
                return hasPermission(['1-24-27']);
              },
            },
            {
              label: '',
              icon: 'clarity:note-edit-line',
              onClick: handleUpdata.bind(null, record),
              ifShow: () => {
                return hasPermission(['1-24-26']);
              },
            },
          ]"
        />
      </template>
      <template #expandedRowRender>
        <!-- {{subsidiaryData}} -->
        <BasicTable @register="subsidiaryTable">
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
      </template>
    </BasicTable>
    <Modal @register="registerModal" @requestFinish="handleRefresh" />
  </div>
</template>
<script setup>
  // import { Input, Space } from 'ant-design-vue';
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBaseTableColumns } from './modules/department.js';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { deptList2, deleteDept, deptList3 } from '/@/api/sys/department';
  import { useModal } from '/@/components/Modal';
  import Modal from './departmentModel.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createConfirm, createMessage } = useMessage();
  const subsidiaryData = ref([]);
  //父级部门表格
  const [registerTable, { reload, setProps }] = useTable({
    api: deptList2,
    showIndexColumn: false,
    columns: getBaseTableColumns(),
    // isTreeTable: true,
    actionColumn: {
      width: 260,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  //子级部门表格
  const [subsidiaryTable] = useTable({
    dataSource: subsidiaryData,
    showIndexColumn: false,
    columns: getBaseTableColumns(),
    bordered: true,
    // isTreeTable: true,
    actionColumn: {
      width: 260,
      title: '操作',
      dataIndex: 'actions',
      slots: { customRender: 'actions' },
    },
  });
  const handleDelete = (record) => {
    createConfirm({
      iconType: 'error',
      title: '提示',
      content: '是否确认删除当前岗位！',
      onOk: async () => {
        await deleteDept({
          deptId: record.id,
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
  const subsidiaryDataList = async (expanded, record) => {
    console.log('id====>', expanded, record);
    subsidiaryData.value = await deptList3({ deptId: record.id });
  };
  const handleAddEvent = () => {
    // console.log('添加添加');
    openModal();
  };
  const handleSearch = (val) => {
    console.log('val====', val);
    setProps({
      searchInfo: {
        deptName: val,
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
