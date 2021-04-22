import {rest} from "msw";
import {setupServer} from "msw/node";
import {
    render,
    fireEvent,
    waitFor,
    screen,
    getByText,
    act
} from "../TestUtils/RenderWithRedux";
import "@testing-library/jest-dom/extend-expect";
import Entry from "../../pages/Entry/Entry";
import userEvent from "@testing-library/user-event";

const mockFn = jest.fn();

const entryProps = {
    username: "user1",
    entry: {
        id: "string",
        journalId: "string",
        title: "Test Entry",
        markdown: "### Test Entry Title",
        html: "xxx",
        dateCreated: new Date(),
        lastUpdated: new Date(),
        idx: 0
    },
    setEntries: mockFn
};

const initialState = {
    userReducer: {
        username: "go",
        token: "hello world",
        email: "go@go.gmail.com",
        created_date: "today",
        user_id: ""
    }
};

const server = setupServer(
    rest.post("/login", (req, res, ctx) => {
        return res((res) => {
            res.status = 200;
            res.headers.set("Authorization", "token");
            return res;
        });
    })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders Entry Page", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    const PageTitle = screen.getByText(/Test Entry Title/);
    expect(PageTitle).toBeInTheDocument();
});

test("Renders Entry Markdown", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    await waitFor(() => userEvent.click(screen.getByText("Edit Entry")));
    setTimeout(() => {
        const Markdown = screen.getByText(/### Test Entry Title/);
        expect(Markdown).toBeInTheDocument();
    });
});
