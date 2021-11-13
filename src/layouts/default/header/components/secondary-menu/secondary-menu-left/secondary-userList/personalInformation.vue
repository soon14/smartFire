<template>
  <div style="padding: 0 80px">
    <a-row>
      <a-col :span="24" @click="returnPage"
        ><span> <LeftOutlined /></span>返回
      </a-col>
    </a-row>
    <a-row style="padding-top: 20px">
      <!-- 内容 -->
      <a-col :span="18" style="padding-right: 10px">
        <a-row>
          <!-- 基本信息 -->
          <a-col :span="12">
            <a-comment>
              <template #author>
                <div style="margin-bottom: 10px"
                  ><a-tag color="#7D25D5">{{ userData.postName }}</a-tag></div
                >
                <a style="font-size: 30px; color: #fff">{{ userData.personName }}</a>
                <span style="margin-left: 50px"
                  ><a-tag color="processing" @click="updataInformation(userData)"
                    >修改信息</a-tag
                  ></span
                >
              </template>
              <template #avatar>
                <a-avatar
                  :src="userData.signaturePath"
                  shape="square"
                  :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
                  alt="Han Solo"
                />
              </template>
              <template #content>
                <a-descriptions title="基本信息">
                  <a-descriptions-item label="岗位">{{ userData.postName }}</a-descriptions-item>
                  <a-descriptions-item label="部门">{{ userData.deptName }}</a-descriptions-item>
                  <a-descriptions-item label="所属角色">{{
                    userData.roleName
                  }}</a-descriptions-item>
                  <a-descriptions-item label="性别" v-if="userData.gender == 1"
                    >男</a-descriptions-item
                  >
                  <a-descriptions-item label="性别" v-if="userData.gender == 2"
                    >女</a-descriptions-item
                  >
                  <a-descriptions-item label="手机号"
                    >{{ userData.contactPhone }}
                  </a-descriptions-item>
                </a-descriptions>
              </template>
            </a-comment>
          </a-col>
          <!-- 年度信息统计 -->
          <a-col :span="12">
            <a-row>
              <a-card title="年度信息统计" style="width: 100%">
                <a-space align="center" size="20">
                  <a-col style="width: 200px; padding-right: 10px">
                    <a-card title="请销假统计">ffdfg</a-card></a-col
                  >
                  <a-col style="width: 200px; padding-right: 10px">
                    <a-card title="用车统计">ffdfg</a-card></a-col
                  >
                  <a-col style="width: 200px; padding-right: 10px">
                    <a-card title="出警统计">ffdfg</a-card></a-col
                  >
                </a-space>
              </a-card>
            </a-row>
          </a-col>
        </a-row>
        <!-- 统计 -->
        <a-row style="padding-top: 10px">
          <a-card style="height: 100%; width: 100%" />
        </a-row>
      </a-col>
      <!-- 个人信息 -->
      <a-col :span="6">
        <a-card style="height: 100%; width: 100%">
          <a-card style="height: 100%; width: 100%">
            <a-comment>
              <template #author>
                <a><UserOutlined :style="{ fontSize: '30px' }" /></a>
                <span style="margin-left: 20px; font-size: 30px; color: #fff">登录信息</span>
              </template>
              <template #content>
                <a-descriptions>
                  <a-descriptions-item label="登陆账号">{{ userData.account }}</a-descriptions-item>
                </a-descriptions>
              </template>
            </a-comment>
          </a-card>
          <a-card style="height: 100%; width: 100%; margin-top: 10px">
            <a-list>
              <a-list-item>
                <a-list-item-meta>
                  <template #title> 服役部队 </template>
                </a-list-item-meta>
                <div>{{ userData.serviceTroops }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 入伍时间 </template>
                </a-list-item-meta>
                <div>{{ userData.enlistmentTime }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 入伍年限 </template>
                </a-list-item-meta>
                <div>{{ userData.enlistmentYears }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 入队时间 </template>
                </a-list-item-meta>
                <div>{{ userData.joinDate }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 电话 </template>
                </a-list-item-meta>
                <div>{{ userData.contactPhone }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 生日 </template>
                </a-list-item-meta>
                <div>{{ userData.birth }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 户口所在地 </template>
                </a-list-item-meta>
                <div>{{ userData.registeredAddress }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 现居住地 </template>
                </a-list-item-meta>
                <div>{{ userData.nowAddress }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 学历 </template>
                </a-list-item-meta>
                <div>{{ userData.eduBackground }}</div>
              </a-list-item>

              <a-list-item>
                <a-list-item-meta>
                  <template #title> 专业 </template>
                </a-list-item-meta>
                <div>{{ userData.major }}</div>
              </a-list-item>
            </a-list>
          </a-card>
        </a-card>
      </a-col>
    </a-row>
    <updata-information-modal @register="updataInformationFrom" />
  </div>
</template>
<script lang="ts">
  import { Card, Row, Col, Comment, Avatar, Descriptions, Tag, Space, List } from 'ant-design-vue';
  import { defineComponent, onMounted, ref, unref, computed } from 'vue';
  import { LeftOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { userInfo2 } from '/@/api/sys/user';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import updataInformationModal from './components/updataInformation.vue';
  //跳转页面
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    components: {
      [Card.name]: Card,
      [Row.name]: Row,
      [Col.name]: Col,
      LeftOutlined,
      [Comment.name]: Comment,
      [Avatar.name]: Avatar,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Tag.name]: Tag,
      [Space.name]: Space,
      UserOutlined,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      updataInformationModal,
    },
    setup() {
      const [updataInformationFrom, { openModal: updataInformationFromModel }] = useModal();
      const userData = ref({});
      const go = useGo();
      // 路由数据
      const { currentRoute } = useRouter();
      onMounted(() => {
        init();
      });
      async function init() {
        const params = computed(() => {
          console.log('路由传过来的值', params);
          return unref(currentRoute).params;
        });
        console.log('params==>', params);
        userData.value = await userInfo2({ userId: params.value.id });
        console.log('userData==>', userData.value);
      }
      function returnPage() {
        go('/dashboard/analysis');
      }
      function updataInformation(userdata) {
        console.log('userdata==>', userdata);
        const tempData = Object.assign({}, { userdata });
        updataInformationFromModel(true, tempData);
      }
      return {
        userData,
        returnPage,
        updataInformation,
        updataInformationFrom,
      };
    },
  });
</script>
<style lang="less" scoped></style>
