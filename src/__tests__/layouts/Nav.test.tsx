
import { render, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import Nav from '../../layouts/Nav'

const initialState = {
    userReducer: {
        username: 'go',
        token: '',
        email: 'go@go.gmail.com',
        created_date: 'today',
        user_id: '',
        role: 'USER'
    }
};

const expectHTML = (html: (HTMLElement | null)[], isInDOM = true) => {
    html.forEach(el => {
        if (isInDOM) {
            expect(el).toBeInTheDocument();
        } else {
            expect(el).not.toBeInTheDocument();
        }
    });
};


test('Renders only login and register when logged out', async () => {
    await waitFor(() => render(<Nav />, { initialState }));
    const nonExistentHtml = [
        screen.queryByText(/Journals/i),
        screen.queryByText(/Account Settings/i),
    ];
    expectHTML(nonExistentHtml, false);
});

test('Doesn\'t render the Admin Panel option for non-ADMIN role', async () => {
    initialState.userReducer.token = 'aadkdlsfasdf';
    await waitFor(() => render(<Nav />, { initialState }));

    // the following html should NOT exist in the nav
    const AdminOption = screen.queryByText(/Admin Panel/i);
    expectHTML([AdminOption], false);

    // the following html should exist in the nav
    const html = [
        screen.getByText(/Journals/i),
        screen.getByText(/Account Settings/i),
    ];
    expectHTML(html);
});

test('Renders the Admin Panel option for ADMIN role', async () => {
    initialState.userReducer.role = 'ADMIN';
    initialState.userReducer.token = 'aadkdlsfasdf';

    await waitFor(() => render(<Nav />, { initialState }));

    // the following html should exist in the nav
    const html = [
        screen.getByText(/Journals/i),
        screen.getByText(/Account Settings/i),
        screen.getByText(/Admin Panel/i)
    ];
    expectHTML(html);
});