import { categoryNames } from "../assets/categories"

const modeTypes = ["Standard","Endless"]
const anyCategory = "Randomized Categories"
//setting the categories
const categories = categoryNames.trivia_categories.map(obj => obj.name)
const updatedCategories = [anyCategory,...categories]
//diffculty options
const difficulty = ["Randomized Difficulty","Easy","Medium","Hard"]
//question type
const questionType = [{text:"Any Type",value:"any type"},{text:"Multiple Choice",value:"multiple"},{text:"True / False",value:"boolean"}]
//questions array objets
export const questions = [
    { id: "mode", type: 'dropdown', label:"Choose the Game Mode", options:modeTypes, required: false},
    { id: "category", type: 'dropdown', label: "Select your Categories", options: updatedCategories, required: false },
    { id: "difficulty", type: 'dropdown', label: "Select your difficulty", options: difficulty, required: false },
    { id: "amount", type: "numerical", limit: 50,text: "Enter the Number of Questions", required: true },
    { id: "type", type: "dropdown", label: "Select the question type", options: questionType, required: false },
    //{ id: "timeLimit", type: "time", text: "Set the time limit" }
]