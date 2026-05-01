import React, { useState, useEffect, use } from "react"
import {
    StyledParametersBackground,
    StyledQuestionOutline
} from '.'
import { StyledButton } from "../Login"
import { Form } from "../../components"
import { questions } from "../../assets/questions"
import { useNavigate } from "react-router-dom"
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { updatedCategories, difficulties, modeTypes, questionTypes } from "../../assets/questions";
import { useThemeContext } from "../../contexts/theme/themeContext";
import { NumberQuestion } from "../../components"

export function SettingsPage() {

    //state array for the answers
    const [disableButton, setDisableButton] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { theme } = useThemeContext()
    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        quizDispatch({ type: "END_GAME" })
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
    }, [])

    //quiz settings buffer state
    const [bufferSettings, setBufferSettings] = useState({
        category: quizState.settingsState.category || '',
        difficulty: quizState.settingsState.difficulty || 'medium',
        type: quizState.settingsState.type || "",
        amount: quizState.settingsState.amount || 10,
        mode: quizState.settingsState.mode || 'standard'
    })

    //function to handle the user answers, based on the question id, it changes the answer
    function handleSettingsAnswer(id, value) {
        setBufferSettings(prev => ({
            ...prev,
            [id]: value
        }))
    }

    //handles starting the quiz, by dispatching the quiz settings to the reducer
    //and call the fetchQuestions func to retrieve the trivia question and navigate to the quiz
    function handleStartQuiz() {
        if (!bufferSettings.amount || bufferSettings.amount < 1) {
            alert("Please enter how many questions you want to play!");
            return;
        }

        if (!bufferSettings.amount > 50) {
            alert("The maximum number of questions per game is 50");
            return;
        }
        console.log("calling from the settings")
        quizDispatch({ type: "SET_QUIZ_SETTINGS", payload: bufferSettings })
        quizDispatch({ type: "RESET_GAME" })
        quizDispatch({ type: "START_GAME" })
        navigate("/quiz")
    }

    const isEndless = bufferSettings['mode'] == 'endless'

    function handleQuestionAnswers(option, questionID) {
        if (option && option != null) {
            handleSettingsAnswer(questionID, option.value)
            return
        }
        handleSettingsAnswer(questionID, "")
    }

    function handleInputChange(inputValue){
        
        if(inputValue == "" || inputValue == null){
            setInputValue("")
            return
        }

        let newVal = inputValue.replace(/\D/g, "")
        if (newVal >= 0 && newVal < questions['amount'].limit){
            setInputValue(newVal)
            handleQuestionAnswers(newVal,questions['amount'].id)
        }
    }

    const filterStyles = {
        container: (base) => ({
            ...base,
            width:'90%',
        }),
        control: (provided) => ({
            ...provided,
            color: 'white',
            width: '100%',
            background: theme.panel.a4.backgroundColor,
        }),
        menu: (provided) => ({
            ...provided,
            background: theme.panel.a4.backgroundColor,
        }),
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: theme.textColor
        })
        ,
        option: (base, state) => ({
            ...base,
            color: theme.textColor,
            backgroundColor: state.isSelected
                ? theme.panel.a2.backgroundColor
                : state.isFocused
                    ? theme.panel.a3.backgroundColor
                    : theme.panel.a4.backgroundColor
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: theme.textColor
        }),
        indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: theme.textColor,
        }),
        dropdownIndicator: (base) => ({
            ...base,
            svg : {
                fill: theme.textColor
            }
        })
    };

    const components = {
        DropdownIndicatior: null,
    };


    return (
        <StyledParametersBackground>
            <StyledQuestionOutline>
                
                <Select
                    options={modeTypes}
                    styles={filterStyles}
                    closeMenuOnSelect={true}
                    menuPlacement="auto"
                    menuPosition="absolute"
                    menuPortalTarget={document.body}
                    isClearable
                    placeholder={"Select your game mode"}
                    onChange={(option) => handleQuestionAnswers(option, questions['mode'].id)}
                />

                <Select
                    options={updatedCategories}
                    styles={filterStyles}
                    closeMenuOnSelect={true}
                    menuPlacement="auto"
                    menuPosition="absolute"
                    menuPortalTarget={document.body}
                    isClearable
                    placeholder={"Select your category"}
                    onChange={(option) => handleQuestionAnswers(option, questions['category'].id)}
                />

                <Select
                    options={difficulties}
                    styles={filterStyles}
                    closeMenuOnSelect={true}
                    menuPlacement="auto"
                    menuPosition="absolute"
                    menuPortalTarget={document.body}
                    isClearable
                    placeholder={"Select your question difficulty"}
                    onChange={(option) => handleQuestionAnswers(option, questions['difficulty'].id)}
                />

                <Select
                    options={questionTypes}
                    styles={filterStyles}
                    closeMenuOnSelect={true}
                    menuPlacement="auto"
                    menuPosition="absolute"
                    menuPortalTarget={document.body}
                    isClearable
                    placeholder={"Choose your question type"}
                    onChange={(option) => handleQuestionAnswers(option, questions['difficulty'].id)}
                />

                <NumberQuestion
                    question={questions['amount']}
                    handleSettingsAnswer={handleSettingsAnswer}
                    selectedAnswer={bufferSettings['amount']}
                    disabled={isEndless}
                />

                <StyledButton
                    onClick={()=>handleStartQuiz()}
                >
                    Start Quiz
                </StyledButton>

            </StyledQuestionOutline>
            {/* <Form
        questions={questions}
        bufferSettings={bufferSettings}
        handleStartQuiz={handleStartQuiz}
        handleSettingsAnswer={handleSettingsAnswer}
      /> */}
        </StyledParametersBackground>
    )
}

// //This handles creating the api url sent to the backend to retireve the data
// async function fetchQuestions() {
//   setIsLoading(true)
//   let categoryID

//   if (quizState.settingsState.category != undefined && quizState.settingsState.category != "" && quizState.settingsState.category.toLowerCase() != "randomized categories") {
//     categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === quizState.settingsState.category.toLowerCase()).id
//   }

//   const apiUrl = `http://localhost:5000/questions?category=${categoryID}&difficulty=${encodeURIComponent(quizState.settingsState.difficulty)}&amount=${quizState.settingsState.amount}&type=${encodeURIComponent(quizState.settingsState.type)}&userid=${quizState.userID}`;

//   console.log("Fetching from API URL: ", apiUrl)
//   try {
//     const res = await fetch(apiUrl)

//     if (!res.ok) {
//       throw new Error("Error, Failed to fetch trivia questions")
//     }

//     const data = await res.json()

//     navigate("/quiz", { state: { triviaQuestions: data.results } })
//   } catch (error) {
//     console.error("Error, could not fetch the questions:", error)
//   } finally {
//     setIsLoading(false)
//   }
// }