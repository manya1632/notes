import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/Helper';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { validatePassword } from '../utils/PasswordHelp';
import axiosInstance from '../utils/axiosInstance';

const Signin = () => {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
    
        if (!password) {
            setError("Please enter the password");
            return;
        }
    
        if (!validatePassword(password)) {
            setError("Please enter a valid password");
            return;
        }
    
        setError(null);
    
        // Sends a POST request to the /login endpoint of the server using axiosInstance
        try {
            const response = await axiosInstance.post("/api/user/login", {
                email: email,
                password: password,
            });
    
            console.log("Login response:", response);
    
            // Checks if token exists in the response data.msg and set token variable in local storage
            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
    
            if (error.response && error.response.data && error.response.data.msg) {
                setError(error.response.data.msg);
            } else {
                setError("An unexpected error has occurred");
            }
        }
    };
    

    return (
        <>
            <NavBar />
            <div className='h-14'></div>
            <div className="flex justify-center items-center mt-28 p-4">
                <div className="flex items-center justify-center w-96 border rounded bg-white px-8 py-16">
                    <form onSubmit={handleLogin} className="w-full">
                        <h1 className="text-2xl mb-10 text-center font-semibold">Login</h1>
                        <input
                            type="text"
                            placeholder="Email"
                            className="mb- h-12 w-full border-2 bg-transparent rounded py-3 px-5 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="flex items-center bg-transparent border-2 px-5 rounded mb-2 mt-4 h-12">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isShowPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
                            />
                            {isShowPassword ? (
                                <FaRegEye
                                    size={22}
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => { toggleShowPassword() }}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    size={22}
                                    className="text-primary cursor-pointer"
                                    onClick={() => { toggleShowPassword() }}
                                />
                            )}
                        </div>

                        {error && <p className="ml-1 text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="w-full text-sm text-white p-2 my-1 hover:bg-blue-600 bg-blue-500 rounded mt-4">Login</button>
                        <p className="text-sm text-center mt-4">
                            Not Registered Yet? {" "}
                            <Link to="/register" className="font-medium text-blue-500 underline mt-5">Create an Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin;
