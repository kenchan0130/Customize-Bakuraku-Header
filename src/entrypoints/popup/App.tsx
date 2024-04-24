import { useState, useEffect } from 'react';
import { browser } from 'wxt/browser';
import './App.css';
import Login from './Login';
import { Button, ColorInput, Container, Flex, ScrollAreaAutosize, Select } from '@mantine/core';
import { UserConfig } from '@/components/userConfig';
import { Tenant, tenantsStore, currentTenantStore } from '@/components/tenant'
import { IconExternalLink } from '@tabler/icons-react';

const userConfigSkeleton: UserConfig = {
  tenantConfig: {},
};

const App = () => {
  const [hasSession, setHasSession] = useState(false)
  const [tenants, setTenants] = useState<Tenant[] | null>(null)
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    const fetchBakurakuSession = async (): Promise<void> => {
      const sessionIdCookie = await browser.cookies.get({
        url: 'https://id.layerx.jp',
        name: 'rt_session_id',
      });
      const sessionPrdCookie = await browser.cookies.get({
        url: 'https://id.layerx.jp',
        name: 'layerx-session-prd',
      });

      if (!sessionPrdCookie || !sessionIdCookie?.expirationDate || sessionIdCookie?.expirationDate > Number(new Date())) {
        setHasSession(false);
        return
      }

      setHasSession(true);
    };

    fetchBakurakuSession();
    const interval = setInterval(async () => {
      await fetchBakurakuSession();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasSession) {
      return
    }

    (async () => {
      const tenantsValue = await tenantsStore.getValue();
      setTenants(tenantsValue);

      const currentTeanntValue = await currentTenantStore.getValue();
      if (!selectedTenant) {
        setSelectedTenant(currentTeanntValue);
      }

      const config = await userConfigStore.getValue();
      setUserConfig(config);
    })();

    return () => {};
  }, [hasSession]);

  useEffect(() => {
    if (!userConfig) {
      return
    }

    (async () => {
      await userConfigStore.setValue(userConfig);
    })();

    return () => {};
  }, [userConfig])

  const navigationBackgroundColorChange = async (v: string) => {
    if (!selectedTenant) {
      return
    }

    const newUserConfig = structuredClone(userConfig ?? userConfigSkeleton);
    newUserConfig.tenantConfig[selectedTenant.id] = {
      ...newUserConfig.tenantConfig[selectedTenant.id],
      globalNavigation: {
        ...newUserConfig.tenantConfig[selectedTenant.id]?.globalNavigation,
        backgroundColor: v,
      }
    }

    setUserConfig(newUserConfig);
  };

  const navigationHoverBackgroundColorChange = (v: string) => {
    if (!selectedTenant) {
      return
    }

    const newUserConfig = structuredClone(userConfig ?? userConfigSkeleton);
    newUserConfig.tenantConfig[selectedTenant.id] = {
      ...newUserConfig.tenantConfig[selectedTenant.id],
      globalNavigation: {
        ...newUserConfig.tenantConfig[selectedTenant.id]?.globalNavigation,
        hoverBackgroundColor: v,
      }
    }

    setUserConfig(newUserConfig);
  };

  const navigationFontColorChange = (v: string) => {
    if (!selectedTenant) {
      return
    }

    const newUserConfig = structuredClone(userConfig ?? userConfigSkeleton);
    newUserConfig.tenantConfig[selectedTenant.id] = {
      ...newUserConfig.tenantConfig[selectedTenant.id],
      globalNavigation: {
        ...newUserConfig.tenantConfig[selectedTenant.id]?.globalNavigation,
        fontColor: v,
      }
    }

    setUserConfig(newUserConfig);
  };

  const tenantSelectChange = (changedValue: string | null) => {
    if (!changedValue) {
      return
    }

    const tenant = tenants?.find(v => v.name === changedValue)
    if (!tenant) {
      return
    }


    setSelectedTenant(tenant);
  };

  return hasSession ? (
    <>
      <ScrollAreaAutosize mih={400}>
        <Flex
            gap="md"
            direction="column"
        >
          <Select
            placeholder="テナントの選択"
            data={tenants?.map(v => v.name)}
            value={selectedTenant?.name ?? ''}
            { ...(tenants ? {} : { error: "テナントの取得に失敗しました" }) }
            onChange={tenantSelectChange}
          />
          {tenants?.length === 0 ? (<>
            <Container>テナント情報を取得するため、トップページを読み込んでください</Container>
            <Button
              fullWidth
              variant="light"
              leftSection={<IconExternalLink size={14} />}
              component="a"
              href='https://id.layerx.jp'
              target='_blank'
            >
              バクラクトップページ
            </Button>
            </>
          ) : null}
          {selectedTenant ?
          (<><ColorInput
              label="ナビゲーション背景色"
              placeholder="#ffffff"
              value={userConfig?.tenantConfig[selectedTenant.id]?.globalNavigation.backgroundColor ?? ''}
              onChange={navigationBackgroundColorChange} />
              <ColorInput
                label="ナビゲーションマウスホバー背景色"
                placeholder="#ffffff"
                value={userConfig?.tenantConfig[selectedTenant.id]?.globalNavigation.hoverBackgroundColor ?? ''}
                onChange={navigationHoverBackgroundColorChange} />
                <ColorInput
                label="ナビゲーション文字色"
                placeholder="#ffffff"
                value={userConfig?.tenantConfig[selectedTenant.id]?.globalNavigation.fontColor ?? ''}
                onChange={navigationFontColorChange} /></>) : null
          }
        </Flex>
      </ScrollAreaAutosize>
    </>
  ) : <Login/>;
};

export default App;
