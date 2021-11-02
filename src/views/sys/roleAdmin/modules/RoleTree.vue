<template>
  <!--div 功能权限部分 start-->
  <div id="tree" v-if="hasPermission(['1-9-16'])">
    <Loading :loading="loading" :absolute="absolute" :tip="tip" />
    <a-row>
      <a-col class="col-desc" span="16">设置角色对应的功能操作、后台管理权限</a-col>
      <a-col class="button-style" span="8">
        <a-button @click="saveChange()" style="margin-right: 20px" type="primary">保存</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-button type="link" @click="getallauth"> 一键全选 </a-button>
    </a-row>
    <!--CheckboxGroup 功能权限勾选部分 start-->
    <div style="width: 100%">
      <div class="checked-box">
        <ul style="border: 1px solid #ccc">
          <!--li 一级权限模块 start-->
          <li v-for="(module, moduleIndex) in tree" :key="module.id">
            <div class="level-one" style="background-color: #0e235a">
              <Checkbox v-model:checked="module.value" @click="handleall(tree, moduleIndex)">
                {{ module.name }}
              </Checkbox>
              <!--              <i v-if="!module.value" style="font-size: 12px;" class="el-icon-circle-plus-outline" @click="handleall(tree, moduleIndex)" />-->
              <!--              <i v-else class="el-icon-delete" style="font-size: 12px;" @click="handleall(tree, moduleIndex)" />-->
              <!--            <span class="level-one" style="font-size:12px;">{{ module.name }}1111</span>-->
            </div>
            <!--div 二级权限模块 start-->
            <div
              v-for="(childrenModule, childrenModuleIndex) in module.authorityVos"
              :key="childrenModule.id"
              class="level-teo"
              style="background-color: #0e235a"
            >
              <Checkbox
                v-model:checked="childrenModule.value"
                class="level-teo-label"
                @click="handleCheckAll(module.authorityVos, childrenModuleIndex, module.id, module)"
              >
                {{ childrenModule.name }}
              </Checkbox>
              <!--              <i v-if="!childrenModule.value" style="font-size: 12px;" class="el-icon-circle-plus-outline" @click="handleCheckAll(module.authorityVos,childrenModuleIndex,module.id,module)" />-->
              <!--              <i v-else class="el-icon-delete" style="font-size: 12px;" @click="handleCheckAll(module.authorityVos,childrenModuleIndex,module.id,module)" />-->
              <!--            <span class="level-teo-label" style="font-size:12px;">{{ childrenModule.name }}</span>-->
              <!--div 三级权限模块 start-->
              <CheckboxGroup v-model:value="checkedData">
                <div class="level-three">
                  <template
                    v-for="(pages, pagesIndex) in childrenModule.authorityVos"
                    :key="pages.id"
                  >
                    <div v-if="pages.children && pages.children.length > 0" class="isLevel-four">
                      <Checkbox
                        :key="pages.key"
                        :value="pages.key"
                        class="level-three-label"
                        @click="
                          selectCheckbox(
                            childrenModule.authorityDetails,
                            pagesIndex,
                            module.authorityVos,
                          )
                        "
                      >
                        {{ pages.name }}
                      </Checkbox>
                      <div v-if="pages.children.length > 0" :key="pagesIndex" class="Level-four">
                        <template v-for="(page, pageIndex) in pages.children" :key="page.id">
                          <Checkbox
                            :value="page.key"
                            @click="
                              selectCheckbox(
                                pages.children,
                                pageIndex,
                                childrenModule.children,
                                module.authorityVos,
                              )
                            "
                          >
                            {{ page.name }}
                          </Checkbox>
                        </template>
                      </div>
                    </div>
                    <Checkbox
                      v-else
                      :value="module.id + '-' + childrenModule.id + '-' + pages.id"
                      @click.prevent="
                        selectCheckbox2(
                          childrenModule.authorityVos,
                          pagesIndex,
                          childrenModule.id,
                          module.id,
                          childrenModule,
                          module,
                        )
                      "
                    >
                      {{ pages.name }}
                    </Checkbox>
                  </template>
                </div>
              </CheckboxGroup>
              <!--div 三级权限模块 end-->
            </div>
            <!--div 二级权限模块 end-->
          </li>
          <!--li 一级权限模块 end-->
        </ul>
      </div>
    </div>
    <!--CheckboxGroup 功能权限勾选部分 end-->
  </div>
  <!--div 功能权限部分 end-->
