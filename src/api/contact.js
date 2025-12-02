import instance from '../axios.js';

/**
 * 获取联系方式
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getContactInfo() {
  return instance.get('/contact');
}

/**
 * 获取联系方式
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getContactDetails() {
  return instance.get('/contact/details');
}

/**
 * 获取社交链接
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getSocialLinks() {
  return instance.get('/contact/social');
}

/**
 * 获取加入信息
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getJoinInfo() {
  return instance.get('/contact/join');
}
