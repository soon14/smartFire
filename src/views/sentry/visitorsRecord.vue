<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="岗哨管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        :schemas="defaultSchemas"
        :fieldMapToTime="fieldTimeMap"
        @OnSearch="handleSearch"
        @handleMoreSearch="handleSuccess"
      />
    </div>
    <BasicTable @register="registerTable">
      <template #path="{ record }">
        <TableImg v-if="record.path !== null ? record.path : ''" :imgList="[record.path]" />
      </template>
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableImg } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getVisitorsTableColumns, defaultSchemas } from './modules/Visitors';
  import { visitorRecordList } from '/@/api/visitors/visitors';
  const fieldTimeMap = [
    ['datetime', ['inTimeBegin', 'inTimeEnd'], 'YYYY-MM-DD'],
    // 支持多个字段
    ['datetime1', ['outTimeBegin', 'outTimeEnd'], 'YYYY-MM-DD'],
  ];
  const [registerTable, { reload, setProps }] = useTable({
    api: visitorRecordList,
    showIndexColumn: false,
    columns: getVisitorsTableColumns(),
  });
  const handleSearch = (val) => {
    setProps({
      searchInfo: {
        visitorName: val,
      },
    });
    reload();
  };
  const handleSuccess = (val) => {
    console.log('val==>', val);
    setProps({
      searchInfo: val,
    });
    reload();
  };
</script>
<style lang="less"></style>
