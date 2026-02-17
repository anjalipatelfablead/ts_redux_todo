import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import type { AppDispatch } from "../../redux/store";
import authbg from "../../assets/authbg.jpg";
// import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(form)).unwrap();
            // toast.success("Login successful");
            navigate("/task");
        } catch (err) {
            console.log(err);
            toast.error(err as string);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="min-h-screen flex items-center justify-center p-8 ">
                <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full">

                    <div className="hidden md:flex w-1/2 relative">
                        <img
                            src={authbg}
                            alt="auth"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/20 to-pink-500/20"></div>
                    </div>

                    <div className="flex w-full md:w-1/2 items-center justify-center p-10 bg-white ">
                        <div className="w-full max-w-md">

                            {/* <div className="flex justify-center mb-6">
                            <span className="px-8 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-purple-500/30">
                                Welcome back
                            </span>
                        </div> */}

                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
                                Login your account
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6 mt-8">

                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                        // className="w-full px-0 mt-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all" required
                                        className="
                                        w-full py-3 bg-transparent border-0 border-b-4 border-gray-300
                                        outline-none text-gray-700 placeholder-gray-400 font-medium
                                        bg-[linear-gradient(#7c3aed,#7c3aed)]
                                        bg-no-repeat bg-[length:0%_4px] bg-left-bottom
                                        focus:bg-[length:100%_4px] focus:border-transparent
                                        transition-all duration-300 ease-out"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        // className="w-full px-0 mt-5 mb-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all" required
                                        className="
                                        w-full py-3 bg-transparent border-0 border-b-4 border-gray-300
                                        outline-none text-gray-700 placeholder-gray-400 font-medium
                                        bg-[linear-gradient(#7c3aed,#7c3aed)]
                                        bg-no-repeat bg-[length:0%_4px] bg-left-bottom
                                        focus:bg-[length:100%_4px] focus:border-transparent
                                        transition-all duration-300 ease-out mb-8"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    Login
                                </button>

                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Create Account
                                    </p>
                                </div>

                                <div className="text-center pt-4">
                                    <p className="text-gray-600 text-sm">
                                        Don't have an account?{' '}
                                        <span
                                            className="text-purple-500 font-semibold hover:underline cursor-pointer"
                                            onClick={() => navigate("/register")}
                                        >
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
