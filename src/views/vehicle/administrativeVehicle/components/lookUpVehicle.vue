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
          title="使用记录"
          :columns="columns"
          :dataSource="carData.carDetailsData"
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
  import { getLookUpVehicleForm, carDetailsTable } from '../modules/administrativeVehicle';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { addDept, updateDept } from '/@/api/sys/department';
  // import { useMessage } from '/@/hooks/web/useMessage';
  // // import { initString } from '/@/utils/initValue';
  import { carDetails } from '/@/api/vehicle/vehicle';
  // import { dateUtil } from '/@/utils/dateUtil';
  import { BasicTable } from '/@/components/Table';
  const modelRef = ref({});
  let formId = null;

  export default defineComponent({
    components: { BasicModal, BasicForm, BasicTable },
    emits: ['requestFinish', 'register'],
    setup() {
      const carData = reactive({
        carDetailsData: [],
      });
      const [registerForm, { resetFields, clearValidate }] = useForm({
        labelWidth: 120,
        schemas: getLookUpVehicleForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      // const [registerTable] = useTable({
      //   title: '使用记录',
      //   api: carDetails,
      //   columns: carDetailsTable(),
      //   searchInfo: {
      //     carId: 1,
      //   },
      //   // useSearchForm: true,
      // });
      // const { createMessage } = useMessage();
      // const { success } = createMessage;

      const handleSubmit = async () => {
        // try {
        //   changeOkLoading(true);
        //   const [values] = await Promise.all([validate()]);
        //   const fireEngineData = Object.assign({}, values);
        //   fireEngineData.buyDate = dateUtil(fireEngineData.buyDate).toDate().toString();
        //    console.log('fireEngineData=>>111',fireEngineData)
        //   fireEngineData.path = fireEngineData.path[0]
        //    console.log('fireEngineData=>>asas',fireEngineData)
        //    console.log("1")
        //   if (formId) {
        //    console.log("2")
        //     fireEngineData.id = formId;
        //     await updateCar(fireEngineData);
        //     success('修改成功');
        //   } else {
        //     console.log("3")
        //     await addCar(fireEngineData);
        //     success('创建成功');
        //   }
        //   closeModal();
        //   emit('requestFinish');
        //   resetFields();
        //   clearValidate();
        //   changeOkLoading(false);
        // } catch (error) {
        //   changeOkLoading(false);
        // }
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
          const carDataList = await carDetails({ carId: data.id });
          carData.carDetailsData = carDataList.carRecordVoList;
          console.log('数据==》', carData.carDetailsData);
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
        columns: carDetailsTable(),
        // carDetailsDataList:carDetailsData
        carData,
      };
    },
  });
</script>
