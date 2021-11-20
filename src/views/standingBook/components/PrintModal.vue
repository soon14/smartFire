<template>
  <BasicModal
    v-bind="$attrs"
    title="打印预览"
    @register="registerModel"
    @visible-change="handleResetForm"
    @ok="handleSubmit"
    width="1024px"
    heigth="1024px"
  >
    <!-- 公安消防部队派车单 -->
    <div class="table-d" id="printJS-form" v-show="Sendcar">
      <h2 align="center" style="width: 100%">公安消防部队派车单</h2>
      <div>
        <span>{{ model.flowCreateDate }}</span>
        <span style="float: right">NO:{{ flowData.flowNumber }}</span>
      </div>
      <table border="1" style="width: 100%">
        <tr>
          <th>用车单位</th>
          <th> {{ model.field1 }} </th>
          <th>电话</th>
          <th>{{ userData.contactPhone }}</th>
        </tr>
        <tr>
          <th>用车人</th>
          <th>{{ flowData.createPersonName }} </th>
          <th>职务</th>
          <th>{{ userData.postName }} </th>
        </tr>
        <tr>
          <td rowspan="2">事由</td>
          <td rowspan="2">{{ model.field8 }} </td>
          <td>乘务员额（名）</td>
          <td>{{ model.field6 }}</td>
        </tr>
        <tr>
          <td>承运物品（吨、件）</td>
          <td>{{ model.field7 }} </td>
        </tr>
        <tr>
          <th>车型</th>
          <th>{{ model.field2 }}</th>
          <th>用车台次</th>
          <th>1 </th>
        </tr>
        <tr>
          <th>归队时间</th>
          <th colspan="3">{{ model.field41 }} -- {{ model.field42 }}</th>
        </tr>
        <tr>
          <th>批准人签字</th>
          <th colspan="3">
            <span v-for="(personName, index) in model.flowActualPersonName" :key="index"
              >{{ personName }}、</span
            >
            <span> {{ model.flowActualDate }} </span></th
          >
        </tr>
        <tr>
          <th>备注</th>
          <th colspan="3"
            >此表一式三联，一联用车单位存储，二联车管部门或警勤中队、分队（基层中队分管领导）存储，三联营门卫兵存持查验。</th
          >
        </tr>
      </table>
    </div>
    <!-- 工业园区大队2021年9月份加班审批表 -->
    <div class="table-d" id="printJS-form1" v-show="false">
      <h2 align="center" style="width: 100%">工业园区大队2021年9月份加班审批表</h2>
      <table border="1" style="width: 100%">
        <tr>
          <th>姓名</th>
          <th>姓名值</th>
          <th>加班事由</th>
          <th>加班事由值</th>
        </tr>
        <tr>
          <th>加班属性</th>
          <th>加班属性（值）</th>
          <th>加班时间</th>
          <th>加班时间（值）</th>
        </tr>
        <tr>
          <th>姓名</th>
          <th>姓名值</th>
          <th>加班事由</th>
          <th>加班事由值</th>
        </tr>
        <tr>
          <th>加班属性</th>
          <th>加班属性（值）</th>
          <th>加班时间</th>
          <th>加班时间（值）</th>
        </tr>
        <tr>
          <th>姓名</th>
          <th>姓名值</th>
          <th>加班事由</th>
          <th>加班事由值</th>
        </tr>
        <tr>
          <th>加班属性</th>
          <th>加班属性（值）</th>
          <th>加班时间</th>
          <th>加班时间（值）</th>
        </tr>
        <tr>
          <th>姓名</th>
          <th>姓名值</th>
          <th>加班事由</th>
          <th>加班事由值</th>
        </tr>
        <tr>
          <th>加班属性</th>
          <th>加班属性（值）</th>
          <th>加班时间</th>
          <th>加班时间（值）</th>
        </tr>
      </table>
    </div>

    <!-- 宁连路消防救援站请假条 -->
    <div class="table-d" id="printJS-form2" v-show="false">
      <div style="float: left">
        <h2 align="center" style="width: 100%">宁连路消防救援站请假条</h2>
        <table border="1" style="width: 100%">
          <tr>
            <th>请假人</th>
            <th>请假人（值）</th>
            <th>职务</th>
            <th>职务（值）</th>
            <th>联系电话</th>
            <th>联系电话（值）</th>
          </tr>
          <tr>
            <th colspan="1">事由</th>
            <th colspan="5">事由（值）</th>
          </tr>
          <tr>
            <th colspan="1">外出地点</th>
            <th colspan="2">外出地点（值）</th>
            <th colspan="1">请假时间</th>
            <th colspan="2">请假时间(值)</th>
          </tr>
          <tr>
            <th colspan="1">外出时间</th>
            <th colspan="2">时 分</th>
            <th colspan="1">归队时间</th>
            <th colspan="2">时 分</th>
          </tr>
          <tr>
            <th colspan="1">班长（签字）</th>
            <th colspan="5">班长</th>
          </tr>
          <tr>
            <th colspan="1">值班组长（签字）</th>
            <th colspan="5">组长</th>
          </tr>
          <tr>
            <th colspan="1">值班站长（签字）</th>
            <th colspan="5">站长</th>
          </tr>
          <tr>
            <th colspan="1">归队销假时间</th>
            <th colspan="5">时 分 （请假人签字）</th>
          </tr>
        </table>
      </div>

      <div style="float: left">
        <h2 align="center" style="width: 100%">请假条副卷（岗哨存根）</h2>
        <table border="1" style="width: 100%">
          <tr>
            <th>请假人</th>
            <th>请假人(值) </th>
            <th>联系电话</th>
            <th>联系电话(值)</th>
          </tr>
          <tr>
            <th colspan="1">事由</th>
            <th colspan="3"></th>
          </tr>
          <tr>
            <th colspan="1">外出地点</th>
            <th colspan="3"></th>
          </tr>
          <tr>
            <th colspan="1">外出时间</th>
            <th colspan="3">年 月 日 时 分 </th>
          </tr>
          <tr>
            <th colspan="1">归队时间</th>
            <th colspan="3"> 年 月 日 时 分</th>
          </tr>
          <tr>
            <th colspan="1">值班站长</th>
            <th colspan="3"> （签字）</th>
          </tr>
          <tr>
            <th colspan="1">值班哨兵</th>
            <th colspan="3"> （签字）</th>
          </tr>
          <tr>
            <th colspan="4">备注：所有外出人员，必须持有此券，方可外出，营门岗哨要严格履行职责</th>
          </tr>
        </table>
      </div>
    </div>

    <!-- 出入营门人员（车辆）登记 -->
    <div class="table-d" id="printJS-form3" v-show="false">
      <h2 align="center" style="width: 100%">出入营门人员（车辆）登记</h2>
      <table border="1" style="width: 100%">
        <tr>
          <td colspan="3" align="center">时间</td>
          <td rowspan="3">出入人员姓名</td>
          <td rowspan="3">单位</td>
          <td rowspan="3">车辆号牌</td>
          <td rowspan="3">事由</td>
          <td rowspan="3">队容风纪情况</td>
          <td rowspan="3">证件请况</td>
          <td rowspan="3">哨兵签字</td>
        </tr>
        <tr>
          <td rowspan="2">月 日</td>
          <td colspan="2" align="center">具体时间</td>
        </tr>
        <tr>
          <td>出</td>
          <td>入</td>
        </tr>
        <tr>
          <td>月 日（值）</td>
          <td>出（值）</td>
          <td>入（值）</td>
          <td>出入人员姓名（值）</td>
          <td>单位（值）</td>
          <td>车辆号牌（值）</td>
          <td>事由（值）</td>
          <td>队容风纪情况（值）</td>
          <td>证件请况（值）</td>
          <td>哨兵签字（值）</td>
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
  import { getRosterList } from '/@/api/sys/roster';
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
      const userData = ref({});
      const flowValueList = ref({});
      const flowData = ref({});
      let Sendcar = ref(false);
      const [registerModel] = useModalInner(async (data) => {
        console.log('data[0].templateId==>>>', data[0].templateId);
        if (data[0].templateId === 2) {
          Sendcar.value = true;
          flowData.value = data[0];
          const userDataList = await getRosterList({ id: data[0].createPersonId });
          userData.value = userDataList.list[0];
          //流程json
          // const flowJson = JSON.parse(data[0].formData);
          // console.log('flowJson==>', flowJson.fields);
          //流程值
          flowValueList.value = JSON.parse(data[0].formModel);
          // console.log('flowValueList==>', flowValueList.value);
          //获取审批时间和审批人
          let flowActualDate = '';
          let flowActualPersonName = [];
          for (var i = 0; flowData.value.flowActionVos.length > i; i++) {
            flowActualDate = flowData.value.flowActionVos[i].actualDate;
            if (flowData.value.flowActionVos[i].actualPersonName)
              flowActualPersonName.push(flowData.value.flowActionVos[i].actualPersonName);
          }
          var timearr = flowActualDate.replace(' ', ':').replace(/\:/g, '-').split('-');
          var ActualDate =
            '' +
            timearr[1].split('')[1] +
            '月' +
            timearr[2] +
            '日\t' +
            timearr[3] +
            '时' +
            timearr[4] +
            '分';
          // console.log('ActualDate==>', ActualDate);
          //获取创建时间
          let CreateDatelist = flowData.value.createDate;
          var timearr = CreateDatelist.replace(' ', ':').replace(/\:/g, '-').split('-');
          // console.log('timearr==>', timearr);
          var flowCreateDate =
            timearr[0] + '年' + timearr[1].split('')[1] + '月' + timearr[2] + '日\t';
          // console.log('flowCreateDate==>' + flowCreateDate);
          modelRef.value.field1 = flowValueList.value.field1OrgName;
          modelRef.value.field2 = flowValueList.value.field2CarName;
          modelRef.value.field3 = flowValueList.value.field3;
          modelRef.value.field41 = flowValueList.value.field4[0];
          modelRef.value.field42 = flowValueList.value.field4[1];
          modelRef.value.field5 = flowValueList.value.field5;
          modelRef.value.field6 = flowValueList.value.field6MoreNumber;
          modelRef.value.field7 = flowValueList.value.field7;
          modelRef.value.field8 = flowValueList.value.field8;
          modelRef.value.flowActualDate = ActualDate;
          modelRef.value.flowCreateDate = flowCreateDate;
          modelRef.value.flowActualPersonName = flowActualPersonName.splice(0, 1);
        } else {
          Sendcar.value = false;
        }
      });
      //  发送数据请求
      async function handleSubmit() {
        printJS({
          printable: 'printJS-form',
          type: 'html',
          scanStyles: false,
          style: `
                table{
                    height:500px;
                }
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
                  width: 200px;
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
      async function handleResetForm() {}
      return {
        registerModel,
        handleSubmit,
        model: modelRef,
        printTime,
        applyTime,
        flowInfo,
        userData,
        flowValueList,
        flowData,
        Sendcar,
        handleResetForm,
      };
    },
  });
</script>
<style lang="less" scoped>
  table,
  th,
  td {
    border: 1px solid black;
  }
</style>
