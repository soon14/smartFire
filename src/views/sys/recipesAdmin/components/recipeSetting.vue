<template>
  <BasicModal
    v-bind="$attrs"
    title="菜品"
    @ok="handleSubmit"
    @visible-change="handleResetForm"
    @register="registerModalInner"
    width="1024px"
  >
    <BasicForm @register="registerForm" layout="vertical" :model="model" />
  </BasicModal>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addFoodMenu, updateFoodMenu } from '/@/api/menuLibrary/menuLibrary';
  import { getRecipeForm } from '../modules/getRecipeFormDate';
  const modelRef = ref({});
  import { buildUUID } from '/@/utils/uuid';
  let formId = null;
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['requestRecipe'],
    setup(_, { emit }) {
      let uuid = buildUUID();
      const { createMessage } = useMessage();
      const { success } = createMessage;
      const recipeType = ref();
      const [registerForm, { validate, resetFields, clearValidate }] = useForm({
        labelWidth: 120,
        schemas: getRecipeForm(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const handleSubmit = async () => {
        try {
          changeOkLoading(true);
          const [values] = await Promise.all([validate()]);
          const recipeData = Object.assign({}, values);
          if (formId) {
            recipeData.id = formId;
            recipeData.type = recipeType.value;
            console.log('recipeData', recipeData);
            await updateFoodMenu(recipeData);
            success('修改成功');
          } else {
            recipeData.type = recipeType.value;
            console.log('recipeData', recipeData);
            await addFoodMenu(recipeData, uuid);
            uuid = buildUUID();
            success('创建成功');
          }
          emit('requestRecipe');
          resetFields();
          clearValidate();
          closeModal();
        } catch (error) {
          console.log(error);
          changeOkLoading(false);
        }
      };
      const handleResetForm = (visible) => {
        if (!visible) {
          resetFields();
          clearValidate();
          closeModal();
          changeOkLoading(false);
        }
      };
      const [registerModalInner, { closeModal, changeOkLoading, setModalProps }] = useModalInner(
        async (data) => {
          console.log('🚀 ~ file: departmentModel.vue ~ line 66 ~ setup ~ data', data);
          recipeType.value = data.type;
          if (data.id) {
            data.type = String(data.type);
            formId = data.id;
            setModalProps({
              title: '修改菜品',
            });
          } else {
            formId = null;
            setModalProps({
              title: '新增菜品',
            });
          }
          modelRef.value = data;
        },
      );
      return {
        registerForm,
        handleSubmit,
        handleResetForm,
        registerModalInner,
        model: modelRef,
        formId,
        recipeType,
      };
    },
  });
</script>
