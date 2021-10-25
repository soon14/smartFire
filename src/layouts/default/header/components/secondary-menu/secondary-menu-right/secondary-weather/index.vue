<template>
  <div :class="`flex ${prefixCls}`">
    <div :class="`flex ${prefixCls}-left`">
      <div :class="`${prefixCls}-left-icon`">
        <Icon icon="icon-park-outline:sun" :size="42" />
      </div>
      <div :class="`${prefixCls}-left-info`">
        <div :class="`${prefixCls}-left-info-city`"> 淮安市 24-28</div>
        <div :class="`${prefixCls}-left-info-wind`"> 西风&lt;三级 </div>
      </div>
    </div>
    <div :class="`${prefixCls}-right`">
      <div :class="`flex ${prefixCls}-right-quality`">
        <div :class="`${prefixCls}-right-quality-title`">空气质量</div>
        <div :class="`${prefixCls}-right-quality-tag`">
          <Tag color="#f50">差</Tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Icon } from '/@/components/Icon';
  import { Tag } from 'ant-design-vue';
  export default defineComponent({
    name: 'SecondaryWeather',
    components: {
      Icon,
      Tag,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-weather');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-weather';
  .@{prefix-cls} {
    &-left {
      &-info {
        padding: 0 0 0 12px;
      }
    }

    &-right {
      margin-left: 32px;
    }

    .ant-tag {
      border-radius: 10px;
    }
  }
</style>
