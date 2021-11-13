import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

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
        roles: ['1-2-6'],
      },
    },
    {
      path: 'department',
      name: 'Department',
      component: () => import('/@/views/sys/department/department.vue'),
      meta: {
        title: '部门管理',
        icon: 'icon-park-outline:handbag',
        roles: ['1-24-28'],
      },
    },
    {
      path: 'roleManagement',
      name: 'RoleManagement',
      component: () => import('/@/views/sys/roleAdmin/roleManagement.vue'),
      meta: {
        title: '角色管理',
        icon: 'icon-park-outline:people-safe-one',
        roles: ['1-9-13'],
      },
    },
    {
      path: 'roster',
      name: 'Roster',
      component: () => import('/@/views/sys/rosterManagement/rosterManagement.vue'),
      meta: {
        title: '花名册',
        icon: 'icon-park-outline:handbag',
        roles: ['1-17-21'],
      },
    },
    {
      path: 'recipes',
      name: 'Recipes',
      component: () => import('/@/views/sys/recipesAdmin/recipes.vue'),
      meta: {
        title: '食谱',
        icon: 'icon-park-outline:chicken',
      },
    },
    {
      path: 'propaganda',
      name: 'Propaganda',
      component: () => import('/@/views/sys/propaganda/propaganda.vue'),
      meta: {
        title: '宣传',
        icon: 'icon-park-outline:camp',
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
