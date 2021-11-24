<template>
  <div style="position: relative">
    <div class="back" @click="backList">返回</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    name: 'FrameBlank',
    setup() {
      const go = useGo();
      const backList = () => {
        go('/flow/flowDraw');
      };
      return {
        backList,
      };
    },
  });
</script>
<style scoped>
  .back {
    position: absolute;
    height: 54px;
    width: 63px;
    line-height: 54px;
    z-index: 555;
    text-align: center;
    background-color: #3296fa;
    cursor: pointer;
  }
</style>
