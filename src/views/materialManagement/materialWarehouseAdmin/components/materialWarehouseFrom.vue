<template>
  <BasicModal
    v-bind="$attrs"
    title="新增物资"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
  >
    <BasicForm @register="registerForm" layout="vertical" :model="model" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getMaterialWarehouseForm } from '../modules/materialWarehouse';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addGoods, updateGoods } from '/@/api/materialManagement/materialManagement';
  import { buildUUID } from '/@/utils/uuid';
  const modelRef = ref({});
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      let formId = null;
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getMaterialWarehouseForm(),
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
          const materialWareHouseData = values;
          if (formId) {
            console.log('2');
            materialWareHouseData.id = formId;
            await updateGoods(materialWareHouseData);
            success('修改成功');
          } else {
            await addGoods(materialWareHouseData, uuid);
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
        async (data) => {
          if (data.id) {
            formId = data.id;
            setModalProps({
              title: '修改物资',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增物资',
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
