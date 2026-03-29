import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogoutAction from '.';

describe('LogoutAction', () => {
    it('renders correctly and has correct testID', () => {
        const { getByTestId, getByText } = render(<LogoutAction onSignOut={jest.fn()} />);
        expect(getByTestId('logout-button')).toBeTruthy();
        expect(getByText('Logout')).toBeTruthy();
    });

    it('calls onSignOut when pressed', () => {
        const onSignOut = jest.fn();
        const { getByTestId } = render(<LogoutAction onSignOut={onSignOut} />);
        fireEvent.press(getByTestId('logout-button'));
        expect(onSignOut).toHaveBeenCalled();
    });

    it('renders icon image', () => {
        const { getAllByRole } = render(<LogoutAction onSignOut={jest.fn()} />);
        // There is 1 image: logout_icon
        expect(getAllByRole('image').length).toBe(1);
    });
});
