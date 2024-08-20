import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
const initialState = {
  socket: io("http://localhost:5000/"),
  Type: "Anime",
};

const dataSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.Type = action.payload;
    },
    setDate: (state, action) => {
      state.Date = action.payload;
    },
  },
});

export const { setType, setDate } = dataSlice.actions;

export default dataSlice.reducer;
