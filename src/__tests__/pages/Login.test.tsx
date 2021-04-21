import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import Login from '../../pages/Login'

const testLogin = async (username: string, password: string) => {
    // @ts-ignore
    const userInput: HTMLInputElement = screen.getByTestId(/username/i)

    fireEvent.change(userInput, { target: { value: username } })
    // @ts-ignore
    const passwordInput: HTMLInputElement = screen.getByTestId(/password/i)

    fireEvent.change(passwordInput, { target: { value: password } })

    expect(userInput.value).toEqual(username)
    expect(passwordInput.value).toEqual(password)

    await waitFor(() => fireEvent.click(screen.getByTestId('user-login-btn')))
}

// const server = setupServer(
//     rest.post('/login', (req, res, ctx) => {
//         return res((res) => {
//             res.status = 200
//             res.headers.set('Authorization', 'token')
//             return res
//         })
//     })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

const initialState = {
    userReducer: {
        username: 'go',
        token: '',
        email: 'go@go.gmail.com',
        created_date: 'today',
        user_id: ''
    }
};

test('Renders Login Page', async () => {
    await waitFor(() => render(<Login />, { initialState }));
    const PageTitle = screen.getByTestId(/login-header/i);
    expect(PageTitle).toBeInTheDocument();
})

test('Enter username and password to login', async () => {
    await waitFor(() => render(<Login />, { initialState }));
    await waitFor(() => testLogin('user1', 'passuser1'));
})