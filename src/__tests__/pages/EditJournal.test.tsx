import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import EditJournal from '../../pages/Journal/EditJournal';

const server = setupServer(
    rest.put('/api/:username/journal', (req, res, ctx) => {
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
    alertReducer: [],
};

const props = {
    username: 'user1',
    journal: {
        name: "Test Journal",
        color: "blue",
    },
    setJournals: () => {},
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders page text', async () => {
    await waitFor(() => render(<EditJournal username={props.username} journal={props.journal} setJournals={props.setJournals} />, { initialState }));
    const PageTitle = screen.getByText(/Editing.*Journal/i);
    expect(PageTitle).toBeInTheDocument();
});

