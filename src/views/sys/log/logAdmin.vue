<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="日志管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="清空日志"
        :hasAddBtn="hasPermission(['1-34-35'])"
        :hasMoreSearch="true"
        :schemas="logDataSchemas"
        :fieldMapToTime="fieldLogTimeMap"
        :onClick="clearLog"
        @OnSearch="handleSearch"
        @handleMoreSearch="logDataList"
      />
      <!-- <a-button type="primary" @click="clearLog" v-if="hasPermission(['1-34-35'])"
        >清空日志</a-button
      > -->
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
  import { logList, deleteLog } from '/@/api/sys/log';
  import { getBaseTableColumns, logDataSchemas } from './modules/logDate.js';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const fieldLogTimeMap = [['datetime1', ['createDateBegin', 'createDateEnd'], 'YYYY-MM-DD']];
  const [registerTable, { reload, setProps }] = useTable({
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
  // const handleAddEvent = async() => {
  //   console.log('添加添加');
  //    await deleteLog({});
  //     reload();
  // };
  const logDataList = (val) => {
    setProps({
      searchInfo: val,
    });
    reload();
  };
  const clearLog = async () => {
    await deleteLog({});
    reload();
  };
  const handleSearch = (val) => {
    console.log('val==>', val);
    setProps({
      searchInfo: {
        userName: val,
      },
    });
    reload();
  };
</script>
<style lang="less"></style>
