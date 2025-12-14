import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Profile from './components/Profile'
import Login from './components/Login/Login'
import { Provider } from 'react-redux'
import AppStore from './components/redux-store/AppStore'
import Feed from './components/Feed'
import MyConnections from './components/MyConnections'
import MyPendingRequests from './components/MyPendingRequests'

function App() {
  return (
    <Provider store={AppStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
           <Route path='feed' element={<Feed />} />
           <Route path='my-connections' element={<MyConnections />} />
           <Route path='my-pending-requests' element={<MyPendingRequests />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}
export default App