import React, { createContext, useContext, useReducer } from 'react';
import { initialState,quizReducer } from '../reducer/quizReducer';
const QuizContext = createContext();
const QuizDispatchContext = createContext(undefined);

export const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState)

    return (
        <QuizContext.Provider value={state}>
            <QuizDispatchContext.Provider value={dispatch}>
                {children}
            </QuizDispatchContext.Provider> 
        </QuizContext.Provider>

    )
}

export const useQuizState = () => useContext(QuizContext)
export const useQuizDispatch = () => useContext(QuizDispatchContext)   