import {borderRadius, mix,rgba} from 'polished'

const LIGHT_TINT = '#e6b3ff'
const LIGHT_BASE = '#F8F7FF'
const LIGHT_TEXT = '#1f0f33'

const DARK_TINT = '#300066'
const DARK_BASE = '#141333'
const DARK_TEXT = '#ede6f5'

//#F8F7FF
//#141333
export const lightTheme = {
    name:'light',
    baseColor: LIGHT_BASE,
    textColor: LIGHT_TEXT,

    panel: { 
        a1: { backgroundColor: LIGHT_BASE, color: LIGHT_TEXT},  // App Background 
        a2: { backgroundColor: mix(0.10, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },  // Cards / Main Content
        a3: { backgroundColor: mix(0.20, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },  // Elevated Elements / Modals
        a4: { backgroundColor: mix(0.30, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT },
        a5: { backgroundColor: mix(0.40, DARK_TINT, LIGHT_BASE), color: LIGHT_TEXT }, 
    },
    glass: {
        a1: { backgroundColor: rgba(LIGHT_BASE, 0.70), backdropFilter: 'blur(12px)', color: LIGHT_TEXT },
        a2: { backgroundColor: rgba(mix(0.10, DARK_TINT, LIGHT_BASE), 0.75), backdropFilter: 'blur(10px)', color: LIGHT_TEXT },
        a3: { backgroundColor: rgba(mix(0.20, DARK_TINT, LIGHT_BASE), 0.80), backdropFilter: 'blur(8px)', color: LIGHT_TEXT },
        a4: { backgroundColor: rgba(mix(0.30, DARK_TINT, LIGHT_BASE), 0.95), backdropFilter: 'blur(6px)', color: LIGHT_TEXT },
        a5: { backgroundColor: rgba(mix(0.40, DARK_TINT, LIGHT_BASE), 0.90), backdropFilter: 'blur(4px)', color: LIGHT_TEXT },
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

    name:'dark',
    textColor: DARK_TEXT,


    basePanel: {backgroundColor:DARK_BASE, color:DARK_TEXT, border:' 1px solid transparent'}, // Main Backgroud

    panel: {
        a1: { backgroundColor: mix(0.10, LIGHT_TINT, DARK_BASE), color: DARK_TEXT },  // Large structural containers (Sidebar, Nav Rail)
        a2: { backgroundColor: mix(0.14, LIGHT_TINT, DARK_BASE), color: DARK_TEXT }, // Cards / Main Content
        a3: { backgroundColor: mix(0.18, LIGHT_TINT, DARK_BASE), color: DARK_TEXT }, // Inner components(Input fields, search bars)
        a4: { backgroundColor: mix(0.24, LIGHT_TINT, DARK_BASE), color: DARK_TEXT }, // Interactive states (Hover effects, active selections)
        a5: { backgroundColor: mix(0.30, LIGHT_TINT, DARK_BASE), color: DARK_TEXT }, // Overlays(Modal dialogs, popovers, tooltips)
    },

    baseGlass: { backgroundColor: rgba(DARK_BASE, 0.70), backdropFilter: 'blur(12px)', color: DARK_TEXT },
    glass: {
        a1: { backgroundColor: rgba(mix(0.10, LIGHT_TINT, DARK_BASE), 0.75), backdropFilter: 'blur(10px)', color: DARK_TEXT },
        a2: { backgroundColor: rgba(mix(0.12, LIGHT_TINT, DARK_BASE), 0.80), backdropFilter: 'blur(8px)', color: DARK_TEXT },
        a3: { backgroundColor: rgba(mix(0.14, LIGHT_TINT, DARK_BASE), 0.95), backdropFilter: 'blur(6px)', color: DARK_TEXT },
        a4: { backgroundColor: rgba(mix(0.19, LIGHT_TINT, DARK_BASE), 0.90), backdropFilter: 'blur(4px)', color: DARK_TEXT },
        a5: { backgroundColor: rgba(mix(0.22, LIGHT_TINT, DARK_BASE), 0.90), backdropFilter: 'blur(2px)', color: DARK_TEXT },
    },

    primaryButton: {
        backgroundColor: '#e1f959',
        color: '#1a0033',           // Very dark purple text for contrast
        border: 'none',
        borderRadius: '15px',
        '&:hover': {
            backgroundColor: '#d8f728',
            transform: 'translateY(-2px)',
        },
        '&:active': {
            backgroundColor: '#c3e408',
            transform: 'translateY(0) scale(0.98)',
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