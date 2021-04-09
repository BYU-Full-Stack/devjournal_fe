// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import UserSettings from '../../pages/UserSettings'

const initialState = {
    userReducer: {
        username: 'go',
        token: '',
        email: 'go@go.gmail.com',
        created_date: 'today',
        user_id: ''
    }
};

test('Renders page text', () => {
    render(<UserSettings />, { initialState })
    const PageTitle = screen.getByText(/Account Settings/i);
    expect(PageTitle).toBeInTheDocument();
});

// test('Updates redux username', () => {
//     render(<UserSettings />, { initialState })

    // fireEvent.click(screen.getByText('Load Greeting'))

    // await waitFor(() => screen.getByRole('heading'))

    // expect(screen.getByRole('input')).toEqual('')
    // expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })

// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//         return res(ctx.json({ greeting: 'hello there' }))
//     })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())



// test('handles server error', async () => {
//     server.use(
//         rest.get('/greeting', (req, res, ctx) => {
//             return res(ctx.status(500))
//         })
//     )

//     render(<UserSettings/>)

//     fireEvent.click(screen.getByText('Load Greeting'))

//     await waitFor(() => screen.getByRole('alert'))

//     expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
//     expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
// })