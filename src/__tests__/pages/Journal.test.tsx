import { render, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Journal from '../../pages/Journal/Journal';

const initialState = {
    userReducer: {
        username: 'user1',
        token: 'token',
        email: 'admin@gmail.com',
        created_date: '01/01/01',
        user_id: ''
    },
    alertReducer: [],
};

test('Check for Loading', async () => {
    await waitFor(() => render(<Journal/>, { initialState }));
    const Loading = screen.getByTestId('loading-test-id');
    expect(Loading).toBeInTheDocument();
});