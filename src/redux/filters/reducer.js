import { createReducer } from "@reduxjs/toolkit";
import { setFilter } from "./actions";

const initialState = "all";

const filtersReducer = createReducer(initialState, (builder) => {
    builder.addCase(setFilter, (state, action) => action.payload);
});

export default filtersReducer;