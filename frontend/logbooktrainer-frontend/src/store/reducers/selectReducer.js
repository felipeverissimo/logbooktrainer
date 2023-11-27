// reducers.js
const initialState = {
    selectValue: 'option1'
};

const selectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECT_VALUE':
            return {
                ...state,
                selectValue: action.payload
            };
        case 'CLEAR_SELECT_VALUE':
            return {
                ...state,
                selectValue: ''
            };
        default:
            return state;
    }
};

export default selectReducer;
