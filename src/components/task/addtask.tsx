import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, getAllTasks } from "../../redux/slice/taskSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
            await dispatch(getAllTasks());
            navigate("/task");
        } catch (err: any) {
            setError(err || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-5xl font-bold mb-4">Create New Task</h2>
                    <p className="text-xl text-white/80">Organize your work and stay productive</p>
                </div>
            </div>

            <div className="flex w-full md:w-1/2 items-center justify-center">
                <div className="w-full max-w-lg rounded-3xl p-8
            bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900
            shadow-2xl text-white m-4">

                    <button
                        onClick={() => navigate("/task")}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Tasks
                    </button>

                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Add New Task
                    </h2>

                    {error && (
                        <div className="bg-red-500/30 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Task Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Enter task title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full bg-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter task description"
                                value={form.description}
                                onChange={handleChange}
                                rows={5}
                                className="w-full bg-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-md resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 transition duration-300 py-3 rounded-lg font-bold text-lg cursor-pointer"
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
