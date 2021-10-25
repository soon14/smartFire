<template>
  <div style="padding: 48px 16px 0 16px; position: absolute; width: 100%">
    <a-card style="box-shadow: 0 4px 26px #1f58ec" :bordered="false">
      <div>
        <NwowHeader title="营区宣传" />
        <div style="overflow: hidden; padding-top: 12px" class="home-page-swiper">
          <!-- Slider main container -->
          <swiper
            :modules="modules"
            :slides-per-view="2"
            :space-between="16"
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            style="height: 240px"
          >
            <swiper-slide>
              <Image
                width="100%"
                height="100%"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </swiper-slide>
            <swiper-slide>
              <Image
                width="100%"
                height="100%"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </swiper-slide>
            <swiper-slide>
              <Image
                width="100%"
                height="100%"
                src="http://192.168.1.89:9090/uploads/website/customerPic/2021/10/13/w8c1kuoyrmvz.webp"
              />
            </swiper-slide>
            <swiper-slide>
              <Image
                width="100%"
                height="100%"
                src="http://192.168.1.89:9090/uploads/website/customerPic/2021/10/13/w8c1kuoyrmvz.webp"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Card, Image } from 'ant-design-vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  // import Swiper core and required modules
  import { Pagination } from 'swiper';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  export default defineComponent({
    name: 'HomeMid',
    components: {
      'a-card': Card,
      NwowHeader,
      Swiper,
      SwiperSlide,
      Image,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Pagination],
      };
    },
  });
</script>
<style lang="less">
  .home-page-swiper {
    .swiper-pagination {
      text-align: right;
    }

    .swiper-pagination-bullet {
      width: 18px;
      height: 2px;
      display: inline-block;
      background: rgba(255, 255, 255, 0.45);
      opacity: 0.3;
      margin: 0 5px;
      border-radius: 0;
    }

    /* 自定义分页器激活时的样式表现 */
    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #fff;
    }
  }
</style>
