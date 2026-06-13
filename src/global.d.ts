interface LanguageModelMonitor {
  addEventListener(
    type: "downloadprogress",
    listener: (event: { loaded: number }) => void
  ): void;
}

interface LanguageModelSession {
  prompt(
    input: string,
    options?: { signal?: AbortSignal; responseConstraint?: object }
  ): Promise<string>;
  destroy(): void;
}

interface LanguageModelCreateOptions {
  expectedInputs?: Array<{ type: "text"; languages: string[] }>;
  expectedOutputs?: Array<{ type: "text"; languages: string[] }>;
  signal?: AbortSignal;
  monitor?: (monitor: LanguageModelMonitor) => void;
  initialPrompts?: Array<{ role: "system"; content: string }>;
}

interface LanguageModelApi {
  availability(options?: LanguageModelCreateOptions): Promise<string>;
  create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
}

declare var LanguageModel: LanguageModelApi | undefined;

declare module "react-canvas-draw" {
  import type { Component, Ref } from "react";

  interface CanvasDrawProps {
    brushRadius?: number;
    hideGrid?: boolean;
    backgroundColor?: string;
    canvasWidth?: string | number;
    canvasHeight?: string | number;
    lazyRadius?: number;
  }

  export default class CanvasDraw extends Component<CanvasDrawProps> {
    clear(): void;
    undo(): void;
  }
}
