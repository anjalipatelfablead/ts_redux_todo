import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import authbg from "../../assets/authbg.jpg";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token, loading, error } = useSelector((state: RootState) => state.user);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    // Redirect to tasks after successful login
    useEffect(() => {
        if (token) {
            navigate("/tasks");
        }
    }, [token, navigate]);

    //    return (
    //     <div className="min-h-screen flex">

    //       {/* Left Side Image */}
    //       <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
    //         <img
    //           src={authbg}
    //           alt="login"
    //           className="w-3/4 rounded-xl shadow-2xl"
    //         />
    //       </div>

    //       {/* Right Side Form */}
    //       <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
    //         <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
    //           <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
    //             Welcome Back
    //           </h2>

    //           <form onSubmit={handleSubmit} className="space-y-4">
    //             <input
    //               name="email"
    //               placeholder="Email"
    //               onChange={handleChange}
    //               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             />

    //             <input
    //               name="password"
    //               type="password"
    //               placeholder="Password"
    //               onChange={handleChange}
    //               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             />

    //             <button
    //               type="submit"
    //               className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
    //             >
    //               Login
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   );


    return (
        <div className="min-h-screen flex ">

            {/* LEFT IMAGE SIDE */}
            <div className="hidden md:flex w-1/2 relative">
                <img
                    src={authbg}
                    alt="auth"
                    className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-indigo-900/60"></div>
            </div>

            {/* RIGHT LOGIN SIDE */}
            <div className="flex w-3xl md:w-1/2 items-center justify-center">

                <div className="w-full max-w-lg rounded-3xl p-8
            bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900
            shadow-2xl text-white">

                    {/* Avatar Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
                            <User size={40} />
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email */}
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
                            <User className="text-white mr-3" size={20} />
                            <input
                                name="email"
                                type="email"
                                placeholder="USERNAME"
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-white placeholder-white/70"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
                            <Lock className="text-white mr-3" size={20} />
                            <input
                                name="password"
                                type="password"
                                placeholder="PASSWORD"
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-white placeholder-white/70"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/30 border border-red-400 text-white px-4 py-2 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-500 hover:bg-pink-600 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "LOGGING IN..." : "LOGIN"}
                        </button>

                        {/* Remember / Forgot */}
                        {/* <div className="flex justify-between text-sm text-white/80">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-pink-500" />
                                Remember me
                            </label>
                            <span className="hover:text-white cursor-pointer">
                                Forgot password?
                            </span>
                        </div> */}

                        <div className="border-t border-white/30 pt-4 text-center text-xs text-white/60">
                            don't have an account? <span className="text-white font-semibold hover:underline cursor-pointer"
                            onClick={()=> navigate("/register")} >Sign up</span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

};

export default Login;
