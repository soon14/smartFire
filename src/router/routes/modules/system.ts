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
      path: 'department',
      name: 'Department',
      component: () => import('/@/views/sys/department/department.vue'),
      meta: {
        title: '部门管理',
        icon: 'icon-park-outline:handbag',
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
      path: 'roster',
      name: 'Roster',
      component: () => import('/@/views/sys/rosterManagement/rosterManagement.vue'),
      meta: {
        title: '花名册',
        icon: 'icon-park-outline:handbag',
      },
    },
    {
      path: 'propaganda',
      name: 'Propaganda',
      component: () => import('/@/views/sys/propaganda/propaganda.vue'),
      meta: {
        title: '宣传',
        icon: 'icon-park-outline:handbag',
      },
    },
    {
      path: 'logAdmin',
      name: 'LogAdmin',
      component: () => import('/@/views/sys/log/logAdmin.vue'),
      meta: {
        title: '日志',
        icon: 'icon-park-outline:handbag',
      },
    },
  ],
};

export default system;
