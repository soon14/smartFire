<template>
  <BasicModal
    v-bind="$attrs"
    title="查看车辆"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <BasicForm @register="registerForm" layout="vertical" :model="model">
      <template #table>
        <BasicTable
          title="领取记录"
          :columns="columns"
          :dataSource="goodsData.goodsDetailData"
          :showIndexColumn="false"
        />
        <!-- <BasicTable @register="registerTable"></BasicTable> -->
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script>
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import {
    getMaterialWarehouseLookForm,
    MaterialWarehouseTable,
  } from '../modules/materialWarehouse';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { addDept, updateDept } from '/@/api/sys/department';
  // import { useMessage } from '/@/hooks/web/useMessage';
  // import { initString } from '/@/utils/initValue';
  // import { carDetails } from '/@/api/vehicle/vehicle';
  // import { dateUtil } from '/@/utils/dateUtil';
  import { BasicTable } from '/@/components/Table';
  const modelRef = ref({});
  let formId = null;
  import { goodsDetail } from '/@/api/materialManagement/materialManagement';

  export default defineComponent({
    components: { BasicModal, BasicForm, BasicTable },
    emits: ['requestFinish', 'register'],
    setup() {
      const goodsData = reactive({
        goodsDetailData: [],
      });
      const [registerForm, { resetFields, clearValidate }] = useForm({
        labelWidth: 120,
        schemas: getMaterialWarehouseLookForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const handleSubmit = async () => {
        resetFields();
        clearValidate();
        changeOkLoading(false);
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          resetFields();
          clearValidate();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { changeOkLoading, setModalProps }] = useModalInner(
        async (data) => {
          console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
          // initString(data, 'stat');
          // data.parentId = data.parentId || '';
          // initString(data, 'parentId');

          //物资详情信息
          // const carDataList = await carDetails({ carId: data.id });
          // carData.carDetailsData = carDataList.carRecordVoList;
          // console.log('数据==》', carData.carDetailsData);

          const goodsDetailList = await goodsDetail({ goodsId: data.id });
          goodsData.goodsDetailData;
          const goodsList = goodsDetailList.goodsApplyListVo;
          console.log(' goodsList=>', goodsList);
          goodsData.goodsDetailData.push(goodsList);
          console.log('goodsDetailData==>', goodsData.goodsDetailData);

          if (data.id) {
            formId = data.id;
            setModalProps({
              title: '查看车辆',
            });
          }
          console.log('formId==>', formId);
          modelRef.value = data;
        },
      );
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
        // registerTable,
        formId,
        columns: MaterialWarehouseTable(),
        // carDetailsDataList:carDetailsData
        goodsData,
      };
    },
  });
</script>
