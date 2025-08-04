import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useFetchEngine from "../../../hooks/useFetch";

const useDashboard = () => {
    const { show } = useToast();
    const { setparams, error, data, loading } = useFetchEngine({
        url: "/api/dashboard/summary",        
    })
    useEffect((prev) => {
        setparams(prev);
    }, []);
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])
    return {
        data: data?.data,
        loading
    }
}
export default useDashboard;