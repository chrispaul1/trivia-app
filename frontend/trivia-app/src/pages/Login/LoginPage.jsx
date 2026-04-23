import React, { useEffect, useState } from "react";
import {
    StyledButton,
    StyledLoginDiv,
    StyledLoginTitle,
    StyledLoginInput,
    StyledLoginBackground,
    StyledUserNameInputDiv,
    StyledLoginInputContainer,
} from ".";
import { useNavigate } from "react-router-dom";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useThemeContext } from "../../contexts/theme/themeContext";
import "@theme-toggles/react/css/classic.css"
import { Classic } from "@theme-toggles/react"

export function LoginPage() {

    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const { theme,toggleTheme } = useThemeContext()
    const [isToggled, setToggle] = useState(false)

    useEffect(()=>{
        toggleTheme()
    },[isToggled])

    useEffect(() => {
        if (quizState.isLoggedIn) {
            navigate("/", { replace: true })
        }
    }, [])

    //Function to handle login, will eventually send username to backend and receive a token, for now it just navigates to the settings page
    async function handleLogin(isGuest = false) {

        if( !isGuest && (username == "" || username == undefined)){
            return
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: isGuest ? "Guest" : username,
                    isGuest: isGuest
                })
            })
            const userData = await response.json()
            // quizDispatch({
            //   type:'SET_USER_DATA',
            //   payload: {id:userData.id,name:userData.username}
            // })
            quizDispatch({ type: 'LOGIN_USER', payload: { id: userData.id, name: userData.username } })
            navigate("/", { replace: true })
        } catch (error) {
            console.error('error', error)
        }
    }

    return (
        <StyledLoginBackground>
            <StyledLoginDiv>
                <StyledLoginTitle>
                    <div
                        style={{transform:'translateX(100%)'}}
                    >
                        Login
                    </div>
                    <Classic
                        style={{
                            marginLeft: 'auto',
                            color: theme.textColor, 
                            fontSize: '2rem' }}
                        toggled={isToggled}
                        toggle={setToggle}
                    />
                </StyledLoginTitle>
                <StyledLoginInputContainer>
                    <StyledUserNameInputDiv>
                        <StyledLoginInput
                            type="text"
                            id="username"
                            placeholder="Enter your Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <StyledButton
                            onClick={() => handleLogin(false)}
                        >
                            Enter
                        </StyledButton>
                    </StyledUserNameInputDiv>
                    <StyledButton
                        onClick={() => handleLogin(true)}
                    >
                        Play as Guest
                    </StyledButton>

                </StyledLoginInputContainer>
            </StyledLoginDiv>
        </StyledLoginBackground>
    )
}