import { render } from '@testing-library/react';
import { JsonExplorer } from '../src/components/JsonExplorer';
import { removeUselessProperties, removeNullishValues } from '../src/utils/apiFormatter';
import { api_result_1, api_result_2 } from './test_helper';
import type { JsonObject, JsonValue } from "../src/types";

// Apply the same data pipeline that Popup.js / formatResults() applies.
function applyDataPipeline(rawFixture: JsonObject): JsonObject {
  const data = JSON.parse(JSON.stringify(rawFixture)) as JsonObject;
  removeUselessProperties(data, 'url');
  removeUselessProperties(data, 'index');
  removeNullishValues(data);
  const strip = ['_id', 'index', 'name', 'url'];
  return Object.fromEntries(Object.entries(data).filter(([k]) => !strip.includes(k)));
}

// Recursively collect every primitive leaf value as a string.
function collectLeafValues(node: JsonValue): string[] {
  if (node === null || node === undefined) return [];
  if (typeof node !== 'object') return [String(node)];
  if (Array.isArray(node)) return node.flatMap(collectLeafValues);
  return Object.values(node).flatMap(collectLeafValues);
}

function runDataCompletenessTests(fixtureName: string, rawFixture: JsonObject) {
  describe(fixtureName, () => {
    let data: JsonObject;
    let leafValues: string[];

    beforeAll(() => {
      data = applyDataPipeline(rawFixture);
      leafValues = collectLeafValues(data);
    });

    test('JsonExplorer (defaultOpen) renders all leaf values', () => {
      const { container } = render(<JsonExplorer json={data} defaultOpen={true} />);
      leafValues.forEach((value) => {
        expect(container.textContent).toContain(value);
      });
    });

  });
}

describe('JsonExplorer data completeness', () => {
  runDataCompletenessTests('Frost Giant (api_result_1)', api_result_1 as unknown as JsonObject);
  runDataCompletenessTests('Fine Clothes (api_result_2)', api_result_2 as JsonObject);
});
