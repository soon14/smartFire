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
              <template #avatar shape="square">
                <img
                  v-show="picture.pictureData.headPath !== ''"
                  :src="picture.pictureData.headPath"
                  :v-model="picture"
                  style="width: 150px; height: 150px"
                />
                <img
                  v-show="picture.pictureData.headPath == ''"
                  :src="picture.pictureData.img"
                  :v-model="picture"
                  style="width: 150px; height: 150px"
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
          <a-col
            :span="12"
            style="
              width: 100%;
              border: 1px solid #406ba9;
              background-color: #141f44;
              border-radius: 15px;
            "
          >
            <div style="padding: 10px 20px">年度信息统计</div>
            <div style="padding: 20px">
              <a-row :gutter="16">
                <a-col :span="8"> <a-card title="请销假统计">ffdfg</a-card></a-col>
                <a-col :span="8"> <a-card title="用车统计">ffdfg</a-card></a-col>
                <a-col :span="8"> <a-card title="出警统计">ffdfg</a-card></a-col>
              </a-row>
            </div>
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
  import { defineComponent, onMounted, ref, unref, computed, reactive } from 'vue';
  import { LeftOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { userInfo2 } from '/@/api/sys/user';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import updataInformationModal from './components/updataInformation.vue';
  //跳转页面
  import { useGo } from '/@/hooks/web/usePage';
  import { useUserStore } from '/@/store/modules/user';
  import { nodeStore } from '/@/store/modules/pictureList';
  import header from '/@/assets/images/header.jpg';
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
      const picture = reactive({
        pictureData: {
          picturePath: '',
          img: '',
        },
      });
      async function init() {
        const params = computed(() => {
          console.log('路由传过来的值', params);
          return unref(currentRoute).params;
        });
        console.log('params==>', params);
        userData.value = await userInfo2({ userId: params.value.id });
        console.log('userData==>', userData.value);

        //查看是否有token
        const userStore = useUserStore();
        const token = userStore.getToken;
        console.log('token', token);
        const nodeData = nodeStore();
        if (token) {
          nodeData.getNodeList(params.value.id);
          console.log('nodeData=>', nodeData);
          picture.pictureData = nodeData;
        }

        // 没有图片
        picture.pictureData.img = header;
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
        picture,
      };
    },
  });
</script>
<style lang="less" scoped></style>
