<template>
  <div class="flex justify-between">
    <SecondaryMenuLeft />
    <SecondaryMenuMid />
    <SecondaryMenuRight />
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import SecondaryMenuLeft from './secondary-menu-left/index.vue';
  import SecondaryMenuMid from './secondary-menu-mid/index.vue';
  import SecondaryMenuRight from './secondary-menu-right/index.vue';
  export default defineComponent({
    name: 'SecondaryMenu',
    components: {
      SecondaryMenuLeft,
      SecondaryMenuMid,
      SecondaryMenuRight,
    },
    setup() {
      return {};
    },
  });
</script>
<style lang="less"></style>
