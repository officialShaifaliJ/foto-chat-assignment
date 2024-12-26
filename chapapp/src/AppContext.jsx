import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  contacts: [],
  messages: {}, 
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'ADD_MESSAGE':
      const { contactId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), message],
        },
      };
    default:
      return state;
  }
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Export the context for use in other components
export default AppContext;
