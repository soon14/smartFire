<template>
  <div :class="`${prefixCls}`">
    <p>淮安消防支队</p>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'LoginHeader',
    setup() {
      const { prefixCls } = useDesign('login-header');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login-header';
  .@{prefix-cls} {
    width: 100%;
    height: 100px;
    background: url(/@/assets/svg/bg-header.svg);
    text-align: center;
  }
</style>
