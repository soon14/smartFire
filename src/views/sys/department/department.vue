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
    <BasicTable @register="registerTable">
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
    </BasicTable>
    <Modal @register="registerModal" @requestFinish="handleRefresh" />
  </div>
</template>
<script setup>
  // import { Input, Space } from 'ant-design-vue';
  import { onMounted, ref, nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBaseTableColumns } from './modules/department.tsx';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { deptList, deleteDept } from '/@/api/sys/department';
  import { useModal } from '/@/components/Modal';
  import Modal from './departmentModel.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const { createConfirm, createMessage } = useMessage();
  const tableList = ref([]);
  let sourceList = null;
  const getTableList = async () => {
    const searchForm = {
      pageNum: 1,
      pageSize: 10,
    };
    const apiRes = await deptList(searchForm);
    sourceList = apiRes;
    tableList.value = apiRes;
  };
  onMounted(async () => {
    await getTableList();
  });
  const [registerTable, { expandAll, collapseAll }] = useTable({
    isTreeTable: true,
    columns: getBaseTableColumns(),
    dataSource: tableList,
    rowKey: 'id',
    childrenColumnName: 'deptVos',
    pagination: false,
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
    const tempData = cloneDeep(sourceList);
    const processData = matchTreeData(tempData, val);
    tableList.value = processData;
    nextTick(() => {
      expandAll();
    });
    // getTableList();
  };
  const matchTreeData = (arr, searchCon) => {
    let newArr = [];
    let searchNameList = ['deptName'];
    arr.forEach((item) => {
      for (let i = 0, len = searchNameList.length; i < len; i++) {
        let nameKey = searchNameList[i];
        if (item.hasOwnProperty(nameKey)) {
          if (item[nameKey] && item[nameKey].indexOf(searchCon) !== -1) {
            newArr.push(item);
            break;
          } else {
            if (item.deptVos && item.deptVos.length > 0) {
              let resultArr = matchTreeData(item.deptVos, searchCon);
              if (resultArr && resultArr.length > 0) {
                newArr.push({
                  ...item,
                  deptVos: resultArr,
                });
                break;
              }
            }
          }
        } else {
          continue;
        }
      }
    });
    return newArr;
  };
  const handleRefresh = () => {
    getTableList();
    collapseAll();
  };
  const [registerModal, { openModal }] = useModal();
</script>
<style lang="less"></style>
