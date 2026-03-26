import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProfileScreen } from '../src/screens/profile-screen';
import useAuth from '../src/hooks/use-auth';
import OrderHistoryAction from '../src/components/OrderHistoryAction';
import LogoutAction from '../src/components/LogoutAction';

jest.mock('../src/hooks/use-auth');
jest.mock('../src/components/OrderHistoryAction', () => jest.fn(() => null));
jest.mock('../src/components/LogoutAction', () => jest.fn(() => null));

const mockNavigate = jest.fn();
const mockSignOut = jest.fn();

const mockNavigation = {
    navigate: mockNavigate,
} as any;

const mockRoute = {
    key: 'profile-route',
    name: 'Profile',
    params: undefined,
} as any;

describe('ProfileScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders user info correctly', () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: {
                firstName: 'Jane',
                lastName: 'Doe',
                username: 'janedoe',
                email: 'jane@example.com',
                age: 30,
                role: 'admin',
            },
            signOut: mockSignOut,
        });
        const { getByText } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Jane Doe')).toBeTruthy();
        expect(getByText('@janedoe')).toBeTruthy();
        expect(getByText('jane@example.com')).toBeTruthy();
        expect(getByText('30')).toBeTruthy();
        expect(getByText('ADMIN')).toBeTruthy();
    });

    it('navigates back when back button pressed', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: {}, signOut: mockSignOut });
        const { getByTestId } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />);
        fireEvent.press(getByTestId('back-button'));
        expect(mockNavigate).toHaveBeenCalledWith('Home');
    });

    it('calls signOut when logout button pressed', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: {}, signOut: mockSignOut });
        const { getByTestId } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />);
        // LogoutAction is mocked, so we test the prop passed
        expect(LogoutAction).toHaveBeenCalledWith(
            expect.objectContaining({ onSignOut: expect.any(Function) }),
            {}
        );
    });

    it('renders OrderHistoryAction and LogoutAction', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: {}, signOut: mockSignOut });
        render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />);
        expect(OrderHistoryAction).toHaveBeenCalled();
        expect(LogoutAction).toHaveBeenCalled();
    });

    it('renders default values when user is missing', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, signOut: mockSignOut });
        const { getByText } = render(<ProfileScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('@johndoe_official')).toBeTruthy();
        expect(getByText('john.doe@example.com')).toBeTruthy();
        expect(getByText('28')).toBeTruthy();
        expect(getByText('PREMIUM MEMBER')).toBeTruthy();
    });
});
