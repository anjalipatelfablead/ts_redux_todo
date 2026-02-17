import { useNavigate } from "react-router-dom";
import notfoundbg from "../../assets/404page.jpg"

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8 ">
            <div className="flex flex-col items-center text-center space-y-8 max-w-2xl">

                <img
                    src={notfoundbg}
                    alt="404 Not Found"
                    className="w-full max-w-xl rounded-[2rem] "
                />

                <div className="space-y-4">
                    {/* <h2 className="text-3xl font-bold text-gray-800">Oops! Page not found</h2> */}
                    <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                <button
                    onClick={() => navigate("/task")}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-3.5 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    Back to Tasks
                </button>
            </div>
        </div>
    );
}
