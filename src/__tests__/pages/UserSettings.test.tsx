import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import UserSettings from '../../pages/UserSettings'

const updateTextInput = async (field: string, value: string) => {
    // @ts-ignore
    const saveBtn: HTMLButtonElement = screen.getByTestId(/user-settings-save-btn/i);

    // change to updating the desired field (email, username, or password)
    fireEvent.click(screen.getByTestId(new RegExp(`${field}-field-to-update`, 'i')));

    // make the display text editable
    fireEvent.click(screen.getByTestId(/toggle-custom-input/i));

    // make sure the save btn is disabled
    expect(saveBtn.disabled).toBe(true)

    // update the user's data 
    // @ts-ignore
    const customInput: HTMLInputElement = screen.getByTestId(/^custom-input$/i);
    fireEvent.change(customInput, { target: { value } });

    // ensure the input change happened
    expect(customInput.value).toEqual(value)

    // confirm changes & close the input 
    fireEvent.click(screen.getByTestId(/toggle-custom-input/i));

    // make sure the save btn is enabled again
    expect(saveBtn.disabled).toBe(false)

    // perform api save of changes
    await waitFor(() => fireEvent.click(screen.getByTestId('user-settings-save-btn')));
};

const server = setupServer(
    rest.post('/login', (req, res, ctx) => {
        return res((res) => {
            res.status = 200
            res.headers.set('Authorization', 'token')
            return res
        })
    }),
    rest.get('/api/:username', (req, res, ctx) => {
        return res(
            ctx.json({
                email: 'go@go.gmail.com',
                created_date: 'today',
                user_id: '',
                password: '',
            }),
        )
    }),
    rest.put('/api/:username/:field', (req, res, ctx) => {
        const { username, field } = req.params || {};
        return res((res) => {
            res.status = 200
            return res
        })
    }
    )
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
    await waitFor(() => updateTextInput('email', 'newemail@gmail.com'));
});

test('Use the custom input to update the username', async () => {
    await waitFor(() => render(<UserSettings />, { initialState }));
    await waitFor(() => updateTextInput('username', 'adminuser'));
});

test('Use the custom input to update the password', async () => {
    await waitFor(() => render(<UserSettings />, { initialState }));
    await waitFor(() => updateTextInput('password', 'new-password'));
});