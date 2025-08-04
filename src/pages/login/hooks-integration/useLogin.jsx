import { useEffect, useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { useToast } from "../../../components/ToastComponent";
import { setToken } from "../../../helper";

const useLogin = () => {
    const { show } = useToast();
    const [isPosible, setLogin] = useState(null);
    const { setparams, error } = useMutation({
        url: '/api/users/login', helperDir: (raw) => {
            setToken({ accessToken: raw?.data?.data?.access_token, refreshToken: null, isLogin: true });
            setLogin(true);
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
        postBody,
        isPosible
    }
}
export default useLogin;