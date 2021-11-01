<template>
  <BasicModal
    v-bind="$attrs"
    title="新增人员"
    width="900px"
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
  import { getBaseAddForm } from '../modules/rosterManagement.tsx';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addRoster } from '/@/api/sys/roster';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { dateUtil } from '/@/utils/dateUtil';
  import { initString, initStringToArray } from '/@/utils/initValue';
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
      // let formId = null;
      const modelRef = ref({});
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          console.log('🚀 ~ file: AddRosterModal.vue ~ line 75 ~ setup ~ data', data);
          if (data.id) {
            initString(data, 'postId');
            initString(data, 'eduBackground');
            initString(data, 'major');
            initString(data, 'roleId');
            initString(data, 'gender');
            initStringToArray(data, 'nowCity', 'nowDivision');
            initStringToArray(data, 'reProvince', 'reDivision');
            console.log('data===', data);
            // formId = data.id;
            setModalProps({
              title: '修改人员',
            });
          } else {
            // formId = null;
            setModalProps({
              title: '新增人员',
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
