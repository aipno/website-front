import instance from '../axios.js';

/**
 * 获取所有活动
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getActivities() {
  return instance.get('/activities');
}

/**
 * 获取即将进行的活动
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getUpcomingActivities() {
  return instance.get(`/activities?type=upcoming`);
}

/**
 * 获取过去进行的活动
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getPastActivities() {
  return instance.get(`/activities?type=past`);
}

/**
 * 获取最新活动
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getLatestActivities(limit = 5) {
  return instance.get(`/activities/latest?limit=${limit}`);
}

/**
 * 获取活动详情
 * @param id
 * @returns {Promise<instance.AxiosResponse<any>>}
 */
export function getActivityDetail(id) {
  return instance.get(`/activities/${id}`);
}

