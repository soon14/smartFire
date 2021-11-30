<template>
  <!-- 被喜欢的菜 -->
  <div class="box">
    <div>
      <ul>
        <li class="morning">早</li>
        <li v-for="item in breakfast" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <img style="width: 100%; height: 70%" :src="item.path" class="img" />
            <h3> {{ item.foodName }}</h3>
            <h5> 喜欢次数:{{ item.likeDate }}</h5>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Medium_late">中/晚</li>
        <li v-for="item in MediumLate" :key="item.id" class="fastFood">
          <div class="LunchAndDinnerMenu">
            <img style="width: 100%; height: 80%" :src="item.path" />
            <h3> {{ item.foodName }}</h3>
            <h5> 喜欢次数:{{ item.likeDate }}</h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { likeFoodList } from '/@/api/menuLibrary/menuLibrary';
  // import { Icon } from '/@/components/Icon';
  // import { PlusCircleOutlined } from '@ant-design/icons-vue';
  // import RecipeSetting from './recipeSetting.vue';
  import noPicture from '/@/assets/images/noPicture.png';
  export default defineComponent({
    components: {
      // Icon,
      // PlusCircleOutlined,
      // RecipeSetting,
    },
    setup() {
      const breakfast = ref({});
      const LunchAndDinner = ref({});
      const MediumLate = ref({});
      onMounted(() => {
        init();
      });
      //查询菜谱列表
      async function init() {
        console.log('刷新数据');
        //被喜欢的菜
        const likeFoodListData = await likeFoodList({});
        const FoodData = likeFoodListData.list;

        //早餐
        breakfast.value = FoodData.filter((FoodData) => {
          if (FoodData.path == null) {
            FoodData.path = noPicture;
          }
          return FoodData.type == 1;
        });

        //中、晚餐
        MediumLate.value = FoodData.filter((FoodData) => {
          if (FoodData.path == null) {
            FoodData.path = noPicture;
          }
          return FoodData.type == 2;
        });
      }

      return {
        breakfast,
        MediumLate,
        LunchAndDinner,
        init,
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
    width: 300px;
    height: 200px;
    background-color: #111a69;
  }

  .LunchAndDinnerMenu {
    width: 300px;
    height: 300px;
    background-color: #111a69;
  }
</style>
