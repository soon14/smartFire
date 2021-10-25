<template>
  <div :class="`${prefixCls}`">
    <a-input placeholder="输入车辆、事项、人员" v-model:value="searchKeyWord">
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  // import { Input } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { SearchOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'SecondarySearchData',
    components: {
      SearchOutlined,
    },
    setup() {
      const { prefixCls } = useDesign('secondary-search-data');
      const searchKeyWord = ref('');
      return {
        prefixCls,
        searchKeyWord,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-secondary-search-data';
  .@{prefix-cls} {
    padding-left: 24px;
  }
</style>
