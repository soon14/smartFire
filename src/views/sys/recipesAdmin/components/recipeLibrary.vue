<template>
  <!-- 菜单库 -->
  <div class="box">
    <div>
      <ul>
        <li class="morning">早</li>
        <li class="add_recipe" @click="addMenu"> <PlusCircleOutlined />添加菜谱</li>
        <li v-for="item in breakfast" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <img style="width: 100%; height: 70%" :src="item.path" class="img" />
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
                @click="updata(item)"
              />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Medium_late">中/晚</li>
        <li class="add_recipe2" @click="MediumLateAdd"><PlusCircleOutlined />添加菜谱</li>
        <li v-for="item in LunchAndDinner" :key="item.id" class="fastFood">
          <div class="LunchAndDinnerMenu">
            <img style="width: 100%; height: 80%" :src="item.path" />
            <h3> {{ item.foodName }}</h3>
            <h5> 备注:{{ item.desc }}</h5>
            <span class="actionSheet1" style="z-index: 3">
              <Icon
                class="cursor-pointer"
                icon="icon-park-outline:delete"
                :size="38"
                @click="MediumLateDelete(item)"
              />
              <Icon
                class="cursor-pointer"
                icon="clarity:note-edit-line"
                :size="38"
                @click="MediumLateUpdata(item)"
              />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <RecipeSetting @register="RecipeModel" @requestRecipe="init" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { foodMenuList, deleteFoodMenu } from '/@/api/menuLibrary/menuLibrary';
  import { Icon } from '/@/components/Icon';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PlusCircleOutlined } from '@ant-design/icons-vue';
  import RecipeSetting from './recipeSetting.vue';
  import { useModal } from '/@/components/Modal';
  const { createMessage, createConfirm } = useMessage();
  const [RecipeModel, { openModal }] = useModal();
  import noPicture from '/@/assets/images/noPicture.png';
  export default defineComponent({
    components: {
      Icon,
      PlusCircleOutlined,
      RecipeSetting,
    },
    setup() {
      const breakfast = ref({});
      const LunchAndDinner = ref({});
      onMounted(() => {
        init();
      });
      //查询菜谱列表
      async function init() {
        console.log('刷新数据');
        //早餐
        const foodMenuListData = await foodMenuList({ type: 1 });
        for (var i = 0; foodMenuListData.list.length > i; i++) {
          console.log('ashs', foodMenuListData.list[i]);
          if (foodMenuListData.list[i].path == null) {
            foodMenuListData.list[i].path = noPicture;
          }
        }
        breakfast.value = foodMenuListData.list;
        console.log('breakfast==>', breakfast);
        //中/晚餐
        const foodMenuLunchList = await foodMenuList({ type: 2 });
        for (var i = 0; foodMenuListData.list.length > i; i++) {
          console.log('ashs', foodMenuListData.list[i]);
          if (foodMenuListData.list[i].path == null) {
            foodMenuListData.list[i].path = noPicture;
          }
        }
        LunchAndDinner.value = foodMenuLunchList.list;
        console.log('LunchAndDinner', LunchAndDinner);
      }
      function handleDelete(data) {
        console.log('data==>', data);
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '是否确认删除？',
          onOk: async () => {
            await deleteFoodMenu({
              foodMenuId: data.id,
            });
            createMessage.success('删除成功');
            init();
          },
        });
      }
      //添加早菜谱
      function addMenu() {
        openModal(true, { type: 1 });
      }
      //修改早菜谱
      function updata(data) {
        console.log(data);
        data.type = 1;
        openModal(true, data);
      }

      //添加晚/中菜谱
      function MediumLateAdd() {
        openModal(true, { type: 2 });
      }

      //修改 晚/中菜谱
      function MediumLateUpdata(data) {
        data.type = 2;
        openModal(true, data);
      }
      //删除  晚/中菜谱
      function MediumLateDelete(data) {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '是否确认删除？',
          onOk: async () => {
            await deleteFoodMenu({
              foodMenuId: data.id,
            });
            createMessage.success('删除成功');
            init();
          },
        });
      }
      return {
        breakfast,
        LunchAndDinner,
        handleDelete,
        addMenu,
        updata,
        RecipeModel,
        init,
        MediumLateAdd,
        MediumLateUpdata,
        MediumLateDelete,
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
    width: 200px;
    height: 200px;
    background-color: #111a69;
    text-align: center;
    line-height: 200px;
  }

  .Medium_late {
    width: 200px;
    height: 300px;
    background-color: #111a69;
    margin-top: 0% 3%;
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
    height: 300px;
    background-color: #111a69;
    margin-left: 1%;
    text-align: center;
    line-height: 300px;
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

  .LunchAndDinnerMenu {
    position: relative;
    width: 300px;
    height: 300px;
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

  .actionSheet1 {
    position: absolute;
    top: 40%;
    left: 30%;
    display: none;
  }

  .breakfastFoodMenu:hover .actionSheet {
    display: inline;
  }

  .LunchAndDinnerMenu:hover {
    width: 300px;
    height: 300px;
    border-radius: 8px;
    content: '';
    background-color: #00000080;

    /* opacity: 0; */
    transition: all 0.3s;
    z-index: 1;
    opacity: 1;
  }

  .LunchAndDinnerMenu:hover .actionSheet1 {
    display: inline;
  }
</style>
