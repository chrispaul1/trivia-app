import React, {useEffect, useState} from "react"
import { 
    StyledOptionButton,
    StyledTextGroup,
    StyledPrimaryText,
    StyledGroupNameText,
    StyledSecondaryText,
    StyledSelectedIcon,
    StyledOptionsWrapper
} from '.'

export function ButtonGroup({groupName, options, selected, questionID, onSelect }) {
    return (
        <StyledOptionsWrapper> 
            <StyledGroupNameText>
                {groupName}
            </StyledGroupNameText>  
            {options.map((option) => (
                <StyledOptionButton
                    key={option.value}
                    className={selected === option.value ? "selected" : ""}
                    onClick={() => onSelect(option.value, questionID)}
                >
                    {option.icon}
                    <StyledTextGroup>
                        <StyledPrimaryText>
                            {option.label}
                        </StyledPrimaryText>
                        <StyledSecondaryText>
                            {option.description}
                        </StyledSecondaryText>
                    </StyledTextGroup>
                    <StyledSelectedIcon
                        $chosen={selected === option.value}
                    />
                </StyledOptionButton>
            ))}
        </StyledOptionsWrapper>
    )
}