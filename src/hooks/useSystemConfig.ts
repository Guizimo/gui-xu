import { useEffect, useState } from 'react';
import { getConfigByName } from '../api/config';
import { safeParse } from '../utils/tools';

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
  const [sysTemConfig, setSysTemConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        console.log(tempConfig, '55555')
        setSysTemConfig(tempConfig)
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
