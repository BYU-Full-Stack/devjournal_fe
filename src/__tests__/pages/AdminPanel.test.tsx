import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import AllUsers from '../../pages/User/Index'

const server = setupServer(
    rest.delete('/api/:username/:userId', (req, res, ctx) => {
        return res((res) => {
            res.status = 200
            return res
        })
    }),
    rest.get('/api/user/all', (req, res, ctx) => {
        const numberOfUsers = 20;
        const users = Array.apply(null, Array(numberOfUsers))
            .map((_, i) => {
                return {
                    username: `user${i + 1}`,
                    email: `user${i + 1}@gmail.com`,
                    created_date: 'today',
                    user_id: i,
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
        token: '',
        email: 'admin@gmail.com',
        created_date: '01/01/01',
        user_id: ''
    }
};

test('Renders the page title', async () => {
    await waitFor(() => render(<AllUsers />, { initialState }));
    const PageTitle = screen.getByText(/Admin Panel/i);
    expect(PageTitle).toBeInTheDocument();
});
