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
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getUpdatePasswordForm } from '../modules/updatePassword';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { updatePersonPassword } from '/@/api/sys/user';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, clearValidate, validate }] = useForm({
        labelWidth: 120,
        schemas: getUpdatePasswordForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const { createMessage } = useMessage();
      const { success, error } = createMessage;
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const values = await validate();
          console.log('values=>>111', values);
          if (values.password == values.newPassword) {
            await updatePersonPassword(values);
            success('修改密码成功');
          } else {
            error('请保持输入的密码一致');
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
          setModalProps({
            title: '修改密码',
          });
        },
      );
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
      };
    },
  });
</script>
