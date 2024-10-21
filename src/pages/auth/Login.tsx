import { useState } from "react";
import logo from "../../assets/logo2.png";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    

    async function submit(event:any) {
        event.preventDefault();
        if (username === "" || password === "") {
            setError("Username and Password are required");
        }

        const data = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post("http://localhost:8085/auth/login", data);
            login(response.data);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("There was an error logging in")
            
        }

        
        
    }

    return (
        <div>
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-center">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className="w-10 h-10" src={logo} alt="" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">Nexivus</span>
                    </a>
                </div>
            </div>
            <div className="p-40 text-center">
            <div className="max-w-[600px] p-8 shadow-xl rounded-xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-400">Login</h1>
                </div>


                <form onSubmit={submit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" onChange={function (event) {
                            setUsername(event.target.value);
                            setError("");
                        }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username"  />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" onChange={function (event) {
                            setPassword(event.target.value);
                            setError("");
                        }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password"  />
                    </div>
                    <div className="text-left">{error && <div className="pb-5 text-red-500 text-sm" >{error}</div>}</div>
                    
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;