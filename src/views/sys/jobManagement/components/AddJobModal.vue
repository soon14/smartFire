<template>
  <BasicModal
    v-bind="$attrs"
    title="新增职务"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
  >
    <BasicForm @register="registerForm" layout="vertical" />
  </BasicModal>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getBaseAddForm } from '../modules/jobManagement.js';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addJob } from '/@/api/sys/job';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getBaseAddForm(),
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
          transData.stat = transData.stat ?? '1';
          await addJob(transData);
          success('创建成功');
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
        console.log('🚀 ~ file: AddJobModal.vue ~ line 56 ~ setup ~ data', data);
      });
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
      };
    },
  });
</script>
