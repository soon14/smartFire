<template>
  <BasicModal
    v-bind="$attrs"
    title="查看会议"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <BasicForm @register="registerForm" layout="vertical" :model="model" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // import { carDetails } from '/@/api/vehicle/vehicle';
  import { getMeetingRecordForm } from '../modules/alarmReceivingRecordDate';
  const modelRef = ref({});
  let formId = null;

  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestFinish', 'register'],
    setup() {
      const [registerForm] = useForm({
        labelWidth: 120,
        schemas: getMeetingRecordForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const handleSubmit = async () => {
        closeModal();
        changeOkLoading(false);
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          closeModal();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading }] = useModalInner(async (data) => {
        console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
        formId = data.id;
        modelRef.value = data;
      });
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
