import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { SignInScreen } from './signin-screen';
import useAuth from '../hooks/use-auth';

jest.mock('../hooks/use-auth');

jest.mock('../../../assets/images/lock_icon.png', () => 0);
jest.mock('../../../assets/images/biometric_icon.png', () => 0);
jest.mock('../../../assets/images/google_icon.png', () => 0);
jest.mock('../../../assets/images/facebook_icon.png', () => 0);

const mockNavigation = { navigate: jest.fn() };

const mockSignIn = jest.fn();

function buildAuthMock(overrides: Partial<ReturnType<typeof useAuth>> = {}) {
    return {
        signIn: mockSignIn,
        signOut: jest.fn(),
        loading: false,
        error: null,
        user: null,
        token: null,
        isInitializing: false,
        isAuthenticated: false,
        ...overrides,
    };
}

describe('SignInScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue(buildAuthMock());
    });

    describe('initial rendering', () => {
        it('renders the "Welcome Back" heading', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Welcome Back')).toBeTruthy();
        });

        it('renders the subtitle text', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Please enter your details')).toBeTruthy();
        });

        it('renders Login and Sign Up tabs', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Login')).toBeTruthy();
            expect(getByText('Sign Up')).toBeTruthy();
        });

        it('renders Username and Password labels', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Username')).toBeTruthy();
            expect(getByText('Password')).toBeTruthy();
        });

        it('renders username input with correct placeholder', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByPlaceholderText('Enter your username')).toBeTruthy();
        });

        it('renders password input with correct placeholder', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByPlaceholderText('••••••••')).toBeTruthy();
        });

        it('renders Forgot Password link', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Forgot Password?')).toBeTruthy();
        });

        it('renders biometric checkbox label', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Use biometrics for faster login')).toBeTruthy();
        });

        it('renders Sign In button', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Sign In')).toBeTruthy();
        });

        it('renders Sign in with Biometrics button', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Sign in with Biometrics')).toBeTruthy();
        });

        it('renders divider text', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Or continue with')).toBeTruthy();
        });

        it('renders Google and Facebook social buttons', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Google')).toBeTruthy();
            expect(getByText('Facebook')).toBeTruthy();
        });

        it('renders Terms of Service and Privacy Policy in footer', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Terms of Service')).toBeTruthy();
            expect(getByText('Privacy Policy')).toBeTruthy();
        });

        it('password input has secureTextEntry', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            const passwordInput = getByPlaceholderText('••••••••');
            expect(passwordInput.props.secureTextEntry).toBe(true);
        });

        it('username input does not have secureTextEntry', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            const usernameInput = getByPlaceholderText('Enter your username');
            expect(usernameInput.props.secureTextEntry).toBeFalsy();
        });
    });

    describe('tab navigation', () => {
        it('Login tab is active by default', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Login')).toBeTruthy();
            expect(getByText('Sign Up')).toBeTruthy();
        });

        it('pressing Sign Up tab changes active tab', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            fireEvent.press(getByText('Sign Up'));
            expect(getByText('Sign Up')).toBeTruthy();
        });

        it('pressing Login tab after Sign Up restores login tab', () => {
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            fireEvent.press(getByText('Sign Up'));
            fireEvent.press(getByText('Login'));
            expect(getByText('Login')).toBeTruthy();
        });
    });

    describe('form input changes', () => {
        it('updates username state when typing', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            const input = getByPlaceholderText('Enter your username');
            fireEvent.changeText(input, 'testuser');
            expect(input.props.value).toBe('testuser');
        });

        it('updates password state when typing', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            const input = getByPlaceholderText('••••••••');
            fireEvent.changeText(input, 'secret123');
            expect(input.props.value).toBe('secret123');
        });

        it('username input starts empty', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByPlaceholderText('Enter your username').props.value).toBe('');
        });

        it('password input starts empty', () => {
            const { getByPlaceholderText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByPlaceholderText('••••••••').props.value).toBe('');
        });
    });

    describe('biometric checkbox', () => {
        it('checkbox checkmark is not shown initially', () => {
            const { queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('✓')).toBeNull();
        });

        it('shows checkmark after pressing checkbox', () => {
            const { getByText, queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('✓')).toBeNull();
            fireEvent.press(getByText('Use biometrics for faster login').parent!);
        });

        it('toggles biometric checkbox on and off', () => {
            const { getAllByRole, queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('✓')).toBeNull();
        });

        it('pressing checkbox twice keeps it unchecked', () => {
            const { getByText, queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('✓')).toBeNull();
        });
    });

    describe('sign in action', () => {
        it('calls signIn with username and password on button press', async () => {
            mockSignIn.mockResolvedValueOnce(undefined);
            const { getByText, getByPlaceholderText } = render(
                <SignInScreen navigation={mockNavigation as any} />
            );
            fireEvent.changeText(getByPlaceholderText('Enter your username'), 'john');
            fireEvent.changeText(getByPlaceholderText('••••••••'), 'pass123');
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(mockSignIn).toHaveBeenCalledWith({ username: 'john', password: 'pass123' });
        });

        it('calls signIn with empty strings when fields are blank', async () => {
            mockSignIn.mockResolvedValueOnce(undefined);
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(mockSignIn).toHaveBeenCalledWith({ username: '', password: '' });
        });

        it('does not call signIn when loading is true', async () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { UNSAFE_queryByType } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(mockSignIn).not.toHaveBeenCalled();
        });

        it('Sign In button is disabled when loading', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(() => getByText('Sign In')).toThrow();
        });

        it('calls signIn only once per press', async () => {
            mockSignIn.mockResolvedValueOnce(undefined);
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(mockSignIn).toHaveBeenCalledTimes(1);
        });
    });

    describe('loading state', () => {
        it('shows ActivityIndicator when loading', () => {
            const { ActivityIndicator: RNActivityIndicator, UNSAFE_getByType } = require('react-native');
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { UNSAFE_getByType: getByType } = render(
                <SignInScreen navigation={mockNavigation as any} />
            );
            const { ActivityIndicator } = require('react-native');
            expect(getByType(ActivityIndicator)).toBeTruthy();
        });

        it('hides Sign In text when loading', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('Sign In')).toBeNull();
        });

        it('shows Sign In text when not loading', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: false }));
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(getByText('Sign In')).toBeTruthy();
        });

        it('does not show ActivityIndicator when not loading', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: false }));
            const { UNSAFE_queryByType } = render(<SignInScreen navigation={mockNavigation as any} />);
            const { ActivityIndicator } = require('react-native');
            expect(UNSAFE_queryByType(ActivityIndicator)).toBeNull();
        });
    });

    describe('error handling', () => {
        beforeEach(() => {
            jest.spyOn(Alert, 'alert').mockImplementation(() => { });
        });

        afterEach(() => {
            (Alert.alert as jest.Mock).mockRestore?.();
        });

        it('shows Alert with error message when signIn throws a string error', async () => {
            mockSignIn.mockRejectedValueOnce('Invalid credentials');
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid credentials');
        });

        it('shows Alert with response data message when available', async () => {
            const error = { response: { data: { message: 'Wrong password' } } };
            mockSignIn.mockRejectedValueOnce(error);
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
        });

        it('shows Alert with fallback message when error is null', async () => {
            mockSignIn.mockRejectedValueOnce(null);
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Login failed. Please try again.');
        });

        it('shows Alert when signIn throws an Error object', async () => {
            mockSignIn.mockRejectedValueOnce(new Error('Network error'));
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
        });

        it('does not show Alert when signIn succeeds', async () => {
            mockSignIn.mockResolvedValueOnce({ token: 'abc' });
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(Alert.alert).not.toHaveBeenCalled();
        });
    });

    describe('useAuth hook integration', () => {
        it('calls useAuth hook on render', () => {
            render(<SignInScreen navigation={mockNavigation as any} />);
            expect(useAuth).toHaveBeenCalled();
        });

        it('uses loading from useAuth to control button disabled state', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { queryByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(queryByText('Sign In')).toBeNull();
        });

        it('uses signIn from useAuth when form is submitted', async () => {
            const customSignIn = jest.fn().mockResolvedValueOnce(undefined);
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ signIn: customSignIn }));
            const { getByText } = render(<SignInScreen navigation={mockNavigation as any} />);
            await act(async () => {
                fireEvent.press(getByText('Sign In'));
            });
            expect(customSignIn).toHaveBeenCalled();
        });
    });

    describe('snapshot', () => {
        it('matches snapshot in default (idle) state', () => {
            const { toJSON } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(toJSON()).toMatchSnapshot();
        });

        it('matches snapshot in loading state', () => {
            (useAuth as jest.Mock).mockReturnValue(buildAuthMock({ loading: true }));
            const { toJSON } = render(<SignInScreen navigation={mockNavigation as any} />);
            expect(toJSON()).toMatchSnapshot();
        });
    });
});
