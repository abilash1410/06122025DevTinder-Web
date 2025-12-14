import axios from "axios";
import { useEffect } from "react";
import { MY_CONNECTIONS_URL } from "./common/URL";
import { useDispatch, useSelector } from "react-redux";
import { getMyConnections } from "./redux-store/connectionSlice";

const MyConnections = () => {

    const dispatch = useDispatch();
    const myConnectionsFromStore = useSelector((store) => store.connections);   
    
    const fetchMyConnections = async () => {
        try {
            const response = await axios.get(MY_CONNECTIONS_URL,{withCredentials:true});
             dispatch(getMyConnections(response.data));

        }catch (error) {
            console.error("Error fetching connections:", error);
        }
    }


useEffect(() => {
    fetchMyConnections();
}, []);


if(!myConnectionsFromStore) return;


if(myConnectionsFromStore.data.length === 0) {
    return (<div>
      You have no connections yet.
    </div>)}


  return  (
    <div className = 'text-center my-10'>

        <h1 className="text-4xl font-bold ">My Connections</h1>
        
        {myConnectionsFromStore.data.map((connection) => {return(
            <div id={connection._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                <div >
                    <img alt="Profile Pic" 
                    className="w-24 h-24 rounded-full mx-4" src={connection.photoURL ?? "default-profile-pic.jpg"}></img>
                    </div>
                    <div className="text-left mx-4"> 
                        <h2 className="font-bold text-xl">{connection.firstName} {connection.lastName}</h2>
                        {connection.Gender && <p>{connection.Gender}</p>}
                        {connection.about && <p>About: {connection.about}</p>}

                    </div>
            </div>
               )
            }
        )}

    </div>
  )
}

export default MyConnections
