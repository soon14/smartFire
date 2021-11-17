import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const material: AppRouteModule = {
  path: '/material',
  name: 'Material',
  component: LAYOUT,
  redirect: '/material/materialWarehouse',
  meta: {
    icon: 'ant-design:inbox-outlined',
    title: '公共物资管理',
    orderNo: 100008,
  },
  children: [
    {
      path: 'materialWarehouse',
      name: 'MaterialWarehouse',
      component: () =>
        import('/@/views/materialManagement/materialWarehouseAdmin/materialWarehouse.vue'),
      meta: {
        title: '物资库',
        icon: 'emojione-monotone:fire-engine',
      },
    },
    {
      path: 'receivingRecord',
      name: 'ReceivingRecord',
      component: () =>
        import('/@/views/materialManagement/receivingRecordAdmin/receivingRecord.vue'),
      meta: {
        title: '领取记录',
        icon: 'ri:user-received-2-line',
      },
    },
  ],
};
export default material;
