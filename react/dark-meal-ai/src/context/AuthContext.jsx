import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("accessToken") || ""
    );
    const navigate = useNavigate();
    const signInSubmit = (values) => {
        const email = values.email;
        const password = values.password;

        axios.post('http://localhost:3000/auth/login', {
            email: email,
            password: password
        }).then(function (response) {
                console.log(JSON.stringify(response.retrievedUser));
                setUser(response.data['retrievedUser']);
                localStorage.setItem('accessToken', response.data['accessToken']);
                const accessToken = localStorage.getItem('accessToken');
                alert(accessToken);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
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
