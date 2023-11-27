
// reducers.js
const initialState = {
    items: [],
    dataList: [],
    headers: [],
    forceRefresh: false,
};


async function deletarExercicio (exercicioData) {
    const url = 'http://localhost:5000/delete'; // Substitua pela URL completa se necessário

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

async function salvarExercicio (exercicioData) {
    console.log(exercicioData)
    let url=''
    if(exercicioData._id ==="null") {
        url = 'http://localhost:5000/save';
        delete exercicioData._id
    }
    else{
        url = 'http://localhost:5000/update/'+`${exercicioData._id}` 
    }


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

const listaReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                forceRefresh: false,
                dataList: action.payload
            };
        case 'FORCE_REFRESH':
            return {
                ...state,
                forceRefresh: !state.forceRefresh, // Inverte o valor para forçar a atualização
            };
        case 'ADD_DATA':

            salvarExercicio(action.payload)
                .then((data) => {
                    console.log('Resposta do servidor:', data);
                    // Aqui, você pode manipular a resposta do servidor, se necessário
                    return {
                        ...state,
                        dataList: [...state.dataList, action.payload],
                    };
                })
                .catch((error) => {
                    // Trate erros de solicitação aqui, se necessário
                });
            return {
                ...state,
            };

        case 'SET_HEADERS':
            return {
                ...state,
                headers: action.payload,
            };

        default:
            return state;
    }
};

export default listaReducer;
