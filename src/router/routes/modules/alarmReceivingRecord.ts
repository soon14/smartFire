import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const alarmReceivingRecord: AppRouteModule = {
  path: '/alarmReceivingRecord',
  name: 'alarmReceivingRecord',
  component: LAYOUT,
  redirect: '/alarmReceivingRecord/alarmReceivingRecord',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ph:address-book-bold',
    title: '接处警记录',
    orderNo: 100002,
  },
  children: [
    {
      path: 'alarmReceivingRecord',
      name: 'AlarmReceivingRecord',
      component: () => import('/@/views/alarmReceivingRecord/alarmReceivingRecord.vue'),
      meta: {
        title: '接处警记录',
        icon: 'ph:address-book-bold',
      },
    },
  ],
};
export default alarmReceivingRecord;
