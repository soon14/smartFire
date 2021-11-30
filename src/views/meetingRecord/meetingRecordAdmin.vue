<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="会议记录" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        :schemas="defaultSchemas"
        hasSearch
        :fieldMapToTime="fieldTimeMap"
        :hasAddBtn="false"
        @handleMoreSearch="handleSuccess"
        @OnSearch="handleSearch"
      />
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              //查看
              label: '',
              icon: 'akar-icons:eye',
              onClick: lookUp.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <MeetingRecordModal @register="MeetingModel" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { meetingRecordTable, defaultSchemas } from './modules/alarmReceivingRecordDate';
  // import { callPoliceRecordList } from '/@/api/alarmReceivingRecord/alarmReceivingRecord';
  import MeetingRecordModal from './components/meetingRecordModal.vue';
  import { useModal } from '/@/components/Modal';
  import { mettingList } from '/@/api/meetingRecord/meetingRecord';
  const fieldTimeMap = [['time', ['mettingDateBegin', 'mettingDateEnd'], 'YYYY-MM-DD']];
  const [MeetingModel, { openModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    api: mettingList,
    showIndexColumn: false,
    columns: meetingRecordTable(),
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const handleSearch = (val) => {
    console.log('val', val);
    setProps({
      searchInfo: {
        mettingTheme: val,
      },
    });
    reload();
  };
  const handleSuccess = (val) => {
    setProps({
      searchInfo: val,
    });
    reload();
  };
  const lookUp = (record) => {
    openModal(true, record);
  };
</script>
<style lang="less"></style>
