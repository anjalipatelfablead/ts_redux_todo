import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= USER INTERFACE (FROM MONGOOSE MODEL) ================= */

export interface User {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin";
    createdAt?: string;
    updatedAt?: string;
}

/* ================= REQUEST PAYLOADS ================= */

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

/* ================= REDUX STATE ================= */

interface UserState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: sessionStorage.getItem("token"),
    loading: false,
    error: null,
};

const BASE_URL = "http://localhost:3000";

/* ================= REGISTER ================= */
// createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()

export const registerUser = createAsyncThunk<
    void,
    RegisterPayload,
    { rejectValue: string }
>("user/register", async (data, { rejectWithValue }) => {
    try {
        // await axios.post(`${BASE_URL}/user`, data);
        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        await axios.post(`${BASE_URL}/user`, formData);
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Register failed"
        );
    }
});

/* ================= LOGIN ================= */

export const loginUser = createAsyncThunk<
    { user: User; token: string },
    LoginPayload,
    { rejectValue: string }
>("user/login", async (data, { rejectWithValue }) => {
    try {
        // const response = await axios.post(`${BASE_URL}/user/login`, data);

        const formdata = new FormData();
        formdata.append("email", data.email);
        formdata.append("password", data.password);

        const response = await axios.post(`${BASE_URL}/user/login`, formdata);

        // localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("data", JSON.stringify(response.data.user));
        return {
            user: response.data.user,
            token: response.data.token,
        };
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Login failed"
        );
    }
});

/* ================= SLICE ================= */

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            sessionStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder

            /* ---------- REGISTER ---------- */
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Register error";
            })

            /* ---------- LOGIN ---------- */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Login error";
            });
    },
});

/* ================= EXPORTS ================= */

export const { logout } = userSlice.actions;
export default userSlice.reducer;
