// actions.js
export const setItems = (items) => {
    return {
        type: 'SET_ITEMS',
        payload: items
    };
};

export const setSelectValue = (value) => {
    return {
        type: 'SET_SELECT_VALUE',
        payload: value
    };
};

export const clearSelectValue = () => {
    return {
        type: 'CLEAR_SELECT_VALUE'
    };
};