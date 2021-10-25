<template>
  <div :class="`flex ${prefixCls}`">
    <div style="font-weight: bold; font-size: 18px">
      <slot name="title"> 最新公告 </slot>
    </div>
    <div :class="`${prefixCls}-wrapper`">
      <div :class="`${prefixCls}-inner`">
        <div :class="`${prefixCls}-inner-title`">
          8月26日全体成员参加消防演练，请全体成员出席。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'SecondaryNoticeBar',
    setup() {
      const { prefixCls } = useDesign('secondary-notice-bar');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-notice-bar';
  .@{prefix-cls} {
    &-wrapper {
      margin-left: 24px;
      width: 574px;
      background: #043fb1;
      padding: 4px 11px;
    }

    &-inner {
      overflow: hidden;

      &-title {
        display: inline-flex;
        // transform: translateX(-80px);
        transition: 2s ease-in-out;
      }
    }
  }
</style>
