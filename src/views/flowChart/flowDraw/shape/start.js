import { Shape } from '@antv/x6';
import startIcon from '/@/assets/images/flowIcon/start.png';
export default class StratNode extends Shape.Rect {}
StratNode.config({
  width: 260,
  height: 80,
  zIndex: 100,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
    {
      tagName: 'image',
      selector: 'icon',
    },
  ],
  attrs: {
    label: {
      text: '开始节点',
      fill: '#0D3290',
      strokeWidth: 0.4,
      fontSize: 20,
    },
    body: {
      stroke: '#06CC76',
      strokeWidth: 1,
      // fill: '#d4fff0'
    },
    icon: {
      'xlink:href': startIcon,
      width: 20,
      height: 20,
      x: 10,
      y: 10,
    },
  },
  ports: {
    items: [
      { group: 'port_g', id: 'p_top' },
      { group: 'port_g', id: 'p_right' },
      { group: 'port_g', id: 'p_bottom' },
      { group: 'port_g', id: 'p_left' },
    ],
    groups: {
      port_g: {
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 2,
            fill: '#fff',
          },
        },
        position: 'ellipseSpread',
      },
    },
  },
});
