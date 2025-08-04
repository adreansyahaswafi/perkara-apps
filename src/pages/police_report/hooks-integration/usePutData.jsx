import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { useNavigate } from "react-router-dom";

const usePutData = ({ id }) => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error, data, loading, } = useMutation({
        url: `/api/reports/update-laporan-polisi/${id}`,
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'Laporan Polisi berhasil diedit' });
            navigate(`/laporan-polisi/${id}/edit`)
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
    // console.log(data)
    return {
        postData,
        error,
        data,
        loading
    }
}
export default usePutData;