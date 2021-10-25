<template>
  <div style="width: 280px">
    <div :class="`flex justify-between ${prefixCls}`">
      <SecondaryUserList />
      <SecondaryConfigList />
      <SecondaryNoticeList />
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue-demi';
  import SecondaryUserList from './secondary-userList/index.vue';
  import SecondaryConfigList from './secondary-configList/index.vue';
  import SecondaryNoticeList from './secondary-noticeList/index.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'SecondaryMenuLeft',
    components: {
      SecondaryUserList,
      SecondaryConfigList,
      SecondaryNoticeList,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-left');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-left';
  .@{prefix-cls} {
    height: 64px;
    align-items: center;
    padding: 0 0 0 20px;
    width: 200px;
  }
</style>
