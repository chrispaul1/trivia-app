import React,{ useState, useEffect, useRef} from "react";
import { 
    StyledTable,
    StyledColumnCell,
    StyledFilterIcon,
    StyledUsernameCell,
    StyledHeaderRowText,
    StyledFilterContainer,
    StyledLeaderboardContainer,
    StyledLeaderboardBackground } from ".";
import { Header } from "../HeaderComponent";
import { useOnClickOutside } from "../../hooks/SizeHook";
import { useThemeContext } from "../../contexts/theme/themeContext";
import { FaFilter } from "react-icons/fa";
import { updatedCategories, difficulties } from "../../assets/questions";
import Select from 'react-select'

export function LeaderboardModal({ setDisplayLeaderboard }){

    const modalRef = useRef()
    const [ generalLeaderboard, setGeneralLeaderboard ] = useState( [] )
    //const [ userLeaderboard, setUserLeaderboard ] = useState( [] )
    const [ showUserData,setShowUserData ] = useState( false )
    const { theme, toggleTheme } = useThemeContext()

    //States dealing with the filter
    const [ showFilterOptions, setShowFilterOptions] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState("")
    const [ selectedDifficulty, setSelectedDifficulty ] = useState("")
    const [ selectedUsername, setSelectedUsername ] = useState("") 

    useOnClickOutside( modalRef, () => setDisplayLeaderboard( false) )

    function handleClosingModal(){
        setDisplayLeaderboard(false)
    }

    useEffect(() => {
        const user1 = generalLeaderboard[0]
    }, [generalLeaderboard])

    useEffect(() => {
        fetchLeaderboard()
    }, [])

    function fetchUserData(name = "unknown") {
        setShowUserData(true)
        fetchLeaderboard(name, true)
    }

    //Function to fetch the leaderboard data from the backend
    async function fetchLeaderboard() {
        try {
            let leaderboardUrl = `http://localhost:5000/leaderboard?username=${selectedUsername}`
            
            if (selectedCategory) {
                leaderboardUrl += `&category=${selectedCategory}`
            }

            if (selectedDifficulty) {
                leaderboardUrl += `&difficulty=${selectedDifficulty}`
            }

            const response = await fetch(leaderboardUrl)
            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard data")
            }
            const data = await response.json()
            if(data.length == 0){
                setUserLeaderboard([])
            }

            setGeneralLeaderboard(data)
  
        } catch (error) {
            console.error(error)
        }
    }

    function handleSettingUserName(name){
        setSelectedUsername(name)
    }

    function handleSettingCategory(newValue,actionMeta) {
        setSelectedCategory(newValue)
    }

    function handleSettingDifficulty(newValue, actionMeta) {
        setSelectedDifficulty(newValue)
    }

    useEffect(() => {
        fetchLeaderboard()
    }, [selectedCategory, selectedDifficulty, selectedUsername])

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
            fontSize: "calc(1rem + .75vw)",
            text: "User Leaderboard"
        },
        {
            id:1,
            placement: "right",
            type: "button",
            icon: <StyledFilterIcon/>,
            function:()=>setShowFilterOptions(prev => !prev)
        }

    ]

    const columns = [
        {
            name:'Username',
            cell: (row) =>(
                <StyledUsernameCell
                    onClick={()=>handleSettingUserName(row.name)}
                >
                    {row.name}
                </StyledUsernameCell>
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
            grow:4,
            center: true,
            sortable: true
        },
        {
            name:"Category",
            selector: row => row.category,
            grow:3,
            center: true

        },
        {
            name:"Difficulty", 
            selector: row => row.difficulty,
            grow:3,
            center: true

        },
        {
            name:'Mode',
            selector: row => row.mode,
            center: true
        }
    ]
 
    const filterStyles = {

        control: (provided) => ({
            ...provided,
            width: 250,
            color: 'white',
            background: theme.panel.a4.backgroundColor,
            minWidth: 'max-content',
        }),
        menu: (provided) => ({
            ...provided,
            width: 'max-content',
            background: theme.panel.a4.backgroundColor,
            minWidth: '100%',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
            ? theme.panel.a2.backgroundColor
            : state.isFocused
            ? theme.panel.a3.backgroundColor
            : theme.panel.a4.backgroundColor
        })
    };

    return(
        <StyledLeaderboardBackground>
            <StyledLeaderboardContainer
                ref={modalRef}
            >
                <Header
                    headerObjs={headerState}
                />
                {showFilterOptions&&
                    <StyledFilterContainer>

                        <Select
                            options={updatedCategories}
                            styles={filterStyles}
                            closeMenuOnSelect={true}
                            menuPlacement="auto"
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            onChange={handleSettingCategory}
                            isClearable
                            width={200}
                            placeholder="Filter Categories"
                        />

                        <Select
                            options={difficulties}
                            styles={filterStyles}
                            closeMenuOnSelect={true}
                            menuPlacement="auto"
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            placeholder="Filter Difficulty"
                            isClearable
                            onChange={handleSettingDifficulty}
                        />

                    </StyledFilterContainer>
                }
                <StyledTable
                    columns={columns}
                    data={generalLeaderboard}
                />
            </StyledLeaderboardContainer>
        </StyledLeaderboardBackground>
    )
}