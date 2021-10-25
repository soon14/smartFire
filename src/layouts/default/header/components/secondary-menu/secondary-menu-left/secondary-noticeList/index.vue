<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Badge :count="99">
      <Avatar :size="44">
        <template #icon>
          <Icon icon="carbon:email" :size="22" />
        </template>
      </Avatar>
    </Badge>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Avatar, Badge } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  export default defineComponent({
    name: 'SecondaryNoticeList',
    components: {
      Avatar,
      Icon,
      Badge,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-left-notice-list');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-left-notice-list';
  .@{prefix-cls} {
    .ant-avatar {
      border: 1px solid #fff;
      background: transparent;
    }

    .ant-badge-count {
      color: #fff;
    }
  }
</style>
