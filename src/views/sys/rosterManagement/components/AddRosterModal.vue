<template>
  <BasicModal
    v-bind="$attrs"
    title="新增人员"
    width="900px"
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
  import { getBaseAddForm } from '../modules/rosterManagement.tsx';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addRoster } from '/@/api/sys/roster';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { dateUtil } from '/@/utils/dateUtil';
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
          console.log('🚀 ~ file: AddRosterModal.vue ~ line 38 ~ handleSubmit ~ values', values);
          const transData = Object.assign({}, values);
          transData.stat = '1';
          transData.gender = transData.gender ?? '1';
          if (transData.birth) transData.birth = dateUtil(transData.birth).toDate().toString();
          if (transData.enlistmentTime)
            transData.enlistmentTime = dateUtil(transData.enlistmentTime).toDate().toString();
          if (transData.joinDate)
            transData.joinDate = dateUtil(transData.joinDate).toDate().toString();
          if (transData.registeredAddress) transData.reProvince = transData?.reDivision?.join(',');
          if (transData.nowAddress) transData.nowCity = transData?.nowDivision?.join(',');
          if (transData.signaturePath.length > 0) {
            transData.signaturePath = transData.signaturePath.toString();
          }
          if (transData.headPath.length > 0) {
            transData.headPath = transData.headPath.toString();
          }
          await addRoster(transData);
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
        console.log('🚀 ~ file: AddRosterModal.vue ~ line 67 ~ setup ~ data', data);
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
