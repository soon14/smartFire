<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="岗哨管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        :schemas="defaultSchemas"
        @OnSearch="handleSearch"
        @success="handleSuccess"
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
  const [registerTable, { reload, setProps }] = useTable({
    api: visitorRecordList,
    showIndexColumn: false,
    columns: getVisitorsTableColumns(),
    pagination: true,
  });

  const handleSearch = (val) => {
    // console.log('val====', val);
    setProps({
      searchInfo: {
        visitorName: val,
      },
    });
    reload();
  };
  const handleSuccess = (val) => {
    setProps({
      searchInfo: {
        intervieweeName: val.intervieweeName,
        visitorName: val.visitorName,
      },
    });
    reload();
  };
</script>
<style lang="less"></style>
