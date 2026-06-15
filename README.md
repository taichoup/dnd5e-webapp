# D&D 5e Web App

A browser-based Dungeons & Dragons 5e reference search and battle tracker.

The app searches a bundled D&D dataset, displays detailed API resources, supports
an optional browser-side AI overview, and provides a simple initiative tracker
and drawable battleground.

## Development

This project uses React 18, Redux, TypeScript, Vite, pnpm, and Vitest.

```bash
pnpm install
pnpm start
```

Available checks:

```bash
pnpm typecheck
pnpm test
pnpm build
```

## Recent Changes

The following work was completed between June 8 and June 13, 2026.

### Platform Modernization

- Upgraded the application to React 18 and migrated state access to
  `react-redux`.
- Fixed immutable Redux updates and removed obsolete components and context
  code.
- Replaced Create React App, Yarn, and Jest with Vite, pnpm, and Vitest.
- Replaced Axios with the browser's native `fetch` API.
- Updated dependencies to address known high-severity vulnerabilities.

### TypeScript Migration

- Converted all application, asset, utility, configuration, and test modules
  from JavaScript/JSX to TypeScript/TSX.
- Added strict shared types for Redux state and actions, recursive API JSON,
  search records, battle entries, and AI summaries.
- Added local declarations for the browser Prompt API and older third-party
  components.
- Added `pnpm typecheck` as a required project check.

### Resource Display

- Replaced the deeply nested table renderer with a hierarchical JSON explorer.
- Added collapsible arrays, useful labels derived from nested names, flattened
  single-property values, and clearer rendering of primitive lists.
- Added data-completeness tests to ensure the explorer does not silently omit
  API values.

### Browser AI Experiment

- Added an opt-in, browser-side AI overview using the experimental
  [Prompt API](https://github.com/webmachinelearning/prompt-api).
- AI summaries render as user-friendly section cards while the structured JSON
  explorer remains the authoritative rules reference.
- Added progressive enhancement, model availability checks, download progress,
  cancellation, constrained JSON output, and safe inline Markdown rendering.
- Added tests covering unavailable browsers, user-triggered generation,
  malformed output, download progress, quota errors, and cancellation.

### Search Reliability

- Fixed search initialization while the bundled dataset is loading.
- Fixed asynchronous loading of `public/data2.json`.
- Added regression tests for typing before data is available and displaying
  matching results afterward.

## API Data and Resilience Plan

The application currently has two different data paths:

- Search uses the bundled [`public/data2.json`](public/data2.json) snapshot.
- Resource popups still fetch details from `https://www.dnd5eapi.co`.

This means search survives an upstream outage, but opening resource details does
not. The goal is to make the hosted API an optional update source rather than a
runtime dependency.

### Recommended Architecture

1. **Serve resource details from the bundled snapshot**
   - Build a local lookup index from `public/data2.json`.
   - Resolve popup resources locally during normal operation.
   - Optionally query the hosted API for refreshes, but always fall back to the
     bundled snapshot.

2. **Replace the legacy snapshot script**
   - Replace [`utils/api_dumper.py`](utils/api_dumper.py), which currently uses
     obsolete endpoints, Python 2 syntax, and a hard-coded output path.
   - Create a TypeScript snapshot command using the versioned `/api/2014`
     endpoints.
   - Download every collection and resource, validate the result, and only
     replace the existing snapshot after a complete successful run.
   - Record generation time, upstream version, source URL, item counts, and a
     checksum alongside each snapshot.

3. **Automate and archive snapshots**
   - Run the snapshot command on a weekly or monthly GitHub Actions schedule.
   - Open an automated pull request when the snapshot changes.
   - Retain copies in Git history and as GitHub release assets or workflow
     artifacts.

4. **Pin and archive upstream projects**
   - Track specific releases of
     [`5e-bits/5e-database`](https://github.com/5e-bits/5e-database) and
     [`5e-bits/5e-srd-api`](https://github.com/5e-bits/5e-srd-api).
   - Preserve the upstream license and attribution files with redistributed
     snapshots.
   - Keep pinned Docker image versions or source archives so the API can be
     self-hosted if the public service disappears.

5. **Validate recovery**
   - Add tests that run with network access disabled and confirm search and
     popup details still work.
   - Periodically test rebuilding the local snapshot and starting a self-hosted
     API from the pinned upstream versions.

### Suggested Implementation Order

1. Make popup details use the bundled snapshot.
2. Add a validated TypeScript snapshot generator.
3. Add scheduled GitHub Actions updates and archival.
4. Pin upstream releases and document self-hosting.

## Roadmap

### Battleground

- Add an optional grid with adjustable scale and grid snapping.
- Support additional map shapes and terrain styles.
- Move the drawing canvas below the creature layer.
- Preserve battle and canvas state when opening a pop-out battleground.
- Allow creatures to be added during combat without resetting the battle.

### Battle Tracker

- Improve editable battle-table fields.
- Add additional generated creature information.
- Add names grouped by race.

### Interface

- Improve popup transitions and general styling.
- Continue improving empty-value handling.
- Consider replacing the battle creature autocomplete with a native datalist.
