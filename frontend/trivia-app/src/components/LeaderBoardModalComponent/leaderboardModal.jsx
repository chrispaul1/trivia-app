import React,{useState,useEffect} from "react";
import { 
    StyledLeaderboardContainer,
    StyledLeaderboardBackground } from ".";
import { Header } from "../HeaderComponent";
import DataTable from 'react-data-table-component';

export function LeaderboardModal({ setDisplayLeaderboard }){

    const [generalLeaderboard, setGeneralLeaderboard] = useState([])
    const [userLeaderboard, setUserLeaderboard] = useState([])
    const [showUserData,setShowUserData] = useState(false)

    function handleClosingModal(){
        setDisplayLeaderboard(false)
    }
    useEffect(() => {
        console.log("general leaderboard", generalLeaderboard)
        const user1 = generalLeaderboard[0]
        console.log(user1)
    }, [generalLeaderboard])

    useEffect(() => {
        fetchLeaderboard()
    }, [])

    function fetchUserData(name = "unknown") {
        setShowUserData(true)
        fetchLeaderboard(name, true)
    }

    async function fetchLeaderboard(username = "", forSpecificUser = false) {
        try {
            const usernameUrl = `http://localhost:5000/leaderboard?username=${username}`
            const response = await fetch(usernameUrl)
            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard data")
            }
            const data = await response.json()
            if (forSpecificUser) {
                setUserLeaderboard(data)
            } else {
                setGeneralLeaderboard(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const headerState = [
        {
            id:1,
            placement:'left',
            type:'button',
            text: "Back",
            showContent: showUserData,
            function:()=>setShowUserData(false)
        },
        {
            id: 1,
            placement: "middle",
            type: "title",
            fontSize: "1.5rem",
            text: "User Leaderboard"
        },
        {
            id: 1,
            placement: "right",
            type: "button",
            text: "Exit",
            function: handleClosingModal,
        }
    ]

    const columns = [
        {
            name:'Username',
            cell: (row) =>(
                <div
                    style={{cursor:'pointer',color:'#007bff'}}
                    onClick={()=>fetchUserData(row.name)}
                >
                    {row.name}
                </div>
            ),
            center:true,
            
        },
        {
            name:'Score',
            selector: row => row.scores,
            sortable:true,
            center: true

        },
        {
            name:'Correct Count',
            selector: row => row.answered_correctly,
            grow:3,
            center: true,
            sortable: true
        },
        {
            name:'Question Count',
            selector: row => row.totalQuestions,
            grow:3,
            center: true,
            sortable: true
        },
        {
            name:'Category',
            selector: row => row.category,
            grow:4,
            center: true

        },
        {
            name:'Difficulty',
            selector: row => row.difficulty,
            center: true

        },
        {
            name:'Mode',
            selector: row => row.Mode,
            center: true
        }
    ]

    return(
        <StyledLeaderboardBackground>
            <StyledLeaderboardContainer>
                <Header
                    headerObjs={headerState}
                />
                <DataTable
                    columns={columns}
                    data={showUserData ? userLeaderboard : generalLeaderboard}
                />
            </StyledLeaderboardContainer>
        </StyledLeaderboardBackground>
    )
}