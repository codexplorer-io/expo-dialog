# AGENTS.md — `@codexporer.io/expo-dialog`

## Package Overview
Core foundational modal dialog component (`Dialog`, `DialogContent`, `DialogActions`) backing message dialogs, loading dialogs, pickers, and custom confirmation popups.

## Key Exports
- `Dialog`: Root modal overlay with semi-transparent backdrop and card container.
- `DialogContent`: Main body container for text or custom inputs.
- `DialogActions`: Bottom action button container with horizontal alignment.

## Critical Guidelines for AI Agents
- **Wrap in Portal**: When rendering `Dialog` from nested screens or scrollable views, wrap it in `<Portal>` from `@codexporer.io/expo-portal` so it floats above headers and tabs.
- **Dismiss Callback**: Always supply `onDismiss` to handle backdrop taps and Android hardware back navigation cleanly.
- **Standard Action Layout**: Use `DialogActions` to lay out `@codexporer.io/expo-button` components (e.g. Cancel / OK).
- **Theme Compliance**: Surface background automatically inherits `theme.surface`; backdrop uses `theme.overlay`.
