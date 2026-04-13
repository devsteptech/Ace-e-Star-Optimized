import { get } from "@/repositories/http";
export function getMyEventConfigApi() {
    return get("/api/eventman/config", { authMode: "user" });
}
