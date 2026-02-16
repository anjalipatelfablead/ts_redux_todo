import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import type { AppDispatch } from "../../redux/store";
import authbg from "../../assets/authbg.jpg";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     dispatch(loginUser(form));
    // };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(form)).unwrap();
            navigate("/task");
        } catch (err) {
            console.log(err);
        }
    };


    // return (
    //     <div className="min-h-screen flex ">
    //         {/* image */}
    //         <div className="hidden md:flex w-1/2 relative">
    //             <img
    //                 src={authbg}
    //                 alt="auth"
    //                 className="w-full h-full object-cover"
    //             />
    //             {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-indigo-900/60"></div> */}
    //         </div>


    //         <div className="flex w-4xl md:w-1/2 items-center justify-center bg-gradient-to-br from-pink-200 via-purple-400 to-indigo-600">
    //             <div className="w-full max-w-xl rounded-3xl p-8 text-white">

    //                 <div className="flex justify-center mb-8">
    //                     <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
    //                         <User size={40} />
    //                     </div>
    //                 </div>

    //                 <form onSubmit={handleSubmit} className="space-y-6">

    //                     <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
    //                         <User className="text-white mr-3" size={20} />
    //                         <input
    //                             name="email"
    //                             type="email"
    //                             placeholder="USERNAME"
    //                             onChange={handleChange}
    //                             className="bg-transparent w-full outline-none text-white placeholder-white/70"
    //                         />
    //                     </div>

    //                     <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
    //                         <Lock className="text-white mr-3" size={20} />
    //                         <input
    //                             name="password"
    //                             type="password"
    //                             placeholder="PASSWORD"
    //                             onChange={handleChange}
    //                             className="bg-transparent w-full outline-none text-white placeholder-white/70"
    //                         />
    //                     </div>

    //                     <button
    //                         type="submit"
    //                         className="w-full bg-pink-500 hover:bg-pink-600 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer"
    //                     >
    //                         LOGIN
    //                     </button>

    //                     <div className="border-t border-white/30 pt-4 text-center text-md text-white/60">
    //                         don't have an account? <span className="text-white font-semibold hover:underline cursor-pointer"
    //                             onClick={() => navigate("/register")} >Sign up</span>
    //                     </div>

    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
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

                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                            Login your account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">

                            <div>
                                {/* <label className="block text-gray-600 text-sm mb-2 ">Username</label> */}
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    className="w-full px-0 mt-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all" required
                                />
                            </div>

                            <div>
                                {/* <label className="block text-gray-600 text-sm mb-2">Password</label> */}
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    className="w-full px-0 mt-5 mb-5 py-2 bg-transparent border-0 border-b-5 border-gray-300 focus:border-purple-500 outline-none transition-all" required
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
    );
};

export default Login;
