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
  import { getDepartmentForm, refreshComp } from './modules/department.tsx';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addDept, updateDept } from '/@/api/sys/department';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { initString } from '/@/utils/initValue';
  import { buildUUID } from '/@/utils/uuid';
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
      let uuid = buildUUID();
      //   const init = () => {
      //      uuid = buildUUID();
      //  };
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const [values] = await Promise.all([validate()]);
          const transData = Object.assign({}, values);
          transData.parentId = transData.parentId || 0;
          transData.stat = transData.stat ?? '1';
          if (formId) {
            transData.id = formId;
            await updateDept(transData);
            // console.log('result==>', result);
            closeModal();
            success('修改成功');
          } else {
            await addDept(transData, uuid);
            success('创建成功');
            closeModal();
            uuid = buildUUID();
          }
          emit('requestFinish');
        } catch (error) {
          console.log('error==>', error);
          changeOkLoading(false);
        }
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          resetFields();
          clearValidate();
          changeOkLoading(false);
          refreshComp.value = false;
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          refreshComp.value = true;
          console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
          initString(data, 'stat');
          data.parentId = data.parentId || '';
          initString(data, 'parentId');
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
