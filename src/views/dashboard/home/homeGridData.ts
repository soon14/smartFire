export interface HomeGridItem {
  icon: string;
  title: string;
  value: number;
}

export const growCardList: HomeGridItem[] = [
  {
    title: '车辆进出记录',
    icon: 'carbon:user-role',
    value: 1,
  },
  {
    title: '接处警记录',
    icon: 'total-sales|svg',
    value: 2,
  },
  {
    title: '访客记录',
    icon: 'download-count|svg',
    value: 3,
  },
  {
    title: '装备汇总',
    icon: 'transaction|svg',
    value: 4,
  },
  {
    title: '物资领取记录',
    icon: 'transaction|svg',
    value: 5,
  },
  {
    title: '重点单位',
    icon: 'transaction|svg',
    value: 6,
  },
  {
    title: '装备出入库记录',
    icon: 'transaction|svg',
    value: 7,
  },
  {
    title: '排班管理',
    icon: 'transaction|svg',
    value: 8,
  },
];

export const dayWorkList = [
  {
    value: 1,
    message: '刘备给您安排了一项***任务，请及时处理！',
    person: '李德华',
    date: '2021 09-25',
    stat: 1,
  },
  {
    value: 2,
    message: '刘备给您安排了一项***任务，请及时处理！',
    person: '李德华',
    date: '2021 09-25',
    stat: 0,
  },
  {
    value: 3,
    message: '刘备给您安排了一项***任务，请及时处理！',
    person: '李德华',
    date: '2021 09-25',
    stat: 1,
  },
  {
    value: 4,
    message: '刘备给您安排了一项***任务，请及时处理！',
    person: '李德华',
    date: '2021 09-25',
    stat: 0,
  },
];
