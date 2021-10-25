<template>
  <div class="p-4">
    <Table title="基础示例" :columns="columns" :dataSource="data" :bordered="true" size="small">
      <template #toolbar>
        <a-button type="primary"> 操作按钮 </a-button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts" setup>
  // import { defineComponent, ref } from 'vue';
  // import { BasicTable } from '/@/components/Table';
  import { Table } from '@surely-vue/table';
  import '@surely-vue/table/dist/index.css';
  import { getBasicColumns, getBasicData } from './tableData.tsx';
  const columns = getBasicColumns();
  const data = getBasicData();
</script>
