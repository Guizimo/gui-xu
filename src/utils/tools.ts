/**
 * 安全解析JSON字符串
 * @param jsonString JSON字符串
 */
export function safeParse(jsonString: string) {
  if (typeof jsonString !== 'string') {
    console.warn('Input is not a valid JSON string');
    return null;
  }
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null; // 返回一个默认值，避免代码中断
  }
}

/**
 * 生成随机图片地址
 * @param name
 */
export const generateRandomImgSrc = (name: string) => {
  return `${process.env.TARO_APP_RANDOM_IMG_URL}?${name}`
}

/**
 * 获取时间的日期
 * @param dataString
 */
export const getDataInfo = (dataString: string) => {
  return dataString.split('T')[0]
}
