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
import Journal from "../../pages/Journal/Journal";

const mockFn = jest.fn();

const entryProps = {
    username: "user1",
    entry: {
        id: "string",
        journalId: "string",
        title: "Test Journal",
        markdown: "### Test Journal Title",
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
    }),
    rest.get("/api/journals", (req, res, ctx) => {
        let now = Date.now();
        const journals = Array.apply(null, Array(5)).map((_, i) => {
            return {
                id: `journal-id${i + 1}`,
                name: `journal-name${i + 1}`,
                color: "blue",
                dateCreated: now,
                lastUpdated: now,
                idx: `journal-idx${i + 1}`,
                numEntries: 5
            };
        });
        return res(ctx.json(journals));
    }),
    rest.get("/api/:username/:journalId/entries", (req, res, ctx) => {
        const markdown = "lorem ipsum";
        let now = Date.now();
        const entries = Array.apply(null, Array(5)).map((_, i) => {
            return {
                id: `entry-id${i + 1}`,
                journalId: `journal-id${i + 1}`,
                title: `entry-name${i + 1}`,
                markdown,
                html: markdown,
                dateCreated: now,
                lastUpdated: now,
                idx: `entry-idx${i + 1}`
            };
        });
        return res(ctx.json(entries));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders Entry Page", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    const PageTitle = screen.getByText(/Test Journal Title/);
    expect(PageTitle).toBeInTheDocument();
});

test("Renders Entry Markdown", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    await waitFor(() => userEvent.click(screen.getByText("Edit Entry")));
    const Markdown = screen.getByText(/### Test Journal Title/);
    expect(Markdown).toBeInTheDocument();
});

test("Render Journal page and navigate to entry", async () => {
    await waitFor(() => render(<Journal />, {initialState}));

    const journalName = screen.getByText(/journal-name0/);

    expect(journalName).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByText("Edit Entry")));
    const entryName = screen.getByText(/entry-name0/);
    expect(entryName).toBeInTheDocument();
});

test("Edits Entry Markdown", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    await waitFor(() => {
        userEvent.click(screen.getByText("Edit Entry"));
    });
    setTimeout(() => {
        userEvent.type(
            screen.getByTestId("monaco-editor"),
            "{selectall} {del} ### New Text"
        );
        expect(screen.getByTestId("monaco-editor")).toHaveValue(
            "### New Text"
        );
        expect(mockFn).toBeCalledTimes(1);
    }, 500);
});

test("Edits Entry Title", async () => {
    await waitFor(() => render(<Entry {...entryProps} />, {initialState}));
    await waitFor(() => userEvent.click(screen.getByText("Edit Entry")));
    // setTimeout(() => {
    userEvent.click(screen.getByTestId("title-button"));
    userEvent.type(
        screen.getByTestId("title-input"),
        "{selectall} {del} New Journal Title"
    );
    act(() => {
        userEvent.click(screen.getByTestId("title-button"));
    });
    expect(screen.getByTestId("title-input")).toHaveValue("New Journal Title");
    // }, 500);
});
