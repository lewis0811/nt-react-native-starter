const palette = {
    cyan500: '#0DF2F2',
    cyan600: '#06C3B0',
    cyan400: '#00E6DA',
    cyan50: '#E6FEF9',
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
    red400: '#EF4444',
    red50: '#FEF2F2',
    redApple: '#FF3B30',
    amber400: '#FFB020',
    slateBlue200: '#CBD5E1',
} as const;

const colors = {
    brand: {
        primary: palette.cyan500,
        dark: palette.cyan600,
        deep: palette.cyan400,
        light: palette.cyan50,
        subtle: 'rgba(13, 242, 242, 0.10)',
        subtleBorder: 'rgba(13, 242, 242, 0.30)',
    },
    background: {
        page: palette.white,
        card: palette.gray50,
        surface: palette.gray100,
        input: palette.white,
        muted: palette.slate100,
        overlay: palette.offWhite,
        brandSubtle: palette.cyan50,
        errorSubtle: palette.red50,
    },
    text: {
        primary: palette.slate900,
        heading: palette.gray800,
        body: palette.gray700,
        secondary: palette.gray600,
        muted: palette.gray500,
        disabled: palette.gray400,
        inverted: palette.white,
        dark: palette.gray900,
        navy: palette.navy,
    },
    border: {
        default: palette.gray200,
        light: palette.gray100,
        input: palette.gray300,
        muted: palette.gray400,
    },
    feedback: {
        error: palette.red400,
        errorSubtle: palette.red50,
        danger: palette.redApple,
        star: palette.amber400,
        starEmpty: palette.slateBlue200,
    },
    shadow: palette.black,
} as const;

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

const radius = {
    sm: 4,
    md: 8,
    lg: 10,
    xl: 12,
    '2xl': 20,
    full: 9999,
} as const;

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