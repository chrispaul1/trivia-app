import React,{useEffect,useState} from "react";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import { StyledMenuBackground,StyledMenuContainer, StyledButton } from "..";
import { LeaderboardModal } from "../../components/LeaderBoardModalComponent";

export function Menu(){

    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const [displayleaderboard, setDisplayLeaderboard] = useState(false)
    const navigate = useNavigate()

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
        console.log("start the game")
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
            <h2>
                Trivia Quiz Menu
            </h2>
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
                <StyledButton
                    onClick={()=>handleLogOut()}
                >
                    Log Out
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