import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/userSlice";
import type { AppDispatch } from "../../redux/store";
import authbg from "../../assets/authbg.jpg";
// import { User, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(registerUser(form));
        await dispatch(registerUser(form)).unwrap();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full">

                {/* side image */}
                <div className="hidden md:flex w-1/2 relative">
                    <img
                        src={authbg}
                        alt="auth"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/20 to-pink-500/20"></div>
                </div>

                {/* - form - */}
                <div className="flex w-full md:w-1/2 items-center justify-center p-10 bg-white">
                    <div className="w-full max-w-md">

                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                            Create your account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    // className="w-full px-0 mt-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all"
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
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    // className="w-full px-0 mt-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all"
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
                                    // className="w-full px-0 mt-5 mb-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all"
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

                            <button
                                type="submit"
                                className="w-full mt-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            >
                                Register
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <span
                                        className="text-purple-500 font-semibold hover:underline cursor-pointer"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </span>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Register;
