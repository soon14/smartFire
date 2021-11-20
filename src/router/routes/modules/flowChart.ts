import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const flowChary: AppRouteModule = {
  path: '/flow',
  name: 'Flow',
  component: LAYOUT,
  redirect: '/flow/standingBook',
  meta: {
    icon: 'icon-park-outline:connection-arrow',
    title: '流程中心',
    orderNo: 100001,
  },
  children: [
    {
      path: 'standingBook',
      name: 'StandingBook',
      component: () => import('/@/views/standingBook/standingBook.vue'),
      meta: {
        title: '台账',
        icon: 'fluent:notepad-28-regular',
      },
    },
    {
      path: 'flowDraw',
      name: 'FlowDraw',
      component: () => import('/@/views/flowChart/flowDraw/index.vue'),
      meta: {
        title: '流程设计',
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
  ],
};

export default flowChary;
