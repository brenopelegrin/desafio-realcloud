import React from 'react';

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Feed from './Feed';
import GoogleCallbackPage from './GoogleCallback';
import LandingPage from './Landing';
import Logout from './Logout';
import NotFound from './NotFound';
import Profile from './Profile';

export default function GetRoutes(){
  const { signed } = useAuth();
  const navigate = useNavigate();

  if (signed){
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/manage"/>}/>

            <Route exact path="/manage" element={<Feed/>}/>
            <Route exact path="/profile" element={<Profile/>}/>

            <Route path='/login' element={<Navigate to="/manage"/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/oauth2/google/callback" element={<GoogleCallbackPage/>}/>
        </Routes>
    )
  } else {
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<LandingPage/>}/>

            <Route exact path="/manage" element={<Navigate to="/oauth2/google/callback"/>}/>
            <Route exact path="/login" element={<Navigate to="/oauth2/google/callback"/>}/>
            <Route path="/oauth2/google/callback" element={<GoogleCallbackPage/>}/>
        </Routes>
    )
  }
};