
export const initialState = {
  settingsState: {
    category: "General Knowledge",
    difficulty: "medium",
    type: "",
    amount: 10,
    mode: 'standard'
  },
  score: 0,
  userID: 0,
  userName: "",
  answeredCorrectly:0  

}

export function quizReducer(state, action) {
  switch (action.type) {
    case "SET_PARAMETERS":
      const paramType = action.payload.id
      if(paramType == "amount"){
        return { ...state, settingsState: { ...state.settingsState, [paramType]: action.payload.value } }
      }
      const newValue = state.settingsState[paramType] === action.payload.value ? "" : action.payload.value
      return { ...state, settingsState: { ...state.settingsState, [paramType]: newValue } }
    case "SET_QUIZ_SETTINGS":
      console.log("payload",action.payload)
      return {... state, settingsState: action.payload}
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + action.score }
    // case "DECREMENT_SCORE":
    //   return { ...state, score: state.score - 1 }
    case "INCREMENT_CORRECT_ANSWERS":
      return { ...state, answeredCorrectly: state.answeredCorrectly + 1}
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