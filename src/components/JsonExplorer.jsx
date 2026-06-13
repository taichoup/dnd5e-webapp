import React, { createContext, useContext, useState } from "react";
import "./JsonExplorer.css";

const ExplorerContext = createContext({ defaultOpen: false });

const isPrimitive = (v) => v === null || typeof v !== "object";
const isArray = (v) => Array.isArray(v);

const formatKey = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// True when an object has exactly one property and its value is a primitive.
const isSinglePrimitive = (v) =>
  !isArray(v) &&
  v !== null &&
  typeof v === "object" &&
  Object.keys(v).length === 1 &&
  isPrimitive(Object.values(v)[0]);

const findNameInObject = (obj) => {
  const key = Object.keys(obj).find(
    (k) => k.toLowerCase().includes("name") && isPrimitive(obj[k])
  );
  return key ? String(obj[key]) : null;
};

const findLabel = (item, index) => {
  if (isArray(item)) return `Group ${index + 1}`;
  const direct = findNameInObject(item);
  if (direct) return direct;
  for (const value of Object.values(item)) {
    if (value && !isArray(value) && typeof value === "object") {
      const nested = findNameInObject(value);
      if (nested) return nested;
    }
  }
  return `Item ${index + 1}`;
};

// --- Leaf nodes ---

const PrimitiveList = ({ items }) => (
  <ul className="je-primitive-list">
    {items.map((item, i) => (
      <li key={i}>{String(item)}</li>
    ))}
  </ul>
);

// --- Collapsible array item ---

const ArrayItem = ({ label, data, depth }) => {
  const { defaultOpen } = useContext(ExplorerContext);
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="je-array-item">
      <button type="button" className="je-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="je-toggle-arrow">{open ? "▼" : "▶"}</span>
        {label}
      </button>
      {open && (
        <div className="je-nested">
          <Node data={data} depth={depth + 1} />
        </div>
      )}
    </div>
  );
};

// --- Array renderer ---
// Decides per-item whether to show a bullet list or collapsible cards.

const ArrayNode = ({ data, depth }) => {
  if (data.length === 0) return <span className="je-empty">None</span>;

  // If every item is a primitive, render a flat list.
  if (data.every(isPrimitive)) return <PrimitiveList items={data} />;

  // Single-primitive objects and plain primitives render as a flat bullet list.
  if (data.every((item) => isPrimitive(item) || isSinglePrimitive(item))) {
    return (
      <PrimitiveList
        items={data.map((item) =>
          isPrimitive(item) ? String(item) : String(Object.values(item)[0])
        )}
      />
    );
  }

  // Otherwise render each item as a collapsible card, with single-primitive
  // items degraded to inline text for mixed arrays.
  return (
    <div className="je-array">
      {data.map((item, i) =>
        isPrimitive(item) || isSinglePrimitive(item) ? (
          <div key={i} className="je-prop-value">
            {isPrimitive(item) ? String(item) : String(Object.values(item)[0])}
          </div>
        ) : (
          <ArrayItem
            key={i}
            label={findLabel(item, i)}
            data={item}
            depth={depth}
          />
        )
      )}
    </div>
  );
};

// --- Object renderer ---

const ObjectNode = ({ data, depth = 0 }) => {
  if (data === null || data === undefined) return null;
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <PropertyRow key={key} label={key} value={value} depth={depth} />
      ))}
    </div>
  );
};

// --- Generic node: dispatches to the right renderer ---

const Node = ({ data, depth }) => {
  if (data === null || data === undefined) return null;
  if (isPrimitive(data)) return <span className="je-prop-value">{String(data)}</span>;
  if (isArray(data)) return <ArrayNode data={data} depth={depth} />;
  return <ObjectNode data={data} depth={depth} />;
};

// --- Property row: one key + its value ---

const PropertyRow = ({ label, value, depth }) => {
  if (isPrimitive(value)) {
    return (
      <div className="je-prop-row">
        <span className="je-prop-key">{formatKey(label)}</span>
        <span className="je-prop-value">{String(value)}</span>
      </div>
    );
  }

  // Object with a single primitive property → flatten to an inline row.
  if (isSinglePrimitive(value)) {
    return (
      <div className="je-prop-row">
        <span className="je-prop-key">{formatKey(label)}</span>
        <span className="je-prop-value">{String(Object.values(value)[0])}</span>
      </div>
    );
  }

  if (isArray(value)) {
    return (
      <div className="je-section">
        <div className="je-section-header">
          {formatKey(label)}
          <span className="je-count"> [{value.length}]</span>
        </div>
        <ArrayNode data={value} depth={depth} />
      </div>
    );
  }

  // Object
  return (
    <div className="je-section">
      <div className="je-section-header">{formatKey(label)}</div>
      <div className="je-nested">
        <ObjectNode data={value} depth={depth + 1} />
      </div>
    </div>
  );
};

// --- Public API ---

export const JsonExplorer = ({ json, defaultOpen = false }) => (
  <ExplorerContext.Provider value={{ defaultOpen }}>
    <div className="je-root">
      <ObjectNode data={json} depth={0} />
    </div>
  </ExplorerContext.Provider>
);