</template>
<script lang="ts">
  import { Row, Col, Checkbox } from 'ant-design-vue';
  // import { getAuthority } from '/@/api/system/role';
  import { defineComponent, onMounted, reactive, toRaw, watch, toRefs } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { updateRole, getAuthorityDetailList } from '/@/api/sys/role';
  import { Loading } from '/@/components/Loading';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  export default defineComponent({
    name: 'RoleTree',
    components: {
      Loading,
      [Col.name]: Col,
      [Row.name]: Row,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
    },
    props: {
      // 角色id
      checkedString: {
        type: String,
        required: true,
      },
      roleId: {
        type: Number,
        required: true,
      },
    },
    setup(props, context) {
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: '加载中...',
      });
      const componentStat = reactive({
        tree: [],
        checkedData: [],
      });
      onMounted(async () => {
        compState.loading = true;
        await getListPrivilegeByRoleId(props.roleId);
        compState.loading = false;
      });
      // 获取角色可选的功能权限
      async function getListPrivilegeByRoleId() {
        try {
          let response = await getAuthorityDetailList();
          let datas = response.content;
          console.log('datas==>', datas);
          componentStat.tree = datas;
        } catch (e) {
          console.error(e);
        }
      }
      const { createMessage } = useMessage();
      const { success } = createMessage;
      async function saveChange() {
        // if (componentStat.checkedData.length === 0) {
        //   warning('请选择权限');
        //   return false;
        // }
        const authority = toRaw(componentStat.checkedData)?.join(',');
        const id = props.roleId;
        await updateRole({
          authority,
          roleId: id,
        });
        success('创建成功');
        context.emit('editOk');
      }
      // 自定义一级节点方法
      function handleall(currentModuleList, moduleIndex) {
        // console.log('一级节点点击方法', currentModuleList, moduleIndex)
        const mymodule = currentModuleList[moduleIndex];
        mymodule.value = !mymodule.value;
        for (const i in mymodule.authorityVos) {
          mymodule.authorityVos[i];
          handleCheckAll(mymodule.authorityVos, Number(i), mymodule.id, mymodule);
        }
      }
      // 自定义二级节点方法
      function handleCheckAll(currentModuleList, moduleIndex, upOneModuleList, upOneModule) {
        // console.log('二级节点点击方法', currentModuleList, moduleIndex, upOneModuleList, upOneModule)
        const mymodule = currentModuleList[moduleIndex];
        mymodule.value = !mymodule.value;
        for (const i in mymodule.authorityVos) {
          const label = upOneModuleList + '-' + mymodule.id + '-' + mymodule.authorityVos[i].id;
          const findIndex = componentStat.checkedData.findIndex((val) => val == label);
          if (findIndex != -1) {
            if (mymodule.value == false) {
              componentStat.checkedData.splice(findIndex, 1);
            }
          } else {
            if (mymodule.value == true) {
              componentStat.checkedData.push(label);
            }
          }
          if (currentModuleList.every((item) => item.value == true)) {
            upOneModule.value = true;
          } else {
            upOneModule.value = false;
          }
        }
      }
      // 自定义三级节点方法
      function selectCheckbox2(
        currentModuleList,
        moduleIndex,
        upOneModuleList,
        uptwoModuleList,
        fatherModule,
        topmodule,
      ) {
        //  console.log('三级节点点击方法', currentModuleList, moduleIndex, upOneModuleList,  uptwoModuleList,fatherModule, topmodule)
        const module = currentModuleList[moduleIndex];
        const thisLabel = uptwoModuleList + '-' + upOneModuleList + '-' + module.id;
        const findIndex = componentStat.checkedData.indexOf(thisLabel);
        if (findIndex != -1) {
          const newArray = [...toRaw(componentStat.checkedData)];
          newArray.splice(findIndex, 1);
          componentStat.checkedData = newArray;
          module.flag = false;
          topmodule.value = false;
          // return false;
        } else {
          const newArray = [...toRaw(componentStat.checkedData)];
          newArray.push(thisLabel);
          componentStat.checkedData = newArray;
          module.flag = true;
        }
        if (currentModuleList.every((item) => item.flag == true)) {
          fatherModule.value = true;
        } else {
          fatherModule.value = false;
        }
        if (topmodule.authorityVos.every((item) => item.value == true)) {
          topmodule.value = true;
        } else {
          topmodule.value = false;
        }
      }
      // 一键全选
      function getallauth() {
        const allauth = [];
        for (const i in componentStat.tree) {
          const topid = componentStat.tree[i].id;
          let midid = null;
          let finid = null;
          componentStat.tree[i].value = true;
          if (componentStat.tree[i].authorityVos) {
            console.log(1);
            for (const j in componentStat.tree[i].authorityVos) {
              midid = componentStat.tree[i].authorityVos[j].id;
              componentStat.tree[i].authorityVos[j].value = true;
              if (componentStat.tree[i].authorityVos[j].authorityVos) {
                for (const k in componentStat.tree[i].authorityVos[j].authorityVos) {
                  finid = componentStat.tree[i].authorityVos[j].authorityVos[k].id;
                  const ladel = `${topid}-${midid}-${finid}`;
                  allauth.push(ladel);
                }
              }
            }
          }
        }
        componentStat.checkedData = allauth;
        console.log(
          '🚀 ~ file: RoleTree.vue ~ line 287 ~ getallauth ~ componentStat.checkedData',
          componentStat.checkedData,
        );
      }
      function clearSelect() {
        for (const i in componentStat.tree) {
          componentStat.tree[i].value = false;
          if (componentStat.tree[i].authorityVos) {
            for (const j in componentStat.tree[i].authorityVos) {
              componentStat.tree[i].authorityVos[j].value = false;
            }
          }
        }
        componentStat.checkedData = [];
      }
      watch(
        () => props.checkedString,
        () => {
          console.log('props.checkedString==>', props.checkedString);
          clearSelect();
          componentStat.checkedData = (props.checkedString && props.checkedString.split(',')) || [];
        },
        {
          immediate: true,
          deep: true,
        },
      );
      return {
        saveChange,
        selectCheckbox2,
        handleall,
        handleCheckAll,
        getallauth,
        clearSelect,
        ...toRefs(componentStat),
        ...toRefs(compState),
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  .link-type {
    color: #409eff;
    cursor: pointer;
  }

  #tree {
    border-top: none;
  }

  .col-desc {
    padding: 0 20px;
    margin: 20px 0;
    font-size: 15px;
    color: #95a5a6;
  }

  .button-style {
    padding-left: 20px;
    margin: 20px 0 20px 0;
    text-align: right;
  }

  .check-right {
    margin-right: 20px;
  }

  .row-border {
    border: 1px solid #f0f0f0;
  }

  .col-border {
    padding-left: 20px;
    line-height: 50px;
    border-right: 1px solid #f0f0f0;
  }

  .col-left {
    padding-left: 40px;
    line-height: 50px;
    border-right: 1px solid #f0f0f0;
  }

  .col-right {
    padding-left: 20px;
    border-right: 1px solid #f0f0f0;
  }

  .ivu-tree ul li {
    white-space: normal;
  }

  .ivu-tree {
    > ul {
      > li {
        > ul {
          > li {
            .ivu-tree-title {
              font-weight: bold;
              vertical-align: middle;
            }

            > ul {
              display: inline-block;

              .ivu-tree-title {
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }

  .checked-box {
    padding: 0 15px;

    ul {
      padding: 0;
      margin: 0;

      li {
        padding: 0;
        margin: 0;
        list-style: none;

        .level-one {
          padding: 10px 8px;
          background-color: #f2f3f5;
          border-bottom: 1px solid rgb(240, 240, 240);
        }

        .level-teo {
          position: relative;
          display: flex;
          align-items: center;
          margin-left: 4%;
          line-height: 40px;
          border-bottom: 1px solid rgb(240, 240, 240);

          .level-teo-label {
            width: 12%;
            min-width: 120px;
          }
          // &:before{ content: '';  position: absolute; height: 100%; width: 1px; background: rgb(240, 240, 240); left: 12%; top: 0; }
          .level-three {
            display: block;
            min-height: 40px;
            padding-left: 10px;
            flex: 1;
            border-left: 1px rgb(240, 240, 240) solid;

            .isLevel-four {
              display: flex;
              align-items: center;

              .level-three-label {
                width: 12%;
                min-width: 120px;
              }

              .Level-four {
                min-height: 40px;
                padding-left: 4%;
                flex: 1;
                border-left: 1px rgb(240, 240, 240) solid;
              }
            }
          }
        }

        .ivu-checkbox-wrapper {
          margin-right: 15px;
        }
      }
    }
  }

  .ant-checkbox-group {
    line-height: unset;
  }
</style>
