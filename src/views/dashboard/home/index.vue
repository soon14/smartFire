<template>
  <div class="flex home-page">
    <div class="flex-none" style="width: 436px"><HomeLeft /></div>
    <div class="relative flex-1"><HomeMid /></div>
    <div class="flex-none" style="width: 400px"><HomeRight /></div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import HomeLeft from './components/HomeLeft.vue';
  import HomeMid from './components/HomeMid.vue';
  import HomeRight from './components/HomeRight.vue';
  export default defineComponent({
    name: 'HomePage',
    components: {
      HomeLeft,
      HomeMid,
      HomeRight,
    },
    setup() {
      return {};
    },
  });
</script>
<style lang="less">
  .home-page {
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
</style>
