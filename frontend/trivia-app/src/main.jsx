import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QuizProvider } from './contexts/quiz/quizContext.jsx'
import { ThemeProvider } from './contexts/theme/themeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </QuizProvider>
  </StrictMode>,
)
