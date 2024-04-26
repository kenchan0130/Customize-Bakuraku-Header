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
  const css = `
  .global-navigationbar-container, [class*="globalNavigationBarContainer"], [class*="globalNavigationBarContainer"] button {
    background-color: ${tenantConfig.globalNavigation.backgroundColor} !important;
    border-color: ${tenantConfig.globalNavigation.backgroundColor} !important;
    color: ${tenantConfig.globalNavigation.fontColor} !important;
    fill: ${tenantConfig.globalNavigation.fontColor} !important;
  }
  .global-navigationbar-container a:not(.dropdown-item), .global-navigationbar-container button:not(.dropdown-item), [class*="globalNavigationBarContainer"] a:not(.dropdown-item), [class*="globalNavigationBarContainer"] button:not(.dropdown-item) {
    color: ${tenantConfig.globalNavigation.fontColor} !important;
    fill: ${tenantConfig.globalNavigation.fontColor} !important;
  }
  .global-navigationbar-container a:hover:not(.dropdown-item), .global-navigationbar-container button:hover:not(.dropdown-item), [class*="globalNavigationBarContainer"] a:hover:not(.dropdown-item), [class*="globalNavigationBarContainer"] button:hover:not(.dropdown-item) {
    background-color: ${tenantConfig.globalNavigation.hoverBackgroundColor} !important;
  }
  `.trim();

  return insertStyle(css);
};
