<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
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
  // import { useModal } from '/@/components/Modal';
  // import { useMessage } from '/@/hooks/web/useMessage';
  const fieldTimeMap = [
    ['time', ['timeBegin', 'timeEnd'], 'YYYY-MM-DD'],
    ['time1', ['timeBegina', 'timeEnda'], 'YYYY-MM-DD'],
  ];
  // const { createConfirm, createMessage } = useMessage();
  // const [materialModal, { openModal }] = useModal();
  // const [scrapReasonModal, { openModal: scrapModal }] = useModal();
  // const [lookUpModal, { openModal: lookModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    // api: carList,
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
        condition: val,
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

  // const handleRefresh = () => {
  //   reload();
  // };
</script>
<style lang="less"></style>
