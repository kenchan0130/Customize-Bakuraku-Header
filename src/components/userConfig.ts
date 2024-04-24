export type UserConfig = {
  tenantConfig: Record<string, TenantConfig>
};

export type TenantConfig = {
  globalNavigation: {
    backgroundColor?: string;
    fontColor?: string;
    hoverBackgroundColor?: string;
  }
}

export const userConfigStore = storage.defineItem<UserConfig | null>(
  'local:userConfig',
  {
    defaultValue: null,
    version: 1,
  },
);
