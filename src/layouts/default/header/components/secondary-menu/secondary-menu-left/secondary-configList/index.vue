<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Avatar :size="44" @click="updatePassword">
      <template #icon>
        <Icon icon="codicon:lock" :size="22" />
      </template>
    </Avatar>
    <update-password-page @register="passwordPage" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Avatar } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import updatePasswordPage from './components/updatePasswordPage.vue';
  import { useModal } from '/@/components/Modal';
  export default defineComponent({
    name: 'SecondaryConfigList',
    components: {
      Avatar,
      Icon,
      updatePasswordPage,
    },
    setup() {
      const [passwordPage, { openModal: passwordPageModel }] = useModal();
      const { prefixCls } = useDesign('secondary-menu-left-config-list');
      function updatePassword() {
        console.log('修改密码');
        const tempData = Object.assign({}, { id: null });
        passwordPageModel(true, tempData);
      }
      return {
        prefixCls,
        updatePassword,
        passwordPage,
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
