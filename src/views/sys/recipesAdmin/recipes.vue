<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="伙食管理" />
    </div>
    <a-tabs style="padding-left: 4%">
      <a-tab-pane key="1" tab="设置食谱">
        <!-- <SetRecipe /> -->
      </a-tab-pane>
      <a-tab-pane key="2" tab="菜单库">
        <!-- <RecipeLibrary /> -->
      </a-tab-pane>
      <a-tab-pane key="3" tab="食谱评论记录"> x </a-tab-pane>
      <a-tab-pane key="4" tab="被喜欢的菜"> w </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import { Tabs } from 'ant-design-vue';
  // import SetRecipe from './components/setRecipe.vue';
  // import RecipeLibrary from './components/recipeLibrary.vue';
  export default defineComponent({
    components: {
      NwowHeader,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      // SetRecipe,
      // RecipeLibrary,
    },
    setup() {
      return {};
    },
  });
</script>
