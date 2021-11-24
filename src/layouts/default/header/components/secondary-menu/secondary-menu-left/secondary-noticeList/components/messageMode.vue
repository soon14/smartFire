<template>
  <BasicModal
    v-bind="$attrs"
    title="消息通知"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
  >
    <a-list item-layout="horizontal" :data-source="modelRef">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.createName">
            <template #title>
              <a>{{ item.content }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="modelRef.img" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { List, Avatar } from 'ant-design-vue';
  import headerImg from '/@/assets/images/process_handling.png';
  export default defineComponent({
    components: {
      BasicModal,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      [Avatar.name]: Avatar,
    },
    setup() {
      const handleSubmit = async () => {
        closeModal();
        changeOkLoading(false);
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          closeModal();
          changeOkLoading(false);
        }
      };
      const modelRef = ref([]);
      const [registerModalInner, { closeModal, changeOkLoading }] = useModalInner(async (data) => {
        // 目前消息类型没定，图像功能，以及操作功能展未开展
        data.img = headerImg;
        console.log('data==>', data);
        modelRef.value = data;
      });
      return {
        handleSubmit,
        handleResetForm,
        registerModalInner,
        modelRef,
      };
    },
  });
</script>
