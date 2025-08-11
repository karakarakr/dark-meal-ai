import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("accessToken") || ""
    );
    const navigate = useNavigate();
    const api = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (res) => res,
        async (err) => {
            if (err.response?.status === 401 && !err.config._retry) {
                err.config._retry = true;
                try {
                    const { data } = await axios.post(
                        "http://localhost:3000/auth/refresh",
                        {},
                        { withCredentials: true }
                    );
                    setToken(data.accessToken);
                    localStorage.setItem("accessToken", data.accessToken);

                    err.config.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(err.config);
                } catch {
                    console.log(`Error occured: ${err}`);
                }
            }
            return Promise.reject(err);
        }
    );

    useEffect(() => {
        if (token) {
            api.get("/auth/me")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(`Error occured: ${err}`)
                });
        }
    }, [token]);

    const signInSubmit = (values) => {
        const email = values.email;
        const password = values.password;

        axios.post('http://localhost:3000/auth/login', {
            email: email,
            password: password
        }).then((response) => {
                console.log(JSON.stringify(response.retrievedUser));
                setUser(response.data['retrievedUser']);
                localStorage.setItem('accessToken', response.data['accessToken']);
                const accessToken = localStorage.getItem('accessToken');
                alert(accessToken);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);

                if (error.status === 401) {
                    notifications.show({
                        color: 'red',
                        title: 'Error occured',
                        message: 'Wrong credentials'
                    });
                }
                else {
                    notifications.show({
                        color: 'red',
                        title: 'Error occured',
                        message: error.message,
                    });
                }
            });
    };

    const signUpSubmit = (values) => {
        const email = values.email;
        const password = values.password;

        axios.post('http://localhost:3000/auth/register', {
            email: email,
            password: password
        }).then(function (response) {
                navigate("/signin");
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("accessToken");
        axios.post('http://localhost:3000/auth/logout').then(function (response) {
                navigate("/signin");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <AuthContext.Provider value={{ 
            token, 
            user, 
            signInSubmit, 
            signUpSubmit, 
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
