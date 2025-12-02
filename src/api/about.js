import instance from '@/axios.js';

/**
 * 关于信息服务
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getAboutInfo() {
  return instance.get('/about');
}

/**
 * 获取背景信息
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getBackground() {
  return instance.get('/about/background');
}

/**
 * 获取使命信息
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getMission() {
    return instance.get('/about/mission');
}

/**
 * 获取历史信息
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getHistory() {
    return instance.get('/about/history');
}

/**
 * 获取组织信息
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getOrganization() {
    return instance.get('/about/organization');
}

