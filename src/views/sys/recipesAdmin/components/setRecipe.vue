<template>
  <!-- 菜单库 -->

  <div class="box">
    <!-- <a-week-picker  @change="onChange"  placeholder="Select week" /> -->
    <div>
      <ul>
        <li class="morning">早</li>
        <li class="add_recipe" @click="addMenu"> <PlusCircleOutlined />添加菜谱</li>
        <li v-for="item in breakfast" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <img style="width: 100%; height: 70%" :src="item.path" class="img" />
            <h3> {{ item.foodName }}</h3>
            <h5> 备注:{{ item.desc }}</h5>
            <div class="actionSheet" style="z-index: 3">
              <Icon
                class="cursor-pointer"
                icon="icon-park-outline:delete"
                :size="38"
                @click="handleDelete(item)"
              />
              <Icon
                class="cursor-pointer"
                icon="clarity:note-edit-line"
                :size="38"
                @click="updata(item)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Medium_late">中</li>
        <li class="add_recipe2" @click="LunchAdd"><PlusCircleOutlined />添加菜谱</li>
        <li v-for="item in lunch" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <img style="width: 100%; height: 70%" :src="item.path" />
            <h3> {{ item.foodName }}</h3>
            <h5> 备注:{{ item.desc }}</h5>
            <span class="actionSheet" style="z-index: 3">
              <Icon
                class="cursor-pointer"
                icon="icon-park-outline:delete"
                :size="38"
                @click="handleDelete(item)"
              />
              <Icon
                class="cursor-pointer"
                icon="clarity:note-edit-line"
                :size="38"
                @click="LunchUpdata(item)"
              />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div style="margin-top: 1%">
      <ul>
        <li class="Medium_late">晚</li>
        <li class="add_recipe2" @click="DinnerAdd"><PlusCircleOutlined />添加菜谱</li>
        <li v-for="item in dinner" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <img style="width: 100%; height: 70%" :src="item.path" />
            <h3> {{ item.foodName }}</h3>
            <h5> 备注:{{ item.desc }}</h5>
            <span class="actionSheet" style="z-index: 3">
              <Icon
                class="cursor-pointer"
                icon="icon-park-outline:delete"
                :size="38"
                @click="handleDelete(item)"
              />
              <Icon
                class="cursor-pointer"
                icon="clarity:note-edit-line"
                :size="38"
                @click="DinnerUpdata(item)"
              />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <SetRecipeModal @register="updateRecipeModal" @requestRecipe="init" />
    <SetAddRecipeModal @register="addRecipeModal" @requestRecipe="init" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { foodList, deleteFood } from '/@/api/menuLibrary/menuLibrary';
  import { Icon } from '/@/components/Icon';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PlusCircleOutlined } from '@ant-design/icons-vue';
  import SetRecipeModal from './setRecipeModal.vue';
  import SetAddRecipeModal from './setAddRecipeModal.vue';
  import { useModal } from '/@/components/Modal';
  // import { WeekPicker } from 'ant-design-vue';
  const { createMessage, createConfirm } = useMessage();
  const [updateRecipeModal, { openModal }] = useModal();
  const [addRecipeModal, { openModal: addRecipeOpenModal }] = useModal();
  import noPicture from '/@/assets/images/noPicture.png';
  export default defineComponent({
    components: {
      Icon,
      PlusCircleOutlined,
      SetRecipeModal,
      SetAddRecipeModal,
      // 'a-week-picker': WeekPicker,
    },
    setup() {
      const breakfast = ref({});
      const lunch = ref({});
      const dinner = ref({});
      onMounted(() => {
        init();
        getWeekTime();
      });
      //菜单列表
      async function init() {
        console.log('刷新数据');
        const foodListData = await foodList({});
        const allFoodListData = foodListData.list;

        //早餐
        breakfast.value = allFoodListData.filter((allFoodListData) => {
          console.log('allFoodListData==>', allFoodListData);
          if (allFoodListData.path == null) {
            allFoodListData.path = noPicture;
          }
          return allFoodListData.type == 1;
        });
        //中餐
        lunch.value = allFoodListData.filter((allFoodListData) => {
          if (allFoodListData.path == null) {
            allFoodListData.path = noPicture;
          }
          return allFoodListData.type == 2;
        });
        //晚餐
        dinner.value = allFoodListData.filter((allFoodListData) => {
          if (allFoodListData.path == null) {
            allFoodListData.path = noPicture;
          }
          return allFoodListData.type == 3;
        });
      }

      function getWeekTime() {
        let nowData = new Date();
        //获取今天的是周几
        let currentDay = nowData.getDay();
        //把currentDay == 0赋值给周日
        if (currentDay == 0) {
          currentDay = 7;
        }
        // 获取周一的时间戳
        let monDayTime = nowData.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000;
        console.log('周一是' + new Date(monDayTime).getDate() + '号');
        // 获取周日的时间戳
        let sunDayTime = nowData.getTime() + (7 - currentDay) * 24 * 60 * 60 * 1000;
        console.log('周日是' + new Date(sunDayTime).getDate() + '号');
        // 获取本周周一的具体时间
        console.log('周一 ' + new Date(monDayTime).toLocaleDateString());
        // 获取本周周日的具体时间
        console.log('周末' + new Date(sunDayTime).toLocaleDateString());
        // 获取当前时间的具体时间
        console.log('当前时间' + new Date(monDayTime).toLocaleTimeString());
      }

      function handleDelete(data) {
        console.log('data==>', data);
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '是否确认删除？',
          onOk: async () => {
            await deleteFood({
              foodMenuId: data.id,
            });
            createMessage.success('删除成功');
            init();
          },
        });
      }
      //添加早菜谱
      function addMenu() {
        addRecipeOpenModal(true, { type: 1 });
      }
      //修改早菜谱
      function updata(data) {
        console.log(data);
        data.type = 1;
        openModal(true, data);
      }

      //添加中菜谱
      function LunchAdd() {
        addRecipeOpenModal(true, { type: 2 });
      }
      //添加晚菜谱
      function DinnerAdd() {
        addRecipeOpenModal(true, { type: 3 });
      }

      //修改 中菜谱
      function LunchUpdata(data) {
        data.type = 2;
        openModal(true, data);
      }
      //修改 晚菜谱
      function DinnerUpdata(data) {
        data.type = 3;
        openModal(true, data);
      }

      function onChange(date: Moment, dateString: string[]) {
        console.log(date, dateString);
      }

      // 删除  晚/中菜谱
      // function MediumLateDelete(data) {
      //   createConfirm({
      //     iconType: 'warning',
      //     title: '提示',
      //     content: '是否确认删除？',
      //     onOk: async () => {
      //       await deleteFoodMenu({
      //         foodMenuId: data.id,
      //       });
      //       createMessage.success('删除成功');
      //       init();
      //     },
      //   });
      // }
      return {
        breakfast,
        lunch,
        dinner,
        handleDelete,
        addMenu,
        updata,
        updateRecipeModal,
        addRecipeModal,
        init,
        LunchUpdata,
        DinnerUpdata,
        LunchAdd,
        DinnerAdd,
        onChange,
      };
    },
  });
