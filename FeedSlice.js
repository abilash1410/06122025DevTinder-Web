import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addUserFeed: (state, action) => {
            return action.payload;
        },
        removeUserFeed: (state,action) => { 
            const newUserFeed = state.filter((userFeed) => userFeed._id !== action.payload);
            return newUserFeed;
        }
    }
});


export const { addUserFeed, removeUserFeed } = FeedSlice.actions;
export default FeedSlice.reducer;