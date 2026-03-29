import React from 'react';
import { render } from '@testing-library/react-native';
import OrderHistoryAction from '.';

describe('OrderHistoryAction', () => {
    it('renders correctly and has correct testID', () => {
        const { getByTestId, getByText } = render(<OrderHistoryAction />);
        expect(getByTestId('order-history-button')).toBeTruthy();
        expect(getByText('Order History')).toBeTruthy();
    });

    it('renders icon images', () => {
        const { getAllByRole } = render(<OrderHistoryAction />);
        // There are 2 images: lock_icon and chevron_icon
        expect(getAllByRole('image').length).toBe(2);
    });
});
