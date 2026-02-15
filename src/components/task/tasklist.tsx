import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask, updateTask } from "../../redux/slice/taskSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Trash2, CheckCircle, Circle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { tasks, loading, error } = useSelector((state: RootState) => state.task);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    const handleDelete = (taskId: string) => {
        if (confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(taskId));
        }
    };

    const handleToggleStatus = (task: any) => {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        dispatch(updateTask({
            taskId: task._id,
            data: { status: newStatus }
        }));
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 opacity-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            My Tasks
                        </h1>
                        <p className="text-white/70">
                            {tasks.length} total tasks
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/task/add")}
                        className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 transition duration-300 text-white px-6 py-3 rounded-lg font-bold"
                    >
                        <Plus size={20} />
                        Add Task
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-md rounded-lg px-4 py-3 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center text-white">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        <p className="mt-4">Loading tasks...</p>
                    </div>
                )}

                {!loading && filteredTasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white/60 text-lg">
                            No tasks found. Create your first task!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition duration-300"
                            >
                                {/* Status Toggle */}
                                <div className="flex items-start justify-between mb-4">
                                    {/* <button
                                        onClick={() => handleToggleStatus(task)}
                                        className="text-white/70 hover:text-white transition"
                                    >
                                        {task.status === "completed" ? (
                                            <CheckCircle size={24} className="text-green-400" />
                                        ) : (
                                            <Circle size={24} />
                                        )}
                                    </button> */}
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="text-red-400 hover:text-red-300 transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <h3 className={`text-xl font-bold mb-2 ${task.status === "completed" ? "line-through text-white/60" : "text-white"
                                    }`}>
                                    {task.title}
                                </h3>

                                <p className={`text-sm mb-4 ${task.status === "completed" ? "text-white/50" : "text-white/70"
                                    }`}>
                                    {task.description}
                                </p>

                                <div className="flex justify-end">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === "completed"
                                        ? "bg-green-500/30 text-green-200"
                                        : "bg-yellow-500/30 text-yellow-200"
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
