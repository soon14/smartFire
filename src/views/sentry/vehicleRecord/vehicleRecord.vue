<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <!-- 车辆记录 -->
      <NwowHeader title="岗哨管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        :schemas="vehicleRecordFrom"
        :fieldMapToTime="fieldTimeMap"
        hasSearch
        @OnSearch="handleSearch"
        @handleMoreSearch="handleSuccess"
      />
    </div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getVehicleRecordColumns, vehicleRecordFrom } from './modules/vehicleRecord';
  import { carRecordList } from '/@/api/visitors/visitors';
  const fieldTimeMap = [
    ['datetime', ['outTimeBegin', 'outTimeEnd'], 'YYYY-MM-DD'],
    // 支持多个字段
    ['datetime1', ['inTimeBegin', 'inTimeEnd'], 'YYYY-MM-DD'],
  ];
  const [registerTable, { reload, setProps }] = useTable({
    api: carRecordList,
    showIndexColumn: false,
    columns: getVehicleRecordColumns(),
  });
  const handleSearch = (val) => {
    //按照牌号搜索
    setProps({
      searchInfo: {
        registrationNumber: val,
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
