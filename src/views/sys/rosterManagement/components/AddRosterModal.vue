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
  import { addRoster, updateRoster } from '/@/api/sys/roster';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { dateUtil } from '/@/utils/dateUtil';
  import { initImgPath, initString, initStringToArray } from '/@/utils/initValue';
  import { identity, pickBy } from 'lodash';
  import { buildUUID } from '/@/utils/uuid';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup(_, { emit }) {
      const [
        registerForm,
        { resetFields, clearValidate, validate, removeSchemaByFiled, appendSchemaByField },
      ] = useForm({
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
          transData.stat = '1';
          transData.gender = transData.gender ?? '1';
          if (transData.birth) transData.birth = dateUtil(transData.birth).toDate().toString();
          if (transData.enlistmentTime)
            transData.enlistmentTime = dateUtil(transData.enlistmentTime).toDate().toString();
          if (transData.joinDate)
            transData.joinDate = dateUtil(transData.joinDate).toDate().toString();
          if (transData.registeredAddress) transData.reProvince = transData?.reDivision?.join(',');
          if (transData.nowAddress) transData.nowCity = transData?.nowDivision?.join(',');
          if (transData.signaturePath?.length > 0) {
            transData.signaturePath = transData.signaturePath.toString();
          } else {
            transData.signaturePath = '';
          }
          if (transData.headPath?.length > 0) {
            transData.headPath = transData.headPath.toString();
          } else {
            transData.headPath = '';
          }
          console.log(
            '🚀 ~ file: AddRosterModal.vue ~ line 46 ~ handleSubmit ~ transData',
            transData,
          );

          if (formId) {
            transData.id = formId;
            await updateRoster(transData);
            success('修改成功');
          } else {
            await addRoster(transData, uuid);
            uuid = buildUUID();
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
      let formId = null;
      const modelRef = ref({});
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        (data) => {
          removeSchemaByFiled('password');
          const processData = pickBy(data, identity);
          if (data.id) {
            initString(processData, 'postId');
            initString(processData, 'eduBackground');
            initString(processData, 'major');
            initString(processData, 'roleId');
            initString(processData, 'gender');
            initStringToArray(processData, 'nowCity', 'nowDivision');
            initStringToArray(processData, 'reProvince', 'reDivision');
            initImgPath(processData, 'headPath');
            initImgPath(processData, 'signaturePath');
            formId = data.id;
            setModalProps({
              title: '修改人员',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增人员',
            });
            appendSchemaByField(
              {
                field: 'password',
                component: 'Input',
                label: '密码',
                colProps: {
                  span: 12,
                },
                rules: [{ required: true }],
              },
              'account',
            );
          }
          modelRef.value = processData;
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
