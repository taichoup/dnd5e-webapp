import React, { useEffect, useRef, useState } from "react";
import {
  generateResourceSummary,
  getSummaryAvailability,
} from "../utils/browserSummary";

const availabilityLabels = {
  downloadable: "The browser AI model will be downloaded before generating the overview.",
  downloading: "The browser AI model is currently downloading.",
  unavailable: "Browser AI is not available on this browser or device.",
};

const inlineMarkdownPattern = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\*[^*\n]+\*|\n)/g;

export const InlineMarkdown = ({ text }) => (
  <>
    {text.split(inlineMarkdownPattern).map((part, index) => {
      if (part === "\n") return <br key={index} />;
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      return part;
    })}
  </>
);

export const AiSummary = ({ resource }) => {
  const [availability, setAvailability] = useState("checking");
  const [status, setStatus] = useState("idle");
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const abortController = useRef(null);

  useEffect(() => {
    let active = true;
    abortController.current?.abort();
    setStatus("idle");
    setDownloadProgress(null);
    setSummary(null);
    setError("");
    setAvailability("checking");
    getSummaryAvailability().then((value) => {
      if (active) setAvailability(value);
    });
    return () => {
      active = false;
      abortController.current?.abort();
    };
  }, [resource]);

  const generate = async () => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setStatus("generating");
    setSummary(null);
    setError("");
    setDownloadProgress(null);

    try {
      const result = await generateResourceSummary(resource, {
        signal: abortController.current.signal,
        onDownloadProgress: setDownloadProgress,
      });
      setSummary(result);
      setStatus("complete");
      setAvailability("available");
    } catch (generationError) {
      if (generationError.name === "AbortError") return;
      setError(
        generationError.name === "QuotaExceededError"
          ? "This resource is too large for the browser AI model."
          : "The browser AI could not generate an overview."
      );
      setStatus("error");
    }
  };

  const isGenerating = status === "generating";
  const isUnavailable = availability === "unavailable";

  return (
    <section className="ai-summary" aria-labelledby="ai-summary-title">
      <div className="ai-summary-heading">
        <div>
          <h3 id="ai-summary-title">Experimental AI overview</h3>
          <p>Generated on demand. Check exact rules and numbers in the details below.</p>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={availability === "checking" || isUnavailable || isGenerating}
        >
          {isGenerating ? "Generating..." : summary ? "Regenerate overview" : "Generate overview"}
        </button>
      </div>

      {availabilityLabels[availability] && !summary && (
        <p className="ai-summary-status" aria-live="polite">
          {availabilityLabels[availability]}
        </p>
      )}
      {downloadProgress !== null && isGenerating && (
        <p className="ai-summary-status" aria-live="polite">
          Downloading browser AI model: {downloadProgress}%
        </p>
      )}
      {error && (
        <p className="ai-summary-error" role="alert">
          {error}
        </p>
      )}

      {summary && (
        <div className="ai-summary-result">
          <p className="ai-summary-overview">
            <InlineMarkdown text={summary.overview} />
          </p>
          <div className="ai-summary-cards">
            {summary.sections.map((section, index) => (
              <article className="ai-summary-card" key={`${section.heading}-${index}`}>
                <h4>
                  <InlineMarkdown text={section.heading} />
                </h4>
                <ul>
                  {section.facts.map((fact, factIndex) => (
                    <li key={factIndex}>
                      <InlineMarkdown text={fact} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          {summary.caveats.length > 0 && (
            <div className="ai-summary-caveats">
              <strong>Important limitations</strong>
              <ul>
                {summary.caveats.map((caveat, index) => (
                  <li key={index}>
                    <InlineMarkdown text={caveat} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
