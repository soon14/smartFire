<template>
  <div class="foot">
    <div class="foot_text1">
      <div class="foot_text">
        <div class="morning">早</div>
        <div class="add_recipe">添加菜谱</div>
      </div>
      <div class="foot_text">
        <div class="Medium_late">中/晚</div>
        <div class="add_recipe">添加菜谱</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({});
</script>
<style scoped>
  .foot {
    width: 1700px;
    height: 700px;
    overflow: auto;
  }

  /* .foot_text {
  width: 300px;
  height: 100%;
  display: inline-block; 
} */
  .foot_text1 {
    width: 1800px;
    height: 100%;
    overflow: auto;
  }

  .morning {
    width: 200px;
    height: 200px;
    background-color: #111a69;
    text-align: center;
    line-height: 200px;
    font-size: 30px;
  }

  .Medium_late {
    width: 200px;
    height: 300px;
    background-color: #111a69;
    margin-top: 3%;
    text-align: center;
    line-height: 300px;
    font-size: 30px;
  }

  /* .add_recipe {
  } */
</style>
