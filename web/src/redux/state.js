import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
const initialState = {
  socket: io("https://zam-test.onrender.com"),
};

const dataSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.Location = action.payload;
    },
    setDate: (state, action) => {
      state.Date = action.payload;
    },
  },
});

export const { setLocation, setDate } = dataSlice.actions;

export default dataSlice.reducer;
