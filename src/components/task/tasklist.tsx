import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask, updateTask, getTasksByUser } from "../../redux/slice/taskSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Trash2, CheckCircle, Circle, Plus, FilePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTask from "./addtask";
import { jwtDecode } from 'jwt-decode';


interface CustomJWTPayload {
    user_id: number;
    email: string;
    role: string;
    exp?: number;
    iat?: number;
}


const TaskList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { tasks, loading, error } = useSelector((state: RootState) => state.task);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");


    // useEffect(() => {
    //     dispatch(getAllTasks());
    // }, [dispatch]);

    useEffect(() => {
        const storeduser = sessionStorage.getItem("data");
        if (storeduser) {
            const user = JSON.parse(storeduser);
            if (user.role === "admin") {
                dispatch(getAllTasks());
            } else {
                dispatch(getTasksByUser(user._id));
            }
        }
    }, [dispatch]);

    const handleDelete = (taskId: string) => {
        if (confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(taskId));
        }
    };

    const handleEdit = (task: any) => {
        setEditingTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
    };


    const handleSaveEdit = (taskId: string) => {
        dispatch(updateTask({
            taskId,
            data: {
                title: editTitle,
                description: editDescription,
            }
        }));
        setEditingTaskId(null);
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
    // const storeduser = sessionStorage.getItem("data");
    // const user = storeduser ? JSON.parse(storeduser) : null;

    const getUserRole = (): string | null => {
        const token = sessionStorage.getItem("token");
        if (!token) return null;

        try {
            const decoded = jwtDecode<CustomJWTPayload>(token);
            return decoded.role;
        } catch {
            return null;
        }
    };

    const userRole = getUserRole();

    return (
        <>
            <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">
                {/* <AddTask /> */}

                {userRole == "user" && <AddTask />}

                {/* // <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900 opacity-100 p-8"> */}
                <div className="min-h-screen p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-black mb-2">
                                    My Tasks
                                </h1>
                                <p className="text-black/70">
                                    {tasks.length} total tasks
                                </p>
                            </div>
                            {/* <button
                                onClick={() => navigate("/task/add")}
                                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 transition duration-300 text-white px-6 py-3 rounded-lg font-bold cursor-pointer"
                            >
                                <Plus size={20} />
                                Add Task
                            </button> */}
                        </div>

                        {/* Search Bar */}
                        <div className="mb-8">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/80 backdrop-blur-md rounded-lg px-4 py-3 text-black placeholder-black/70 outline-none focus:ring-2 focus:ring-pink-500"
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
                                <p className="text-gray/70 text-lg">
                                    No tasks found. Create your first task!
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-gray/90 transition duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <button
                                                onClick={() => handleToggleStatus(task)}
                                                className="text-black/70 hover:text-black transition cursor-pointer"
                                            >
                                                {task.status === "completed" ? (
                                                    <CheckCircle size={24} className="text-green-400" />
                                                ) : (
                                                    <Circle size={24} />
                                                )}
                                            </button>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleEdit(task)}
                                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                                >
                                                    {task.status !== "completed" && <FilePen size={20} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="text-red-400 hover:text-red-700 transition cursor-pointer"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* <h3 className={`text-xl font-bold mb-2 ${task.status === "completed" ? "line-through text-black/60" : "text-black"
                                            }`}>
                                            {task.title}
                                        </h3>

                                        <p className={`text-sm mb-4 ${task.status === "completed" ? "text-black/50" : "text-black/70"
                                            }`}>
                                            {task.description}
                                        </p> */}

                                        {editingTaskId === task._id ? (
                                            <>
                                                <input
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="w-full mb-2 px-2 py-1  border-b-4 border-pink-400"
                                                />

                                                <textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    className="w-full mb-2 px-2 py-1  border-b-4 border-pink-400"
                                                    rows={1}
                                                />

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleSaveEdit(task._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {userRole === "admin" && (
                                                    <div className="mb-3 p-2 bg-purple-100 rounded text-md">
                                                        <p className="font-semibold text-purple-800">
                                                            Username: {task.user?.username}
                                                        </p>
                                                        <p className="text-purple-600">
                                                            Email: {task.user?.email}
                                                        </p>
                                                    </div>
                                                )}
                                                <h3 className={`text-xl font-bold mb-2 ${task.status === "completed"
                                                    ? "line-through text-black/60"
                                                    : "text-black"
                                                    }`}>
                                                    Title: {task.title}
                                                </h3>

                                                <p className={`text-sm mb-4 ${task.status === "completed"
                                                    ? "line-through text-black/50"
                                                    : "text-black/70"
                                                    }`}>
                                                    Description: {task.description}
                                                </p>
                                            </>
                                        )}

                                        <div className="flex justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === "completed"
                                                ? "bg-green-500/70 text-green-700"
                                                : "bg-yellow-500/70 text-yellow-700"
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
            </div>
        </>
    );
};

export default TaskList;
