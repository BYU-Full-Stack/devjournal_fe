import { render, waitFor, screen } from '../TestUtils/RenderWithRedux'
import '@testing-library/jest-dom/extend-expect';
import Error from '../../pages/Error'

test('Renders page text', async () => {
    await waitFor(() => render(<Error />, {}));
    const errtext = screen.getByTestId('error-test-id');
    expect(errtext).toBeInTheDocument();
});