<template>
  <BasicModal
    v-bind="$attrs"
    title="修改密码"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
  >
    <BasicForm @register="registerForm" layout="vertical" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
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
      const getPasswordForm = () => {
        return [
          {
            field: 'deptName',
            component: 'Input',
            label: '请输入新密码',
            colProps: {
              span: 24,
            },
            rules: [{ required: true }],
          },
          {
            field: 'deptName',
            component: 'Input',
            label: '请再次输入新密码',
            colProps: {
              span: 24,
            },
            rules: [{ required: true }],
          },
        ];
      };
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getPasswordForm(),
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
