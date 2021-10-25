<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Avatar :size="44">
      <template #icon>
        <Icon icon="codicon:lock" :size="22" />
      </template>
    </Avatar>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Avatar } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  export default defineComponent({
    name: 'SecondaryConfigList',
    components: {
      Avatar,
      Icon,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-left-config-list');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-left-config-list';
  .@{prefix-cls} {
    .ant-avatar {
      border: 1px solid #fff;
      background: transparent;
    }
  }
</style>
