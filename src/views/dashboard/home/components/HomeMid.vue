<template>
  <div style="padding: 48px 16px 0 16px; position: absolute; width: 100%">
    <!-- 营区宣传 -->
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
            :autoplay="true"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            style="height: 240px"
          >
            <swiper-slide v-for="item in imageList" :key="item.id">
              <div style="width: 100%; height: 100%" :style="getBgPic(item.path)"> </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </a-card>
    <!-- 人员在岗在位 -->
    <!-- <a-card style="box-shadow: 0 4px 26px #1f58ec" :bordered="false">
      <a-row>
        <div
          ><span><UserOutlined/></span>人员在岗在位</div
        >
        <div>
        <a-col :span="5">
         <p>sdsdsagd</p>
          <p>sdsdsagd</p>
        </a-col >
       <a-col :span="19">
        sssss
        </a-col>
              
        </div>
      </a-row>
    </a-card> -->

    <!-- 行政车辆 -->
    <!-- <a-card style="box-shadow: 0 4px 26px #1f58ec" :bordered="false">
      <div>
        <NwowHeader title="行政车辆" />
      </div>
    </a-card> -->
  </div>
</template>
<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { Card, Row, Col } from 'ant-design-vue';
  import { getPictureList } from '/@/api/sys/propaganda';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  // import Swiper core and required modules
  import { Pagination, Autoplay } from 'swiper';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  // import { UserOutlined } from '@ant-design/icons-vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';
  import { Tabs } from 'ant-design-vue';
  export default defineComponent({
    name: 'HomeMid',
    components: {
      'a-card': Card,
      NwowHeader,
      Swiper,
      SwiperSlide,
      // UserOutlined,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      const imageList = ref([]);
      const getBgPic = (path) => {
        const data = {
          background: `url(${path})`,
          // background: 'url(https://cdn.uviewui.com/uview/swiper/2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
        return data;
      };
      onMounted(async () => {
        const apiResult = await getPictureList();
        imageList.value = apiResult;
      });
      return {
        onSwiper,
        onSlideChange,
        imageList,
        modules: [Pagination, Autoplay],
        getBgPic,
      };
    },
  });
</script>
<style lang="less" scoped>
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
