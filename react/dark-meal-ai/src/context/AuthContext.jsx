import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const navigate = useNavigate();
    const api = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
    });

    api.interceptors.request.use(request => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return request;
    }, error => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    console.log('!!! ENGAGE RESPONSE INTERCEPTOR FOR REFRESH !!!');

                    const response = await api.post('/auth/refresh');
                    const { accessToken } = response.data;

                    console.log(`NEW ACCESS TOKEN FROM REFRESH: ${accessToken}`);

                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken); // Синхронізуємо state token
                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    localStorage.removeItem('accessToken');
                    setToken("");
                    setUser(null);
                    navigate("/signin"); // Redirect на логін при fail
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        if (token) {
            api.get("/auth/me")
                .then((res) => {
                    console.log('Updating user via /auth/me...');
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error(`ERROR IN /auth/me: ${err.message}`);
                });
        }
    }, [token]);

    const signInSubmit = (values) => {
        api.post('/auth/login', { // Змінив на відносний шлях
            email: values.email,
            password: values.password
        }).then((response) => {
            setUser(response.data.retrievedUser);
            localStorage.setItem('accessToken', response.data.accessToken);
            setToken(response.data.accessToken); // Синхронізуємо state
            console.log('Login successful, accessToken saved');
            navigate("/");
        }).catch((error) => {
            console.error(error);
            notifications.show({
                color: 'red',
                title: 'Error occurred',
                message: error.response?.status === 401 ? 'Wrong credentials' : error.message,
            });
        });
    };

    const signUpSubmit = (values) => {
        api.post('/auth/register', { // Змінив на api для consistency
            email: values.email,
            password: values.password
        }).then(() => {
            navigate("/signin");
        }).catch((error) => {
            console.error(error);
            notifications.show({
                color: 'red',
                title: 'Error occurred',
                message: error.message,
            });
        });
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("accessToken");
        api.post('/auth/logout').then(() => { // Змінив на відносний шлях
            navigate("/signin");
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <AuthContext.Provider value={{ token, user, signInSubmit, signUpSubmit, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};