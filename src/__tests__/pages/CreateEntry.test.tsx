import {rest} from "msw";
import {setupServer} from "msw/node";
import {waitFor, render, screen} from "../TestUtils/RenderWithRedux";
import CreateEntry from "../../pages/Entry/CreateEntry";
import "@testing-library/jest-dom/extend-expect";

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

test("Render Create Entry Page", async () => {
    await waitFor(() => render(<CreateEntry />, {initialState}));
    const PageTitle = screen.getByText(/Create a New Entry/);
    expect(PageTitle).toBeInTheDocument();
});
