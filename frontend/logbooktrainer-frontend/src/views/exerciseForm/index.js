import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from '../home/home.module.css'

import Select from '../../components/select';
import TextArea from '../../components/textArea';

const ExercisesForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();


    const options = [
        {value: 'Supino Reto', label: 'Supino Reto' },
        { value: 'Leg Press', label: 'Leg Press' },
        { value: 'Puxada Alta', label: 'Puxada Alta' },
        { value: 'Cadeira Extensora', label: 'Cadeira Extensora' },
        { value: 'Agachamento Livre', label: 'Agachamento Livre' },
        { value: 'Cross Trainer', label: 'Cross Trainer' },
        { value: 'Máquina Abdominal', label: 'Máquina Abdominal' },
        { value: 'Pulldown', label: 'Pulldown' },
        { value: 'Máquina de Flexão de Pernas', label: 'Máquina de Flexão de Pernas' },
        { value: 'Barra Fixa', label: 'Barra Fixa' },
        { value: 'Prensa 45°', label: 'Prensa 45°' },
        { value: 'Cabo de Tríceps', label: 'Cabo de Tríceps' },
        { value: 'Remada Baixa', label: 'Remada Baixa' },
        { value: 'Máquina de Adutora', label: 'Máquina de Adutora' },
        { value: 'Máquina de Abdução', label: 'Máquina de Abdução' },
        { value: 'Desenvolvimento Militar', label: 'Desenvolvimento Militar' },
        { value: 'Banco Scott', label: 'Banco Scott' },
        { value: 'Cadeira Flexora', label: 'Cadeira Flexora' },
        { value: 'Máquina de Agachamento Smith', label: 'Máquina de Agachamento Smith' },
        { value: 'Crucifixo', label: 'Crucifixo' },
        { value: 'Remada Unilateral', label: 'Remada Unilateral' },
        { value: 'Abdominal Infra', label: 'Abdominal Infra' },
    ];

    let weight = [];

    
    const [errorMessages, setErrorMessages] = useState({
        tipoExercicio: '',
        peso: '',
        repeticao: '',
      });

    const handleCreateWeight = () => {
        const weights = [];
    
        for (let i = 1; i <= 600; i++) {
            let weightValue = i * 0.25;
            const value = `${weightValue.toFixed(2)} kg`;
            const label = `${weightValue.toFixed(2)} kg`;
    
            weights.push({ value, label });
        }
    
        return weights;
    };
    
    weight = handleCreateWeight()

    const reps = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16', label: '16' },
    ];

    const [text, setText] = useState(Date.now());
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedWeight, setSelectedWeight] = useState(''); // Adicione estados para peso
    const [selectedRepetition, setSelectedRepetition] = useState(''); // Adicione estados para repetição
    const [notes, setNotes] = useState(''); // Adicione um estado para notas pessoais
    const userId = useSelector((state) => state.auth.usuarioId);
    
    let [counterType, setCounterType] = useState(0);
    let [counterOption, setCounterOption] = useState(0);
    let [counterWeight, setCounterWeight] = useState(0);
    let [counterReps, setCounterReps] = useState(0);
    let [counterNotes, setCounterNotes] = useState(0);



    React.useEffect(() => {
        handleRefreshComponent();
    }, [])


    const handleRefreshComponent = async () => {
        try {
            if(params.id !== 'new'){

                const response = await fetch('http://localhost:5000/exercice/' + `${params.id}`);
                if (!response.ok) {
                    throw new Error('Não foi possível buscar os exercícios');
                }
                const { data, notas, peso, repeticao, tipoExercicio } = await response.json();
    
                console.log(repeticao)
    
                setText(data);
                setSelectedOption(tipoExercicio);
                setSelectedWeight(peso);
                setSelectedRepetition(repeticao);
                setNotes(notas);

                setCounterWeight(++counterWeight)
                setCounterReps(++counterReps)
                setCounterNotes(++counterNotes)
                setCounterOption(++counterType)
                setCounterType(++counterOption)
            }


        } catch (error) {
            console.error('Erro ao buscar exercícios:', error);
        }
    };

    const handleUpdate = (newText) => {
        setText(newText);
    };

    const handleClear = () => {
        setText('');
    };

    const handleSelectChange = (newValue) => {
        setSelectedOption(newValue);
    };

    const handleWeightChange = (newValue) => {
        setSelectedWeight(newValue);
    };

    const handleRepetitionChange = (newValue) => {
        setSelectedRepetition(newValue);
    };

    const handleNotesChange = (newNotes) => {
        setNotes(newNotes);
    };

    const handleParseTime = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate
    }

    const handleBackToList = () =>{
        navigate("/lista");
    }

    const handleSalvar = () => {
        // Perform validation
        const validationErrors = {};
      
        if (!selectedOption) {
          validationErrors.tipoExercicio = 'Campo obrigatório';
        }
      
        if (!selectedWeight) {
          validationErrors.peso = 'Campo obrigatório';
        }
      
        if (!selectedRepetition) {
          validationErrors.repeticao = 'Campo obrigatório';
        }
      
        // Update error messages state
        setErrorMessages(validationErrors);
      
        // Check if there are validation errors
        if (Object.keys(validationErrors).length === 0) {
          // Create an object with the data the user entered
          const newData = {
            data: handleParseTime(text),
            tipoExercicio: selectedOption,
            peso: selectedWeight,
            repeticao: selectedRepetition,
            notas: notes,
            _id: `${params.id !== 'new' ? params.id : null}`,
            usuarioId : userId
          };
      
          // Dispatch the action to add the data to dataList
          dispatch({ type: 'ADD_DATA', payload: newData });
      
          // Clear the fields after saving
          setText('');
          setSelectedOption('');
          setSelectedWeight('');
          setSelectedRepetition('');
          setNotes('');
      
          // Navigate back to the list
          navigate('/lista');
        }
      };


    return (
        <>
            <h1>Exercicio</h1>
            
            <div key={counterOption} className={styles.flexCenter}>
                    <button className={styles.cancelBtn} onClick={handleBackToList} >cancelar X</button>
                <div className={styles.cardListLarge}>
                    <div>
                        <label>Data:{handleParseTime(text)}</label>
                    </div>

                    <div >
                        <label    htmlFor="tipoExercicioSelect" >Tipo do exercício</label>
                        <Select   id="tipoExercicioSelect"
                         aria-labelledby="tipoExercicioSelect" options={options} value={selectedOption} onChange={handleSelectChange} />
                        <span className={styles.errorMessage}>{errorMessages.tipoExercicio}</span>
                    </div>

                    <div >
                        <label htmlFor="pesoSelect">Peso</label>
                        <Select id="pesoSelect" options={weight} value={selectedWeight} onChange={handleWeightChange} />
                        <span className={styles.errorMessage}>{errorMessages.peso}</span>
                    </div>


                    <div>
                        <label htmlFor="repeticaoSelect">Repetição</label>
                        <Select id="repeticaoSelect" options={reps} value={selectedRepetition} onChange={handleRepetitionChange} />
                        <span className={styles.errorMessage}>{errorMessages.repeticao}</span>
                    </div>

            
                    <div >
                        <label>Notas pessoais</label>
                        <TextArea  key={counterNotes} text={notes} onUpdate={handleNotesChange} /> 
                    </div>

                    <div>

                        <button className={`${styles.saveBtn} ${Object.values(errorMessages).some(value => value !== '') ? styles.errorMessage : ''}`}  onClick={handleSalvar}>Salvar</button>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExercisesForm;
