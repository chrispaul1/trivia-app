import { categoryNames } from "../assets/categories"

export const modeTypes = [
    {
        value: "Standard",
        label: "Standard",
        description: "Set amount of questions"
    },
    {
        value: "Endless",
        label: "Endless",
        description: "Play till the time runs out"
    }
]
const anyCategory = {value:null,label:"Randomized Categories"}
//setting the categories
const categories = categoryNames.trivia_categories.map(obj => {
    const original = obj.name
    const cleaned = original.replace(/Entertainment: /i,"")
    return {
        value:obj.name,
        label:cleaned 
    }
})
export const updatedCategories = [anyCategory,...categories]
//diffculty options
export const difficulties = [
    {
        value: "Randomized Difficulty",
        label: "Randomized Difficulty",
        description: "A wild card Let the dice roll"
    },
    {
        value: "Easy",
        label: "Easy",
        description: "Everyday facts. Find your rhythm"
    },
    {
        value: "Medium",
        label: "Medium",
        description: "A balanced mix. Try your hand"

    },
    {
        value: "Hard",
        label: "Hard",
        description: "Deep cuts. Bring your A-game"

    }

]
//question type
export const questionTypes = [
    {
        label:"Any Type",
        value:"any type",
        description: "Full variety. Test every skill"
    },
    {
        label:"Multiple Choice",
        value:"multiple",
        description: "Options galore. Choose wisely"
    },
    {
        label:"True / False",
        value:"boolean",
        description: "Quick fire. Yes or no"
    }
]
//questions array objets
export const questions = {
    mode : { id: "mode", type: 'dropdown', label:"Choose your Game Mode", options:modeTypes, required: false},
    category : { id: "category", type: 'dropdown', label: "Select your Categories", options: updatedCategories, required: false },
    difficulty: { id: "difficulty", type: 'dropdown', label: "Select your difficulty", options: difficulties, required: false },
    amount : { id: "amount", type: "numerical", limit: 50,text: "Enter the Number of Questions", required: true },
    type : { id: "type", type: "dropdown", label: "Select the question type", options: questionTypes, required: false },
    //{ id: "timeLimit", type: "time", text: "Set the time limit" }
}