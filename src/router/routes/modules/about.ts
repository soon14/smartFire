import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  // redirect: '/about/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
    roles: ['1-27-4'],
  },
  children: [
    {
      path: 'aboutPage',
      name: 'AboutPage',
      component: getParentLayout('AboutPage'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        roles: ['1-27-4'],
      },
      children: [
        {
          path: 'dac',
          name: 'Dac',
          component: () => import('/@/views/sys/demo/index.vue'),
          meta: {
            title: t('routes.dashboard.workbench'),
            icon: 'simple-icons:about-dot-me',
            roles: ['1-27-4'],
          },
        },
      ],
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
        icon: 'simple-icons:about-dot-me',
        roles: ['1-27-4'],
      },
    },
  ],
};

export default about;
