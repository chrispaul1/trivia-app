import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QuizProvider } from './contexts/quiz/quizContext.jsx'
import { ThemeProvider } from './contexts/theme/themeContext.jsx'
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from './components/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary
      fallback={<div>Critical App Boot Error</div>}
    >
      <QuizProvider>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </QuizProvider>
    </ErrorBoundary>
  </StrictMode>,
)
