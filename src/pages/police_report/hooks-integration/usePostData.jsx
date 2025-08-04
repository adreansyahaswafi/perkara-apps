import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const usePostData = () => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error, data, loading, } = useMutation({
        url: "/api/reports/create-laporan-polisi",
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'Laporan Polisi berhasil dibuat' });
            navigate('/laporan-polisi');
        }
    })
    const postData = (data) => {
        setparams({ ...data });
    };
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])
    // console.log(data)
    return {
        postData,
        error,
        data,
        loading
    }
}
export default usePostData;