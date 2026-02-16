import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("data");

        navigate("/login");
    };

    return (
        <nav className=" bg-pink-400 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold tracking-wide">
                    Task Manager
                </h1>

                <div className="flex space-x-6 items-center text-lg">

                    <NavLink
                        to="/task"
                        className={({ isActive }) =>
                            isActive ? "text-black font-semibold" : "hover:text-white"
                        }
                    >
                        Tasks
                    </NavLink>

                    {!token ? (
                        <>
                            <NavLink to="/login" className="hover:text-black">
                                Login
                            </NavLink>

                            <NavLink to="/register" className="hover:text-black">
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
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
