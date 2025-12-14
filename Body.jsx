import NavBar from './common/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './common/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser } from './redux-store/UserSlice';
import axios from 'axios';
import { GET_USER_PROFILE_URL } from './common/URL';

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

   
  const fetchUserIfCookieExists = async () => {
    if(userData) return; // User data already exists in the store
   
    try {
       const getUserProfileResponse = await axios.get(GET_USER_PROFILE_URL, { withCredentials: true });
       if(getUserProfileResponse.status === 200 && getUserProfileResponse.data && getUserProfileResponse.data){
          dispatch(addUser(getUserProfileResponse.data));
       }

    }catch (err) {
      console.error(err);
      if(err.status === 401){
        navigate('/login');
    }
    }
  }

  useEffect(() => {
      fetchUserIfCookieExists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
