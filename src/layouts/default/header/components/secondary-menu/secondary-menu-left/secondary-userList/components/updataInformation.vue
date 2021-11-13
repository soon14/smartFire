<template>
  <BasicModal
    v-bind="$attrs"
    title="修改资料"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    {{ formId }}
    <BasicForm @register="registerForm" layout="vertical" :model="model" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getUpdataInformationForm } from '../modules/updataInformation';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { updateUser } from '/@/api/sys/user';
  import { dateUtil } from '/@/utils/dateUtil';
  import { initImgPath, initString, initStringToArray } from '/@/utils/initValue';
  const modelRef = ref({});
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup() {
      let formId = null;
      const [registerForm, { validate, removeSchemaByFiled }] = useForm({
        labelWidth: 120,
        schemas: getUpdataInformationForm(),
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
          if (transData.birth && transData.birth !== null) {
            transData.birth = dateUtil(transData.birth).toDate().toString();
          } else {
            delete transData.birth;
          }
          if (transData.enlistmentTime && transData.enlistmentTime !== null) {
            transData.enlistmentTime = dateUtil(transData.enlistmentTime).toDate().toString();
          } else {
            delete transData.enlistmentTime;
          }
          if (transData.joinDate && transData.joinDate !== null) {
            transData.joinDate = dateUtil(transData.joinDate).toDate().toString();
          } else {
            delete transData.joinDate;
          }
          if (transData.registeredAddress) {
            transData.reProvince = transData?.reDivision?.join(',');
          }
          if (transData.nowAddress) {
            transData.nowCity = transData?.nowDivision?.join(',');
          }
          if (transData.signaturePath.length > 0) {
            transData.signaturePath = transData.signaturePath.toString();
          } else {
            transData.signaturePath = '';
          }
          if (transData.headPath.length > 0) {
            transData.headPath = transData.headPath.toString();
          } else {
            transData.headPath = '';
          }
          transData.id = formId;
          console.log('transData==>', transData);
          await updateUser(transData);
          success('修改成功');
          closeModal();
          // resetFields();
          // clearValidate();
          changeOkLoading(false);
        } catch (error) {
          console.log('error==>', error);
          changeOkLoading(false);
        }
      };

      const handleResetForm = (visible) => {
        if (!visible) {
          // resetFields();
          // clearValidate();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          console.log('🚀', data);
          setModalProps({
            title: '修改资料',
          });
          const dataList = data.userdata;

          removeSchemaByFiled('password');
          initString(dataList, 'postId');
          initString(dataList, 'eduBackground');
          initString(dataList, 'major');
          initString(dataList, 'roleId');
          initString(dataList, 'gender');
          initStringToArray(dataList, 'nowCity', 'nowDivision');
          initStringToArray(dataList, 'reProvince', 'reDivision');
          initImgPath(dataList, 'headPath');
          initImgPath(dataList, 'signaturePath');
          formId = dataList.id;
          modelRef.value = dataList;
        },
      );
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
        formId,
      };
    },
  });
</script>
