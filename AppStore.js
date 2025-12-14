import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import feedSlice from "./FeedSlice";
import connections from "./connectionSlice";
import pendingRequests from "./PendingRequestsSlice";

const AppStore = configureStore({
    reducer:{
        user:UserSlice,
        feed:feedSlice,
        connections:connections,
        pendingRequests:pendingRequests
    }
})

export default AppStore