export interface PatternMatch {
    inputType: 'time' | 'date' | 'number' | 'text';
    description: string;
}

const PATTERN_REGISTRY: Record<string, PatternMatch> = {
    '^[0-9][0-9]:[0-9][0-9]$': {
        inputType: 'time',
        description: 'HH:MM time format'
    },
    '^[0-9][0-9].[0-9][0-9]$': {
        inputType: 'time',
        description: 'HH.MM time format'
    },
    '^[0-9]{2}:[0-9]{2}$': {
        inputType: 'time',
        description: 'HH:MM time format'
    },
    '^[0-9]{2}.[0-9]{2}$': {
        inputType: 'time',
        description: 'HH.MM time format'
    },
    '^[0-9]{2}/[0-9]{2}/[0-9]{4}$': {
        inputType: 'date',
        description: 'DD/MM/YYYY date format'
    },
    '^[0-9]{2}-[0-9]{2}-[0-9]{4}$': {
        inputType: 'date',
        description: 'DD-MM-YYYY date format'
    }
}

export function detectPatternType(pattern: string): PatternMatch {
    if (pattern === '') return { inputType: 'text', description: 'No pattern' };
    return PATTERN_REGISTRY[pattern] ?? { inputType: 'text', description: 'Unknown pattern' };
}