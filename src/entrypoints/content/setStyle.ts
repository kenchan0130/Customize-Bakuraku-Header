import mustache from 'mustache';
import { TenantConfig } from '@/components/userConfig';

const insertStyle = (css: string): HTMLStyleElement => {
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.appendChild(document.createTextNode(css))
  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(style)

  return style;
};

export const setStyle = (tenantConfig: TenantConfig): HTMLStyleElement => {
  const css = mustache.render(`
  .global-navigationbar-container,
  [class*="globalNavigationBarContainer"],
  [class*="globalNavigationBarContainer"] button {
    {{#backgroundColor}}
    background-color: {{backgroundColor}} !important;
    border-color: {{backgroundColor}} !important;
    {{/backgroundColor}}
    {{#fontColor}}
    color: {{fontColor}} !important;
    fill: {{fontColor}} !important;
    {{/fontColor}}
  }
  {{#fontColor}}
  .global-navigationbar-container a:not(.dropdown-item),
  .global-navigationbar-container button:not(.dropdown-item),
  [class*="globalNavigationBarContainer"] a:not(.dropdown-item),
  [class*="globalNavigationBarContainer"] a:not(.dropdown-item) svg,
  [class*="globalNavigationBarContainer"] button:not(.dropdown-item),
  [class*="globalNavigationBarContainer"] button:not(.dropdown-item) svg {
    color: {{fontColor}} !important;
    fill: {{fontColor}} !important;
  }
  {{/fontColor}}
  {{#hoverBackgroundColor}}
  .global-navigationbar-container a:hover:not(.dropdown-item),
  .global-navigationbar-container button:hover:not(.dropdown-item),
  [class*="globalNavigationBarContainer"] a:hover:not(.dropdown-item),
  [class*="globalNavigationBarContainer"] button:hover:not(.dropdown-item) {
    background-color: {{hoverBackgroundColor}} !important;
  }
  {{/hoverBackgroundColor}}
  `, {
    backgroundColor: tenantConfig.globalNavigation.backgroundColor,
    fontColor: tenantConfig.globalNavigation.fontColor,
    hoverBackgroundColor: tenantConfig.globalNavigation.hoverBackgroundColor,
  });

  return insertStyle(css.trim());
};
