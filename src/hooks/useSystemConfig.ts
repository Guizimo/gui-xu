import { useEffect, useState } from 'react';
import { getConfigByName } from '../api/config';
import { safeParse } from '../utils/tools';
import { useUserStore } from '../stores';

interface ConfigData {
  activeTheme: string;
  basic: any;
  themeTop: any;
}

interface FetchConfigResult {
  sysTemConfig: ConfigData | null;
  loading: boolean;
}

const useFetchConfig = (): FetchConfigResult => {
  const [sysTemConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { setUserinfo } = useUserStore();

  useEffect(() => {
    let tempConfig: any = {}
    const fetchConfig = async () => {
      setLoading(true)
      try {
        const systemRes = await getConfigByName('system');
        tempConfig.activeTheme = safeParse(systemRes?.data?.theme)?.active
        tempConfig.basic = safeParse(systemRes?.data?.basic)
        if (tempConfig.activeTheme) {
          const themeRes = await getConfigByName(`${tempConfig.activeTheme}-configMap`);
          tempConfig.themeTop = safeParse(themeRes?.data?.top)
        }
        console.log('systemInfo:', tempConfig)
        setUserinfo(tempConfig)
      } catch (e) {
      } finally {
        setLoading(false)
      }
    };
    fetchConfig();
  }, []);

  return { sysTemConfig, loading };
};

export default useFetchConfig;
