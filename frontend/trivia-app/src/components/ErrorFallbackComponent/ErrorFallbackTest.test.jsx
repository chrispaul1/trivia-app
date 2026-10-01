import {render,screen} from '@testing-library/react'
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from './ErrorFallback'
import { QuizProvider } from '../../contexts/quiz/quizContext'

const Bomb = () => {
    throw new Error('Error, Something crashed!')
}

describe('ErrorBoundary', () => {
    it('render a fallback UI when the child component crashes', () => {
        
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(()=>{});
        console.log({ QuizProvider, ErrorBoundary, ErrorFallback });
        render(
            <QuizProvider>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Bomb/>
                </ErrorBoundary>
            </QuizProvider>
        )

        expect(screen.getByText(/Sorry! Something went wrong/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Return to Menu|Return to Login/i })).toBeInTheDocument();
        
        consoleSpy.mockRestore();

    });
});
