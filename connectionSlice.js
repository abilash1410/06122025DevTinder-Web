import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connections',
    initialState:null,
    reducers: {
        getMyConnections: (state,action) => {
           return action.payload;
        },
        removeMyConnections: () => {
           return null;
        }
    }
});


export const { getMyConnections, removeMyConnections } = connectionSlice.actions;
export default connectionSlice.reducer;