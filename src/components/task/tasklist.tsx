import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, deleteTask, updateTask, getTasksByUser } from "../../redux/slice/taskSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Trash2, CheckCircle, Circle, FilePen, Search } from "lucide-react";
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
            <div className="min-h-screen bg-gray-50">
                {/* <AddTask /> */}

                {userRole == "user" && <AddTask />}

                <div className="w-full border-b border-gray-200"></div>

                <div className="p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                    My Tasks
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    You have <span className="text-purple-600">{tasks.length}</span> total tasks
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="w-full md:w-96 relative">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 pr-12 text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-xl mb-8 shadow-sm">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-14 w-14 border-4 border-purple-100 border-t-purple-600"></div>
                                <p className="mt-4 text-gray-500 font-medium">Loading tasks...</p>
                            </div>
                        )}

                        {!loading && filteredTasks.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                                <p className="text-gray-400 text-lg">
                                    No tasks found. Time to be productive!
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="flex items-start justify-between mb-6">
                                            <button
                                                onClick={() => handleToggleStatus(task)}
                                                className={`transition-all duration-300 cursor-pointer ${task.status === "completed" ? "text-green-500" : "text-gray-300 hover:text-purple-400"
                                                    }`}
                                            >
                                                {task.status === "completed" ? (
                                                    <CheckCircle size={28} />
                                                ) : (
                                                    <Circle size={28} />
                                                )}
                                            </button>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(task)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                                >
                                                    {task.status !== "completed" && <FilePen size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {editingTaskId === task._id ? (
                                            <div className="space-y-4">
                                                <input
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    // className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all font-bold"
                                                    className="
                                                        w-full py-3 bg-transparent border-0 border-b-4 border-gray-300
                                                        outline-none text-gray-700 placeholder-gray-400 font-medium
                                                        bg-[linear-gradient(#7c3aed,#7c3aed)]
                                                        bg-no-repeat bg-[length:0%_4px] bg-left-bottom
                                                        focus:bg-[length:100%_4px] focus:border-transparent
                                                        transition-all duration-300 ease-out"
                                                />

                                                <textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    // className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all text-sm"
                                                    className="
                                                        w-full py-3 bg-transparent border-0 border-b-4 border-gray-300
                                                        outline-none text-gray-700 placeholder-gray-400 font-medium
                                                        bg-[linear-gradient(#7c3aed,#7c3aed)]
                                                        bg-no-repeat bg-[length:0%_4px] bg-left-bottom
                                                        focus:bg-[length:100%_4px] focus:border-transparent
                                                        transition-all duration-300 ease-out"
                                                    rows={1}
                                                />

                                                <div className="flex gap-2 pt-2">
                                                    <button
                                                        onClick={() => handleSaveEdit(task._id)}
                                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-bold shadow-md shadow-purple-200 transition-all cursor-pointer"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {userRole === "admin" && (
                                                    <div className="mb-4 p-3 bg-purple-50 rounded-2xl text-xs border border-purple-100">
                                                        <p className="font-bold text-purple-700 mb-1">
                                                            Assignee: {task.user?.username}
                                                        </p>
                                                        <p className="text-purple-500 truncate">
                                                            {task.user?.email}
                                                        </p>
                                                    </div>
                                                )}
                                                <h3 className={`text-xl font-bold mb-3 transition-all ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"
                                                    }`}>
                                                    {task.title}
                                                </h3>

                                                <p className={`text-sm mb-6 leading-relaxed transition-all ${task.status === "completed" ? "text-gray-300" : "text-gray-600"
                                                    }`}>
                                                    {task.description}
                                                </p>
                                            </>
                                        )}

                                        <div className="flex justify-end pt-4 border-t border-gray-50">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${task.status === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-amber-100 text-amber-600"
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
