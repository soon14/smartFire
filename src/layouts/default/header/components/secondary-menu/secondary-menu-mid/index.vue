<template>
  <div :class="`flex justify-between ${prefixCls}`">
    <SecondaryNoticeBar>
      <!-- <template #title> 最久公告 </template> -->
    </SecondaryNoticeBar>
    <SecondarySearchData />
  </div>
</template>
<script>
  import { defineComponent } from 'vue-demi';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SecondaryNoticeBar from './secondary-noticeBar/index.vue';
  import SecondarySearchData from './secondary-searchData/index.vue';
  export default defineComponent({
    name: 'SecondaryMenuMid',
    components: {
      SecondaryNoticeBar,
      SecondarySearchData,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-mid');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-mid';
  .@{prefix-cls} {
    height: 64px;
    align-items: center;
    padding: 0 0 0 20px;
  }
</style>
