import React from 'react';

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import EmailSent from './EmailSent';
import EmailVerified from './EmailVerified';
import Feed from './Feed';
import GoogleCallbackPage from './GoogleCallback';
import LandingPage from './Landing';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import Profile from './Profile';
import SignUp from './SignUp';

export default function GetRoutes(){
  const { signed } = useAuth();
  const navigate = useNavigate();

  if (signed){
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/feed"/>}/>

            <Route exact path="/feed" element={<Feed/>}/>
            <Route exact path="/profile" element={<Profile/>}/>

            <Route exact path='/emailsent' element={<EmailSent/>}/>
            <Route exact path='/emailverified' element={<EmailVerified/>}/>
            <Route path='/login' element={<Navigate to="/"/>}/>
            <Route path='/signup' element={<Navigate to="/"/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/oauth2/google/callback" element={<GoogleCallbackPage/>}/>
        </Routes>
    )
  } else {
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<LandingPage/>}/>

            <Route exact path='/emailsent' element={<EmailSent/>}/>
            <Route exact path='/emailverified' element={<EmailVerified/>}/>
            <Route exact path="/feed" element={<Login/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route path="/oauth2/google/callback" element={<GoogleCallbackPage/>}/>
        </Routes>
    )
  }
};