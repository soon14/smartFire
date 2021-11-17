import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const alarmReceivingRecord: AppRouteModule = {
  path: '/meetingRecord',
  name: 'MeetingRecord',
  component: LAYOUT,
  redirect: '/meetingRecord/meetingRecordAdmin',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ph:address-book-bold',
    title: '会议记录',
    orderNo: 100007,
  },
  children: [
    {
      path: 'meetingRecordAdmin',
      name: 'MeetingRecordAdmin',
      component: () => import('/@/views/alarmReceivingRecord/alarmReceivingRecord.vue'),
      meta: {
        title: '会议记录',
        icon: 'ph:address-book-bold',
      },
    },
  ],
};
export default alarmReceivingRecord;
