import { createSlice } from "@reduxjs/toolkit";

const pendingRequestSlice = createSlice({
  name: 'pendingRequests',
  initialState:null,
  reducers: {
    setPendingRequests: (state, action) => {
        return action.payload;
    },
    removePendingRequest : (state, action) => {
       const newState = state.data.filter((request) => request._id !== action.payload);
       return newState;
    }
  },
});
export const { setPendingRequests,removePendingRequest } = pendingRequestSlice.actions;
export default pendingRequestSlice.reducer;