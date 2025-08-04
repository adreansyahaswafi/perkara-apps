import axios from 'axios';
import {
    getToken,
    setToken,
    logout,
    isTimeUp,
} from '../helper';

const baseURL = import.meta.env.VITE_API_URL;
let refreshTokenPromise;

const Axios = (url = null) => {
    const instance = axios.create();

    instance.defaults.baseURL = url ?? baseURL;
    instance.defaults.timeout = 1000 * import.meta.env.VITE_API_TIMEOUT;
    instance.defaults.headers.common['Content-Type'] = 'application/json';

    instance.interceptors.request.use(config => {
        isTimeUp();

        const { accessToken } = getToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const { refreshToken } = getToken();
            const originialRequest = error.config;

            if (refreshToken && error?.response?.status === 401 && !originialRequest?.retried) {
                originialRequest.retried = true;

                if (!refreshTokenPromise) { // Ensure we're only sending request to refresh token once
                    refreshTokenPromise = axios.post('/api/authentication/refresh-token', { refreshToken }, { baseURL })
                        .then((res) => {
                            refreshTokenPromise = null;
                            return res;
                        });
                }

                return refreshTokenPromise
                    .then((res) => {
                        const newAccessToken = res.data?.data?.accessToken ?? null;

                        setToken({
                            accessToken: newAccessToken,
                            refreshToken: res.data?.data?.refreshToken ?? null,
                        });

                        return instance({
                            ...originialRequest,
                            headers: {
                                ...originialRequest.headers,
                                'Authorization': `Bearer ${newAccessToken}`
                            }
                        })
                    })
                    .catch((e) => {
                        if (e.response?.status === 400) {
                            axios.post('/api/authentication/logout', { refreshToken }, { baseURL })
                                .finally(() => {
                                    logout();
                                });
                        }
                    });
            }

            return Promise.reject({
                code: error.response?.status ?? '',
                status: error.response?.statusText ?? '',
                rawData: error.response?.data ?? '',
                message: error.response?.data.detail
                    ?? error.response?.data.message
                    ?? error.response?.statusText
                    ?? error?.message
                    ?? 'Something went wrong',
            });
        },
    );

    return instance;
}

export const Services = (url) => ({
    get: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).get(endpointName, data);
    },
    post: (endpointName, params = null, config = null) => {
        return Axios(url).post(endpointName, params, config);
    },
    put: (endpointName, params = null, config = null) => {
        return Axios(url).put(endpointName, params, config);
    },
    delete: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).delete(endpointName, data);
    }
})
