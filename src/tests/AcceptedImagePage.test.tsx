import { render, screen } from "@testing-library/react";
import AcceptedImagePage from "../pages/AcceptedImagePage";
import { AppProvider } from "../context";
import { vi } from "vitest";
import { PreferredTopic } from "../constants.ts";

vi.mock("../context", () => ({
  useGlobalContext: () => ({
    data: {
      topic: PreferredTopic.TRAVEL,
      otherTopic: "",
      name: "John",
      surname: "Doe",
      selectedImageThumb: "test-image.jpg",
    },
    updateField: vi.fn(),
  }),
}));

describe("AcceptedImagePage", () => {
  test("displays user information and selected image", () => {
    render(<AcceptedImagePage />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByAltText("Unsplash photo")).toHaveAttribute(
      "src",
      "test-image.jpg",
    );
  });

  test("handles missing user information", () => {
    render(<AcceptedImagePage />);

    const image = screen.getByAltText("Unsplash photo");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toBe("test-image.jpg");
  });
});
