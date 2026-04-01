
export const initialState = {
  settingsState: {
    category: "General Knowledge",
    difficulty: "medium",
    type: "",
    amount: 4,
    mode: 'standard'
  },
  triviaQuestions: [],
  score: 0,
  userID: null,
  userName: null,
  isGameStarted: false,
  isLoggedIn: false,
  answeredCorrectly: 0, 
  reviewQuestions: [],
}

export function quizReducer(state, action) {
  
  function decodeHtmlEntities(encodedString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
  }

  //function that decodes html entities in the question and answer strings, since the API returns them encoded
  function decodeAndShuffleQuestion(questions){
    const decodedQuestions = questions.map(item => ({
      ...item,
      question: decodeHtmlEntities(item.question),
      category: decodeHtmlEntities(item.category),
      correct_answer: decodeHtmlEntities(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
    }))
    const shuffledQuestions = decodedQuestions.map((q) => ({
      ...q,
      shuffledAnswers: q.incorrect_answers.concat(q.correct_answer)
        .sort(() => Math.random() - 0.5),
    }));
    return shuffledQuestions
  }

  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, 
        isLoggedIn: true, 
        userID : action.payload.id, 
        userName: action.payload.name
      }
    case "LOGOUT_USER":
      return { ...state, 
        isLoggedIn: false, 
        userID: null, 
        userName: null
      }

    case "SET_USER_DATA":
      return {
        ...state,
        userID: action.payload.id,
        userName: action.payload.name
      };

    case "SET_PARAMETERS":
      const paramType = action.payload.id
      if (paramType == "amount") {
        return { ...state, settingsState: { ...state.settingsState, [paramType]: action.payload.value } }
      }
      const newValue = state.settingsState[paramType] === action.payload.value ? "" : action.payload.value
      return { ...state, settingsState: { ...state.settingsState, [paramType]: newValue } }

    case "SET_QUIZ_SETTINGS":
      return { ...state, settingsState: action.payload }

    case "RESET_QUIZ_SETTINGS":
      const payload = {
        category: "General Knowledge",
        difficulty: "medium",
        type: "",
        amount: 4,
        mode: 'standard'
      }
      return { ...state, settingsState:payload}

    case "SET_QUESTIONS":
      if(action.payload.length == 0){
        return {...state, triviaQuestions:action.payload}
      }
      const shuffledQuestions = decodeAndShuffleQuestion(action.payload)
      return {...state, triviaQuestions:shuffledQuestions}

    case "APPEND_QUESTIONS":
      
      const moreShuffledQuestions = decodeAndShuffleQuestion(action.payload)
      return {...state, triviaQuestions: [...state.triviaQuestions, ...moreShuffledQuestions]}

    case "START_GAME":
      return {...state, isGameStarted: true}

    case "END_GAME":
      return {...state, isGameStarted: false}

    case "RESET_GAME":
      return {...state, triviaQuestions:[],score:0,answeredCorrectly:0,reviewQuestions:[]}

    case "INCREMENT_SCORE":
      return { ...state, score: state.score + action.score }
    // case "DECREMENT_SCORE":
    //   return { ...state, score: state.score - 1 }

    case "INCREMENT_CORRECT_ANSWERS":
      return { ...state, answeredCorrectly: state.answeredCorrectly + 1 }

    case "ADD_TO_REVIEW_QUESTIONS":
      return { ...state, reviewQuestions: [...state.reviewQuestions,action.payload]};
    default:
      return state
  }
}   