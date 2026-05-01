import React, { useState, useEffect, useRef } from "react";
import { StyledFormOutline } from ".";
import { StyledButton } from "../../pages";
import { DropdownQuestion, NumberQuestion } from "./components";
import Select from 'react-select'
import { updatedCategories, difficulties, modeTypes } from "../../assets/questions";
import { useThemeContext } from "../../contexts/theme/themeContext";

export function Form({ questions, bufferSettings, handleStartQuiz, handleSettingsAnswer }) {

    const { theme } = useThemeContext()

    const formRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [formRef])

    const isEndless = bufferSettings['mode'] == 'endless'


    function handleQuestionAnswers(option,questionID){
        if (option && option != null){
            handleSettingsAnswer(questionID, option.value)
            return
        }
        handleSettingsAnswer(questionID,"")
    }

    const filterStyles = {
        control: (provided) => ({
            ...provided,
            color: 'white',
            width: '350px',
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
        })
    };

    return (
        <StyledFormOutline>

            <Select
                options={modeTypes}
                styles={filterStyles}
                closeMenuOnSelect={true}
                menuPlacement="auto"
                menuPosition="absolute"
                menuPortalTarget={document.body}
                isClearable
                placeholder={"Select your game mode"}
                onChange={(option) => handleQuestionAnswers(option,questions['mode'].id)}
            />
{/* 
            <DropdownQuestion
                question={questions['mode']}
                handleSettingsAnswer={handleSettingsAnswer}
                selectedAnswer={bufferSettings['mode']}
            /> */}

            <DropdownQuestion
                question={questions['category']}
                handleSettingsAnswer={handleSettingsAnswer}
                selectedAnswer={bufferSettings['category']}
            />

            <DropdownQuestion
                question={questions['difficulty']}
                handleSettingsAnswer={handleSettingsAnswer}
                selectedAnswer={bufferSettings['difficulty']}
            />

            <NumberQuestion
                question={questions['amount']}
                handleSettingsAnswer={handleSettingsAnswer}
                selectedAnswer={bufferSettings['amount']}
                disabled={isEndless}
            />

            <DropdownQuestion
                question={questions['type']}
                handleSettingsAnswer={handleSettingsAnswer}
                selectedAnswer={bufferSettings['type']}
            />

            <StyledButton
                onClick={() => handleStartQuiz()}
            >
                Start Quiz
            </StyledButton>

        </StyledFormOutline>
    )
}