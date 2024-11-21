import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/Api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const verifyToken = async (token) => {
      api.defaults.headers.Authorization = `Bearer ${token}`
      var response = {}
      try {
          response = await api.get('/oauth2/google/test');
          if(response.data.authenticated){
              setSigned(true);
          } else{
              setSigned(false);
          }
      } catch (err){
          console.log(err);
          return(false);
      }
  }

  useEffect(() => {
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken) {
        verifyToken(storagedToken);
    }
  }, []);

  async function CallbackLogin(token) {
    // We should verify if the token is valid making an API call to the backend here.
    // We could also get the user data here and store it in the context.

    const verifyToken = async (token) => {
      api.defaults.headers.Authorization = `Bearer ${token}`
      var response = {}
      try {
          response = await api.get('/oauth2/google/test');
          if(response.data.authenticated){
              setSigned(true);
              return(true);
          } else{
              setSigned(false);
              return(false);
          }
      } catch (err){
          console.log(err);
          return(false);
      }
    }

    if (!token){
        return({status: 'error', message: "Erro no servidor"})
    }

    const is_token_valid = await verifyToken(token);

    if (is_token_valid){
      setSigned(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;
  
      sessionStorage.setItem('@App:token', token);
      return({status: 'success', message: "Logado com sucesso!"});
    } else {
      sessionStorage.removeItem('@App:token');
      return({status: 'error', message: "Token inválido"})
    }
  }

  async function Logout() {
    try {
      await api.post('oauth2/google/logout');
    } catch(err){
      console.log(err);
    }
    setSigned(false);
    sessionStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider
      value={{ signed, CallbackLogin, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}