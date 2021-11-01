<template>
  <BasicModal
    v-bind="$attrs"
    title="新增部门"
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
  import { getDepartmentForm } from './modules/department.js';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addDept, updateDept } from '/@/api/sys/department';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { initString } from '/@/utils/initValue';
  const modelRef = ref({});
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      let formId = null;
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getDepartmentForm(),
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
          console.log('transData==>', transData);
          transData.stat = transData.stat ?? '1';
          if (formId) {
            transData.id = formId;
            await updateDept(transData);
            success('修改成功');
          } else {
            await addDept(transData);
            success('创建成功');
          }
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
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          console.log('🚀 ~ file: AddJobModal.vue ~ line 56 ~ setup ~ data', data);
          initString(data, 'stat');
          if (data.id) {
            formId = data.id;
            setModalProps({
              title: '修改部门',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增部门',
            });
          }
          data.parentId = String(data.parentId);
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
