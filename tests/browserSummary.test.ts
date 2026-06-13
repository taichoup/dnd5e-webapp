import {
  generateResourceSummary,
  getSummaryAvailability,
} from "../src/utils/browserSummary";

describe("browserSummary", () => {
  afterEach(() => {
    delete globalThis.LanguageModel;
  });

  test("reports unavailable when the Prompt API is missing", async () => {
    await expect(getSummaryAvailability()).resolves.toBe("unavailable");
  });

  test("generates a constrained summary and destroys the session", async () => {
    const destroy = vi.fn();
    const prompt = vi.fn().mockResolvedValue(
      JSON.stringify({
        overview: "A dangerous giant.",
        sections: [{ heading: "Combat", facts: ["Armor Class 15"] }],
        caveats: [],
      })
    );
    const create = vi.fn().mockResolvedValue({ prompt, destroy });
    globalThis.LanguageModel = {
      availability: vi.fn().mockResolvedValue("available"),
      create,
    };

    const resource = { name: "Frost Giant", armor_class: 15 };
    const result = await generateResourceSummary(resource);

    expect(result.overview).toBe("A dangerous giant.");
    expect(prompt).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify(resource)),
      expect.objectContaining({ responseConstraint: expect.any(Object) })
    );
    expect(destroy).toHaveBeenCalledOnce();
  });

  test("reports model download progress", async () => {
    const onDownloadProgress = vi.fn();
    globalThis.LanguageModel = {
      create: vi.fn(async ({ monitor }) => {
        monitor({
          addEventListener: (
            _name: "downloadprogress",
            listener: (event: { loaded: number }) => void
          ) => listener({ loaded: 0.42 }),
        });
        return {
          prompt: vi.fn().mockResolvedValue(
            JSON.stringify({ overview: "Summary", sections: [], caveats: [] })
          ),
          destroy: vi.fn(),
        };
      }),
    } as unknown as LanguageModelApi;

    await generateResourceSummary({}, { onDownloadProgress });

    expect(onDownloadProgress).toHaveBeenCalledWith(42);
  });

  test("destroys the session when prompting fails", async () => {
    const destroy = vi.fn();
    globalThis.LanguageModel = {
      create: vi.fn().mockResolvedValue({
        prompt: vi.fn().mockRejectedValue(new DOMException("Too large", "QuotaExceededError")),
        destroy,
      }),
    } as unknown as LanguageModelApi;

    await expect(generateResourceSummary({})).rejects.toMatchObject({
      name: "QuotaExceededError",
    });
    expect(destroy).toHaveBeenCalledOnce();
  });

  test("destroys the session when the model returns malformed JSON", async () => {
    const destroy = vi.fn();
    globalThis.LanguageModel = {
      create: vi.fn().mockResolvedValue({
        prompt: vi.fn().mockResolvedValue("not json"),
        destroy,
      }),
    } as unknown as LanguageModelApi;

    await expect(generateResourceSummary({})).rejects.toBeInstanceOf(SyntaxError);
    expect(destroy).toHaveBeenCalledOnce();
  });
});
