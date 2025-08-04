import { useEffect } from "react";
import useMutation from "../../../hooks/useMutation";
import { useToast } from "../../../components/ToastComponent";
import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
    const { show } = useToast();
    const navigate = useNavigate();
    const { setparams, error } = useMutation({
        url: '/api/users/change-password', helperDir: (raw) => {
            show({ severity: 'success', summary: 'Succes Message', detail: raw?.data?.data?.message });
            setTimeout(() => {
                navigate('/login')
            }, 500)
        }
    });
    useEffect(() => {
        if (error) {
            show({ severity: 'error', summary: 'Error Message', detail: error?.message });
        }
    }, [error])
    const postBody = (data) => {
        setparams(data);
    }
    return {
        postBody
    }
}
export default useForgotPassword;