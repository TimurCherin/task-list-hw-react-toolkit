import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask", (text) => ({
    payload: {
        id: Date.now(),
        text,
        completed: false,
    },
}));

export const toggleTask = createAction("tasks/toggleTask");
export const deleteTask = createAction("tasks/deleteTask");