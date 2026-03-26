import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: () => {
        const React = require('react');
        const Navigator = ({ children }: any) => React.createElement(React.Fragment, null, children);
        const Screen = ({ component: Component, ...props }: any) => React.createElement(Component, props);
        return { Navigator, Screen };
    },
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: () => {
        const React = require('react');
        const Navigator = ({ children }: any) => React.createElement(React.Fragment, null, children);
        const Screen = ({ component: Component, ...props }: any) => React.createElement(Component, props);
        return { Navigator, Screen };
    },
}));

jest.mock('../src/screens/home-screen', () => {
    const React = require('react');
    const RN = require('react-native');
    return { HomeScreen: () => React.createElement(RN.Text, null, 'Home') };
});
jest.mock('../src/screens/profile-screen', () => {
    const React = require('react');
    const RN = require('react-native');
    return { ProfileScreen: () => React.createElement(RN.Text, null, 'Profile') };
});
jest.mock('../src/screens/signin-screen', () => {
    const React = require('react');
    const RN = require('react-native');
    return { SignInScreen: () => React.createElement(RN.Text, null, 'SignIn') };
});
jest.mock('../src/screens/product-details-screen', () => {
    const React = require('react');
    const RN = require('react-native');
    return { ProductDetailsScreen: () => React.createElement(RN.Text, null, 'ProductDetails') };
});

jest.mock('../src/hooks/use-auth');

import MainNavigator from '../src/screens/navigator/main-navigator';
import useAuth from '../src/hooks/use-auth';

describe('MainNavigator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows ActivityIndicator while initializing', () => {
        (useAuth as jest.Mock).mockReturnValue({ token: null, isInitializing: true });
        const { UNSAFE_getByType } = render(<MainNavigator navigation={{}} />);
        const { ActivityIndicator } = require('react-native');
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('renders SignIn when not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ token: null, isInitializing: false });
        const { getByText } = render(<MainNavigator navigation={{}} />);
        expect(getByText('SignIn')).toBeTruthy();
    });

    it('renders MainTabs (Home/Profile) and ProductDetails when authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ token: 'abc', isInitializing: false });
        const { getByText, queryByText } = render(<MainNavigator navigation={{}} />);
        expect(getByText('Home')).toBeTruthy();
        expect(getByText('Profile')).toBeTruthy();
        expect(getByText('ProductDetails')).toBeTruthy();
        expect(queryByText('SignIn')).toBeNull();
    });
});
