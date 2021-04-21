import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
  act,
} from '../TestUtils/RenderWithRedux';
import '@testing-library/jest-dom/extend-expect';
import Entry from '../../pages/Entry/Entry';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

const entryProps = {
  username: 'user1',
  entry: {
    id: 'string',
    journalId: 'string',
    title: 'Test Journal',
    markdown: '### Test Journal Title',
    html: 'xxx',
    dateCreated: new Date(),
    lastUpdated: new Date(),
    idx: 0,
  },
  setEntries: mockFn,
};

const initialState = {
  userReducer: {
    username: 'go',
    token: '',
    email: 'go@go.gmail.com',
    created_date: 'today',
    user_id: '',
  },
};

const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    return res((res) => {
      res.status = 200;
      res.headers.set('Authorization', 'token');
      return res;
    });
  }),
  rest.get('/api/:username', (req, res, ctx) => {
    return res(
      ctx.json({
        email: 'go@go.gmail.com',
        created_date: 'today',
        user_id: '',
        password: '',
      })
    );
  }),
  rest.put('/api/:username/:field', (req, res, ctx) => {
    const { username, field } = req.params || {};
    return res((res) => {
      res.status = 200;
      return res;
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Renders Entry Page', async () => {
  await waitFor(() => render(<Entry {...entryProps} />, { initialState }));
  const PageTitle = screen.getByText(/Test Journal Title/);
  expect(PageTitle).toBeInTheDocument();
});

test('Renders Entry Markdown', async () => {
  await waitFor(() => render(<Entry {...entryProps} />, { initialState }));
  await waitFor(() => userEvent.click(screen.getByText('Edit Entry')));
  setTimeout(() => {
    const Markdown = screen.getByText(/### Test Journal Title/);
    expect(Markdown).toBeInTheDocument();
  }, 500);
});

test('Edits Entry Markdown', async () => {
  await waitFor(() => render(<Entry {...entryProps} />, { initialState }));
  await waitFor(() => {
    userEvent.click(screen.getByText('Edit Entry'));
  });
  setTimeout(() => {
    userEvent.type(
      screen.getByTestId('monaco-editor'),
      '{selectall} {del} ### New Text'
    );
    expect(screen.getByTestId('monaco-editor')).toHaveValue('### New Text');
    expect(mockFn).toBeCalledTimes(1);
  }, 500);
});

test('Edits Entry Title', async () => {
  await waitFor(() => render(<Entry {...entryProps} />, { initialState }));
  await waitFor(() => userEvent.click(screen.getByText('Edit Entry')));
  setTimeout(() => {
    userEvent.click(screen.getByTestId('title-button'));
    userEvent.type(
      screen.getByTestId('title-input'),
      '{selectall} {del} New Journal Title'
    );
    act(() => {
      userEvent.click(screen.getByTestId('title-button'));
    });
    expect(screen.getByTestId('title-input')).toHaveValue('New Journal Title');
  }, 500);
});
