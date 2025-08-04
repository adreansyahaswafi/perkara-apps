import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const useDeletedData = () => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error, data, loading, } = useMutation({
        url: `/api/tahanan/delete-register-tahanan`,
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'laporan tahanan berhasil dihapus' });
            navigate('/tahanan')
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