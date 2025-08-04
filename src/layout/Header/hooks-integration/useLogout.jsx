import { useEffect } from "react";
import { useToast } from "../../../components/ToastComponent";
import useMutation from "../../../hooks/useMutation";
import { removeToken } from "../../../helper";

const useLogOut = () => {
    const { show } = useToast();
    const { setparams, error, data, loading, } = useMutation({
        url: "/api/users/logout",
        helperDir: () => {
            removeToken();
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
export default useLogOut;