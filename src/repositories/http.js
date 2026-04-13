import { api } from "@/config/axios";
export async function get(url, config) {
    const res = await api.get(url, config);
    return res.data;
}
export async function post(url, data, config) {
    const res = await api.post(url, data, config);
    return res.data;
}
export async function put(url, data, config) {
    const res = await api.put(url, data, config);
    return res.data;
}
export async function del(url, config) {
    const res = await api.delete(url, config);
    return res.data;
}
