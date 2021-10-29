import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/jobManagement',
  meta: {
    icon: 'icon-park-outline:system',
    title: '系统设置',
    orderNo: 100001,
  },
  children: [
    {
      path: 'jobManagement',
      name: 'JobManagement',
      component: () => import('/@/views/sys/jobManagement/jobManagement.vue'),
      meta: {
        title: '职务管理',
        icon: 'icon-park-outline:user-positioning',
      },
    },
    {
      path: 'roleManagement',
      name: 'RoleManagement',
      component: getParentLayout('RoleManagement'),
      meta: {
        title: '角色管理',
        icon: 'icon-park-outline:people-safe-one',
      },
    },
    {
      path: 'roster',
      name: 'Roster',
      component: () => import('/@/views/sys/rosterManagement/rosterManagement.vue'),
      meta: {
        title: '花名册',
        icon: 'icon-park-outline:handbag',
      },
    },
  ],
};

export default system;
