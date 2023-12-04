import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './components.module.css'


import { useSelector, useDispatch } from 'react-redux';

const Lista = ({ showHeader = true }) => {
    const dataList = useSelector((state) => state.lista.dataList) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const headers = showHeader ? Object.keys(dataList[0] || {}) : [];

    const deletarExercicio = async function (exercicioData) {
        const url = 'http://18.229.104.108/api/delete'; // Substitua pela URL completa se necessário

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indica que o corpo da solicitação é JSON
            },
            body: JSON.stringify(exercicioData), // Converte os dados em JSON e envia no corpo da solicitação
        };

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error('Erro na solicitação.');
            }

            const data = await response.json(); // Parse a resposta JSON se a solicitação for bem-sucedida
            return data; // Retorna os dados do servidor, se necessário
        } catch (error) {
            console.error('Erro na solicitação:', error);
            throw error; // Rejeita a promessa com o erro
        }
    }

    const handleRemoveRow = async (item) => {

        const deletado = await deletarExercicio(item)

        dispatch({ type: 'FORCE_REFRESH' });
    };

    const handleEditRow = (item) => {

        navigate("/exercices/" + `${item._id}`);

    };

    return (
        <div>
            {showHeader && headers.length > 0 && (
                <table>
                    <thead>
                        <tr className={styles.header} className={styles.noHover}>
                            {headers.map((header, index) => (
                                <th key={index}>
                                       {(!header.startsWith('_') &&!header.startsWith('u') && header !== 'data') && (
                                        header === 'tipoExercicio' ?
                                            <td key={index}>  Exercicio</td>
                                        :
                                        header === 'peso' ?
                                        <td key={index}> Carga </td>
                                        :
                                        header === 'repeticao' ?
                                            <td key={index}> Reps </td>
                                        :
                                        header === 'notas' ?
                                        <td key={index}> Notas </td>
                                        :
                                         <td key={index}>  {header && header === 'data' ? 'Data' : header}</td>
                                  
                                       )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((item, rowIndex) => (
                            <>
                                <tr key={rowIndex}  >
                                {headers.map((header, colIndex) => (
                                        header === 'tipoExercicio' ? (
                                                <td className={styles.multipleColum} key={colIndex}>
                                                    <span className={styles.dateTime}>{item['data']}</span> {item[header]} </td>
                                            ) : (
                                                
                                                <td className={`${styles.alignBottom} ${header === 'notas'?styles.elipses :''}`} key={colIndex}>{!header.startsWith('_') && !header.startsWith('u') &&header !== 'data' ? item[header] : null}</td>
                                            )
                                        ))}
                                    <td>
                                        <button
                                            onClick={() => handleRemoveRow(item)}
                                            className={styles.removerButton}
                                        >
                                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L9 8.5L1 16" stroke="#C9A86C"/>
                                            <path d="M17 16L9 8.5L17 1" stroke="#C9A86C"/>
                                            </svg>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleEditRow(item)}
                                            className={styles.removerButton}
                                        >
                                        <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L9 8.5L1 16" stroke="#C9A86C"/>
                                        </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr className={styles.noHover}> {/* Adiciona a linha horizontal aqui */}
                                    <td colSpan={headers.length + 2}> {/* Colspan deve abranger todas as colunas + 2 para cobrir os botões */}
                                        <hr/>
                                    </td>
                                </tr>
                            </>

                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Lista;
