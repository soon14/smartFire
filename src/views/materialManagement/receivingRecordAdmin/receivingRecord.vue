<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 领取记录 -->
      <!-- 头部标题 -->
      <NwowHeader title="物资管理" />
      <!-- 右侧搜索栏目   -->
      <NwowSearch
        :hasMoreSearch="true"
        hasSearch
        :hasAddBtn="false"
        :schemas="receivingSchemas"
        @OnSearch="handleSearch"
        @handleMoreSearch="handleSuccess"
        :fieldMapToTime="fieldTimeMap"
      />
    </div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getreceivingRecordTable, receivingSchemas } from './modules/receivingRecord';
  // import { carList } from '/@/api/vehicle/vehicle';
  const fieldTimeMap = [
    ['time', ['applyDateBegin', 'applyDateEnd'], 'YYYY-MM-DD'],
    ['time1', ['confirmDateBegin', 'confirmDateEnd'], 'YYYY-MM-DD'],
  ];
  import { goodsApplyList2 } from '/@/api/materialManagement/materialManagement';
  const [registerTable, { reload, setProps }] = useTable({
    api: goodsApplyList2,
    showIndexColumn: false,
    columns: getreceivingRecordTable(),
    searchInfo: {
      type: 1,
    },
  });
  const handleSearch = (val) => {
    console.log('val==>', val);
    setProps({
      //按申领人
      searchInfo: {
        applyPersonName: val,
      },
    });
    reload();
  };
  const handleSuccess = (val) => {
    // console.log('val==>', typeof(val.applyDateBegin));
    setProps({
      searchInfo: val,
    });
    reload();
  };
</script>
<style lang="less"></style>
