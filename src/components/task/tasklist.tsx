import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, updateTask } from "../../redux/slice/taskSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { CheckCircle, Trash2, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authbg from "../../assets/authbg.jpg";

const TaskList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { tasks, loading, error } = useSelector((state: RootState) => state.task);
    const { user, token } = useSelector((state: RootState) => state.user);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "" });

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        dispatch(getTasks());
    }, [token, navigate, dispatch]);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim()) {
            // import addTask thunk here after form submission
            const { addTask } = await import("../../redux/slice/taskSlice");
            dispatch(addTask({ title: formData.title, description: formData.description }));
            setFormData({ title: "", description: "" });
            setShowAddModal(false);
        }
    };

    const handleDeleteTask = (taskId: string) => {
        dispatch(deleteTask(taskId));
    };

    const handleToggleTask = (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === "completed" ? "pending" : "completed";
        dispatch(updateTask({ taskId, status: newStatus }));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!token) return null;

    return (
        <div className="min-h-screen flex">
            {/* LEFT IMAGE SIDE */}
            <div className="hidden md:flex w-1/2 relative">
                <img
                    src={authbg}
                    alt="tasks"
                    className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-indigo-900/60"></div>
            </div>

            {/* RIGHT TASK LIST SIDE */}
            <div className="flex w-full md:w-1/2 flex-col items-center justify-start pt-8 pb-8 px-4 overflow-y-auto">
                <div className="w-full max-w-lg rounded-3xl p-8 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 shadow-2xl text-white">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">My Tasks</h1>
                            <p className="text-pink-100 text-sm mt-1">Welcome, {user?.username}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition duration-300"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Add Task Button */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center gap-2 mb-8"
                    >
                        <Plus size={20} />
                        Add New Task
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/30 border border-red-400 text-white px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                            <p className="mt-3">Loading tasks...</p>
                        </div>
                    )}

                    {/* Tasks List */}
                    {!loading && tasks.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-pink-100 text-lg">No tasks yet</p>
                            <p className="text-pink-100 text-sm">Click "Add New Task" to create one</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-start gap-4 hover:bg-white/20 transition duration-300"
                                >
                                    <button
                                        onClick={() => handleToggleTask(task._id, task.status)}
                                        className={`mt-1 flex-shrink-0 transition duration-300 ${
                                            task.status === "completed"
                                                ? "text-green-400"
                                                : "text-pink-200 hover:text-green-400"
                                        }`}
                                    >
                                        <CheckCircle size={24} />
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={`font-semibold text-lg ${
                                                task.status === "completed"
                                                    ? "line-through text-gray-300"
                                                    : "text-white"
                                            }`}
                                        >
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p
                                                className={`text-sm mt-1 ${
                                                    task.status === "completed"
                                                        ? "text-gray-400"
                                                        : "text-pink-100"
                                                }`}
                                            >
                                                {task.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-pink-200 mt-2">
                                            Status: <span className="font-semibold capitalize">{task.status}</span>
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="mt-1 flex-shrink-0 text-red-300 hover:text-red-500 transition duration-300"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 rounded-3xl p-8 w-96 shadow-2xl text-white">
                        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>

                        <form onSubmit={handleAddTask} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Task title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />

                            <textarea
                                placeholder="Task description (optional)"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                            />

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 py-2 rounded-lg transition duration-300 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-pink-400 hover:bg-pink-500 py-2 rounded-lg transition duration-300 font-semibold"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
