
import { fetchReports } from "@/services/reportsService";
import { ReportItem } from "@/types/reportTypes";
import { useCallback, useEffect, useState } from "react";
export function useReports() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<ReportItem[]>([]);

    const reload = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchReports();
            setReports(Array.isArray(data) ? data : []);
        } catch (e) {
            console.log("REPORTS LOAD ERROR:", e);
            setReports([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    return { loading, reports, reload };
}