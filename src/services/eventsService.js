import { endEventApi, listEventsApi } from "@/repositories/events.repo";
export async function fetchEvents() {
    return await listEventsApi();
}
export async function endEvent(id) {
    return await endEventApi(id);
}
