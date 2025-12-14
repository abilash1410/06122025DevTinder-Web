import axios from 'axios';
import React, { useState } from 'react'
import { LOGIN_URL, SIGNUP_URL } from '../common/URL';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux-store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailID] = useState('kumudha1809@gmail.com');
  const [password, setPassword] = useState('Test@123');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginFlow, setIsLoginFlow] = useState(true);
  const [error,setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleSignUp = async () => {

    try{
      const response = await axios.post(SIGNUP_URL, { emailId, password, firstName, lastName }, { withCredentials: true });
      if(response.data.data === 'User data saved successfully' && response.data.info && response.status === 200){
          dispatch(addUser(response.data.info));
          navigate('/profile');
          setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if(err.status === 401 || err.status === 403){
        setError(err.response.data.data);
      }
    }
  }

  const handleLogin = async () => {
    // Handle login logic here
    
    try {
      setLoading(true);
      const response = await axios.post(LOGIN_URL, { emailId, password }, { withCredentials: true });
      if(response.data.data === 'Login is successfull !!!!' && response.data.info && response.status === 200){
          dispatch(addUser(response.data.info));
          navigate('/feed');
          setLoading(false);
      }
      
    } catch (err) {
      setLoading(false);
      if(err.status === 401 || err.status === 403){
        setError(err.response.data.data);
      }
    }
  }

  return (
    <div className="flex justify-center m-14">
      <div className="card card-dash bg-base-content w-96 shadow-sm justify-center flex">
        <div className="card-body">
          <h2 className="card-title text-white font-bold">LOGIN</h2>

          {!isLoginFlow && <><fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your firstName</legend>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="Type firstName here" />
          </fieldset><fieldset className="fieldset">
              <legend className="fieldset-legend">Enter your lastName</legend>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Type lastName here" />
            </fieldset></>}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your email ID</legend>
            <input value={emailId} onChange={(e) => setEmailID(e.target.value)} type="text" className="input" placeholder="Type email ID here" />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your password</legend>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Type password here" />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            {loading && <span  className="loading loading-ball bg-red-600"></span> }
             
            <button className="btn btn-primary" onClick={() =>{isLoginFlow ? handleLogin() : handleSignUp()}}>{isLoginFlow ? 'LOGIN' : 'SIGNUP'}</button>
          </div>
                      <p className="items-center align-center cursor-pointer text-white" onClick={() =>{setIsLoginFlow(!isLoginFlow)}}>{isLoginFlow ? 'New user? SignUp here' : 'Already have an account?'}</p>

        </div>
      </div>
    </div>
  )
}

export default Login
