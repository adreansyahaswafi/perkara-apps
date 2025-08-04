import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const useDeletedData = () => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error, data, loading, } = useMutation({
        url: `/api/kejahatan/delete-data-awal-kejahatan`,
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'laporan berhasil dihapus' });
            navigate('/kejahatan')
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