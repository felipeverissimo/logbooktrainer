// AuthContext.js
import React, { createContext, useContext,useEffect  } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector,  } from 'react-redux';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();


  const login = () => {
    // setIsLogged(true);
  };

  const logout = () => {
    // Lógica de logout
    // setIsLogged(false);
  };

  

  useEffect(() => {
    if (!isLoggedIn) {
      // Se o usuário não estiver autenticado, redirecione para a página desejada
      navigate('/');
    }
  }, [isLoggedIn, navigate]);


  return (
    
    <AuthContext.Provider value={{ isLoggedIn, login, logout,   }}>
            {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
