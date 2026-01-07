import { categoryNames } from "../assets/categories"

//Inital Answer state
export const initialAnswerState = [
    {id:1,value: ""},
    {id:2,value: ""},
    {id:3,value: 0},
    {id:4,value: ""},
    {id:5,value: [0, 0]}
]
const anyCategory = "Any Category"
//setting the categories
const categories = categoryNames.trivia_categories.map(obj => obj.name)
const updatedCategories = [anyCategory,...categories]
//diffculty options
const difficulty = ["Any Difficulty","Easy","Medium","Hard"]
//question type
const questionType = ["Any Type","Multiple Choice","True/False"]
//questions array objets
export const questions = [
    { id: 1, type: 'dropdown', label: "Select your Categories", options: updatedCategories, required: false },
    { id: 2, type: 'dropdown', label: "Select your difficulty", options: difficulty, required: false },
    { id: 3, type: "numerical", limit: 50,text: "Enter the Number of Questions", required: true },
    { id: 4, type: "dropdown", label: "Select the question type", options: questionType, required: false },
    { id: 5, type: "time", text: "Set the time limit" }
]