import { generateAntColors, primaryColor } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,

    'component-background': '#111A69',
    'text-color': 'rgba(255,255,255,0.85)',
    'text-color-secondary': 'rgba(255,255,255,0.45)',
    'heading-color': 'rgba(255,255,255,0.85)',
    'item-hover-bg': '#4990fb',
    'card-radius': '16px',
    'card-background': '#141F44',
    'cascader-bg': '#002b7d',
    'modal-header-bg': '#141F44',
    'modal-content-bg': '#141F44',
    'cascader-item-selected-bg': '#4990fb',
    'border-color-split': '#406BA9',
    'tree-directory-selected-bg': '#4990fb',
    'tree-node-selected-bg': '#4990fb',
    'calendar-item-active-bg': '#1890ff',

    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
  };
}
