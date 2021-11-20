<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="车辆管理" />
      <!-- 右侧搜索栏目   -->
      <NwowSearch
        add-text="新增车辆"
        :hasMoreSearch="false"
        hasSearch
        :hasAddBtn="true"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
      />
    </div>
    <BasicTable @register="registerTable">
      <template #path="{ record }">
        <TableImg v-if="record.path !== null ? record.path : ''" :imgList="[record.path]" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              //报废
              label: '',
              icon: 'eva:charging-outline',
              onClick: scrap.bind(null, record),
            },
            {
              //报废原因
              label: '',
              icon: 'maki:car-repair',
              onClick: scrapReason.bind(null, record),
            },
            {
              //删除
              label: '',
              icon: 'ic:outline-delete-outline',
              onClick: deleteFireEngine.bind(null, record),
            },
            {
              //修改
              label: '',
              icon: ':uil:edit',
              onClick: updateFireEngine.bind(null, record),
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
    <!-- 新增、修改 -->
    <FireEngineModal @register="fireEngineModal" @requestFinish="handleRefresh" />
    <!-- 报废原因 -->
    <ScrapReasonModal @register="scrapReasonModal" @requestFinish="handleRefresh" />
    <!-- 查看 -->
    <look-up-vehicle @register="lookUpModal" @requestFinish="handleRefresh" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableImg, TableAction } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getAdministrativeVehicleTable } from './modules/administrativeVehicle';
  import { carList, updateCar, deleteCar } from '/@/api/vehicle/vehicle';
  import FireEngineModal from './components/fireEngineModal.vue';
  import { useModal } from '/@/components/Modal';
  // import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import ScrapReasonModal from './components/scrapReasonModal.vue';
  import LookUpVehicle from './components/lookUpVehicle.vue';
  // const { hasPermission } = usePermission();
  const { createConfirm, createMessage } = useMessage();
  const [fireEngineModal, { openModal }] = useModal();
  const [scrapReasonModal, { openModal: scrapModal }] = useModal();
  const [lookUpModal, { openModal: lookModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    api: carList,
    showIndexColumn: false,
    columns: getAdministrativeVehicleTable(),
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    searchInfo: {
      type: 2,
    },
  });
  const handleSearch = (val) => {
    console.log('val==>', val);
    setProps({
      //按照车牌号查询
      searchInfo: {
        condition: val,
      },
    });
    reload();
  };
  const handleAddEvent = () => {
    const tempData = Object.assign({}, { id: null });
    openModal(true, tempData);
    console.log('新增车辆');
  };
  //报废
  const scrap = (record) => {
    createConfirm({
      iconType: 'error',
      title: '你确认报废此车吗？',
      content: '确认报废后不可进行恢复',
      onOk: async () => {
        await updateCar({
          id: record.id,
          isScrap: 1,
        });
        createMessage.success('车辆已报废');
        handleRefresh();
      },
    });
    console.log('报废');
  };
  //报废原因
  const scrapReason = (record) => {
    const tempData = Object.assign({}, record);
    scrapModal(true, tempData);
    console.log('报废原因');
  };
  //删除车辆
  const deleteFireEngine = (record) => {
    createConfirm({
      iconType: 'error',
      title: '你确认删除此车吗？',
      content: '删除后不可进行恢复',
      onOk: async () => {
        await deleteCar({
          carId: record.id,
        });
        createMessage.success('删除成功');
        handleRefresh();
      },
    });
    console.log('删除车辆');
  };
  //修改车辆信息
  const updateFireEngine = (record) => {
    const tempData = Object.assign({}, record);
    openModal(true, tempData);
    console.log('修改车辆');
  };
  //查看
  const lookUp = (record) => {
    console.log('查看车辆');
    const tempData = Object.assign({}, record);
    lookModal(true, tempData);
  };
  const handleRefresh = () => {
    reload();
  };
</script>
<style lang="less"></style>
