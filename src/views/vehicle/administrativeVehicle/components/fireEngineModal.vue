<template>
  <BasicModal
    v-bind="$attrs"
    title="新增车辆"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <BasicForm @register="registerForm" layout="vertical" :model="model" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getAdministrativeVehicleForm } from '../modules/administrativeVehicle';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { addDept, updateDept } from '/@/api/sys/department';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addCar, updateCar } from '/@/api/vehicle/vehicle';
  import { dateUtil } from '/@/utils/dateUtil';
  import { buildUUID } from '/@/utils/uuid';
  const modelRef = ref({});
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      let formId = null;
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getAdministrativeVehicleForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const { createMessage } = useMessage();
      const { success } = createMessage;
      let uuid = buildUUID();
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const values = await validate();
          console.log('values=>>111', values.path);
          const fireEngineData = values;
          console.log('fireEngineData=>>111', fireEngineData.path);
          fireEngineData.buyDate = dateUtil(fireEngineData.buyDate).toDate().toString();
          console.log('fireEngineData=>>asas', fireEngineData);

          if (formId) {
            console.log('2');
            fireEngineData.id = formId;
            await updateCar(fireEngineData);
            success('修改成功');
          } else {
            if (fireEngineData?.path && fireEngineData.path.length > 0) {
              fireEngineData.path = fireEngineData.path[0];
            }
            await addCar(fireEngineData, uuid);
            uuid = buildUUID();
            success('创建成功');
          }
          closeModal();
          emit('requestFinish');
          resetFields();
          clearValidate();
          changeOkLoading(false);
        } catch (error) {
          changeOkLoading(false);
        }
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          resetFields();
          clearValidate();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
          // initString(data, 'stat');
          // data.parentId = data.parentId || '';
          // initString(data, 'parentId');
          if (data.id) {
            formId = data.id;
            setModalProps({
              title: '修改车辆',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增车辆',
            });
          }
          modelRef.value = data;
        },
      );
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
      };
    },
  });
</script>
