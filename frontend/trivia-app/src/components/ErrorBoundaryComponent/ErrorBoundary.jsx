import React from "react";
import { StyledErrorBackground } from "./styles";
import { StyledButton } from "../../pages/Login/loginPageStyle";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorInfo: error }
    }

    componentDidcatch(error, errorInfo) {

    }

    render() {

        if (!this.state.hasError) {
            return (
                <StyledErrorBackground>

                    <h2>
                        Sorry! Something went wrong
                    </h2>
                    <P>
                        Please try refreshing the page, or return to the main menu
                    </P>
                    <StyledButton
                        onClick={() => window.location.href = '/'}
                    >
                        Return to Menu
                    </StyledButton>
                </StyledErrorBackground>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;