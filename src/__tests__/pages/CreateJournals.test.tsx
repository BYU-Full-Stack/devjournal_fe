import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import CreateJournal from '../../pages/Journal/CreateJournal';

const server = setupServer(
    rest.post('/api/:username/journal', (req, res, ctx) => {
        const { name, color } = req.params || {};
        return res((res) => {
            res.status = 200
            return res
        })
    })
)

const initialState = {
    userReducer: {
        username: 'user1',
        token: 'token',
        email: 'admin@gmail.com',
        created_date: '01/01/01',
        user_id: ''
    },
    alertReducer: []
};


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders page text', async () => {
    await waitFor(() => render(<CreateJournal />, { initialState }));
    const PageTitle = screen.getByText(/Create a New Journal/i);
    expect(PageTitle).toBeInTheDocument();
});