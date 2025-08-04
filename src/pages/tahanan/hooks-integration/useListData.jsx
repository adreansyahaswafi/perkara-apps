import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useFetchEngine from "../../../hooks/useFetch";

const useListData = ({ params }) => {
    const { show } = useToast();
    const { setparams, error, data, loading, params: isParams } = useFetchEngine({
        url: "api/tahanan/register-tahanan",
    })
    useEffect((prev) => {
        setparams({
            ...prev,
            ...params
        });
    }, []);
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])
    // console.log(data)
    return {
        setparams,
        error,
        data,
        params: isParams,
        loading
    }
}
export default useListData;