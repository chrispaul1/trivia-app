import React,{useState} from "react";
import { 
    StyledLoginDiv,
    StyledLoginInput,
    StyledLoginBackground, 
    StyledLoginInputContainer,
} from ".";
import { useNavigate } from "react-router-dom";

export function LoginPage(){

    const [username, setUsername] = useState("")
    const [isGuest, setIsGuest] = useState(false)
    const navigate = useNavigate()

    //Function to handle login, will eventually send username to backend and receive a token, for now it just navigates to the settings page
    async function handleLogin(){

        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: isGuest ? "Guest" : username
            })
        })

        const data = await response.json()

        navigate("/settings", {state:{user:data}})
    }


    return(
        <StyledLoginBackground>
            <StyledLoginDiv>
                <h2>Welcome to the Trivia Game</h2>
                <StyledLoginInputContainer>
                    <StyledLoginInput
                        type="text"
                        id="username"
                        placeholder="Enter your Username"
                        onChange={()=>setUsername(e.target.value)}
                    />
                    <button 
                        onClick={() => handleLogin()}
                    >
                        Next
                    </button>
                    <button
                        onClick={()=>{setIsGuest(true); handleLogin()}}
                    >
                        Play as Guest
                    </button>
                </StyledLoginInputContainer>
            
                
            </StyledLoginDiv>
        </StyledLoginBackground> 
    )
}