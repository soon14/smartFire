import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/roleManagement',
  meta: {
    icon: 'icon-park-outline:system',
    title: '系统设置',
    orderNo: 100001,
  },
  children: [
    {
      path: 'roleManagement',
      name: 'RoleManagement',
      component: getParentLayout('RoleManagement'),
      meta: {
        title: '角色管理',
        icon: 'icon-park-outline:people-safe-one',
      },
      // children: [
      //   {
      //     path: 'dac',
      //     name: 'Dac',
      //     component: () => import('/@/views/sys/demo/index.vue'),
      //     meta: {
      //       title: t('routes.dashboard.workbench'),
      //       icon: 'simple-icons:about-dot-me',
      //     },
      //   },
      // ],
    },
    {
      path: 'position',
      name: 'Position',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '岗位管理',
        icon: 'icon-park-outline:handbag',
      },
    },
  ],
};

export default dashboard;
