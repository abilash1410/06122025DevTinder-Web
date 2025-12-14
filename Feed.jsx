import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USERS_FEED_URL } from './common/URL';
import axios from 'axios';
import { addUserFeed } from './redux-store/FeedSlice';
import UserFeedCard from './UserFeedCard';

const Feed = () => {
  const dispatch = useDispatch();
  const userFeedData = useSelector((store) => store.feed);

  const getUserFeedData = async () => {
    // Fetch user feed data logic here
    if(userFeedData) return; // Feed data already exists in the store

    const response = await axios.get(USERS_FEED_URL, { withCredentials: true });
    console.log("User Feed Data:", response.data);
    if(response.data){
       // Dispatch action to store feed data in Redux store
       dispatch(addUserFeed(response.data.data));
    }
  }


  useEffect(() => {
    getUserFeedData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center  my-10">
      {userFeedData && <UserFeedCard />}
    </div>
  )
}

export default Feed
