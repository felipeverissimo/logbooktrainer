import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/LT.png';
import { useAuth } from '../../AuthContext';
import styles from '../login/login.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth(); 

  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {

      logarUser({ nome, password, isLoggedIn })

  };

  const logarUser = async function (login) {
    const url = 'http://localhost:5000/user/login' 
  
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indica que o corpo da solicitação é JSON
        },
        body: JSON.stringify(login), // Converte os dados em JSON e envia no corpo da solicitação
    };
  
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json(); // Parse a resposta JSON se a solicitação for bem-sucedida
  
        if (!response.ok) {
             dispatch({ type: 'LOGIN_FAILURE', payload: { nome, password, isLoggedIn } });
            throw new Error('Erro na solicitação.');
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: { nome:login.nome, password:login.password, isLoggedIn:login.isLoggedIn, usuarioId:data.usuario._id } });
        return data; 
    } catch (error) {
        
        dispatch({ type: 'LOGIN_FAILURE', payload: { nome, password, isLoggedIn } });
        console.error('Erro na solicitação:', error);
        throw error; // Rejeita a promessa com o erro
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>

      <div className={styles.cardListLargeLogin}>
        {isLoggedIn ? (
          <Navigate to="/lista" />
        ) : (
          <>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? '👁️ Hide' : '👁️ Show'}
              </button>
            </div>


            {!nome ? (
              <p className={styles.forgotPassword}>Criar usuário</p>
            ) : (
              <p className={styles.forgotPassword}>Esqueceu a senha ?</p>
            )}

            <button data-testid="loginButton"  className={styles.loginBtn} onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
