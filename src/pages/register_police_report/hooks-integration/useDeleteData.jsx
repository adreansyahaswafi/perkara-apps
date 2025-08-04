import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";

const useDeletedData = () => {
    const { show } = useToast();
    const { setparams, error, data, loading, } = useMutation({
        url: `/api/register-reports/delete-register-laporan-polisi`,
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'laporan berhasil dihapus' });
        }
    })
    const postData = (data) => {
        setparams(data);
    };
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])
    return {
        postData,
        error,
        data,
        loading
    }
}
export default useDeletedData;