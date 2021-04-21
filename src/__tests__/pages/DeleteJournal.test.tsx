import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import DeleteJournal from '../../pages/Journal/DeleteJournal';

const server = setupServer(
    rest.delete('/api/:username/journal/:journalId', (req, res, ctx) => {
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
    await waitFor(() => render(<DeleteJournal username={props.username} journal={props.journal} setJournals={props.setJournals} />, { initialState }));
    const PageTitle = screen.getByText(/Are You Sure You Want to Delete Your/i);
    expect(PageTitle).toBeInTheDocument();
});

test('Delete journal', async () => {
    await waitFor(() => render(<DeleteJournal username={props.username} journal={props.journal} setJournals={props.setJournals} />, { initialState }));

    // perform api save of changes
    await waitFor(() => fireEvent.click(screen.getByTestId('journal-delete-btn')));
});
