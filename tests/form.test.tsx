import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Form } from "../src/components/Form";
import type { AppAction, AppState } from "../src/types";

const initialState = {
  query: "",
  db: null,
  popupdata: null,
  click: false,
  path: "",
  battle: [],
};

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case "QUERY":
      return { ...state, query: action.payload };
    case "GETDATA_DB":
      return { ...state, db: action.payload };
    default:
      return state;
  }
};

describe("Form search", () => {
  test("accepts input before the search data has loaded", async () => {
    globalThis.fetch = vi.fn(() => new Promise<Response>(() => {}));
    const store = createStore(reducer);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "frost");

    expect(input).toHaveValue("frost");
    expect(store.getState().query).toBe("frost");
  });

  test("renders matching entries after the search data loads", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        {
          section: "monsters",
          results: [
            { result: { name: "Frost Giant" } },
            { result: { name: "Fire Giant" } },
          ],
        },
      ]),
    } as unknown as Response);
    const store = createStore(reducer);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    await user.type(screen.getByRole("textbox"), "frost");

    expect(await screen.findByRole("link", { name: "Frost Giant" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Fire Giant" })).not.toBeInTheDocument();
  });
});
