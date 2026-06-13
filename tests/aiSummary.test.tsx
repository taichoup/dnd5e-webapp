import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AiSummary } from "../src/components/AiSummary";
import {
  generateResourceSummary,
  getSummaryAvailability,
} from "../src/utils/browserSummary";

vi.mock("../src/utils/browserSummary", () => ({
  generateResourceSummary: vi.fn(),
  getSummaryAvailability: vi.fn(),
}));

const mockGetSummaryAvailability = vi.mocked(getSummaryAvailability);
const mockGenerateResourceSummary = vi.mocked(generateResourceSummary);

describe("AiSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("disables generation when browser AI is unavailable", async () => {
    mockGetSummaryAvailability.mockResolvedValue("unavailable");

    render(<AiSummary resource={{ name: "Frost Giant" }} />);

    expect(
      await screen.findByText("Browser AI is not available on this browser or device.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Generate overview" })).toBeDisabled();
    expect(mockGenerateResourceSummary).not.toHaveBeenCalled();
  });

  test("generates section cards only after the user requests them", async () => {
    mockGetSummaryAvailability.mockResolvedValue("available");
    mockGenerateResourceSummary.mockResolvedValue({
      overview: "A dangerous giant.",
      sections: [{ heading: "Combat", facts: ["Armor Class 15"] }],
      caveats: ["Cold immunity"],
    });

    render(<AiSummary resource={{ name: "Frost Giant" }} />);

    const button = await screen.findByRole("button", { name: "Generate overview" });
    expect(mockGenerateResourceSummary).not.toHaveBeenCalled();
    fireEvent.click(button);

    expect(await screen.findByText("A dangerous giant.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Combat" })).toBeInTheDocument();
    expect(screen.getByText("Armor Class 15")).toBeInTheDocument();
    expect(screen.getByText("Cold immunity")).toBeInTheDocument();
    expect(mockGenerateResourceSummary).toHaveBeenCalledWith(
      { name: "Frost Giant" },
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  test("safely renders the supported inline Markdown subset", async () => {
    mockGetSummaryAvailability.mockResolvedValue("available");
    mockGenerateResourceSummary.mockResolvedValue({
      overview: "A **dangerous** dragon.",
      sections: [
        {
          heading: "Basic Stats",
          facts: ["**Size:** Medium\n**Hit Dice:** `7d8+7`"],
        },
      ],
      caveats: ["*Verify exact rules below.*"],
    });

    const { container } = render(<AiSummary resource={{ name: "Dragon" }} />);
    fireEvent.click(await screen.findByRole("button", { name: "Generate overview" }));
    await screen.findByText("Basic Stats");

    expect(screen.getByText("dangerous").tagName).toBe("STRONG");
    expect(screen.getByText("Size:").tagName).toBe("STRONG");
    expect(screen.getByText("Hit Dice:").tagName).toBe("STRONG");
    expect(screen.getByText("7d8+7").tagName).toBe("CODE");
    expect(screen.getByText("Verify exact rules below.").tagName).toBe("EM");
    expect(container.querySelector(".ai-summary-card br")).toBeInTheDocument();
    expect(container.querySelector(".ai-summary-result")?.textContent).not.toContain("**");
  });

  test("aborts an in-progress generation when unmounted", async () => {
    mockGetSummaryAvailability.mockResolvedValue("available");
    mockGenerateResourceSummary.mockImplementation(
      (_resource, { signal } = {}) =>
        new Promise((_resolve, reject) => {
          signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError"))
          );
        })
    );

    const { unmount } = render(<AiSummary resource={{ name: "Frost Giant" }} />);
    fireEvent.click(await screen.findByRole("button", { name: "Generate overview" }));
    await waitFor(() => expect(mockGenerateResourceSummary).toHaveBeenCalledOnce());

    const signal = mockGenerateResourceSummary.mock.calls[0][1]?.signal;
    unmount();

    expect(signal?.aborted).toBe(true);
  });
});
