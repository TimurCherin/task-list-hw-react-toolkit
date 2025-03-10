import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://67cb45c33395520e6af4de18.mockapi.io/name";

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
    const response = await axios.get(API_URL);
    return response.data.map(task => ({
        id: task.id,
        text: task.text,
        completed: task.completed
    }));
});

export const addTask = createAsyncThunk("tasks/addTask", async (text) => {
    const response = await axios.post(API_URL, { text, completed: false });
    return {
        id: response.data.id,
        text: response.data.text,
        completed: response.data.completed
    };
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`);
    return taskId;
});

export const toggleTask = createAsyncThunk("tasks/toggleTask", async (task) => {
    const response = await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: !task.completed
    });
    return response.data;
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (tasks, action) => action.payload)
            .addCase(addTask.fulfilled, (tasks, action) => {
                tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (tasks, action) => {
                return tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(toggleTask.fulfilled, (tasks, action) => {
                const index = tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) tasks[index] = action.payload;
            });
    },
});

export default tasksSlice.reducer;