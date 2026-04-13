import { api } from "@/config/axios";
import { API_BASE_URL } from "@/config/env";

function normalizeUrl(url: string) {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}/${url}`;
}

export async function uploadImageApi(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);

    const res = await api.post<{ url: string }>("/api/uploads", fd, {
        authMode: "admin",
    } as any);

    return normalizeUrl(res.data.url);
}