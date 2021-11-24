<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Avatar
      :src="getUserInfo.avatar"
      :size="props.size"
      @click="personalInformation(getUserInfo.id)"
    />
    <div v-if="props.showInfo" :class="`text-center ${prefixCls}-personInfo`">
      {{ getUserInfo.personName }}
    </div>
    <div v-if="props.showInfo" :class="`text-center ${prefixCls}-org`">{{
      getUserInfo.deptName || '没数据'
    }}</div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import headerImg from '/@/assets/images/header.jpg';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  //跳转页面
  import { useGo } from '/@/hooks/web/usePage';
  import { nodeStore } from '/@/store/modules/pictureList';
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
      const go = useGo();
      const getUserInfo = computed(() => {
        const userStore = useUserStore();
        const { personName = '', desc, deptName, id } = userStore.getUserInfo.user || {};
        //图片
        const token = userStore.getToken;
        console.log('token', token);
        let headPathImg = '';
        const nodeData = nodeStore();
        if (token) {
          nodeData.getNodeList(id);
          console.log('nodeData=>', nodeData);
          headPathImg = nodeData.headPath;
        }
        return { personName, avatar: headPathImg || headerImg, desc, deptName, id };
      });
      // const getUserInfo = computed(() => {
      //   const userStore = useUserStore();
      //   const { realName = '', avatar, desc } = userStore.getUserInfo || {};
      //   return { realName, avatar: avatar || headerImg, desc };
      // });
      const { prefixCls } = useDesign('secondary-menu-left-user-list');
      function personalInformation(id) {
        go(`/dashboard/personalInformation/${id}`);
      }
      return {
        prefixCls,
        getUserInfo,
        props,
        personalInformation,
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
