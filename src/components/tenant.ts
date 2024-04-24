export type Tenant = Readonly<{
  id: string;
  name: string;
}>;

export const tenantsStore = storage.defineItem<Tenant[] | null>(
  'local:tenants',
  {
    defaultValue: [],
    version: 1,
  },
);

export const currentTenantStore = storage.defineItem<Tenant | null>(
  'local:currentTenant',
  {
    defaultValue: null,
    version: 1,
  },
);
