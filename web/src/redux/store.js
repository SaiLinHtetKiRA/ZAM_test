import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dataReducer from "./state.js";

const store = configureStore({
  reducer: {
    state: dataReducer,
  },
});

export default store;
