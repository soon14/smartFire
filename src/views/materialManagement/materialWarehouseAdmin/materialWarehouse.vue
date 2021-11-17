<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="物资管理" />
      <!-- 右侧搜索栏目   -->
      <NwowSearch
        add-text="新增物资"
        :hasMoreSearch="true"
        hasSearch
        :hasAddBtn="true"
        :schemas="materialSchemas"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
        @handleMoreSearch="handleSuccess"
        :fieldMapToTime="fieldTimeMap"
      />
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <Material @register="materialModal" @requestFinish="handleRefresh" />
    <!-- 报废原因 -->
    <ScrapReasonModal @register="scrapReasonModal" @requestFinish="handleRefresh" />
    <!-- 查看 -->
    <LookMateria @register="lookUpModal" @requestFinish="handleRefresh" />
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { getmaterialWarehouseTable, materialSchemas } from './modules/materialWarehouse';
  import { carList } from '/@/api/vehicle/vehicle';
  import Material from './components/materialWarehouseFrom.vue';
  import { useModal } from '/@/components/Modal';
  // import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import ScrapReasonModal from './components/scrapReasonModal.vue';
  import LookMateria from './components/materialWarehouseLook.vue';
  // const { hasPermission } = usePermission();
  const fieldTimeMap = [
    ['time', ['timeBegin', 'timeEnd'], 'YYYY-MM-DD'],
    ['time1', ['timeBegina', 'timeEnda'], 'YYYY-MM-DD'],
  ];
  const { createConfirm, createMessage } = useMessage();
  const [materialModal, { openModal }] = useModal();
  // const [scrapReasonModal, { openModal: scrapModal }] = useModal();
  const [lookUpModal, { openModal: lookModal }] = useModal();
  const [registerTable, { reload, setProps }] = useTable({
    api: carList,
    showIndexColumn: false,
    columns: getmaterialWarehouseTable(),
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    searchInfo: {
      type: 1,
    },
  });
  const handleSearch = (val) => {
    console.log('val==>', val);
    setProps({
      //按照物资名称
      searchInfo: {
        condition: val,
      },
    });
    reload();
  };
  const handleAddEvent = () => {
    const tempData = Object.assign({}, { id: null });
    openModal(true, tempData);
    console.log('新增物资');
  };
  //删除物资
  const deleteFireEngine = (record) => {
    console.log(record);
    createConfirm({
      iconType: 'error',
      title: '是否确定删除该物资?',
      onOk: async () => {
        // await deleteCar({
        //   carId: record.id,
        // });
        createMessage.success('删除成功');
        handleRefresh();
      },
    });
    console.log('删除车辆');
  };
  //修改物资信息
  const updateFireEngine = (record) => {
    const tempData = Object.assign({}, record);
    openModal(true, tempData);
    console.log('新增物资');
  };
  //查看
  const lookUp = (record) => {
    console.log('查看车辆');
    const tempData = Object.assign({}, record);
    lookModal(true, tempData);
  };
  const handleSuccess = (val) => {
    console.log('val==>', val);
    setProps({
      searchInfo: val,
    });
    reload();
  };

  const handleRefresh = () => {
    reload();
  };
</script>
<style lang="less"></style>
