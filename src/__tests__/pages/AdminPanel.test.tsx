import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen, fireEvent } from '../TestUtils/RenderWithRedux'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import AdminPanel from '../../pages/AdminPanel'

const numberOfUsers = 20;
const server = setupServer(
    rest.delete('/api/:username/:userId', (req, res, ctx) => {
        return res((res) => {
            res.status = 200
            return res
        })
    }),
    rest.get('/api/user/all', (req, res, ctx) => {
        const users = Array.apply(null, Array(numberOfUsers))
            .map((_, i) => {
                return {
                    username: `user${i + 1}`,
                    email: `user${i + 1}@gmail.com`,
                    created_date: 'today',
                    user_id: i,
                    role: 'USER',
                    password: `password`,
                }
            })
        return res(
            ctx.json(users),
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const initialState = {
    userReducer: {
        username: 'admin',
        token: 'token',
        email: 'admin@gmail.com',
        created_date: '01/01/01',
        user_id: ''
    },
    alertReducer: []
};

test('Renders the page title', async () => {
    await waitFor(() => {
        act(() => {
            render(<AdminPanel />, { initialState })
        })
    });

    await waitFor(() => {
        const PageTitle = screen.getByText(/Admin Panel/i);
        expect(PageTitle).toBeInTheDocument();
    })
});

test('Renders all users', async () => {
    await waitFor(() => {
        act(() => {
            render(<AdminPanel />, { initialState })
        })
    });

    let userList;
    // The getUsers api request needs to complete before user rows exist
    await waitFor(() => {
        act(() => {
            userList = screen.getAllByTestId(/user-row/i);
        })
        expect(userList.length).toBe(numberOfUsers);
    });

    await waitFor(() => {
        act(() => {
            fireEvent.click(screen.getByTestId(/^4-user-delete-icon$/))
        });
        expect(screen.getAllByTestId(/user-row/i).length).toBe(numberOfUsers - 1);
    })
});
