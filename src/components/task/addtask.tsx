import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slice/taskSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        if (!form.title.trim()) {
            setError("Title is required");
            return;
        }

        if (!form.description.trim()) {
            setError("Description is required");
            return;
        }

        setLoading(true);
        try {
            await dispatch(createTask(form)).unwrap();
            setForm({
                title: "",
                description: "",
            });

            // await dispatch(getAllTasks());
            navigate("/task");
        } catch (err: any) {
            setError(err || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
    //     <div className="flex items-center justify-center p-8 pt-10">
    //         <div className="w-full max-w-6xl">
    //             <div className="rounded-xl p-10 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-800 shadow-2xl text-white backdrop-blur-lg">

    //                 <h2 className="text-4xl font-extrabold mb-10 text-center tracking-wide  border-b-4 border-pink-400  pb-2">
    //                     Add New Task
    //                 </h2>

    //                 {error && (
    //                     <div className="bg-red-500/30 border border-red-300 text-red-100 px-4 py-3 rounded-xl mb-6 text-center">
    //                         {error}
    //                     </div>
    //                 )}

    //                 <form onSubmit={handleSubmit} className="space-y-8">

    //                     {/* Responsive Grid */}
    //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    //                         <div>
    //                             <label className="block text-sm font-semibold mb-2 tracking-wide">
    //                                 Task Title
    //                             </label>
    //                             <input
    //                                 name="title"
    //                                 type="text"
    //                                 placeholder="Enter task title"
    //                                 value={form.title}
    //                                 onChange={handleChange}
    //                                 className="w-full bg-white/20 rounded-xl px-4 py-3 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-pink-300 focus:scale-[1.02] transition duration-300 backdrop-blur-md shadow-md"
    //                             />
    //                         </div>

    //                         <div>
    //                             <label className="block text-sm font-semibold mb-2 tracking-wide">
    //                                 Description
    //                             </label>
    //                             <textarea
    //                                 name="description"
    //                                 placeholder="Enter task description"
    //                                 value={form.description}
    //                                 onChange={handleChange}
    //                                 rows={1}
    //                                 className="w-full bg-white/20 rounded-xl px-4 py-3 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-pink-300 focus:scale-[1.02] transition duration-300 backdrop-blur-md shadow-md resize-none"
    //                             />
    //                         </div>

    //                     </div>

    //                     {/* Button */}
    //                     <div className="flex justify-center pt-4">
    //                         <button
    //                             type="submit"
    //                             disabled={loading}
    //                             className="w-full  md:w-1/2 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer"
    //                         >
    //                             {loading ? "Creating..." : "Create Task"}
    //                         </button>
    //                     </div>

    //                 </form>

    //             </div>
    //         </div>
    //     </div>
    // );


    return (
        <div className="flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 border border-gray-100">

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Add New Task
                </h2>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center shadow-sm">
                        <span className="mr-2"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="relative">
                            <input
                                name="title"
                                type="text"
                                placeholder="Task Title"
                                value={form.title}
                                onChange={handleChange}
                                className=" w-full py-3 bg-transparent border-0 border-b-3 border-gray-300
                                    outline-none text-gray-700 placeholder-gray-400 font-medium
                                    bg-[linear-gradient(#7c3aed,#7c3aed)]
                                    bg-no-repeat bg-[length:0%_2px] bg-left-bottom
                                    focus:bg-[length:100%_2px]
                                    transition-all duration-300 ease-out"
                                required
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={form.description}
                                onChange={handleChange}
                                rows={1}
                                className=" w-full py-3 bg-transparent border-0 border-b-3 border-gray-300
                                    outline-none text-gray-700 placeholder-gray-400 font-medium
                                    bg-[linear-gradient(#7c3aed,#7c3aed)]
                                    bg-no-repeat bg-[length:0%_2px] bg-left-bottom
                                    focus:bg-[length:100%_2px]
                                    transition-all duration-300 ease-out"
                                required
                            />
                        </div>

                    </div>

                    {/* Centered Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 py-3.5 rounded-2xl font-bold text-white shadow-xl hover:shadow-purple-500/20 transform hover:scale-[1.01] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                                    <span>Creating...</span>
                                </>
                            ) : (
                                "Create Task"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddTask;
