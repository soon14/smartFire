<template>
  <BasicModal
    v-bind="$attrs"
    title="菜品"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <!-- <BasicForm @register="registerForm" layout="vertical" :model="model" /> -->
    <a-list :grid="{ gutter: 24, column: 4 }" :data-source="model">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable style="width: 240px">
            <template #cover>
              <img style="width: 100%; height: 120px" alt="example" :src="item.path" />
            </template>
            <a-card-meta :title="item.foodName"
              >[]
              <template #description
                >备注：{{ item.desc }}
                <!-- <div style="float: right;" @click="chooseDishes">选择 </div> -->
                <a-checkbox style="float: right" @change="chooseDishes(item.id)" />
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // import { BasicForm } from '/@/components/Form/index';
  import { addFood, foodMenuList } from '/@/api/menuLibrary/menuLibrary';
  // import { getRecipeForm } from '../modules/getRecipeFormDate';
  const modelRef = ref([]);
  import { buildUUID } from '/@/utils/uuid';
  let formId = null;
  import { useMessage } from '/@/hooks/web/useMessage';
  import { List, Card, Checkbox } from 'ant-design-vue';
  import noPicture from '/@/assets/images/noPicture.png';
  export default defineComponent({
    components: {
      BasicModal,
      // BasicForm,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Card.name]: Card,
      [Card.Meta.name]: Card.Meta,
      [Checkbox.name]: Checkbox,
    },
    emits: ['requestRecipe'],
    setup(_, { emit }) {
      let uuid = buildUUID();
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const recipeType = ref();
      const meunData = ref([]);

      const chooseDishes = (data) => {
        meunData.value = data;
        //  meunData.push(data)
        console.log('选择数据qqqq', meunData);
      };

      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const recipeData = [];
          let myDate = new Date();
          console.log('myDate==>', myDate);
          recipeData.foodDate = myDate;
          recipeData.foodMenuIds = meunData.value;
          recipeData.type = recipeType.value;
          console.log('recipeData', recipeData);
          await addFood(recipeData, uuid);
          uuid = buildUUID();
          success('创建成功');
          emit('requestRecipe');
          closeModal();
        } catch (error) {
          console.log(error);
          changeOkLoading(false);
        }
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          closeModal();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        async (data) => {
          const foodMenuListData = await foodMenuList();
          console.log('foodMenuListData==>', foodMenuListData.list);
          console.log('🚀 ', data);
          recipeType.value = data.type;
          setModalProps({
            title: '新增菜品',
          });
          for (var i = 0; foodMenuListData.list.length > i; i++) {
            console.log('foodMenuListData.list==>', foodMenuListData.list[i]);
            if (foodMenuListData.list[i].path == null) {
              foodMenuListData.list[i].path = noPicture;
            }
          }
          modelRef.value = foodMenuListData.list;
          console.log('modelRef.value', modelRef.value);
        },
      );
      return {
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
        formId,
        recipeType,
        chooseDishes,
      };
    },
  });
</script>
