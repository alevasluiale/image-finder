import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import SearchPage from "../pages/SearchPage";
import { AppProvider } from "../context";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </AppProvider>
);

describe("SearchPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders all form fields", () => {
    render(<SearchPage />, { wrapper: TestWrapper });

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Topic")).toBeInTheDocument();
  });

  test("shows other topic field when OTHER is selected", async () => {
    render(<SearchPage />, { wrapper: TestWrapper });

    const topicSelect = screen.getByLabelText("Preferred Topic");
    userEvent.click(topicSelect);
    const optionsPopupEl = await screen.findByRole("listbox", {
      name: "Preferred Topic",
    });

    // Click an option in the popup.
    await act(() =>
      userEvent.click(within(optionsPopupEl).getByText(/other/i)),
    );

    await expect(screen.getByLabelText("Topic")).toBeInTheDocument();
  });

  test("navigates to browse images on topic selection", async () => {
    render(<SearchPage />, { wrapper: TestWrapper });

    const topicSelect = screen.getByLabelText("Preferred Topic");
    userEvent.click(topicSelect);
    const optionsPopupEl = await screen.findByRole("listbox", {
      name: "Preferred Topic",
    });

    // Click an option in the popup.
    await act(() =>
      userEvent.click(within(optionsPopupEl).getByText(/travel/i)),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/browse-images");
    });
  });

  test("debounces navigation when OTHER topic is entered", async () => {
    render(<SearchPage />, { wrapper: TestWrapper });
    const topicSelect = screen.getByLabelText("Preferred Topic");
    userEvent.click(topicSelect);
    const optionsPopupEl = await screen.findByRole("listbox", {
      name: "Preferred Topic",
    });

    // Click an option in the popup.
    await act(() =>
      userEvent.click(within(optionsPopupEl).getByText(/other/i)),
    );

    const otherTopicInput = screen.getByLabelText("Topic");
    fireEvent.change(otherTopicInput, { target: { value: "Custom Topic" } });

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/browse-images");
      },
      { timeout: 3000 },
    );
  });
});
