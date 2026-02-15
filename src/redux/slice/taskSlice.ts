import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= TASK INTERFACE ================= */

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

/* ================= REQUEST PAYLOADS ================= */

interface AddTaskPayload {
    title: string;
    description: string;
}

/* ================= REDUX STATE ================= */

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

/* ================= GET ALL TASKS ================= */

export const getTasks = createAsyncThunk<
    Task[],
    void,
    { rejectValue: string }
>("task/getTasks", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
});

/* ================= ADD TASK ================= */

export const addTask = createAsyncThunk<
    Task,
    AddTaskPayload,
    { rejectValue: string }
>("task/addTask", async (payload, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/api/task`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to add task");
    }
});

/* ================= DELETE TASK ================= */

export const deleteTask = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("task/deleteTask", async (taskId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_URL}/api/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return taskId;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete task");
    }
});

/* ================= UPDATE TASK ================= */

export const updateTask = createAsyncThunk<
    Task,
    { taskId: string; status: string },
    { rejectValue: string }
>("task/updateTask", async ({ taskId, status }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${BASE_URL}/api/task/${taskId}`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
});

/* ================= SLICE ================= */

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* GET TASKS */
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch tasks";
            });

        /* ADD TASK */
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add task";
            });

        /* DELETE TASK */
        builder
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete task";
            });

        /* UPDATE TASK */
        builder
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload || "Failed to update task";
            });
    },
});

export default taskSlice.reducer;
