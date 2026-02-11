
export const intialState = {
  initialAnswerState: {
    category: "",
    difficulty: "",
    type: "",
    amount: 10,
    timeLimit: [0,0]
  },
  score: 0
}

export function quizReducer(state, action) {
  switch (action.type) {
    case "SET_PARAMETERS":
      const paramType = action.payload.id
      if(paramType == "amount"){
        return { ...state, initialAnswerState: { ...state.initialAnswerState, [paramType]: action.payload.value } }
      }
      const newValue = state.initialAnswerState[paramType] === action.payload.option ? "" : action.payload.value
      return { ...state, initialAnswerState: { ...state.initialAnswerState, [paramType]: newValue } }
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 }
    // case "DECREMENT_SCORE":
    //   return { ...state, score: state.score - 1 }
    default:
      return state
  }
}   