import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT_URL } from './URL';
import { removeUser } from '../redux-store/UserSlice';

const NavBar = () => {
  const userDataSelector = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    try {
      axios.post(LOGOUT_URL, {}, { withCredentials: true });
      dispatch(removeUser());
      // window.location.href = '/login'; // this will reload the go to login page
      return navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }


  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={'/feed'} className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      {userDataSelector &&
        <div className="flex gap-2">
          <p>{userDataSelector?.firstName ||  userDataSelector?.data?.firstName + " " + userDataSelector?.data?.lastName }</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userDataSelector?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to={'/my-connections'}>My Connections</Link></li>
              <li><Link to={'/my-pending-requests'}>My Pending Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>}
    </div>
  )
}

export default NavBar
