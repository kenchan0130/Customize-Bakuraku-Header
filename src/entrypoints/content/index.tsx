import { userConfigStore } from '@/components/userConfig'
import { storeTenantInfo } from './storeTenantInfo';
import { setStyle } from './setStyle';

const process = async (): Promise<HTMLStyleElement | null> => {
  const userConfig = await userConfigStore.getValue();
  const currentTenant = await currentTenantStore.getValue();

  if (!userConfig || !currentTenant) {
    return null
  }

  const tenantConfig = userConfig.tenantConfig[currentTenant.id];

  if (!tenantConfig) {
    return null
  }

  return setStyle(tenantConfig);
}

export default defineContentScript({
  matches: [
    'https://*.layerx.jp/*',
  ],
  runAt: 'document_idle',
  async main() {
    await storeTenantInfo();

    let styleDOM = await process();
    await userConfigStore.watch(async () => {
      styleDOM?.remove();
      styleDOM = await process();
    });
  },
});
