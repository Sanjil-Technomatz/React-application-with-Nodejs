import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataReducer";

export default configureStore({
  reducer: {
    service: dataReducer,
  },
});
