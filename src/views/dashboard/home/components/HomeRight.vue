<template>
  <div style="padding: 12px 48px 0 48px" class="home-right">
    <!-- <SecondaryWeather /> -->
    <div style="width: 100%; height: 36px"></div>
    <a-date-picker
      style="width: 100%"
      v-model:value="time1"
      placeholder="Select Time"
      format="YYYY-MM-DD"
      @change="onOk"
      @ok="onOk"
      open
      :getCalendarContainer="getCalendarContainer"
    >
      <div class="calendar">
        <div style="width: 50%; padding: 8px">
          <NwowHeader title="待办事项" />
        </div>
        <!-- <div style="padding: 16px" class="space-x-4">
          <badge color="#FA541C" text="未处理" />
          <badge color="#A0D911" text="已处理" />
        </div> -->
        <ScrollContainer ref="domRef" :style="{ height: height, padding: '16px' }">
          <Loading :loading="loading" :absolute="absolute" :tip="tip" />
          <a-space direction="vertical">
            <div v-show="showData"> 暂无数据 </div>
            <div v-for="item in flowData" :key="item.value">
              <badge color="#FA541C" :text="`您有一条流程待处理` + `【` + item.flowNumber + `】`" />
              <div
                class="flex"
                style="font-size: 12px; line-height: 12px; color: rgba(255, 255, 255, 0.55)"
              >
                <div>安排人： {{ item.createPersonName }}</div>
              </div>
            </div>
          </a-space>
        </ScrollContainer>
      </div>
    </a-date-picker>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, reactive, toRefs, onMounted } from 'vue';
  import { DatePicker, Badge, Space } from 'ant-design-vue';
  import { getViewportOffset } from '/@/utils/domUtils';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Loading } from '/@/components/Loading';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import { dayWorkList } from '../homeGridData.ts';
  import { flowList } from '/@/api/flow/workFlow';
  import { Moment } from 'moment';
  // import { dateUtil } from '/@/utils/dateUtil';
  export default defineComponent({
    name: 'HomeRight',
    components: {
      'a-date-picker': DatePicker,
      'a-space': Space,
      Badge,
      ScrollContainer,
      Loading,
      NwowHeader,
    },
    setup() {
      const time1 = ref();
      const flowData = ref({});
      const showData = ref(false);
      const compState = reactive({
        absolute: false,
        loading: false,
        tip: '加载中...',
      });
      const onOk = async (value: Moment[], dateString: string[]) => {
        // console.log('e=>',e._d)
        console.log('Formatted Selected Time: ', dateString);
        // const  date = dateUtil(dateString).toDate().toString();
        const data = await flowList({ date: dateString, flag: 2 });
        console.log('data=>', data);
        if (data.list.length === 0) {
          showData.value = true;
        }
        console.log('showData', showData.value);
        console.log('data==>', data.list);
        flowData.value = data.list;
        compState.absolute = true;
        compState.loading = true;
        setTimeout(() => {
          compState.loading = false;
        }, 1500);
      };
      onMounted(() => {
        init();
      });
      //获取流程消息
      async function init() {
        //获取当前日期
        let currentTime = new Date(),
          year = currentTime.getFullYear(),
          month =
            currentTime.getMonth() + 1 < 10
              ? '0' + (currentTime.getMonth() + 1)
              : currentTime.getMonth() + 1,
          day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
        const startTime = year + '-' + month + '-' + day;

        const data = await flowList({ pageSize: 9999, flag: 2, data: startTime });
        if (data.list.length === 0) {
          showData.value = true;
        }

        flowData.value = data.list;
      }
      const getCalendarContainer = (triggerNode) => {
        return triggerNode.parentNode;
      };
      const height = ref(0);
      const domRef = ref(null);
      async function getScrollHeight() {
        await nextTick();
        const { bottomIncludeBody } = getViewportOffset(domRef.value.$el);
        height.value = `${bottomIncludeBody - 14}px`;
        console.log('height.value====', height.value);
      }
      getScrollHeight();
      useWindowSizeFn(
        () => {
          getScrollHeight();
        },
        50,
        { immediate: true },
      );
      return {
        domRef,
        time1,
        onOk,
        getCalendarContainer,
        height,
        dayWorkList,
        ...toRefs(compState),
        init,
        flowData,
        showData,
      };
    },
  });
</script>
<style lang="less">
  .home-right {
    .ant-calendar-selected-day .ant-calendar-date {
      background: #1890ff;
    }

    .ant-calendar {
      width: 304px;
      border: none;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .ant-calendar-last-month-cell .ant-calendar-date,
    .ant-calendar-next-month-btn-day .ant-calendar-date,
    .ant-calendar-last-month-cell .ant-calendar-date:hover,
    .ant-calendar-next-month-btn-day .ant-calendar-date:hover {
      color: rgba(255, 255, 255, 0.25);
    }

    .ant-calendar-input-wrap {
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    }

    .ant-calendar-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    }

    .ant-calendar-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.25);
    }

    .calendar {
      box-shadow: rgb(31 88 236) 0 4px 26px, rgb(70 96 234 / 16%) 0 4px 15px;
      background: #043fb1;
      border-radius: 16px;
      padding-top: 339px;
    }

    .see-more {
      &::after {
        position: relative;
        top: -2px;
        display: inline-block;
        width: 8px;
        height: 8px;
        vertical-align: middle;
        border: 0 solid #fff;
        border-width: 2px 0 0 2px;
        border-radius: 1px;
        transform: rotate(135deg) scale(0.8);
        transition: all 0.3s;
        content: '';
      }
    }
  }
</style>
