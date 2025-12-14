import axios from 'axios';
import React, { useEffect } from 'react';
import { SEND_CONNECTION_REQUEST_URL } from './common/URL';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFeed } from './redux-store/FeedSlice';

const UserFeedCard = () => {

  const dispatch = useDispatch();
  const userFeedDataFromSelector = useSelector((store) => store.feed);

  const sendOrIgnoreConnectionRequest = async(status, userId) => {
    try {
        const response = await axios.post(SEND_CONNECTION_REQUEST_URL+`/${status}`+`/${userId}`,{}, { withCredentials: true });
        console.log("Send/Ignore connection request response:", response);
           dispatch(removeUserFeed(userId));
      }
         catch (error) {  
        console.error("Error sending/ignoring connection request:", error);  
        
    }
  }


  useEffect(() => {
    console.log("User Feed Data in Card:", userFeedDataFromSelector);
    
  }, []);

  if(!userFeedDataFromSelector) return;

  if(userFeedDataFromSelector?.length === 0){
    return(
      <div>
        No new users found.
      </div>
    )
  }
 
  return ( userFeedDataFromSelector?.length > 0 &&
    <div className="card bg-base-300 w-96 shadow-sm flex m-4">
        <div className='flex'>
            <figure>
    <img
      src={
        userFeedDataFromSelector[0]?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{userFeedDataFromSelector[0]?.firstName}</h2>
    <p>{userFeedDataFromSelector[0]?.About}</p>
     <p>{userFeedDataFromSelector[0]?.Gender}</p>
    <div className="card-actions flex  justify-space-between flex-direction-col">
      <button onClick={() => {sendOrIgnoreConnectionRequest('Ignored', userFeedDataFromSelector[0]?._id)}} className="btn btn-primary ">Ignore</button>
      <button onClick={() => {sendOrIgnoreConnectionRequest('Intrested', userFeedDataFromSelector[0]?._id)}} className="btn btn-secondary">Interested</button>
    </div>
  </div>
        </div>
  
</div>
  )
}

export default UserFeedCard
