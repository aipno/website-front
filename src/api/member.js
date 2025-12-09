import axios from "@/axios";

export function getMemberList() {
    return axios.get('/api/member/list')
}