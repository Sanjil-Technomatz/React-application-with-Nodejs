import { createSlice } from "@reduxjs/toolkit";

export const dataReducer = createSlice({
  name: "Service Data",
  initialState: {
    data: [],
    error: "",
    singleData: {},
    loading: true,
  },
  reducers: {
    serviceData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    },
    serviceFailed: (state) => {
      state.error = " Some error occur";
      state.loading = false;
    },
    singleData: (state, action) => {
      state.singleData = action.payload;
      state.loading = false;
      state.error = "";
    },
  },
});

export const { serviceData, serviceFailed, singleData } = dataReducer.actions;

export default dataReducer.reducer;
