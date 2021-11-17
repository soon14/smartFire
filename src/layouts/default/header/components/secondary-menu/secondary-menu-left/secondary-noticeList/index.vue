<template>
  <div :class="`cursor-pointer ${prefixCls}`">
    <Badge :count="Number(messageDate.totalCount)" showZero @click="messageModel(messageDate.list)">
      <Avatar :size="44">
        <template #icon>
          <Icon icon="carbon:email" :size="22" />
        </template>
      </Avatar>
    </Badge>
    <message-model @register="message" @requestFinish="handleRefresh" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { Avatar, Badge } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { messageList } from '/@/api/tidings/tidings';
  import messageModel from './components/messageMode.vue';
  import { useModal } from '/@/components/Modal';
  export default defineComponent({
    name: 'SecondaryNoticeList',
    components: {
      Avatar,
      Icon,
      Badge,
      messageModel,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-menu-left-notice-list');
      onMounted(() => {
        init();
      });
      const messageDate = ref({});
      const [message, { openModal }] = useModal();
      const init = async () => {
        messageDate.value = await messageList({ messageStat: 0 });
      };
      const messageModel = (data) => {
        console.log('消息信息', data);
        // const tempData = Object.assign({}, data);
        // console.log('tempData==>',tempData)
        openModal(true, data);
      };
      return {
        prefixCls,
        messageDate,
        messageModel,
        message,
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
