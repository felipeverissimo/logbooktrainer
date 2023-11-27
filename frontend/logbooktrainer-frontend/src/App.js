import { BrowserRouter as Router, Switch, Route, Routes, Link,Navigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { useDispatch, useSelector } from "react-redux";

import styles from './App.module.css'



import Login from './views/login/index';
import Home from './views/home/index';
import Form from './views/exerciseForm/index';


function App () {

  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (newValue) => {
    setSelectedOption(newValue);
  }



  const handleSetHeaders = () => {
    // Adicione os headers desejados à store
    const newHeaders = ['Novo Header 1', 'Novo Header 2', 'Novo Header 3'];
    dispatch({ type: 'SET_HEADERS', payload: newHeaders });
    
  };

  // Use o useEffect para chamar handleSetHeaders quando o componente é montado
  useEffect(() => {
    handleSetHeaders();
  }, []); // O segundo argumento vazio [] significa que isso será executado apenas uma vez, quando o componente é montado



  const [text, setText] = useState('');

  const handleUpdate = (newText) => {
    setText(newText);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/lista"
            element={<Home />}
          />
          <Route
            path="/exercices/:id"
            element={<Form />}
          />
          {/* Rota padrão, redireciona para a página de login se não estiver autenticado */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
