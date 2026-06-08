import React, { useState } from "react";
import "./JsonExplorer.css";

const isPrimitive = (v) => v === null || typeof v !== "object";
const isArray = (v) => Array.isArray(v);

const formatKey = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
  const [open, setOpen] = useState(false);
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

  // Otherwise render each item as a collapsible card.
  // Items that turn out to be primitive (mixed array) fall back to inline text.
  return (
    <div className="je-array">
      {data.map((item, i) =>
        isPrimitive(item) ? (
          <div key={i} className="je-prop-value">{String(item)}</div>
        ) : (
          <ArrayItem
            key={i}
            label={isArray(item) ? `Group ${i + 1}` : item.name || `Item ${i + 1}`}
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

export const JsonExplorer = ({ json }) => (
  <div className="je-root">
    <ObjectNode data={json} depth={0} />
  </div>
);
