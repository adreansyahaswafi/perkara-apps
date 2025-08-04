import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";

const usePutData = ({ id }) => {
    const { show } = useToast();
    const { setparams, error, data, loading, } = useMutation({
        url: `/api/users/update-user/${id}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        helperDir: () => {
            show({ severity: 'success', summary: 'Success Message', detail: 'User berhasil diedit' });
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