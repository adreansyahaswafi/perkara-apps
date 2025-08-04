import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useFetchEngine from "../../../hooks/useFetch";

const useDetailData = ({ id }) => {
    const { show } = useToast();
    const { setparams, error, data, loading, params: isParams } = useFetchEngine({
        url: `api/kejahatan/data-awal-kejahatan/${id}`,
    })
    useEffect(() => {
        setparams({});
    }, []);
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])

    const isOwnAction = () => {
        setparams({});
    }
    return {
        setparams,
        error,
        data,
        params: isParams,
        loading,
        isOwnAction
    }
}
export default useDetailData;