<template>
  <div :class="`${prefixCls}`">
    <SecondaryWeather />
  </div>
</template>
<script>
  import { defineComponent } from 'vue-demi';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SecondaryWeather from './secondary-weather/index.vue';
  export default defineComponent({
    name: 'SecondaryMenuRight',
    components: {
      SecondaryWeather,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-right');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-right';
  .@{prefix-cls} {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
  }
</style>
