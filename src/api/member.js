import instance from '../axios.js';

/**
 * 获取所有会员
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getMembers() {
  return instance.get('/members');
}

/**
 * 获取核心会员
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getCoreMembers() {
  return instance.get(`/members?type=core`);
}

/**
 * 获取普通会员
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getGeneralMembers() {
  return instance.get(`/members?type=general`);
}

/**
 * 获取会员详情
 * @param id
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getMemberDetail(id) {
  return instance.get(`/members/${id}`);
}
