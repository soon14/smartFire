<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumnsRole } from '../modules/tableData';
  import { getRosterList } from '/@/api/sys/roster';
  export default defineComponent({
    components: {
      BasicTable,
    },
    props: {
      roleId: {
        type: Number,
        require: true,
      },
    },
    setup(props) {
      const myRoleId: any = ref(0);
      const [registerTable, { reload }] = useTable({
        api: getRosterList,
        bordered: true,
        useSearchForm: false,
        showIndexColumn: false,
        searchInfo: {
          roleId: myRoleId,
        },
        columns: getBasicColumnsRole(),
      });
      watch(
        () => props.roleId,
        () => {
          myRoleId.value = props.roleId;
          if (myRoleId.value !== 0) {
            reload();
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );
      return {
        registerTable,
      };
    },
  });
</script>
<style lang="less" scoped></style>
