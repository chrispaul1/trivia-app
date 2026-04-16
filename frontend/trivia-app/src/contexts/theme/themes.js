import {mix,rgba} from 'polished'

const LIGHT_TINT = '#e6b3ff'
const LIGHT_BASE = '#f4f0fa'
const LIGHT_TEXT = '#1f0f33'

const DARK_TINT = '#300066'
const DARK_BASE = '#130524'
const DARK_TEXT = '#ede6f5'


export const lightTheme = {

    baseColor: LIGHT_BASE,
    textColor: LIGHT_TEXT,

    panel: { 
        a1: { backgroundColor: LIGHT_BASE, color: LIGHT_TEXT },  // App Background (Alice Blue / Ice)
        a2: { backgroundColor: mix(0.15, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },  // Cards / Main Content
        a3: { backgroundColor: mix(0.30, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },  // Elevated Elements / Modals
        a4: { backgroundColor: mix(0.45, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },
        a5: { backgroundColor: mix(0.60, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT }, 
    },
    glass: {
        a1: { backgroundColor: rgba(LIGHT_BASE, 0.70), backdropFilter: 'blur(12px)', color: LIGHT_TEXT },
        a2: { backgroundColor: rgba(mix(0.15, DARK_TINT, LIGHT_BASE), 0.75), backdropFilter: 'blur(10px)', color: LIGHT_TEXT },
        a3: { backgroundColor: rgba(mix(0.30, DARK_TINT, LIGHT_BASE), 0.80), backdropFilter: 'blur(8px)', color: LIGHT_TEXT },
        a4: { backgroundColor: rgba(mix(0.45, DARK_TINT, LIGHT_BASE), 0.95), backdropFilter: 'blur(6px)', color: LIGHT_TEXT },
        a5: { backgroundColor: rgba(mix(0.60, DARK_TINT, LIGHT_BASE), 0.90), backdropFilter: 'blur(4px)', color: LIGHT_TEXT },
    },

    primaryButton: {
        backgroundColor: '#7b4bce', // Electric Cyan
        color: '#FFFFFF',           // Dark Navy text
        border: 'none',

        '&:hover': {
            backgroundColor: '#6337a8',
            transform: 'translateY(-2px)',
        },

        '&:active': {
            backgroundColor: '#4d2685',
            transform: 'translateY(0)',
        },

        '&:focus-visible': {
            outline: '3px solid rgba(123, 75, 206, 0.4)',
            outlineOffset: '2px',
        }
    },

    // Optional: Semantic colors for the quiz!
    feedback: {
        correct: '#2E7D32',    // Green
        incorrect: '#D32F2F',  // Red
    }
};

export const darkTheme = {

    baseColor: DARK_BASE,
    textColor: DARK_TEXT,

    panel: {
        a1: { backgroundColor: DARK_BASE, color: DARK_TEXT },  // App Background (Alice Blue / Ice)
        a2: { backgroundColor: mix(0.15, LIGHT_TINT, DARK_BASE), color: DARK_TEXT },  // Cards / Main Content
        a3: { backgroundColor: mix(0.30, LIGHT_TINT, DARK_BASE), color: DARK_TEXT },  // Elevated Elements / Modals
        a4: { backgroundColor: mix(0.45, LIGHT_TINT, DARK_BASE), color: DARK_TEXT },
        a5: { backgroundColor: mix(0.60, LIGHT_TINT, DARK_BASE), color: DARK_TEXT }, 
    },

    glass: {
        a1: { backgroundColor: rgba(DARK_BASE, 0.70), backdropFilter: 'blur(12px)', color: DARK_TEXT },
        a2: { backgroundColor: rgba(mix(0.15, LIGHT_TINT, DARK_BASE), 0.75), backdropFilter: 'blur(10px)', color: DARK_TEXT },
        a3: { backgroundColor: rgba(mix(0.30, LIGHT_TINT, DARK_BASE), 0.80), backdropFilter: 'blur(8px)', color: DARK_TEXT },
        a4: { backgroundColor: rgba(mix(0.45, LIGHT_TINT, DARK_BASE), 0.95), backdropFilter: 'blur(6px)', color: DARK_TEXT },
        a5: { backgroundColor: rgba(mix(0.60, LIGHT_TINT, DARK_BASE), 0.90), backdropFilter: 'blur(4px)', color: DARK_TEXT },
    },

    primaryButton: {
        backgroundColor: '#b366ff',
        color: '#1a0033',           // Very dark purple text for contrast
        border: 'none',
        '&:hover': {
            backgroundColor: '#9933ff',
            transform: 'translateY(-2px)',
        },
        '&:active': {
            backgroundColor: '#8000ff',
            transform: 'translateY(0)',
        },
        '&:focus-visible': {
            outline: '3px solid rgba(179, 102, 255, 0.4)',
            outlineOffset: '2px',
        }
    },

    // Optional: Semantic colors for the quiz!
    feedback: {
        correct: '#4CAF50',    // Lighter Green for dark mode
        incorrect: '#EF5350',  // Lighter Red for dark mode
    }
};