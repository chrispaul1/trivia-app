import { Outlet } from "react-router-dom";
import { StyledQuizBackground } from "./styles";
import { GlobalHeader } from "../GlobalHeaderComponent";

export function GameLayout(){
    return(
        <StyledQuizBackground>
            <GlobalHeader/>
            <main>
                <Outlet/>
            </main>
        </StyledQuizBackground>
    )
}