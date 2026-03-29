import React from 'react';
import { render } from '@testing-library/react-native';
import MainNavigator from '../src/screens/navigator/main-navigator';
import useAuth from '../src/hooks/use-auth';

jest.mock('@react-navigation/native-stack', () => {
    const React = require('react');
    return {
        createNativeStackNavigator: () => ({
            Navigator: ({ children }: any) => <>{children}</>,
            Screen: ({ component: Component }: any) => <Component />,
        }),
    };
});

jest.mock('@react-navigation/bottom-tabs', () => {
    const React = require('react');
    return {
        createBottomTabNavigator: () => ({
            Navigator: ({ children }: any) => <>{children}</>,
            Screen: ({ component: Component }: any) => <Component />,
        }),
    };
});

jest.mock('../src/screens/home-screen', () => {
    const { Text } = require('react-native');
    return { HomeScreen: () => <Text>Home</Text> };
});

jest.mock('../src/screens/profile-screen', () => {
    const { Text } = require('react-native');
    return { ProfileScreen: () => <Text>Profile</Text> };
});

jest.mock('../src/screens/signin-screen', () => {
    const { Text } = require('react-native');
    return { SignInScreen: () => <Text>SignIn</Text> };
});

jest.mock('../src/screens/product-details-screen', () => {
    const { Text } = require('react-native');
    return { ProductDetailsScreen: () => <Text>ProductDetails</Text> };
});

jest.mock('../src/hooks/use-auth');
const mockedUseAuth = useAuth as jest.Mock;

describe('MainNavigator', () => {
    const setupAuth = (token: string | null, isInitializing: boolean) => {
        mockedUseAuth.mockReturnValue({ token, isInitializing });
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows ActivityIndicator while initializing', () => {
        setupAuth(null, true);
        const { getByTestId } = render(<MainNavigator navigation={{}} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('renders SignIn when not authenticated', () => {
        setupAuth(null, false);
        const { getByText, queryByText } = render(<MainNavigator navigation={{}} />);

        expect(getByText('SignIn')).toBeTruthy();
        expect(queryByText('Home')).toBeNull();
    });

    it('renders MainTabs (Home/Profile) and ProductDetails when authenticated', () => {
        setupAuth('abc', false);
        const { getByText } = render(<MainNavigator navigation={{}} />);

        expect(getByText('Home')).toBeTruthy();
        expect(getByText('Profile')).toBeTruthy();
        expect(getByText('ProductDetails')).toBeTruthy();
    });
});
