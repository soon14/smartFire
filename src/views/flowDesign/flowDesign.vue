<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <!-- 台账 -->
      <NwowHeader title="流程设计" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        :hasMoreSearch="false"
        hasSearch
        :hasAddBtn="true"
        :onClick="handleAddEvent"
        @OnSearch="handleSearch"
      />
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              //查看
              label: '',
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
            },
            {
              //查看
              label: '',
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { flowTable } from './modules/flowDesign';
  // import { callPoliceRecordList } from '/@/api/alarmReceivingRecord/alarmReceivingRecord';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { flowTemplateList, deleteTemplate } from '/@/api/flow/workFlow';
  import { useGo } from '/@/hooks/web/usePage';
  import { getToken } from '/@/utils/auth';
  import { useTemplateStore } from '/@/store/modules/template';
  const { createConfirm, createMessage } = useMessage();
  const [registerTable, { reload, setProps }] = useTable({
    api: flowTemplateList,
    showIndexColumn: true,
    columns: flowTable(),
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const handleSearch = (val) => {
    //查询条件
    setProps({
      searchInfo: {
        visitorName: val,
      },
    });
    reload();
  };
  const token = getToken();
  const handleEdit = async (record) => {
    //type 1: 新增 2：修改
    const transData = {
      type: 2,
      number: record.id,
      token,
    };
    useTemplateStore().setTemplateInfo(transData);
    go('/flow/flowDesign');
  };
  const handleDelete = (record) => {
    createConfirm({
      iconType: 'error',
      title: '提示',
      content: '是否确认删除当前模板！',
      onOk: async () => {
        await deleteTemplate({
          templateId: record.id,
        });
        createMessage.success('删除成功');
        reload();
      },
    });
  };
  const go = useGo();
  const handleAddEvent = () => {
    const transData = {
      type: 1,
      number: null,
      token,
    };
    useTemplateStore().setTemplateInfo(transData);
    go('/flow/flowDesign');
  };
  function receiveMessage(e) {
    if (e.data === '完成保存') {
      go('/flow/flowDraw');
    }
  }
  window.addEventListener('message', receiveMessage, false);
  // onBeforeUnmount(() => {
  //   window.removeEventListener('message', receiveMessage);
  // });
</script>
<style lang="less"></style>
