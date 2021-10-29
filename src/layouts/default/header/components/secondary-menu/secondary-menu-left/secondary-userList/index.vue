<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Avatar :src="getUserInfo.avatar" :size="props.size" />
    <div v-if="props.showInfo" :class="`text-center ${prefixCls}-personInfo`">
      {{ getUserInfo.personName }}
    </div>
    <div v-if="props.showInfo" :class="`text-center ${prefixCls}-org`">岗位</div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import headerImg from '/@/assets/images/header.jpg';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'SecondaryUserList',
    components: {
      Avatar,
    },
    props: {
      size: {
        type: Number,
        default: 44,
      },
      showInfo: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const getUserInfo = computed(() => {
        const userStore = useUserStore();
        const { personName = '', headPath, desc } = userStore.getUserInfo.user || {};
        return { personName, avatar: headPath || headerImg, desc };
      });
      // const getUserInfo = computed(() => {
      //   const userStore = useUserStore();
      //   const { realName = '', avatar, desc } = userStore.getUserInfo || {};
      //   return { realName, avatar: avatar || headerImg, desc };
      // });
      const { prefixCls } = useDesign('secondary-menu-left-user-list');
      return {
        prefixCls,
        getUserInfo,
        props,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-menu-left-user-list';
  .@{prefix-cls} {
    &-personInfo {
      font-weight: bold;
      font-size: 24px;
      color: #fff;
    }

    &-org {
      font-size: 16px;
      color: #fff;
    }
  }
</style>