</script>
<style scoped lang="less">
  * {
    padding: 0;
    margin-bottom: 0;
    border: 0;
  }

  .box {
    width: 101%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-top: 5%;
  }

  ul {
    display: inline;
    white-space: nowrap;
  }

  ul li {
    padding: 10px 20px;
    display: inline-block;
    white-space: nowrap;
    vertical-align: top;
  }

  .morning {
    width: 100px;
    height: 200px;
    background-color: #111a69;
    text-align: center;
    line-height: 200px;
  }

  .Medium_late {
    width: 100px;
    height: 200px;
    background-color: #111a69;
    margin-top: 4% 3%;
    text-align: center;
    line-height: 200px;
  }

  .add_recipe {
    width: 300px;
    height: 200px;
    background-color: #111a69;
    margin-left: 1%;
    text-align: center;
    line-height: 200px;
  }

  .add_recipe2 {
    width: 300px;
    height: 200px;
    background-color: #111a69;
    margin-left: 1%;
    text-align: center;
    line-height: 200px;
  }

  .fastFood {
    padding-top: 0%;
  }

  .breakfastFoodMenu {
    position: relative;
    width: 300px;
    height: 200px;
    background-color: #111a69;
  }

  .LunchMenu {
    width: 300px;
    height: 200px;
    background-color: #111a69;
  }

  .DinnerMenu {
    width: 300px;
    height: 200px;
    background-color: #111a69;
  }

  .breakfastFoodMenu:hover {
    width: 300px;
    height: 200px;
    border-radius: 8px;
    content: '';
    background-color: #00000080;

    /* opacity: 0; */
    transition: all 0.3s;
    z-index: 1;
    opacity: 1;
  }

  .actionSheet {
    position: absolute;
    top: 40%;
    left: 30%;
    display: none;
  }

  .breakfastFoodMenu:hover .actionSheet {
    display: inline;
  }
</style>
