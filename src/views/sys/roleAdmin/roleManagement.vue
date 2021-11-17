<template>
  <div>
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="角色权限管理" />
      <!-- 右侧搜索栏目 -->
      <NwowSearch
        add-text="新增角色"
        :hasAddBtn="hasPermission(['1-9-10'])"
        :hasMoreSearch="false"
        :hasSearch="false"
        :onClick="handleAddRole"
      />
    </div>
    <!-- Row 角色管理 start -->
    <a-row :gutter="10" style="padding: 0 8px">
      <!-- Col 左侧角色列表模块 start -->
      <a-col :lg="5" :md="8">
        <div ref="sideMenu">
          <a-card title="角色列表" class="warp-card" dis-hover :style="{ position: 'relative' }">
            <!-- <template #extra>
              <a-button size="small" type="primary" @click="handleAddRole">添加</a-button>
            </template> -->
            <Loading :loading="loading" :absolute="absolute" :tip="tip" />
            <div class="flex" v-if="addRoleInputStat">
              <div style="width: 55%">
                <a-input v-model:value="roleName" placeholder="请输入角色" />
              </div>
              <div style="width: 45%">
                <a-button type="link" size="small" @click="handleCancelRole">取消</a-button>
                <a-button type="link" size="small" @click="handleSureRole">确认</a-button>
              </div>
            </div>

            <a-menu
              v-if="propsData.roleList && propsData.roleList.length > 0"
              :selectedKeys="getFirstInList"
              class="left no-scrollbar"
              mode="vertical-right"
              :style="{ height: '100%', 'overflow-y': 'auto' }"
            >
              <!-- MenuItem 角色列表项 start -->
              <a-menu-item
                :key="item.id"
                :name="index"
                v-for="(item, index) in propsData?.roleList"
                style="background-color: #0e235a"
              >
                <div v-if="!item.isEdit" class="flex" @click="handleSelectRole(item, item.id)">
                  <div class="truncate" style="width: 45%" :title="item.roleName">{{
                    item.roleName
                  }}</div>
                  <div style="width: 45%">
                    <a-badge :status="item.stat === 1 ? 'success' : 'error'" />
                  </div>
                  <div style="width: 10%">
                    <a-dropdown :trigger="['click']">
                      <div class="ant-dropdown-link">
                        <Icon icon="bx:bx-dots-vertical" color="#000000" />
                      </div>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item
                            key="0"
                            @click="handleDelete(item)"
                            v-if="hasPermission(['1-9-12'])"
                          >
                            删除
                          </a-menu-item>
                          <a-menu-item
                            key="1"
                            @click="handleEditRole(item)"
                            v-if="hasPermission(['1-9-11'])"
                          >
                            修改
                          </a-menu-item>
                          <a-menu-item
                            key="2"
                            @click="handleUpdateStat(item)"
                            v-if="hasPermission(['1-9-14'])"
                          >
                            {{ item.stat === 1 ? '停用' : '启用' }}
                          </a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </div>
                </div>
                <div class="flex" v-else>
                  <div style="width: 55%">
                    <a-input v-model:value="roleName" placeholder="请输入角色" />
                  </div>
                  <div style="width: 45%">
                    <a-button type="link" size="small" @click="handleCancelEditRole(item)"
                      >取消</a-button
                    >
                    <a-button type="link" size="small" @click="handleSureEditRole(item)"
                      >确认</a-button
                    >
                  </div>
                </div>
                <!-- <a-row>
                  <a-col span="24">
                    <span class="role-name">
                    </span>
                  </a-col>
                </a-row> -->
              </a-menu-item>
              <!-- MenuItem 角色列表项 end -->
            </a-menu>
            <Empty v-else />
          </a-card>
          <!-- Menu 角色列表 start -->
        </div>
      </a-col>
      <a-col :lg="19" :md="16">
        <a-card class="warp-card" dis-hover>
          <!-- Menu 切换功能 start -->
          <a-menu
            :default-selected-keys="[1]"
            mode="horizontal"
            style="z-index: 1"
            @select="handleChangeShow"
          >
            <a-menu-item :key="1">
              <span>功能权限</span>
            </a-menu-item>
            <a-menu-item :key="3">
              <span>成员列表</span>
            </a-menu-item>
          </a-menu>
          <!-- Menu 切换功能 end -->
          <!--功能权限-->
          <RoleTree
            :checkedString="propsData.transRoleData"
            :roleId="roleId"
            v-if="displayTab == 1"
            @editOk="handleEditOk"
          />
          <!--成员管理-->
          <RoleEmpList :roleId="roleId" v-if="displayTab == 3" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import NwowSearch from '/@/components/NwowSearch/index.vue';
  import { Card, Row, Col, Menu, Dropdown, Badge, Input, Empty } from 'ant-design-vue';
  import { Loading } from '/@/components/Loading';
  import { Icon } from '/@/components/Icon';
  import RoleTree from './modules/RoleTree.vue';
  import RoleEmpList from './components/RoleEmpList.vue';
  import { getRoleList, addRole, deleteRole, updateRole } from '/@/api/sys/role';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import { useModal } from '/@/components/Modal';
  // import { useMessage } from '/@/hooks/web/useMessage';
  const { createConfirm, createMessage } = useMessage();
  const { success } = createMessage;
  import { usePermission } from '/@/hooks/web/usePermission';
  import { buildUUID } from '/@/utils/uuid';
  const { hasPermission } = usePermission();
  export default defineComponent({
    components: {
      [Card.name]: Card,
      [Row.name]: Row,
      [Col.name]: Col,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Dropdown.name]: Dropdown,
      [Badge.name]: Badge,
      [Input.name]: Input,
      Empty,
      NwowHeader,
      NwowSearch,
      Loading,
      Icon,
      RoleTree,
      RoleEmpList,
    },
    setup() {
      const sideMenu = ref(null);
      const propsData = reactive({
        roleList: [],
        transRoleData: '',
      });
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: '加载中...',
        addRoleInputStat: false,
      });
      let getFirstInList: any = ref([]);
      const roleId = ref(0);
      const roleName = ref<string>('');
      const displayTab = ref(1);
      var uuid = buildUUID();
      //角色数据
      async function handleGetRoleList() {
        compState.loading = true;
        const searchParams = {
          pageSize: 999,
          pageNum: 1,
        };
        const apiResult = await getRoleList(searchParams);
        console.log('角色数据==》', apiResult);
        propsData.roleList = apiResult.list;
        roleId.value = apiResult.list[0].id;
        getFirstInList.value = [apiResult.list[0].id];
        propsData.transRoleData = apiResult.list[0].authority;
        compState.loading = false;
      }
      //添加按钮
      function handleAddRole() {
        compState.addRoleInputStat = true;
      }
      //取消添加角色
      function handleCancelRole() {
        roleName.value = '';
        compState.addRoleInputStat = false;
      }
      //添加角色
      async function handleSureRole() {
        await addRole(roleName.value, uuid);
        roleName.value = '';
        uuid = buildUUID();
        compState.addRoleInputStat = false;
        handleGetRoleList();
      }
      function handleSelectRole(item, key) {
        getFirstInList.value = [key];
        roleId.value = key;
        propsData.transRoleData = item.authority;
      }
      //删除角色
      function handleDelete(item) {
        console.log('删除数据', item);
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '是否确认删除此角色',
          onOk: async () => {
            await deleteRole({
              roleId: item.id,
            });
            success('删除sss成功');
            handleGetRoleList();
          },
        });
      }

      //修改角色
      function handleEditRole(item) {
        item.isEdit = true;
        roleName.value = item.roleName;
      }
      //取消修改角色
      function handleCancelEditRole(item) {
        item.isEdit = false;
        roleName.value = '';
      }
      //确认修改角色
      async function handleSureEditRole(item) {
        item.isEdit = false;
        const data = {
          roleId: item.id,
          roleName: roleName.value,
        };
        await updateRole(data);
        success('修改成功');
        handleGetRoleList();
      }
      //修改启用禁用角色
      async function handleUpdateStat(item) {
        const data = {
          roleId: item.id,
          stat: item.stat === 1 ? 2 : 1,
        };
        await updateRole(data);
        success('状态更新成功');
        handleGetRoleList();
      }
      function handleEditOk() {
        handleGetRoleList();
      }

      onMounted(() => {
        handleGetRoleList();
        // setTimeout(() => {
        //   const sideMenuTop = sideMenu.value.getBoundingClientRect().top;
        //   const windowHeight = document.documentElement.clientHeight;
        //   cardHeight.value = windowHeight - sideMenuTop + 'px';
        // }, 0);
      });
      function handleChangeShow({ key }) {
        console.log('key', key);
        displayTab.value = key;
      }

      // function handleAddEvent() {

      // }
      // function handleSearch() {

      // }
      return {
        sideMenu,
        propsData,
        // handleAddEvent,
        //handleSearch,

        handleGetRoleList,
        roleId,
        getFirstInList,
        ...toRefs(compState),
        //添加接口
        handleAddRole,
        handleCancelRole,
        handleSureRole,
        roleName,
        //删除角色
        handleDelete,
        handleSelectRole,
        //修改角色
        handleEditRole,
        handleCancelEditRole,
        handleSureEditRole,
        //修改启用禁用
        handleUpdateStat,
        handleEditOk,
        displayTab,
        handleChangeShow,
        //权限配置
        hasPermission,
      };
    },
  });
</script>
<style lang="less">
  .warp-card {
    .role-list {
      padding: 10px 0;
      line-height: 30px;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .left {
      border-left: none;
    }
  }
</style>
