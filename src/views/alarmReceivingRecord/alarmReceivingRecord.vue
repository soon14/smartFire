<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="接处警登记" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        :schemas="defaultSchemas"
        :fieldMapToTime="fieldTimeMap"
        :hasAddBtn="false"
        @handleMoreSearch="handleSuccess"
        style="padding-right: 300px"
      />
    </div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getVisitorsTableColumns, defaultSchemas } from './modules/alarmReceivingRecordDate';
  import { callPoliceRecordList } from '/@/api/alarmReceivingRecord/alarmReceivingRecord';
  const fieldTimeMap = [['time', ['timeBegin', 'timeEnd'], 'YYYY-MM-DD']];
  const [registerTable, { reload, setProps }] = useTable({
    api: callPoliceRecordList,
    showIndexColumn: false,
    columns: getVisitorsTableColumns(),
  });
  // const handleSearch = (val) => {
  //   setProps({
  //     searchInfo: {
  //       visitorName: val,
  //     },
  //   });
  //   reload();
  // };
  const handleSuccess = (val) => {
    console.log('val==>', val);
    setProps({
      searchInfo: val,
    });
    reload();
  };
</script>
<style lang="less"></style>
