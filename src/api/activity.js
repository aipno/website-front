import axios from "@/axios";

export function getActivityList() {
    return axios.get('/api/activity/list')
}