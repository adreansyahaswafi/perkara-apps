import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const usePostData = () => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error, data, loading, } = useMutation({
        url: "/api/register-reports/create-register-laporan-polisi",
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'Laporan berhasil dibuat' });
            navigate(`/register-laporan-polisi`);
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