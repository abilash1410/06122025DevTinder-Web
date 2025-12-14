import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileSingleCard from "./ProfileSingleCard";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "./common/URL";
import { addUser } from "./redux-store/UserSlice";

const Profile = () => {

 const userDataSelector = useSelector((store) => store.user);

  const [fname, setFname] = useState(userDataSelector?.firstName ||userDataSelector.data?.firstName || '');
  const [lname, setLname] = useState(userDataSelector?.lastName || userDataSelector.data?.lastName || '');
  const [age, setAge] = useState(userDataSelector?.age || userDataSelector.data?.age || '');
  const [skills, setSkills] = useState(userDataSelector?.skills || userDataSelector.data?.skills || []);
  const [gender, setGender] = useState(userDataSelector?.Gender || userDataSelector.data?.Gender || '');
  const [about, setAbout] = useState(userDataSelector?.About || userDataSelector.data?.About || '');
  const [photoURL, setPhotoURL] = useState(userDataSelector?.photoURL || userDataSelector.data?.photoURL || '');
  const [emailID, setEmailID] = useState(userDataSelector?.emailId || userDataSelector.data?.emailId || '');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const dispatch = useDispatch();

  const getToastMessage = (data) => {
     alert(data);
    // return(
    //   <div>
    //     <div className="toast toast-center toast-middle">
    //     <div className="alert alert-success">
    //         <span>{data}</span>
    //     </div>
    // </div>
    // </div>
    // );
  } 

  const updateProfile = async  () => {
    try{
      setLoading(true);
      const response = await axios.patch(UPDATE_PROFILE_URL, {
      Gender: gender,
      About: about,
      skills: skills,
      photoURL: photoURL
    }, {withCredentials: true});
    getToastMessage(response.data.message);
    dispatch(addUser(response.data));
    setLoading(false);

    }catch(err){
      if(err.status === 401 || err.status === 403 || err.status === 400){
        setError(err.response.data.data);
      }
      setLoading(false);
    }
  }

  if (!userDataSelector) return null; 


  return (
    <div className="flex m-5 p-10 justify-center shadow-sm bg-base-200  rounded-lg">

      <div className="flex flex-col justify-center w-96 m-14 p-10 ">

             <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold ">First Name</legend>
                 <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" className="input" placeholder="Type first name here" />
               </fieldset>

               <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">Last Name</legend>
                 <input value={lname} onChange={(e) => setLname(e.target.value)} type="text" className="input" placeholder="Type last name here" />
               </fieldset>

               <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">About</legend>
                 <input value={about} onChange={(e) => setAbout(e.target.value)} type="text" className="input" placeholder="Type about here" />
               </fieldset>

               <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">Age</legend>
                 <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input" placeholder="Type age here" />
               </fieldset>

                <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">Email ID</legend>
                 <input disabled value={emailID} onChange={(e) => setEmailID(e.target.value)} type="text" className="input" placeholder="Type email ID here" />
               </fieldset>

               <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">Gender</legend>
                 <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="input" placeholder="Type gender here" />
               </fieldset>

               <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">Skills</legend>
                 <input value={skills} onChange={(e) => setSkills(e.target.value)} type="text" className="input" placeholder="Type skills here" />
               </fieldset>

                <fieldset className="fieldset">
                 <legend className="fieldset-legend font-bold">photo URL</legend>
                 <input value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} type="text" className="input" placeholder="Type photo URL here" />
               </fieldset>
              <p className="text-red-500">{error}</p>
              {loading && <span  className="loading loading-ball bg-red-600"></span> }
               <button onClick={updateProfile} className="btn btn-primary mt-4">Update Profile</button>


      </div>
       <ProfileSingleCard photoURL={photoURL} firstName={fname} About={about} Gender={gender} ></ProfileSingleCard>
    </div>
  )
}

export default Profile
