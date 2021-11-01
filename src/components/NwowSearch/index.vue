<template>
  <div class="relative flex search-bar">
    <div style="position: absolute; width: 100%; height: 400px; top: 100%; overflow: hidden">
      <!-- 抽屉框搜索 -->
      <Drawer
        title="更多搜索条件"
        placement="top"
        :height="400"
        :closable="true"
        :visible="visible"
        :get-container="false"
        :wrap-style="{ position: 'absolute' }"
        @close="onClose"
      >
        <BasicForm @register="register" @submit="handleSubmit" />
      </Drawer>
      <!-- ================== -->
    </div>
    <a-input
      placeholder="请输入搜索条件"
      v-model:value="searchForm.condition"
      style="margin-right: 32px"
    >
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>
    <a-button @click="handleSearch" style="margin-right: 32px">查询</a-button>
    <a-button
      v-if="hasMoreSearch"
      style="margin-right: 32px"
      type="primary"
      preIcon="icon-park-outline:search"
      ghost
      @click="handleMoreSearch"
      >更多查询条件</a-button
    >
    <a-button
      v-if="hasAddBtn"
      style="margin-right: 32px"
      type="primary"
      preIcon="icon-park-outline:file-addition-one"
      @click="onClick"
      >{{ addText }}</a-button
    >
  </div>
</template>
<script setup>
  import { Drawer } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { computed, reactive, ref, watch } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  // const defaultSchemas = [
  //   {
  //     field: 'field1',
  //     component: 'Input',
  //     label: '字段1',
  //     colProps: {
  //       span: 8,
  //     },
  //     componentProps: {
  //       placeholder: '自定义placeholder',
  //       onChange: (e) => {
  //         console.log(e);
  //       },
  //     },
  //   },
  // ];
  const props = defineProps({
    hasMoreSearch: {
      type: Boolean,
      deafult: false,
    },
    hasAddBtn: {
      type: Boolean,
      deafult: false,
    },
    addText: {
      type: String,
      deafult: '添加',
    },
    onClick: {
      type: Function,
      default: null,
    },
    schemas: {
      type: Function,
      deafult: null,
    },
  });
  const emit = defineEmits(['OnSearch', 'OnMoreSearch']);
  // const searchBarRef = ref(null);
  const searchForm = reactive({
    condition: '',
  });
  const handleSearch = () => {
    emit('OnSearch', searchForm.condition);
  };
  const handleMoreSearch = () => {
    visible.value = true;
  };
  // const { hasMoreSearch, addText, schemas } = toRefs(props);
  //  弹窗状态维护======================
  const visible = ref(false);

  // const showDrawer = () => {
  //   visible.value = true;
  // };

  const onClose = () => {
    visible.value = false;
  };
  // const schemasData  = onMounted(() => {

  //   // console.log('shuju', typeof(props.schemas)
  // });
  //===================================
  const handleSubmit = () => {
    getFieldsValue();
  };

  const schemasData = computed(() => {
    console.log('11111');
    console.log('shuajua', props.schemas());
    return props.schemas();
  });
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: schemasData,
    actionColOptions: {
      span: 24,
    },
  });
  console.log(schemasData);
  watch(
    () => schemasData,
    (newVal, oldVal) => {
      console.log('val==》', newVal, oldVal);
      console.log('12312312');
    },
    {
      deep: true,
    },
  );
</script>
<style lang="less">
  .search-bar {
    button:last-child {
      margin-right: 0 !important;
    }
  }
</style>
