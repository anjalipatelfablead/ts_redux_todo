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
            // await dispatch(getAllTasks());
            navigate("/task");
        } catch (err: any) {
            setError(err || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <div className="flex items-center justify-center p-8 pt-10">
            <div className="w-full max-w-6xl">
                <div className="rounded-xl p-10 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-800 shadow-2xl text-white backdrop-blur-lg">

                    <h2 className="text-4xl font-extrabold mb-10 text-center tracking-wide  border-b-4 border-pink-400  pb-2">
                        Add New Task
                    </h2>

                    {error && (
                        <div className="bg-red-500/30 border border-red-300 text-red-100 px-4 py-3 rounded-xl mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <label className="block text-sm font-semibold mb-2 tracking-wide">
                                    Task Title
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Enter task title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full bg-white/20 rounded-xl px-4 py-3 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-pink-300 focus:scale-[1.02] transition duration-300 backdrop-blur-md shadow-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 tracking-wide">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Enter task description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={1}
                                    className="w-full bg-white/20 rounded-xl px-4 py-3 text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-pink-300 focus:scale-[1.02] transition duration-300 backdrop-blur-md shadow-md resize-none"
                                />
                            </div>

                        </div>

                        {/* Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full  md:w-1/2 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer"
                            >
                                {loading ? "Creating..." : "Create Task"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddTask;
