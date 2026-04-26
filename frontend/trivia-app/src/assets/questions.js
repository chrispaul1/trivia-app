import { categoryNames } from "../assets/categories"

const modeTypes = [
    {
        value: "Standard",
        label: "Standard"
    },
    {
        value: "Endless",
        label: "Endless",
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
        label: "Randomized Difficulty"
    },
    {
        value: "Easy",
        label: "Easy",
    },
    {
        value: "Medium",
        label: "Medium",
    },
    {
        value: "Hard",
        label: "Hard",
    }

]
//question type
const questionType = [
    {label:"Any Type",value:"any type"},
    {label:"Multiple Choice",value:"multiple"},
    {text:"True / False",value:"boolean"}
]
//questions array objets
export const questions = {
    mode : { id: "mode", type: 'dropdown', label:"Choose your Game Mode", options:modeTypes, required: false},
    category : { id: "category", type: 'dropdown', label: "Select your Categories", options: updatedCategories, required: false },
    difficulty: { id: "difficulty", type: 'dropdown', label: "Select your difficulty", options: difficulties, required: false },
    amount : { id: "amount", type: "numerical", limit: 50,text: "Enter the Number of Questions", required: true },
    type : { id: "type", type: "dropdown", label: "Select the question type", options: questionType, required: false },
    //{ id: "timeLimit", type: "time", text: "Set the time limit" }
}