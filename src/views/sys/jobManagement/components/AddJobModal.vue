<template>
  <BasicModal
    v-bind="$attrs"
    title="新增职务"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
  >
    <BasicForm @register="registerForm" :model="model" layout="vertical" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getBaseAddForm } from '../modules/jobManagement';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addJob, updateJob } from '/@/api/sys/job';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { initString } from '/@/utils/initValue';
  import { buildUUID } from '/@/utils/uuid';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      let formId = null;
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
      let uuid = buildUUID();
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const [values] = await Promise.all([validate()]);
          const transData = Object.assign({}, values);
          transData.stat = transData.stat ?? '1';
          if (formId) {
            transData.id = formId;
            await updateJob(transData);
            closeModal();
            success('修改成功');
          } else {
            await addJob(transData, uuid);
            closeModal();
            uuid = buildUUID();
            success('创建成功');
          }
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
      const modelRef = ref({});
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          initString(data, 'stat');
          if (data.id) {
            formId = data.id;
            setModalProps({
              title: '修改职务',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增职务',
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
