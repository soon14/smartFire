<template>
  <BasicModal
    v-bind="$attrs"
    title="用车详情"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <!-- 列表详情数据 -->
    <a-descriptions
      title="公安消防部队派车单"
      bordered
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
      style="text-align: center"
      :v-model="flowValueList ? flowValueList : null"
    >
      <template v-for="(date, index) in model" :key="index">
        <a-descriptions-item :label="date.label" style="background-color: #111a69" :span="2">
          <span v-if="date.tag === 'fc-org-select'">{{
            flowValueList[`${date.vModel}OrName`]
          }}</span>
          <span v-if="date.tag === 'fc-car-book' && date.type === 'single'">{{
            flowValueList[`${date.vModel}CarName`]
          }}</span>
          <span v-else-if="date.tag === 'fc-car-book' && date.type === 'more'">{{
            flowValueList[`${date.vModel}MoreCarMumber`]
          }}</span>
          <span v-else-if="date.tag === 'fc-address-book' && date.type === 'single'">{{
            flowValueList[`${date.vModel}PersonName`]
          }}</span>
          <span v-else-if="date.tag === 'fc-address-book' && date.type === 'more'">{{
            flowValueList[`${date.vModel}MoreNumber`]
          }}</span>
          <span>{{ flowValueList[date.vModel] }}</span>
          <span v-if="date.tag === 'fc-time-duration' && !date.showIndexColumn"
            >{{ flowValueList[`${date.vModel}duration`] }}
          </span>
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <!-- 按钮 -->
    <template #footer>
      <span>
        <a-button @click="printBill" :loading="draftLoading" type="primary">打印此单据</a-button>
      </span>
    </template>
  </BasicModal>
  <PrintModal @register="registrModel_print" />
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Descriptions } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import PrintModal from './PrintModal.vue';
  import { useModal } from '/@/components/Modal';
  import { flowDetail } from '/@/api/flow/workFlow';
  const modelRef = ref({});
  let formId = null;
  export default defineComponent({
    components: {
      BasicModal,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      PrintModal,
    },
    emits: ['requestFinish', 'register'],
    setup() {
      // const flowValueData = reactive({});
      const flowValueList = ref({});
      const flowList = ref({});
      const { createConfirm } = useMessage();
      const [registrModel_print, { openModal: openModal_print }] = useModal();
      const handleSubmit = async () => {
        closeModal();
        changeOkLoading();
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          closeModal();
          changeOkLoading();
        }
      };
      const [registerModalInner, { changeOkLoading, closeModal }] = useModalInner(async (data) => {
        const flowData = await flowDetail({ flowInfoId: data.id });
        flowList.value = flowData;
        console.log('数据==>', flowData);
        if (flowData[0].formData) {
          //表单json 数据
          const flowJson = JSON.parse(flowData[0].formData);
          // console.log('flowJson==>', flowJson.fields);
          //表单value 数据
          flowValueList.value = JSON.parse(flowData[0].formModel);
          // console.log('flowValueList==>', flowValueList.value);
          modelRef.value = flowJson.fields;
        }
      });

      //打印数据
      const printBill = () => {
        const pringtDate = flowList.value;
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确认打印？',
          onOk: async () => {
            openModal_print(true, pringtDate);
          },
        });
        closeModal();
      };
      return {
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
        formId,
        printBill,
        registrModel_print,
        // flowValueData,
        flowValueList,
        flowList,
      };
    },
  });
</script>
