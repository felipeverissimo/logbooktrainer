
const initialState = {
  isLoggedIn: false,
  nome: '',
  password: '',
  usuarioId:''
};



const authReducer =  (state = initialState, action) => {
  switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          nome: action.payload.nome,
          password: action.payload.password,
          usuarioId: action.payload.usuarioId,
          isLoggedIn: true
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          isLoggedIn: false
        };
  
    case "LOGOUT":
      return {
        ...state, // Mantenha o restante do estado inalterado
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
