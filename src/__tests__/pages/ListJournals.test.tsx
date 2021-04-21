import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import ListJournals from '../../pages/Journal/ListJournals';
import Journal from '../../pages/Journal/Journal';

const numberOfJournals = 10;
const server = setupServer(
    rest.get('/api/:username/journal', (req, res, ctx) => {
        const journals = Array.apply(null, Array(numberOfJournals))
            .map((_, i) => {
                return {
                    id: i,
                    name: `journal${i + 1}`,
                    color: "blue",
                    dateCreated: new Date(),
                    lastUpdated: new Date(),
                    user_id: `user${i}`
                }
            })
        return res(
            ctx.json(journals),
        )
    }),
    // rest.get('/api/:username/:journalId/entries', (req, res, ctx) => {
    //     const entries
    // })
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

const props = {
    username: 'user1',
    journals: [
        {
            name: "Test Journal",
            color: "blue",
        },
        {
            name: "Test Journal 2",
            color: "red",
        },
    ],
    setJournals: () => {},
}


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders the page title', async () => {
    await waitFor(() => {
        act(() => {
            render(<ListJournals username={props.username} journals={props.journals} setJournals={props.setJournals}  />, { initialState })
        })
    });

    await waitFor(() => {
        const PageTitle = screen.getByText(/Journals/i);
        expect(PageTitle).toBeInTheDocument();
    })
});