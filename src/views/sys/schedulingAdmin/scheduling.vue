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
    <!-- <span>
      <a-select v-model="year" @change="text">
        <a-select-option v-for="(itemYear, index) in year" :value="itemYear" :key="index">
          {{ itemYear }}年
        </a-select-option>
      </a-select>
    </span>
    <span>
      <a-select v-model="month" @change="text1">
        <a-select-option v-for="(itemMonth, index) in month" :value="itemMonth" :key="index">
          {{ itemMonth }}月
        </a-select-option>
      </a-select>
    </span>
    <span></span> -->
  </div>
</template>
<script lang="ts">
  // import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { defineComponent } from 'vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { Select } from 'ant-design-vue';
  // import { Moment } from 'moment';
  export default defineComponent({
    components: {
      NwowHeader,
      NwowSearch,
      [Select.name]: Select,
      // ASelectOption: Select.Option,   feat(增加): 流程台账 会议页面 排版页面
    },
    setup() {
      //   const year = ref([]);
      //   const month = ref([]);
      //   let  day  =  [] ;
      //   const formData = reactive({
      //     year: 2019,
      //     month: 1,
      //     day: 1,
      //   });
      //   const itemYear = null;
      //   const itemMonth = null;
      //   onMounted(() => {
      //     getYear();
      //     getMonth();
      //     getDay();
      //     getWeekByDay('2014-01-01');
      //   });

      //   function getYear() {
      //     //获取年
      //     let date = new Date();
      //     console.log('date==>', date);
      //     let current_year = date.getFullYear();
      //     for (let i = 0; i < 100; i++) {
      //       let y = current_year - i;
      //       year.value.push(y);
      //     }
      //   }

      //   function getMonth() {
      //     //获取月
      //     for (let i = 1; i < 13; i++) {
      //       month.value.push(i);
      //     }
      //   }
      //   function getDay() {
      //     if (formData.year &&  formData.month ) {
      //       let days = getDaysInMonth(formData.year, formData.month);
      //       console.log('天数', days);
      //       for (let i = 1; i < days; i++) {
      //           //  day.push(i)
      //           //  console.log('day=>',day)
      //       }
      //        console.log('day==>', day);
      //     } else {
      //       console.log('请选择日期');
      //     }
      //   }

      //   function getDaysInMonth(year, month) {
      //     //获取某个月的天数
      //     month = parseInt(month, 10);
      //     let d = new Date(year, month, 0);
      //     return d.getDate();
      //   }
      //   function text(data) {
      //     console.log('aasd', data);
      //     formData.year = data;
      //   }
      //    function text1(data) {
      //     console.log('aasd11', data);
      //     formData.month  = data;
      //     getDay()

      //   }
      //    function getWeekByDay(dayValue) { //dayValue=“2014-01-01”
      //       var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
      //       var today = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"); //创建星期数组
      //       console.log('星期',today[day.getDay()])
      //       return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
      //  }

      return {
        // year,
        // month,
        // day,
        // formData,
        // getYear,
        // getMonth,
        // getDay,
        // getDaysInMonth,
        // itemYear,
        // itemMonth,
        // text,
        // text1,
        // getWeekByDay,
      };
    },
  });
</script>
