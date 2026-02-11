import React, { createContext, useContext, useReducer } from 'react';
import { intialState, quizReducer } from './quizReducer';

const QuizContext = createContext();
const QuizDispatchContext = createContext(undefined);

export const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, intialState)

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