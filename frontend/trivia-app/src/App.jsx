import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ParametersPage, QuestionsPage } from './pages'

function App() {
  const [triviaQuestions,setTriviaQuestions] = useState([])
  const [displayQuestions,setDisplayQuestions] = useState(false)  

  useEffect(()=>{
    if (triviaQuestions.length != []){
      setDisplayQuestions(true)
      console.log("display questions set to true")
    }
    console.log("trivia questions in app.jsx",triviaQuestions)
  },[triviaQuestions])

  return (
    <>
      {displayQuestions ?
        <QuestionsPage
          triviaQuestions={triviaQuestions}
        />
        :
        <ParametersPage
          setTriviaQuestions={setTriviaQuestions}
        />
      }
      
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
