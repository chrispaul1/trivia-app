import React,{ useEffect,useState, useRef} from "react";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import { 
    StyledPlayIcon,
    StyledStartText,
    StyledButtonText,
    StyledMenuButton,
    StyledSettingIcon,
    StyledStartButton, 
    StyledQuestionIcon,
    StyledMenuContainer, 
    StyledMenuBackground,
    StyledLeaderboardIcon,
    StyledRandomQuizLeftDiv, 
    StyledRandomQuizRightDiv, 
    StyledRandomQuizContainer,
} from "..";

import { LeaderboardModal } from "../../components/LeaderBoardModalComponent";
import { useThemeContext } from "../../contexts/theme/themeContext";
import { updatedCategories, difficulties} from "../../assets/questions";

export function MainMenu(){

    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const [displayleaderboard, setDisplayLeaderboard] = useState(false)
    const navigate = useNavigate()
    const {theme,toggleTheme}  = useThemeContext()

    // sets isGameStarted to false if we navigated from quiz summary,
    // if the the users is not logged in, moves the user to the login page
    useEffect(()=>{
        quizDispatch({ type: "END_GAME" })

        if(!quizState.isLoggedIn){
            navigate("/login")
        }
    },[])

    // handles starting the game, resets the game states, score, question correctly answered 
    // and wrong questions saved
    function handleStartQuiz(){
        quizDispatch({ type: "RESET_GAME" }); 
        quizDispatch({ type: "START_GAME" })
        navigate("/quiz")
    }

    //handle generating a random quiz game for the user, if they click to start playing instantly
    //number of questions will be 10, its gonna be between easy, medium or hard,
    function handleGenerateRandomQuiz(){


    }

    return(
        <StyledMenuBackground>
            <StyledMenuContainer>
                <StyledRandomQuizContainer>
                    <StyledRandomQuizLeftDiv>

                    </StyledRandomQuizLeftDiv>
                    <StyledRandomQuizRightDiv>
                        <StyledQuestionIcon/>
                    </StyledRandomQuizRightDiv>
                </StyledRandomQuizContainer>
                <StyledStartButton
                    onClick={(e) => handleStartQuiz()}
                >
                    <StyledPlayIcon />
                    <StyledStartText>

                        Start Quiz
                    </StyledStartText>
                </StyledStartButton>

                <StyledMenuButton
                    onClick={(e) => navigate("/settings")}
                >
                    <StyledSettingIcon/>
                    <StyledButtonText>
                        Settings
                    </StyledButtonText>
                </StyledMenuButton>
                <StyledMenuButton
                    onClick={()=>setDisplayLeaderboard(true)}
                >
                    <StyledLeaderboardIcon/>
                    <StyledButtonText>

                        View Leaderboard
                    </StyledButtonText>
                </StyledMenuButton>
            </StyledMenuContainer>
            {displayleaderboard && 
                <LeaderboardModal
                    setDisplayLeaderboard={setDisplayLeaderboard}
                />
            }
        </StyledMenuBackground>
    )

}