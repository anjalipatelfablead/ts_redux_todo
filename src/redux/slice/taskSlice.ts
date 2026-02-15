import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* -------------- TASK INTERFACE -------------- */

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in progress" | "completed";
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

/* -------------- REQUEST PAYLOADS -------------- */

interface CreateTaskPayload {
    title: string;
    description: string;
}

interface UpdateTaskPayload {
    taskId: string;
    data: Partial<CreateTaskPayload> & { status?: "pending" | "in progress" | "completed" };
}

/* -------------- REDUX STATE -------------- */

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

const BASE_URL = "http://localhost:3000";

/* -------------- GET ALL TASKS -------------- */

export const getAllTasks = createAsyncThunk<
    Task[],
    void,
    { rejectValue: string }
>("task/getAllTasks", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to fetch tasks"
        );
    }
});

/* -------------- CREATE TASK -------------- */

export const createTask = createAsyncThunk<
    Task,
    CreateTaskPayload,
    { rejectValue: string }
>("task/createTask", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
            `${BASE_URL}/task`,
            {
                title: data.title,
                description: data.description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.task;

    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to create task"
        );
    }
});

/* -------------- UPDATE TASK -------------- */
export const updateTask = createAsyncThunk<
    Task,
    UpdateTaskPayload,
    { rejectValue: string }
>("task/updateTask", async ({ taskId, data }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `${BASE_URL}/task/${taskId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.task;

    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to update task"
        );
    }
});

/* -------------- DELETE TASK -------------- */

export const deleteTask = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("task/deleteTask", async (taskId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_URL}/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return taskId;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to delete task"
        );
    }
});


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //---------- GET ALL TASKS  ----------
            .addCase(getAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch tasks";
            })
            //---------- CREATE TASK  ----------
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create task";
            })
            //---------- UPDATE TASK  ----------
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(
                    (task) => task._id === action.payload._id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update task";
            })
            //---------- DELETE TASK  ----------
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                );
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete task";
            });
    },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
