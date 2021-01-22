// store.js
import React, { createContext, useReducer } from 'react';

const initialState = { who: { username: '' }, toSettings: false };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'user_is_auth':
                if (action.payload.auth) {
                    return {
                        ...initialState, ...action.payload
                    }
                } else return initialState
            case 'LOGIN_FROM_HEADER':
                return {
                    ...state,
                    ...action.payload.data[0],
                    success: action.payload.data.success,
                    toSettings: true,
                    isLoading: false
                }
            case 'START_LOADING':
                return {
                    ...initialState,
                    isLoading: true
                }
            case 'STOP_LOADING':
                return {
                    ...state,
                    isLoading: false
                }
            case 'OPEN_MODAL':
                return {
                    ...state,
                    modal: true
                }
            case 'CLOSE_MODAL':
                return {
                    ...state,
                    modal: false
                }
            default:
                return initialState
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }