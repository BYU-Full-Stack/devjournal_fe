import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import UserSettings from '../../pages/UserSettings'

const updateTextInput = (field: string, value: string) => {
    // @ts-ignore
    const saveBtn: HTMLButtonElement = screen.getByTestId(/user-settings-save-btn/i);

    // change from updating the username to viewing the user's email
    fireEvent.click(screen.getByTestId(new RegExp(`${field}-field-to-update`, 'i')));

    // make the editable text editable
    fireEvent.click(screen.getByTestId(/toggle-custom-input/i));

    // make sure the save btn is disabled
    expect(saveBtn.disabled).toBe(true)

    // update the user's email 
    // @ts-ignore
    const customInput: HTMLInputElement = screen.getByTestId(/^custom-input$/i);
    fireEvent.change(customInput, { target: { value } });

    // ensure the input change happened
    expect(customInput.value).toEqual(value)

    // confirm chanes & close the input 
    fireEvent.click(screen.getByTestId(/toggle-custom-input/i));

    // make sure the save btn is enabled again
    expect(saveBtn.disabled).toBe(false)
};

const server = setupServer(
    rest.post('/login', (req, res, ctx) => {
        return res((res) => {
            res.status = 200
            res.headers.set('Authorization', 'token')
            return res
        })
    }),
    rest.get('/:username', (req, res, ctx) => {
        console.log('username', req.params)
        return res(
            ctx.json({
                title: 'Lord of the Rings',
                author: 'J. R. R. Tolkien',
            }),
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const initialState = {
    userReducer: {
        username: 'go',
        token: '',
        email: 'go@go.gmail.com',
        created_date: 'today',
        user_id: ''
    }
};

test('Renders page text', async () => {
    await waitFor(() => render(<UserSettings />, { initialState }));
    const PageTitle = screen.getByText(/Account Settings/i);
    expect(PageTitle).toBeInTheDocument();
});

test('Use the custom input to update the email', async () => {
    await waitFor(() => render(<UserSettings />, { initialState }));
    updateTextInput('email', 'newemail@gmail.com');
});

test('Use the custom input to update the username', async () => {
    await waitFor(() => render(<UserSettings />, { initialState }));
    updateTextInput('username', 'adminuser');
});