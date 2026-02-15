import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/userSlice";
import type { AppDispatch } from "../../redux/store";
import authbg from "../../assets/authbg.jpg";
import { User, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(form));
    };
    // return (
    //     <div className="min-h-screen flex">

    //         {/* Left Side Image */}
    //         <div className="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center">
    //             <img
    //                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    //                 alt="register"
    //                 className="w-3/4 rounded-xl shadow-2xl"
    //             />
    //         </div>

    //         {/* Right Side Form */}
    //         <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
    //             <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
    //                 <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
    //                     Create Account
    //                 </h2>

    //                 <form onSubmit={handleSubmit} className="space-y-4">
    //                     <input
    //                         name="username"
    //                         placeholder="Username"
    //                         onChange={handleChange}
    //                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    //                     />

    //                     <input
    //                         name="email"
    //                         placeholder="Email"
    //                         onChange={handleChange}
    //                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    //                     />

    //                     <input
    //                         name="password"
    //                         type="password"
    //                         placeholder="Password"
    //                         onChange={handleChange}
    //                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    //                     />

    //                     <button
    //                         type="submit"
    //                         className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
    //                     >
    //                         Register
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="min-h-screen flex">

            {/* LEFT IMAGE SIDE */}
            <div className="hidden md:flex w-1/2 relative">
                <img
                    src={authbg}
                    alt="register"
                    className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-indigo-900/60"></div>
            </div>

            {/* RIGHT REGISTER SIDE */}
            <div className="flex w-full md:w-1/2 items-center justify-center">

                <div className="w-full max-w-lg rounded-3xl p-8
                bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900
                shadow-2xl text-white">

                    {/* Avatar Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
                            <User size={40} />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Create Account
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username */}
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
                            <User className="text-white mr-3" size={20} />
                            <input
                                name="username"
                                placeholder="USERNAME"
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-white placeholder-white/70"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-3 backdrop-blur-md">
                            <Mail className="text-white mr-3" size={20} />
                            <input
                                name="email"
                                type="email"
                                placeholder="EMAIL"
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

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-500 hover:bg-pink-600 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer"
                        >
                            REGISTER
                        </button>

                        <div className="border-t border-white/30 pt-4 text-center text-xs text-white/60">
                            already have an account?{" "}
                            <span className="text-white font-semibold hover:underline cursor-pointer"
                                onClick={()=> navigate("/login")}
                            >
                                Login
                            </span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );

};

export default Register;
