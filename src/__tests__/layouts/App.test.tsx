import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import App from '../../App'

const history = createMemoryHistory({ initialEntries: ['/'] })

test('Renders page text', async () => {
    await waitFor(() => render(<Router history={history}><App /></Router>));
    screen.getAllByText(/Login/i);
});
