import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'cil:home',
    title: '首页',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/home/index.vue'),
      meta: {
        // affix: true,
        title: '官方主页',
        hideMenu: true,
      },
    },
    {
      path: 'personalInformation/:id',
      name: 'personalInformation',
      component: () =>
        import(
          '/@/layouts/default/header/components/secondary-menu/secondary-menu-left/secondary-userList/personalInformation.vue'
        ),
      meta: {
        title: '个人信息',
        // roles: ['1-2-3', '1-2-4', '1-2-5'],
        hideMenu: true,
        // hideTab: true,
        carryParam: true,
        currentActiveMenu: '/dashboard/analysis',
      },
    },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('/@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.workbench'),
    //   },
    // },
  ],
};

export default dashboard;
