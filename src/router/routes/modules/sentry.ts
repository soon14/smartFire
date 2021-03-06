import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const sentry: AppRouteModule = {
  path: '/sentry',
  name: 'sentry',
  component: LAYOUT,
  redirect: '/sentry/visitorsRecord',
  meta: {
    icon: 'icon-park-outline:open-door',
    title: '岗哨管理',
    orderNo: 100001,
  },
  children: [
    {
      path: 'visitorsRecord',
      name: 'VisitorsRecord',
      component: () => import('/@/views/sentry/visitorsRecord/visitorsRecord.vue'),
      meta: {
        title: '访客记录',
        icon: 'icon-park-outline:file-staff',
      },
    },
    {
      path: 'vehicleRecord',
      name: 'VehicleRecord',
      component: () => import('/@/views/sentry/vehicleRecord/vehicleRecord.vue'),
      meta: {
        title: '车辆记录',
        icon: 'ion:bus-outline',
      },
    },
  ],
};
export default sentry;
