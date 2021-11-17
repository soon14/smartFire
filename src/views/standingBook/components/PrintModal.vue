<template>
  <BasicModal
    v-bind="$attrs"
    title="打印预览"
    @register="registerModel"
    @visible-change="handleResetForm"
    @ok="handleSubmit"
    width="1024px"
  >
    <div class="table-d" id="printJS-form">
      <table>
        <tr v-for="(item, index) in model" :key="index">
          <td>
            {{ item.label }}
          </td>
          <td>
            {{ item.placeholder }}
          </td>
        </tr>
      </table>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import printJS from 'print-js';
  import { dateUtil, formatToDateTime } from '/@/utils/dateUtil';
  import { Descriptions } from 'ant-design-vue';
  export default defineComponent({
    components: {
      BasicModal,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    setup() {
      const applyTime = formatToDateTime(dateUtil.now(), 'YYYY-MM-DD');
      const printTime = formatToDateTime(dateUtil.now());
      const modelRef = ref({});
      const flowInfo = ref([]);
      const [registerModel] = useModalInner(async (data) => {
        console.log(
          '🚀 ~ file: PrintIndex.vue ~ line 89 ~ const[registerModel,{closeModal}]=useModalInner ~ data',
          data,
        );
        modelRef.value = data;
      });
      //  发送数据请求
      async function handleSubmit() {
        printJS({
          printable: 'printJS-form',
          type: 'html',
          scanStyles: false,
          style: `
                .table-d .title {
                  width: 100%;
                  font-size: 24px;
                  text-align: center;
                }

                .table-d .sub-title {
                  display: flex;
                  justify-content: flex-start;
                  width: 50%;
                  padding: 8px 0;
                  font-size: 12px;
                }

                .table-d .sub-title .name {
                  flex-basis: 200px;
                }

                .table-d table {
                  width: 100%;
                  font-size: 12px;
                  border: 1px solid black;
                  border-collapse: collapse;
                }

                .table-d table td {
                  padding: 10px 8px;
                  border: 1px solid black;
                }

                .table-d table td:nth-child(1) {
                  width: 150px;
                }

                .table-d .bottom {
                  display: flex;
                  justify-content: flex-start;
                  width: 50%;
                  padding: 8px 0;
                  font-size: 12px;
                }

                .table-d .bottom .printDate {
                  flex-basis: 200px;
                }
                `,
        });
      }
      return {
        registerModel,
        handleSubmit,
        model: modelRef,
        printTime,
        applyTime,
        flowInfo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .table-d .title {
    width: 100%;
    font-size: 24px;
    text-align: center;
  }

  .table-d .sub-title {
    display: flex;
    justify-content: flex-start;
    width: 50%;
    padding: 8px 0;
    font-size: 12px;
  }

  .table-d .sub-title .name {
    flex-basis: 200px;
  }

  .table-d table {
    width: 100%;
    font-size: 12px;
    border: 1px solid black;
    border-collapse: collapse;
  }

  .table-d table td {
    padding: 10px 8px;
    border: 1px solid black;
  }

  .table-d table td:nth-child(1) {
    width: 150px;
  }

  .table-d .bottom {
    display: flex;
    justify-content: flex-start;
    width: 50%;
    padding: 8px 0;
    font-size: 12px;
  }

  .table-d .bottom .printDate {
    flex-basis: 200px;
  }
</style>
