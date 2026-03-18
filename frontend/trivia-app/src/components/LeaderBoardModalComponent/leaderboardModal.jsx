import React,{useState,useEffect} from "react";
import { 
    StyledLeaderboardContainer,
    StyledLeaderboardBackground } from ".";
import { Header } from "../HeaderComponent";

export function LeaderboardModal({ setDisplayLeaderboard }){

    const headerState = [
        {
            id: 1,
            placement: "middle",
            type: "title",
            text: "User Leaderboard"
        },
        {
            id: 1,
            placement: "right",
            type: "button",
            text: "Exit",
            function: setDisplayLeaderboard(false),
        }
    ]
    return(
        <StyledLeaderboardBackground>
            <StyledLeaderboardContainer>
                
            </StyledLeaderboardContainer>
        </StyledLeaderboardBackground>
    )
}