<template>
  <div :class="`${prefixCls}`">
    <div :class="`flex ${prefixCls}-warpper items-center`">
      <div v-if="isShowIcon" :class="`${prefixCls}-icon`">
        <slot name="icon"> <Icon icon="gg:loadbar-doc" :size="24" /> </slot>
      </div>
      <div :class="`${prefixCls}-text`" :style="{ 'font-size': fontSize }">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Icon } from '/@/components/Icon';
  export default defineComponent({
    name: 'NwowHeader',
    components: {
      Icon,
    },
    props: {
      isShowIcon: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: 'nwow头部',
      },
      fontSize: {
        type: String,
        default: '18px',
      },
    },
    setup() {
      const { prefixCls } = useDesign('nwow-header');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-nwow-header';
  .@{prefix-cls} {
    width: 220px;
    height: 30px;
    background: url(/@/assets/svg/tag-bg.svg);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &-warpper {
      padding: 0 12px;
      height: 100%;
    }

    &-icon {
      height: 24px;
      width: 24px;
    }

    &-text {
      // font-size: 18px;
    }
  }
</style>
