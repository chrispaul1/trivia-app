import styled from "styled-components";
import { CiPlay1 } from "react-icons/ci";
import { RiListSettingsFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

export const StyledMenuBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
    width: 100vw;
    ${({ theme }) => theme.panel.a1};
`

export const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10vh;
    margin-top: 5vh;
    gap: 2vh;
    align-items: center;
    height: 70%;
    width: 70%;
    min-width: 300px;
    border-radius: 20px;
    ${({theme}) => theme.panel.a2};
    border: solid 1px ${({ theme }) => theme.panel.a3.backgroundColor};
`

export const StyledRandomQuizContainer = styled.div`
    display: flex;
    min-width: 250px;
    min-height: 150px;
    width: 90%;
    border-radius: 20px;
    ${({ theme }) => theme.panel.a4};
    border: solid 1px ${({ theme }) => theme.panel.a5.backgroundColor};
`

export const StyledRandomQuizLeftDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 60%;
`
export const StyledRandomQuizRightDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
    align-items: center;
    justify-content: center;
`

export const StyledQuestionIcon = styled(FaQuestion)`
    font-size: 60px;
    color: ${({ theme }) => theme.primaryButton.backgroundColor};
`

export const StyledStartButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
    min-width: 250px;
    min-height: 100px;
    width: 90%;
    ${({ theme }) => theme.primaryButton};
    border-radius: 20px;
    &: hover{
        pointer: cursor
    }
`

export const StyledPlayIcon = styled(CiPlay1)`
    font-size: 32px;
`
    
export const StyledStartText = styled.p`
    font-size: 28px;
    font-weight: bold;
`

export const StyledMenuButton = styled.button`
    display: flex;
    min-width: 250px;
    min-height: 75px;
    gap: 10px;
    border-radius: 20px;
    align-items: center;
    justify-content: left;
    width: 90%;
    ${({ theme }) => theme.panel.a1};
    border: solid 1px ${({theme}) => theme.panel.a4.backgroundColor};
`

export const StyledSettingIcon = styled(RiListSettingsFill)`
    font-size: 32px;
`

export const StyledButtonText = styled.p`
    font-size: 24px;
    font-weight: bold;
`

export const StyledLeaderboardIcon = styled(MdLeaderboard)`
    font-size: 32px;
`

