import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const vehicle: AppRouteModule = {
  path: '/vehicle',
  name: 'Vehicle',
  component: LAYOUT,
  redirect: '/vehicle/fireEngine',
  meta: {
    icon: 'ion:bus',
    title: '车辆管理',
    orderNo: 100001,
  },
  children: [
    {
      path: 'fireEngine',
      name: 'FireEngine',
      component: () => import('/@/views/vehicle/fireEngine/fireEngine.vue'),
      meta: {
        title: '消防车辆',
        icon: 'emojione-monotone:fire-engine',
      },
    },
    {
      path: 'administrativeVehicle',
      name: 'AdministrativeVehicle',
      component: () => import('/@/views/vehicle/administrativeVehicle/administrativeVehicle.vue'),
      meta: {
        title: '行政车辆',
        icon: 'fluent:vehicle-car-24-filled',
      },
    },
  ],
};
export default vehicle;
