import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import Register from '../../pages/Register'

const testRegister = async (username: string, password: string, email: string) => {
    
    // @ts-ignore
    const userInput: HTMLInputElement = screen.getByTestId(/username/i)
    fireEvent.change(userInput, { target: { value: username } })

    // @ts-ignore
    const passwordInput: HTMLInputElement = screen.getByTestId(/password/i)
    fireEvent.change(passwordInput, { target: { value: password } })

    // @ts-ignore
    const emailInput: HTMLInputElement = screen.getByTestId(/email/i)
    fireEvent.change(emailInput, { target: { value: email } })

    expect(userInput.value).toEqual(username)
    expect(passwordInput.value).toEqual(password)
    expect(passwordInput.value).toEqual(password)
    


    await waitFor(() => fireEvent.click(screen.getByTestId('user-register-btn')))
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

test('Renders Register Page', async () => {
    await waitFor(() => render(<Register />, { initialState }));
    const PageTitle = screen.getByTestId(/register-header/i);
    expect(PageTitle).toBeInTheDocument();
})

test('Enter username, email, password to sign up', async () => {
    await waitFor(() => render(<Register />, { initialState }));
    await waitFor(() => testRegister('test', 'test-pass', 'test-email@mail.com'));
})