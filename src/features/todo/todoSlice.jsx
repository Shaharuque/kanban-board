//normal reducers will be handled here sync kaj gula jader sathey api calling ar relation nai
//loggedIn,loggedOut doita action defined here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    storedTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { storedTasks } = todoSlice.actions;
export const todosReducer = todoSlice.reducer;
