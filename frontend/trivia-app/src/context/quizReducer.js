
export const initialState = {
  initialAnswerState: {
    category: "",
    difficulty: "",
    type: "",
    amount: 15,
    mode: "standard",
    timeLimit: [0,0]
  },
  score: 0,
  userID: 0,
  userName: ""
}

export function quizReducer(state, action) {
  switch (action.type) {
    case "SET_PARAMETERS":
      const paramType = action.payload.id
      if(paramType == "amount"){
        return { ...state, initialAnswerState: { ...state.initialAnswerState, [paramType]: action.payload.value } }
      }
      const newValue = state.initialAnswerState[paramType] === action.payload.value ? "" : action.payload.value
      return { ...state, initialAnswerState: { ...state.initialAnswerState, [paramType]: newValue } }
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 }
    // case "DECREMENT_SCORE":
    //   return { ...state, score: state.score - 1 }
    case "SET_USER_DATA":
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name
      };
    default:
      return state
  }
}   