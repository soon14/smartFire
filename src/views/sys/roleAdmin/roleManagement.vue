<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="角色权限管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增角色"
        :hasAddBtn="true"
        :hasMoreSearch="false"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
      />
    </div>
  </div>
</template>
<script setup>
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  // import { useModal } from '/@/components/Modal';
  // import { useMessage } from '/@/hooks/web/useMessage';
  // const { createConfirm, createMessage } = useMessage();
</script>
<style lang="less"></style>
