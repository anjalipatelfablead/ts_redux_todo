import { useNavigate } from "react-router-dom";
import notfoundbg from "../../assets/404page.jpg"

export default function NotFound() {
    const navigate = useNavigate();

    return (
        // <div className="min-h-screen flex items-center justify-center ">
        <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center text-center space-y-6">

                <img
                    src={notfoundbg}
                    alt="404 Not Found"
                    className="w-3xl md:w-3xl "
                />

                <button
                    onClick={() => navigate("/login")}
                    className="mt-1  bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );

}
