import axios from "@/axios";

export function getHistoryList() {
    return axios.get('/api/about/history/list')
}
