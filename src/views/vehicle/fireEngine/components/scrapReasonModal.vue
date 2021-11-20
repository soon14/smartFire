<template>
  <BasicModal
    v-bind="$attrs"
    title="报废"
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
  import { getScrapReasonForm } from '../modules/fireEngine';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { addDept, updateDept } from '/@/api/sys/department';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import { initString } from '/@/utils/initValue';
  import { updateCar } from '/@/api/vehicle/vehicle';
  const modelRef = ref({});
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      let formId = null;
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getScrapReasonForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const [values] = await Promise.all([validate()]);
          const transData = Object.assign({}, values);
          transData.id = formId;
          await updateCar(transData);
          success('成功');
          closeModal();
          emit('requestFinish');
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
      const [registerModalInner, { closeModal, changeOkLoading }] = useModalInner((data) => {
        console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
        formId = data.id;
        // initString(data, 'stat');
        // data.parentId = data.parentId || '';
        // initString(data, 'parentId');
        // if (data.id) {
        //   formId = data.id;
        //   setModalProps({
        //     title: '修改部门',
        //   });
        // } else {
        //   formId = null;
        //   setModalProps({
        //     title: '新增部门',
        //   });
        // }
        // modelRef.value = data;
      });
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
