import React,{ useState, useEffect, useRef} from "react";
import { 
    StyledTable,
    StyledEmptyState,
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
import { updatedCategories, difficulties, modeTypes } from "../../assets/questions";
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
    const [ selectedMode, setSelectedMode ] = useState("")
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
                const safeCategory = encodeURIComponent(selectedCategory)
                leaderboardUrl += `&category=${safeCategory}`
            }

            if (selectedDifficulty) {
                leaderboardUrl += `&difficulty=${selectedDifficulty}`
            }

            if (selectedMode) {
                leaderboardUrl += `&mode=${selectedMode}`
            }

            console.log("leaderboardUrl :",leaderboardUrl)

            const response = await fetch(leaderboardUrl)
            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard data")
            }
            const data = await response.json()

            if(data == null || data.length == 0){
                setGeneralLeaderboard([])
            } else {
                setGeneralLeaderboard(data)
            }
  
        } catch (error) {
            console.error(error)
        }
    }

    function handleSettingUserName(name){
        setSelectedUsername(name)
    }

    function handleSettingCategory(newValue,actionMeta) {
        if (newValue && newValue.value != null) {
            setSelectedCategory(newValue.value)
            return
        }
        setSelectedCategory("")
    }

    function handleSettingDifficulty(newValue, actionMeta) {
        if (newValue && newValue.value != null) {
            setSelectedDifficulty(newValue.value)
            return
        }
        setSelectedDifficulty("")
    }

    function handleSettingMode(newValue, actionMeta) {
        if (newValue && newValue.value != null) {
            setSelectedMode(newValue.value)
            return
        }
        setSelectedMode("")
    }

    function handleCapitalizeWords(stringVal){
        return stringVal.split(" ").map(([ firstLetter, ...otherLetters ]) => `${firstLetter.toUpperCase()}${otherLetters.join("")}`).join(" ");
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
            grow:3,
            center:true,
            
        },
        {
            name:'Score',
            selector: row => row.scores,
            sortable:true,
            center: true

        },
        {
            name:'Accuracy',
            cell: (row) => {
                const correct = row.answered_correctly
                const total = row.total_questions
                const percentage = total > 0 ? Math.round((correct/total)*100) : 0;
                return (
                    <StyledColumnCell>
                        <strong>
                            {percentage}%
                        </strong>
                        <span>
                            ({correct}/{total})
                        </span>
                    </StyledColumnCell>
                )
            },
            grow: 3,
            center: true,
            sortable: true
        },
        {
            name:"Category",
            selector: row => handleCapitalizeWords(row.category),
            minWidth: '150px',
            center: true

        },
        {
            name:"Difficulty", 
            selector: row => handleCapitalizeWords(row.difficulty),
            grow:3,
            center: true

        },
        {
            name:'Mode',
            selector: row => handleCapitalizeWords(row.mode),
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
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: theme.textColor
        })
        ,
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
            ? theme.panel.a2.backgroundColor
            : state.isFocused
            ? theme.panel.a3.backgroundColor
            : theme.panel.a4.backgroundColor
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: theme.panel.textColor
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
                    <StyledFilterContainer
                        onClick={(e) => e.stopPropagation()}
                    >

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

                        <Select
                            options={modeTypes}
                            styles={filterStyles}
                            closeMenuOnSelect={true}
                            menuPlacement="auto"
                            menuPosition="absolute"
                            menuPortalTarget={document.body}
                            placeholder="Filter Mode"
                            isClearable
                            onChange={handleSettingMode}
                        />

                    </StyledFilterContainer>
                }
                <StyledTable
                    columns={columns}
                    data={generalLeaderboard}
                    noDataComponent={
                        <StyledEmptyState>
                            No records to display
                        </StyledEmptyState>
                    }
                />
            </StyledLeaderboardContainer>
        </StyledLeaderboardBackground>
    )
}