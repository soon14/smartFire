<template>
  <div style="padding: 12px 48px 0 48px" class="home-right">
    <!-- <SecondaryWeather /> -->
    <div style="width: 100%; height: 36px"></div>
    <a-date-picker
      style="width: 100%"
      v-model:value="time1"
      placeholder="Select Time"
      @change="onOk"
      @ok="onOk"
      open
      :getCalendarContainer="getCalendarContainer"
    >
      <div class="calendar">
        <div style="width: 50%; padding: 8px">
          <NwowHeader title="待办事项" />
          <!-- <div class="flex">
            <div>查看更多</div>
            <div class="see-more" style="height: 100%"></div>
          </div> -->
        </div>

        <div style="padding: 16px" class="space-x-4">
          <badge color="#FA541C" text="未处理" />
          <badge color="#A0D911" text="已处理" />
        </div>

        <ScrollContainer ref="domRef" :style="{ height: height, padding: '16px' }">
          <Loading :loading="loading" :absolute="absolute" :tip="tip" />
          <a-space direction="vertical">
            <div v-for="item in dayWorkList" :key="item.value">
              <badge :color="item.stat === 1 ? '#A0D911' : '#FA541C'" :text="item.message" />
              <div
                class="flex"
                style="font-size: 12px; line-height: 12px; color: rgba(255, 255, 255, 0.55)"
              >
                <div>安排人： {{ item.person }}</div>
                <div style="padding-left: 24px">{{ item.date }}</div>
              </div>
            </div>
          </a-space>
        </ScrollContainer>
      </div>
    </a-date-picker>
  </div>
</template>
<script>
  import { defineComponent, ref, nextTick, reactive, toRefs } from 'vue';
  import { DatePicker, Badge, Space } from 'ant-design-vue';
  import { getViewportOffset } from '/@/utils/domUtils';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Loading } from '/@/components/Loading';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import { dayWorkList } from '../homeGridData.ts';
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
      const compState = reactive({
        absolute: false,
        loading: false,
        tip: '加载中...',
      });
      const onOk = () => {
        compState.absolute = true;
        compState.loading = true;
        setTimeout(() => {
          compState.loading = false;
        }, 1500);
      };
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
