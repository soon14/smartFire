<template>
  <!-- 食谱评价列表 -->
  <div class="box">
    <!-- <div class="week"> 日期:<RangePicker :size="large" @change="handleChange"></RangePicker> </div> -->
    <div>
      <ul>
        <li class="morning">早</li>
        <!-- <li class="add_recipe" @click="addMenu"> <PlusCircleOutlined />添加菜谱</li> -->
        <li v-for="item in breakfast" :key="item.id" class="fastFood">
          <div class="breakfastFoodMenu">
            <div>
              <span v-if="item.grade === 1"
                >打分：<span style="color: #1890ff; font-size: 30px">差</span>
              </span>
              <span v-if="item.grade === 2"
                >打分：<span style="color: #1890ff; font-size: 30px">中等</span>
              </span>
              <span v-if="item.grade === 3"
                >打分：<span style="color: #1890ff; font-size: 30px">好</span>
              </span>
              <span style="float: right; padding-top: 20px"
                >评价人：{{ item.commentPersonName }}
              </span>
            </div>
            {{ item.content }}
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Medium">中</li>
        <!-- <li class="add_recipe2" @click="MediumLateAdd"><PlusCircleOutlined />添加菜谱</li> -->
        <li v-for="item in lunch" :key="item.id" class="fastFood">
          <div class="LunchAndDinnerMenu">
            <div>
              <span v-if="item.grade === 1"
                >打分：<span style="color: #1890ff; font-size: 30px">差</span>
              </span>
              <span v-if="item.grade === 2"
                >打分：<span style="color: #1890ff; font-size: 30px">中等</span>
              </span>
              <span v-if="item.grade === 3"
                >打分：<span style="color: #1890ff; font-size: 30px">好</span>
              </span>
              <span style="float: right; padding-top: 20px"
                >评价人：{{ item.commentPersonName }}
              </span>
            </div>
            {{ item.content }}
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="late">晚</li>
        <!-- <li class="add_recipe2" @click="MediumLateAdd"><PlusCircleOutlined />添加菜谱</li> -->
        <li v-for="item in dinner" :key="item.id" class="fastFood">
          <div class="LunchAndDinnerMenu">
            <div>
              <span v-if="item.grade === 1"
                >打分：<span style="color: #1890ff; font-size: 30px">差</span>
              </span>
              <span v-if="item.grade === 2"
                >打分：<span style="color: #1890ff; font-size: 30px">中等</span>
              </span>
              <span v-if="item.grade === 3"
                >打分：<span style="color: #1890ff; font-size: 30px">好</span>
              </span>
              <span style="float: right; padding-top: 20px"
                >评价人：{{ item.commentPersonName }}
              </span>
            </div>
            {{ item.content }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { commentList } from '/@/api/menuLibrary/menuLibrary';
  // import { RangePicker } from 'ant-design-vue';
  // import { Icon } from '/@/components/Icon';
  export default defineComponent({
    components: {
      // Icon,
      // PlusCircleOutlined,
      // RecipeSetting,
      // RangePicker,
    },
    setup() {
      const breakfast = ref({});
      const dinner = ref({});
      const lunch = ref({});
      onMounted(() => {
        init();
      });
      const dataList = ref({});
      //评价列表
      async function init() {
        console.log('刷新数据');

        //   0: "2021-11-22"
        //1: "2021-11-28"
        //评价列表
        const foodMenuListData = await commentList({
          beginTime: '2021-11-22',
          endTime: '2021-11-28',
        });
        const menuList = foodMenuListData.list;
        // 早 type=  1中  type=  2  晚 type=  3
        //早餐
        breakfast.value = menuList.filter((textdata) => {
          return textdata.type == 1;
        });

        //中餐
        lunch.value = menuList.filter((textdata) => {
          return textdata.type == 2;
        });
        //晚餐
        dinner.value = menuList.filter((textdata) => {
          return textdata.type == 3;
        });
        //  console.log("breakfast.value==>",breakfast.value.length)
        //打分计算
        for (var i = 0; breakfast.value.length > i; i++) {
          console.log(breakfast.value[i].grade);
        }
      }

      return {
        breakfast,
        init,
        // handleChange,
        dataList,
        lunch,
        dinner,
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
    padding-top: 2%;
    position: relative;
  }

  ul {
    display: inline;
    white-space: nowrap;
  }

  ul li {
    display: inline-block;
    white-space: nowrap;
    vertical-align: top;
  }

  .morning {
    width: 100px;
    height: 200px;
    background-color: #111a69;
    text-align: center;
    line-height: 80px;
  }

  .Medium,
  .late {
    width: 100px;
    height: 200px;
    background-color: #111a69;
    margin-top: 1%;
    text-align: center;
    line-height: 80px;
  }

  .week {
    position: absolute;
    top: 0;
    right: 60px;
  }

  .breakfastFoodMenu {
    width: 300px;
    height: 200px;
    background-color: #111a69;
    margin: 0% 3%;
  }

  .LunchAndDinnerMenu {
    width: 300px;
    height: 200px;
    background-color: #111a69;
    margin: 6% 3%;
  }
</style>
