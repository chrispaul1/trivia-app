import React,{ useEffect,useState, useRef} from "react";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import { StyledMenuBackground,StyledMenuContainer, StyledButton } from "..";
import { LeaderboardModal } from "../../components/LeaderBoardModalComponent";
import { useThemeContext } from "../../contexts/theme/themeContext";

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

    // handles logging out the user
    function handleLogOut(){
        quizDispatch({ type: "RESET_GAME" }); 
        quizDispatch({ type: "LOGOUT_USER" })
        navigate("/login")
    }

    return(
        <StyledMenuBackground>
            <StyledMenuContainer>
                <StyledButton
                    onClick={(e) => handleStartQuiz()}
                >
                    Start Quiz
                </StyledButton>

                <StyledButton
                    onClick={(e) => navigate("/settings")}
                >
                    Customize Quiz Settings
                </StyledButton>
                <StyledButton
                    onClick={()=>setDisplayLeaderboard(true)}
                >
                    View Leaderboard
                </StyledButton>
            </StyledMenuContainer>
            {displayleaderboard && 
                <LeaderboardModal
                    setDisplayLeaderboard={setDisplayLeaderboard}
                />
            }
        </StyledMenuBackground>
    )

}