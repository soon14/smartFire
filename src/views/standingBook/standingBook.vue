<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <!-- 台账 -->
      <NwowHeader title="流程中心" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="true"
        hasSearch
        :schemas="standingBookSchemas"
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
              //打印
              label: '',
              icon: 'bytesize:print',
              onClick: print.bind(null, record),
            },
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
    <StandingBookModal @register="standingBookModel" />
    <PrintModal @register="registrModel_print" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { standingBookTable, standingBookSchemas } from './modules/standingBookDate';
  // import { callPoliceRecordList } from '/@/api/alarmReceivingRecord/alarmReceivingRecord';
  import StandingBookModal from './components/standingBookModal.vue';
  import PrintModal from './components/PrintModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { flowList } from '/@/api/flow/workFlow';
  import { flowDetail } from '/@/api/flow/workFlow';
  const { createConfirm } = useMessage();
  //from弹框
  const [standingBookModel, { openModal }] = useModal();
  //打印
  const [registrModel_print, { openModal: openModal_print }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    api: flowList,
    showIndexColumn: false,
    columns: standingBookTable(),
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const handleSearch = (val) => {
    //查询条件
    setProps({
      searchInfo: {
        flowNumber: val,
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
  const print = async (data) => {
    // console.log('adta', data);
    const flowData = await flowDetail({ flowInfoId: data.id });
    console.log('flowData==>', flowData);
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确认打印？',
      onOk: async () => {
        openModal_print(true, flowData);
      },
    });
  };
  const lookUp = (data) => {
    const tempData = Object.assign({}, data);
    openModal(true, tempData);
  };
</script>
<style lang="less"></style>
