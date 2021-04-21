import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import CreateJournal from '../../pages/Journal/CreateJournal';

const updateTextInput = async (field: string, value: string) => {
    // @ts-ignore
    const saveBtn: HTMLButtonElement = screen.getByTestId(/journal-create-save-btn/i);

    // make the display text editable
    fireEvent.click(screen.getByTestId(new RegExp(`${field}-icon-toggle-test-id`, 'i')));

    // make sure the save btn is disabled
    expect(saveBtn.disabled).toBe(true)

    // update the user's data
    // @ts-ignore
    const customInput: HTMLInputElement = screen.getByTestId(new RegExp(`^${field}-input-test-id$`, 'i'));
    fireEvent.change(customInput, { target: { value } });

    // ensure the input change happened
    expect(customInput.value).toEqual(value)

    // confirm changes & close the input
    fireEvent.click(screen.getByTestId(new RegExp(`${field}-icon-toggle-test-id`, 'i')));

    // make sure the save btn is enabled again
    expect(saveBtn.disabled).toBe(false)
};

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

test('Use the custom input to create new journal', async () => {
    await waitFor(() => render(<CreateJournal/>, { initialState }));

    await waitFor(() => updateTextInput('name', 'New Journal Name'));
    await waitFor(() => updateTextInput('color', 'blue'));

    // perform api save of changes
    await waitFor(() => fireEvent.click(screen.getByTestId('journal-create-save-btn')));
});
