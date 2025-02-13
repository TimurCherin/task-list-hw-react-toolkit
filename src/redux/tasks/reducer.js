import { createReducer } from "@reduxjs/toolkit";
import { addTask, toggleTask, deleteTask } from "./actions";

const initialState = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
    { id: 4, text: "Task 4", completed: true },
];

const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTask, (state, action) => {
            state.push(action.payload);
        })
        .addCase(toggleTask, (state, action) => {
            const task = state.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        })
        .addCase(deleteTask, (state, action) => {
            return state.filter((task) => task.id !== action.payload);
        });
});

export default tasksReducer;