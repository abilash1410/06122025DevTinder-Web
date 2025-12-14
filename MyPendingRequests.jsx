import axios from "axios";
import { useEffect } from "react";
import { MY_PENDING_CONNECTIONS_URL, RESPOND_PENDING_REQUEST_URL } from "./common/URL";
import { useDispatch, useSelector } from "react-redux";
import { removePendingRequest, setPendingRequests } from "./redux-store/PendingRequestsSlice";

const MyPendingRequests = () => {

    const dispatch = useDispatch();
    const pendingRequestFromStore = useSelector((store) => store.pendingRequests);

    const getPendingRequests = async () => {
        // API call to fetch pending requests can be implemented here
        const response = await axios.get(MY_PENDING_CONNECTIONS_URL, { withCredentials: true });
        dispatch(setPendingRequests(response.data));
    }

    useEffect(() => {
        // Fetch pending requests logic here
        getPendingRequests();
    }, []);


    const reviewRequest = async(status,requestId) => {
        try {
            const response = await axios.post(RESPOND_PENDING_REQUEST_URL+`/${status}`+`/${requestId}`,{}, { withCredentials: true });
            console.log("Review request response:", response);
          
                dispatch(removePendingRequest(requestId));
        } catch (error) {  
            console.error("Error reviewing request:", error);  
        }

    }
if(!pendingRequestFromStore) return;


if(pendingRequestFromStore.data.length === 0) {
    return (<div>
      You have no pending requests.
    </div>)}


  return  (
    <div className = 'text-center my-10'>

        <h1 className="text-4xl font-bold ">My Pending Requests</h1>
        
        {pendingRequestFromStore.data.map((connection) => {const fromUserId = connection.fromUserId; 
        return(
            
            <div id={connection._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                <div>
                    <img alt="Profile Pic" 
                    className="w-24 h-24 rounded-full mx-4" src={fromUserId.photoURL ?? "default-profile-pic.jpg"}></img>
                    </div>
                    <div className="text-left mx-4"> 
                        <h2 className="font-bold text-xl">{fromUserId.firstName} {fromUserId.lastName}</h2>
                        {fromUserId.Gender && <p>{fromUserId.Gender}</p>}
                        {fromUserId.about && <p>About: {fromUserId.about}</p>}

                    </div>

                    <div className="card-actions flex  justify-space-between flex-direction-col">
                        <button onClick={()=>{reviewRequest('Rejected',connection._id)}} className="btn btn-primary ">Reject</button>
                        <button onClick={()=>{reviewRequest('Accepted',connection._id)}} className="btn btn-secondary">Accept</button>
                    </div>
            </div>
               )
            }
        )}

    </div>
  )
}

//onClick={() => reviewRequest('Rejected',connection._id)}
//onClick={() => reviewRequest('Accepted',connection._id)} 


export default MyPendingRequests
