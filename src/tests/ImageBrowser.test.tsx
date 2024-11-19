import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import ImageBrowser from "../pages/ImageBrowser";
import { PreferredTopic } from "../constants.ts";

// Mock env variable
vi.stubEnv("VITE_UNSPLASH_ACCESS_KEY", "test-key");
const mockNavigate = vi.fn();
const mockGetRandom = vi.fn().mockResolvedValue({
  response: {
    id: "123",
    urls: { regular: "test.jpg", small: "small.jpg" },
    alt_description: "Alt photo",
  },
});

const mockUnsplashApi = {
  photos: {
    getRandom: mockGetRandom,
  },
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../context", () => ({
  useGlobalContext: () => ({
    data: {
      topic: PreferredTopic.TRAVEL,
      otherTopic: "",
      name: "Test",
      surname: "User",
      selectedImageThumb: null,
    },
    updateField: vi.fn(),
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("ImageBrowser", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("shows loading state initially", () => {
    render(<ImageBrowser />, { wrapper: TestWrapper });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays image and buttons after loading", async () => {
    render(<ImageBrowser unsplashApi={mockUnsplashApi} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(screen.getByAltText("Alt photo")).toBeInTheDocument();
      expect(screen.getByText(/accept/i)).toBeInTheDocument();
      expect(screen.getByText(/reject/i)).toBeInTheDocument();
    });
  });

  test("loads new image on reject", async () => {
    render(<ImageBrowser unsplashApi={mockUnsplashApi} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      const rejectButton = screen.getByText(/reject/i);
      act(() => fireEvent.click(rejectButton));
    });
    await waitFor(() => {
      expect(mockGetRandom).toHaveBeenCalledTimes(2);
    });
  });

  test("navigates to accepted page on accept", async () => {
    render(<ImageBrowser unsplashApi={mockUnsplashApi} />, {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      const acceptButton = screen.getByText(/accept/i);
      fireEvent.click(acceptButton);
      expect(mockNavigate).toHaveBeenCalledWith("/accepted-image");
    });
  });

  test("displays error message on API failure", async () => {
    vi.mock("unsplash-js", () => ({
      createApi: () => ({
        photos: {
          getRandom: vi.fn().mockRejectedValue(new Error("API Error")),
        },
      }),
    }));

    render(<ImageBrowser />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getByText(/error loading the image/i)).toBeInTheDocument();
    });
  });
});
