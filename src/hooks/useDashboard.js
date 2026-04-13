import { useCallback, useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardService";
export function useDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchDashboard();
            setData(res);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                await refresh();
            }
            finally {
                if (!alive)
                    return;
            }
        })();
        return () => {
            alive = false;
        };
    }, [refresh]);
    return { loading, data, refresh };
}
