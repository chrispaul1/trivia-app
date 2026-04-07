  import React from "react";
  import { useQuizState, useQuizDispatch } from "../contexts/quiz/quizContext";

  //fetches the questions by calling an api endpoint with the settings data
  export async function fetchTriviaQuestions(categoryID,difficulty,type,amount,userID ) {
    try {
      
      let apiUrl = `http://localhost:5000/questions?amount=${amount}`;

      if (categoryID) apiUrl += `&category=${categoryID}`
      if (difficulty) apiUrl += `&difficulty=${encodeURIComponent(difficulty)}`
      if (type) apiUrl += `&type=${encodeURIComponent(type)}`
      if (userID) apiUrl += `&userid=${userID}`
      const res = await fetch(apiUrl)

      if (!res.ok) {
        throw new Error(`API call failed with status : ${res.status}`)
      }
      const data = await res.json()
      
      return data.results

    } catch (error) {
      alert("Oops! The trivia database is currently unavailable. Please try again.");
      return null
    } 
  }


export function decodeHtmlEntities(encodedString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(encodedString, 'text/html');
  return doc.documentElement.textContent;
}

//function that decodes html entities in the question and answer strings, since the API returns them encoded
export function decodeAndShuffleQuestion(questions) {
  const decodedQuestions = questions.map(item => ({
    ...item,
    question: decodeHtmlEntities(item.question),
    category: decodeHtmlEntities(item.category),
    correct_answer: decodeHtmlEntities(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
  }))
  const shuffledQuestions = decodedQuestions.map((q) => ({
    ...q,
    shuffledAnswers: q.incorrect_answers.concat(q.correct_answer)
      .sort(() => Math.random() - 0.5),
  }));
  return shuffledQuestions
}
