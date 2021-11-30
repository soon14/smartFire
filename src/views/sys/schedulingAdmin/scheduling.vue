<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="排班" />
      <NwowSearch
        :hasMoreSearch="true"
        hasSearch
        :hasAddBtn="false"
        @handleMoreSearch="handleSuccess"
        @OnSearch="handleSearch"
      />
    </div>
    <div>
      <span>
        <a-select
          v-model="dataList.yearData"
          style="width: 120px"
          @change="yearList"
          :default-value="dataList.yearData"
        >
          <a-select-option
            v-for="(itemYear, index) in year"
            :value="itemYear"
            :key="index"
            style="width: 50px"
          >
            {{ itemYear }}年
          </a-select-option>
        </a-select>
      </span>
      <span>
        <a-select
          style="width: 120px"
          v-model="dataList.monthDataList"
          @change="monthDataList"
          :default-value="dataList.monthDataList"
        >
          <a-select-option
            v-for="(itemMonth, index) in month"
            :value="itemMonth"
            :key="index"
            style="width: 50px"
          >
            {{ itemMonth }}月
          </a-select-option>
        </a-select>
      </span>
    </div>
    <div>
      <BasicTable
        @register="registerTable"
        @edit-end="handleEditEnd"
        @edit-cancel="handleEditCancel"
        @edit-change="handleEditChange"
        :beforeEditSubmit="beforeEditSubmit"
      />
      <!-- :columns="columns"
        :dataSource="data"
        :canResize="canResize"
        :loading="loading"
        :striped="striped"
        :bordered="border"
        :showIndexColumn="false"-->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, reactive } from 'vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { Select } from 'ant-design-vue';
  import { workList, setWork } from '/@/api/scheduling/scheduling';
  import { getRosterList } from '/@/api/sys/roster';
  import { BasicTable, useTable } from '/@/components/Table';
  import { dateUtil } from '/@/utils/dateUtil';
  const dateSet = ref([]);
  const columns = [
    {
      title: 'id',
      dataIndex: 'userId',
      fixed: 'left',
      // ifShow: (_column) => {
      //   return false; // 根据业务控制是否显示
      // },
    },
    {
      title: '姓名',
      dataIndex: 'personName',
      fixed: 'left',
    },
    {
      title: '岗位',
      dataIndex: 'postName',
      fixed: 'left',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      fixed: 'left',
    },
  ];
  export default defineComponent({
    components: {
      NwowHeader,
      NwowSearch,
      [Select.name]: Select,
      ASelectOption: Select.Option,
      // Moment,
      BasicTable,
      // BasicColumn
    },
    setup() {
      let arrTime = [];
      const year = ref([]);
      const month = ref([]);
      const year_month_list = ref([]);

      // let  yearData =  ''
      // let  monthDataList =  ''
      const dataList = reactive({
        yearData: new Date().getFullYear(),
        monthDataList: new Date().getMonth() + 1,
        timeData: '',
        //  yearDataList:'',
        //   monthList:''
      });

      const [registerTable, { setColumns, setTableData }] = useTable({
        canResize: true,
        showIndexColumn: false,
        bordered: true,
      });

      onMounted(() => {
        init();
        monthData();
        getDay();
        getYear();
        getMonth();
        dataSet();
      });
      function init() {
        var now = new Date(); // 当前日期
        let nowMonth = now.getMonth(); // 当前月
        console.log('nowMonth==>', now);
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        now.setMonth(nowMonth);
        /* 将日期设置为0, */
        now.setDate(0);
        /* 返回当月的天数 */
        // console.log('now.getDate==>',now.getDate())
        return now.getDate();
      }
      //获取日期
      function monthData() {
        const numberDay = init();
        // 获取当前的年/月
        let time =
          dataList.yearData +
          '-' +
          (dataList.monthDataList < 10 ? '0' + dataList.monthDataList : dataList.monthDataList);
        console.log('time==>', time);
        dataList.timeData = time;
        // 获取一个月的所有日期
        for (var i = 1; i < numberDay + 1; i++) {
          console.log(i);
          arrTime.push(time + '-' + (i < 10 ? '0' + i : i));
        }
      }
      //获取系星期几
      function getDay() {
        for (var i = 0; i < arrTime.length; i++) {
          const dataList = arrTime[i];
          var day = new Date(Date.parse(dataList.replace(/-/g, '-'))); //将日期值格式化
          // console.log('day==>', day);
          var today = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']; //创建星期数组
          year_month_list.value.push(dataList + '-' + today[day.getDay()]);
        }
        console.log('日期', year_month_list.value);
        dateSet.value = year_month_list.value.map((item) => {
          return {
            dateList: item,
          };
        });

        // console.log('aaaa==>', dateSet.value);
        const dateCloumn = dateSet.value.map((t) => {
          return {
            title: t.dateList,
            dataIndex: t.dateList,
            edit: true,
            editComponent: 'Select',

            editComponentProps: {
              options: [
                {
                  label: '休',
                  value: '0',
                },
                {
                  label: '班',
                  value: '1',
                },
                {
                  label: '行政值班',
                  value: '2',
                },
              ],
            },
          };
        });
        console.log('dateCloumn=>', dateCloumn);
        const columnsList = columns.concat(dateCloumn);
        console.log('columnsList==>', columnsList);
        setColumns(columnsList);
      }

      //下拉框
      function getYear() {
        //获取年
        let date = new Date();
        console.log('date==>', date);
        let current_year = date.getFullYear();
        for (let i = 0; i < 100; i++) {
          let y = current_year - i;
          year.value.push(y);
        }
      }
      function getMonth() {
        //获取月
        for (let i = 1; i < 13; i++) {
          month.value.push(i);
        }
      }
      //设置年月
      function yearList(data) {
        console.log(data);
        dataList.yearData = data;
      }

      function monthDataList(data) {
        console.log(data);
        dataList.monthDataList = data;
        // monthData();
        // getDay();
        // dataSet();
      }

      // 获取接口数据
      async function dataSet() {
        let DataList = [];
        const workDateList = await workList({ workDate: dataList.timeData });
        console.log('workDateList=+>', workDateList);
        const userList = await getRosterList({});
        console.log('userList.list', userList.list);
        //用户的
        DataList = userList.list.map((item) => {
          return {
            userId: item.id,
            personName: item.personName,
            postName: item.postName,
            deptName: item.deptName,
          };
        });

        for (let i in DataList) {
          for (let j in workDateList) {
            if (DataList[i].userId === workDateList[j].userId) {
              // console.log('aaaa', Object.values(workDateList[j].map));
              Object.assign(DataList[i], workDateList[j].map);
            }
          }
        }
        //排版
        //  if(workDateList.length == 0 ){
        // DataList.dateList  = '未排班 '
        //  DataList.editValueRefs.map((item) =>{
        //         console.log('item==>',item)
        //  }
        //  }
        // console.log('DataList==>', DataList);
        // if (workDateList.lenght !== 0) {
        //   // const data = distinct(workDateList, DataList);
        //   console.log('DataList==>', DataList);

        //   // for(let i in DataList) {
        //   //   console.log(DataList[i].editValueRefs)
        //   // }
        //   for (var i = 0; DataList.length > i; i++) {
        //     for (let j in workDateList) {
        //       if(DataList[i].userId === workDateList[j].userId) {
        //         DataList[i].editValueRefs = workDateList[j].map
        //          console.log('DataList[i].editValueRefs', DataList[i].editValueRefs)
        //       // Object.assign(DataList[i].editValueRefs, workDateList[j].map)
        //       }
        //     }
        //     // for (var i = 0; workDateList.length> i; i++) {
        //       // console.log('workDate', workDateList[i].map);
        //       //  console.log('DataList', Object.keys(DataList[i]) );
        //     // }
        //   }

        //   console.log('result =====> ', DataList)

        //   // for(var  i = 0  ; data.length > i;i++){
        //   //         //  console.log( 'shdhsdh',data[i])
        //   // }
        //   // data.map((item) => {
        //   //   return {
        //   //     userId: item.user,
        //   //     personName: item.personName,
        //   //     postName: item.postName,
        //   //     deptName: item.deptName,
        //   //   };
        //   // });

        // }
        console.log('result =====> ', DataList);
        setTableData(DataList);
      }

      //去重
      // function distinct(a, b) {
      //   //  a  为表格状态数据    b user的数据
      //   const dataList = a.concat(b);
      //   let deWeightThree = () => {
      //     let map = new Map();
      //     for (let item of dataList) {
      //       if (!map.has(item.userId)) {
      //         map.set(item.userId, item);
      //       }
      //     }
      //     return [...map.values()];
      //   };
      //   let newArr3 = deWeightThree();
      //   return newArr3;
      // }
      function handleEditChange(record, index, key, value) {
        console.log(record, index, key, value);
      }
      function handleEditEnd({ record, index, key, value }: Recordable) {
        console.log(record, index, key, value);
        return false;
      }

      function handleEditCancel() {
        console.log('cancel');
      }

      async function beforeEditSubmit({ record, index, key, value }) {
        console.log('单元格数据正在准备提交', { record, index, key, value });
        const setWorkedata = [];
        setWorkedata.userId = record.userId;
        setWorkedata.stat = value;
        setWorkedata.dateString = key;
        let arr = key.split('-');
        await setWork({
          userId: record.userId,
          stat: value,
          dateString: key,
          date: dateUtil(arr[0] + '-' + arr[1] + '-' + arr[2])
            .toDate()
            .toString(),
        });
        // return await feakSave({ id: record.id, key, value });
      }
      return {
        year,
        month,
        arrTime,
        dataList,
        yearList,
        monthDataList,
        getDay,
        year_month_list,
        columns,
        dateSet,
        registerTable,
        handleEditEnd,
        handleEditCancel,
        beforeEditSubmit,
        handleEditChange,
      };
    },
  });
</script>
