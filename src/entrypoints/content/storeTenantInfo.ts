import { Tenant, tenantsStore } from '@/components/tenant'

const meEntpoint = 'https://api.id.layerx.jp/v1/me';

type MeResponseBody = Readonly<{
  tenant: Tenant & Record<string, unknown>;
  tenants: Array<unknown>;
  user: unknown;
}>;

export const storeTenantInfo = async (): Promise<void> => {
  const res = await fetch(meEntpoint, {
      'method': 'GET',
      'credentials': 'include',
  });

  if (!res.ok) {
    console.log('skip to store tenants.')
    return
  }

  const responseBody = await res.json() as MeResponseBody;
  if (!responseBody.tenants || !responseBody.tenant) {
    throw `${meEntpoint} response is changed. Please check response. body: ${responseBody}`
  }

  const tenants = responseBody.tenants.map((v: any): Tenant => {
    return {
      id: v.id,
      name: v.name,
    } as Tenant
  });

  const currentTenant: Tenant = {
    id: responseBody.tenant.id,
    name: responseBody.tenant.name
  };

  await Promise.all([
    currentTenantStore.setValue(currentTenant),
    tenantsStore.setValue(tenants),
  ]);

  return
};
