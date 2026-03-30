// ─────────────────────────────────────────────────────────────────────────────
// Raw palette — single source of truth for all color values.
// Reference only through semantic tokens below; do not import palette directly.
// ─────────────────────────────────────────────────────────────────────────────
const palette = {
    // Brand — Teal / Cyan
    cyan500: '#0DF2F2',
    cyan600: '#06C3B0',
    cyan400: '#00E6DA',
    cyan50: '#E6FEF9',

    // Neutrals (Tailwind-aligned)
    black: '#000000',
    navy: '#000033',
    slate900: '#0F172A',
    gray900: '#111827',
    gray800: '#1F2937',
    gray700: '#374151',
    gray600: '#4B5563',
    gray500: '#6B7280',
    gray400: '#9CA3AF',
    gray300: '#D1D5DB',
    gray200: '#E5E7EB',
    gray100: '#F3F4F6',
    gray50: '#F9FAFB',
    slate100: '#F1F5F9',
    white: '#FFFFFF',
    offWhite: '#F5FCFF',

    // Status / Semantic
    red400: '#EF4444',
    red50: '#FEF2F2',
    redApple: '#FF3B30',
    amber400: '#FFB020',
    slateBlue200: '#CBD5E1',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Semantic color tokens
// ─────────────────────────────────────────────────────────────────────────────
const colors = {
    /** Brand accents */
    brand: {
        primary: palette.cyan500,   // #0DF2F2 — buttons, links, active states
        dark: palette.cyan600,   // #06C3B0 — darker accent
        deep: palette.cyan400,   // #00E6DA — buy/add CTAs
        light: palette.cyan50,    // #E6FEF9 — icon backgrounds
        subtle: 'rgba(13, 242, 242, 0.10)',  // badge backgrounds
        subtleBorder: 'rgba(13, 242, 242, 0.30)',  // outline button borders
    },

    /** Surface / background hierarchy */
    background: {
        page: palette.gray50,    // #F9FAFB — screen background
        card: palette.white,     // #FFFFFF — card, modal surfaces
        surface: palette.gray100,   // #F3F4F6 — tab bars, chips, dividers
        input: palette.white,     // #FFFFFF — text input fill
        muted: palette.slate100,  // #F1F5F9 — icon wrappers, secondary surfaces
        overlay: palette.offWhite,  // #F5FCFF — image-background overlay
        brandSubtle: palette.cyan50,    // #E6FEF9 — feature icon backgrounds
        errorSubtle: palette.red50,     // #FEF2F2 — logout/danger icon backgrounds
    },

    /** Text hierarchy */
    text: {
        primary: palette.slate900,  // #0F172A — headers, nav icons
        heading: palette.gray800,   // #1F2937 — section headings
        body: palette.gray700,   // #374151 — body copy, labels
        secondary: palette.gray600,   // #4B5563 — secondary labels
        muted: palette.gray500,   // #6B7280 — placeholders, hints
        disabled: palette.gray400,   // #9CA3AF — disabled / de-emphasised
        inverted: palette.white,     // #FFFFFF — text on dark backgrounds
        dark: palette.gray900,   // #111827 — maximum contrast text
        navy: palette.navy,      // #000033 — buy-button label
    },

    /** Borders & dividers */
    border: {
        default: palette.gray200,   // #E5E7EB — card borders, dividers
        light: palette.gray100,   // #F3F4F6 — subtle hairlines
        input: palette.gray300,   // #D1D5DB — input field borders
        muted: palette.gray400,   // #9CA3AF — chevron / inactive icons
    },

    /** Feedback states */
    feedback: {
        error: palette.red400,        // #EF4444 — error / logout
        errorSubtle: palette.red50,         // #FEF2F2 — error surface
        danger: palette.redApple,      // #FF3B30 — favourite active
        star: palette.amber400,      // #FFB020 — filled star
        starEmpty: palette.slateBlue200,  // #CBD5E1 — empty star
    },

    /** Drop-shadow base */
    shadow: palette.black,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography scale
// ─────────────────────────────────────────────────────────────────────────────
const typography = {
    size: {
        xs: 12,
        sm: 13,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 22,
        '3xl': 24,
    },
    weight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },
    lineHeight: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 28,
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing scale (multiples of 4)
// ─────────────────────────────────────────────────────────────────────────────
const spacing = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    16: 64,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Border-radius scale
// ─────────────────────────────────────────────────────────────────────────────
const radius = {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
    '2xl': 20,
    full: 9999,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Elevation / shadow presets (React Native)
// ─────────────────────────────────────────────────────────────────────────────
const shadow = {
    xs: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sm: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    md: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        elevation: 2,
    },
    lg: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    xl: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
        elevation: 10,
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Exported theme
// ─────────────────────────────────────────────────────────────────────────────
export const theme = {
    colors,
    typography,
    spacing,
    radius,
    shadow,
    palette,
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof colors;
