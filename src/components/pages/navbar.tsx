import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");
    const data = sessionStorage.getItem("data");

    const user = data ? JSON.parse(data) : null;
    const username = user?.username;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("data");

        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                    <span className="bg-white text-purple-600 px-2 py-1 rounded-lg">TM</span>
                    <span className="hidden sm:inline">Task Manager</span>
                </h1>

                <h2 className="text-lg">Welcome, {username}</h2>

                <div className="flex space-x-8 items-center text-md font-medium">

                    <NavLink
                        to="/task"
                        className={({ isActive }) =>
                            `transition-all duration-300 hover:text-purple-200 ${isActive ? "border-b-2 border-white pb-1" : "opacity-80 hover:opacity-100"}`
                        }
                    >
                        Tasks
                    </NavLink>

                    {!token ? (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/login" className="hover:text-purple-200 transition-colors">
                                Login
                            </NavLink>

                            <NavLink to="/register" className="bg-white text-purple-600 px-5 py-2 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md">
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-xl hover:bg-white/30 transition-all font-semibold cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
