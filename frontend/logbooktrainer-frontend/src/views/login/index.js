import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/img/LT.png";
import { useAuth } from "../../AuthContext";
import styles from "../login/login.module.css";

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
    logarUser({ nome, password, isLoggedIn });
  };

  const logarUser = async function (login) {
    
    const url = "http://18.229.104.108/api/user/login";
    
    

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que o corpo da solicitação é JSON
      },
      body: JSON.stringify(login), // Converte os dados em JSON e envia no corpo da solicitação
      mode: 'cors', 
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json(); // Parse a resposta JSON se a solicitação for bem-sucedida

      if (!response.ok) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { nome, password, isLoggedIn },
        });
        throw new Error("Erro na solicitação.");
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          nome: login.nome,
          password: login.password,
          isLoggedIn: login.isLoggedIn,
          usuarioId: data.usuario._id,
        },
      });
      return data;
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { nome, password, isLoggedIn },
      });
      console.error("Erro na solicitação:", error);
      throw error; // Rejeita a promessa com o erro
    }
  };

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
            <div className="button flex">
              <label htmlFor="password">Password:</label>
              
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
             <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggleBtn}>
                <svg width="32" height="10" viewBox="0 0 32 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <g filter="url(#filter0_d_155_3)">
                    {showPassword ? (
                      <>
                      
                      <path d="M0.755859 4.85156L1.93359 3.23438L0.164062 2.70703L0.439453 1.82812L2.20898 2.47852L2.15625 0.462891H3.04688L2.98828 2.51367L4.73438 1.86328L5.00391 2.75977L3.20508 3.29297L4.35938 4.88086L3.63281 5.42578L2.54883 3.73828L1.48828 5.38477L0.755859 4.85156ZM5.92383 4.85156L7.10156 3.23438L5.33203 2.70703L5.60742 1.82812L7.37695 2.47852L7.32422 0.462891H8.21484L8.15625 2.51367L9.90234 1.86328L10.1719 2.75977L8.37305 3.29297L9.52734 4.88086L8.80078 5.42578L7.7168 3.73828L6.65625 5.38477L5.92383 4.85156ZM11.0918 4.85156L12.2695 3.23438L10.5 2.70703L10.7754 1.82812L12.5449 2.47852L12.4922 0.462891H13.3828L13.3242 2.51367L15.0703 1.86328L15.3398 2.75977L13.541 3.29297L14.6953 4.88086L13.9688 5.42578L12.8848 3.73828L11.8242 5.38477L11.0918 4.85156Z" fill="#C9A86C"/>

                      </>
                    ) : (
                      <>
                     
                      <path d="M4.5 1H27.5" stroke="#C9A86C"/>



                      </>
                    )}
                  </g>
                </svg>

                {showPassword ? "Hide" : " Show"}
              </button>
            </div>

            {/* {!nome ? (
              <p className={styles.forgotPassword}>Criar usuário</p>
            ) : (
              <p className={styles.forgotPassword}>Esqueceu a senha ?</p>
            )} */}

            <button
              data-testid="loginButton"
              className={styles.loginBtn}
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
