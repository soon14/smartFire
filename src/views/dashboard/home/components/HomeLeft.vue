<template>
  <div style="padding: 48px 72px 0 72px">
    <div class="flex justify-between">
      <SecondaryConfigList />
      <SecondaryUserList
        class="homeAvatar"
        style="padding-top: 22px"
        :size="136"
        :showInfo="true"
      />
      <SecondaryNoticeList />
    </div>
    <div style="padding-top: 96px">
      <ScrollContainer ref="scrollRef" :style="{ height: height }">
        <div class="flex flex-wrap content-center justify-between" style="padding: 0 16px">
          <div v-for="item in growCardList" :key="item.value" style="padding: 16px 0">
            <div
              style="padding: 18px 0"
              class="
                flex flex-col
                items-center
                justify-between
                text-center
                cursor-pointer
                grid-item
              "
            >
              <div
                style="
                  border-radius: 50%;
                  border: 1px solid #fff;
                  width: 44px;
                  height: 44px;
                  line-height: 44px;
                "
              >
                <Icon :icon="item.icon" :size="22" />
              </div>
              <div style="font-size: 14px">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </ScrollContainer>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref, nextTick } from 'vue';
  import SecondaryUserList from '/@/layouts/default/header/components/secondary-menu/secondary-menu-left/secondary-userList/index.vue';
  import SecondaryConfigList from '/@/layouts/default/header/components/secondary-menu/secondary-menu-left/secondary-configList/index.vue';
  import SecondaryNoticeList from '/@/layouts/default/header/components/secondary-menu/secondary-menu-left/secondary-noticeList/index.vue';
  import { growCardList } from '../homeGridData.ts';
  import { Icon } from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container/index';
  import { getViewportOffset } from '/@/utils/domUtils';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  export default defineComponent({
    name: 'HomeLeft',
    components: {
      SecondaryUserList,
      SecondaryConfigList,
      SecondaryNoticeList,
      Icon,
      ScrollContainer,
    },
    setup() {
      const scrollRef = ref(null);
      const height = ref(0);
      async function getScrollHeight() {
        await nextTick();
        const { bottomIncludeBody } = getViewportOffset(scrollRef.value.$el);
        height.value = `${bottomIncludeBody - 14}px`;
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
        growCardList,
        scrollRef,
        height,
      };
    },
  });
</script>
<style lang="less">
  .homeAvatar {
    .ant-avatar {
      border: 4px solid #fff;
    }
  }

  .grid-item {
    width: 108px;
    height: 110px;
    background: linear-gradient(0deg, #003db3, #003db3), #fff;
    box-shadow: 0 4px 26px #1f58ec;
    border-radius: 24px;
  }
</style>
