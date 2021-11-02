<template>
  <div class="propaganda">
    <div style="padding: 6px 6px 24px" class="flex items-center justify-between">
      <!-- 头部标题 -->
      <NwowHeader title="营区宣传" />
      <div></div>
    </div>
    <div style="padding: 0 6px">
      <Row :gutter="16">
        <Col :span="8">
          <Upload
            v-if="hasPermission(['1-30-31'])"
            v-model:file-list="fileList"
            list-type="picture-card"
            class="avatar-uploader"
            :headers="headers"
            :data="transExtraData"
            :show-upload-list="false"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <div>
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
              <div class="ant-upload-text">点击此处上传</div>
            </div>
          </Upload>
        </Col>
        <Col :span="8" v-for="item in imageList" :key="item.id">
          <div
            style="height: 300px; width: 100%; border-radius: 8px"
            :style="getBgPic(item.path)"
            class="flex items-center justify-center picItem"
          >
            <span class="actionSheet" style="z-index: 3">
              <Icon
                class="cursor-pointer"
                icon="icon-park-outline:delete"
                :size="38"
                v-if="hasPermission(['1-30-32'])"
                @click="handleDelete(item)"
              />
            </span>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script setup>
  import { Row, Col, Upload } from 'ant-design-vue';
  import NwowHeader from '/@/components/NwowHeader/index.vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { onMounted, ref, toRaw } from 'vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getToken } from '/@/utils/auth';
  import { addPicture, deletePicture, getPictureList } from '/@/api/sys/propaganda';
  import { Icon } from '/@/components/Icon';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { hasPermission } = usePermission();
  const imageList = ref([]);
  const setting = useGlobSetting();
  const { uploadUrl } = setting;
  const fileList = ref([]);
  const loading = ref(false);
  const { createMessage, createConfirm } = useMessage();
  const token = getToken();
  const headers = {
    token: token,
  };
  const transExtraData = {
    type: 2,
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('请上传正确格式的图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('图片大小必须小于2M!');
    }
    const imageNum = imageList.value.length === 4;
    if (imageNum) {
      createMessage.error('最多只能上传4张图片！');
    }
    return isJpgOrPng && isLt2M && !imageNum;
  };
  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      console.log('info.file====');
      const path = toRaw(info.file.response).data.content.picPath[0];
      const transData = {
        path,
      };
      await addPicture(transData);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (base64Url) => {
        const data = { path: base64Url, id: Math.random() };

        imageList.value.push(data);
        loading.value = false;
      });
      createMessage.success('添加图片成功');
    }
    if (info.file.status === 'error') {
      loading.value = false;
      createMessage.error('upload error');
    }
  };
  const getBgPic = (path) => {
    const data = {
      background: `url(${path})`,
      // background: 'url(https://cdn.uviewui.com/uview/swiper/2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    return data;
  };
  const handleDelete = (item) => {
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '是否确认删除？',
      onOk: async () => {
        await deletePicture({
          pictureId: item.id,
        });
        createMessage.success('删除成功');
        getList();
      },
    });
  };
  const getList = async () => {
    const apiResult = await getPictureList();
    imageList.value = apiResult;
  };
  onMounted(async () => {
    await getList();
  });
</script>
<style lang="less">
  .propaganda {
    .ant-upload.ant-upload-select-picture-card {
      background: #0d183b;
      width: 100%;
      height: 300px;
    }

    .picItem::before {
      position: absolute;
      width: 100%;
      height: 300px;
      border-radius: 8px;
      content: '';
      background-color: #00000080;
      opacity: 0;
      transition: all 0.3s;
      z-index: 1;
    }

    .picItem:hover::before {
      opacity: 1;
    }

    .actionSheet {
      display: none;
    }

    .picItem:hover .actionSheet {
      display: inline;
    }
  }
</style>
