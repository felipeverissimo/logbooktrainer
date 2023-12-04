import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Lista from '../../components/list';

import styles from './home.module.css'

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usuarioId = useSelector((state) => state.auth.usuarioId);
    const userName = useSelector((state) => state.auth.nome);
    const dataList = useSelector((state) => state.lista.dataList); // Obtenha a lista da store
    const headers = useSelector((state) => state.lista.headers); // Obtenha os headers da store
    const forceRefresh = useSelector((state) => state.lista.forceRefresh);


    useEffect(() => {

        handlerForExercicios();

    }, [dispatch, forceRefresh]);

    const handlerForExercicios = async () => {
        try {
           
            const response = await fetch('http://18.229.104.108/api/exercices/'+`${usuarioId}`);
            if (!response.ok) {
                throw new Error('Não foi possível buscar os exercícios');
            }
            const data = await response.json();
            // Dispatch para atualizar a lista de exercícios na store
            dispatch({ type: 'SET_DATA', payload: data });
        } catch (error) {
            console.error('Erro ao buscar exercícios:', error);
        }
    };

    const handlerAdd = () => {
        navigate("/exercices/new");
    }

    return (
    <>
        <h1>Bem Vindo</h1>

        <h3>  
            {userName ? (userName.charAt(0).toUpperCase() + userName.slice(1)): 'Usuário'} 
        </h3>
        <div className={styles.flexCenter}>
            <button className={styles.addBtn} onClick={handlerAdd}>Adicionar</button>
        </div>
        <div className={styles.flexCenter}>
            <div className={styles.cardList}>
                <Lista headers={headers} items={dataList} showHeader={true} />
            </div>
        </div>
    </>
    );
};

export default Home;


 