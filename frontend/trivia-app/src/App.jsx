import { GlobalStyles } from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { GameLayout } from './components';
import {
	SettingsPage,
	QuizPage,
	LoginPage,
	MainMenu,
	QuizSummary
} from './pages'

function App() {

	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route element={<GameLayout />} >
						<Route path="/" element={<MainMenu />} />
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/quiz" element={<QuizPage />} />
						<Route path="/summary" element={<QuizSummary />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
