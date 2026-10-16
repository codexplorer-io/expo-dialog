# AGENTS.md — `@codexporer.io/expo-dialog`

## Package Overview
Core foundational modal dialog component suite (`Dialog`, `DialogContent`, `DialogActions`) backing message dialogs, loading dialogs, pickers, and custom confirmation popups. Built using `StyleSheet.absoluteFill` with `zIndex: 99999` and `elevation: 99999`.

## Peer Dependencies
All peer dependencies must be installed in consuming projects:
- `react`: `*`
- `react-native`: `*`
- `@codexporer.io/expo-app-theme`: `*`

## Key Exports
- `Dialog`: Root modal overlay with animated opacity (200ms fade-in, 150ms fade-out), backdrop touch dismissal, and Android back button handling.
  - Props: `visible` (required), `onDismiss`, `dismissable` (default: `true`), `dismissOnBackdropPress` (default: `dismissable`), `dismissOnHardwareBackPress` (default: `dismissable`), `trapHardwareBackPress` (default: `false`), `children`, `style`.
- `DialogContent`: Main body container applying standard `marginBottom: 16`. Props: `children`, `style`.
- `DialogActions`: Bottom action button row aligned to `flex-end` with `gap: 8`, `marginTop: 8`. Props: `children`, `style`.

## Critical Guidelines for AI Agents
- **ThemeProvider Requirement**: `Dialog` calls `useAppTheme()` to resolve `theme.overlay`, `theme.surface`, and `theme.shadow`. Must always be mounted inside `<ThemeProvider>`.
- **Wrap in Portal**: When rendering `Dialog` from nested screens or scrollable views, wrap it in `<Portal>` from `@codexporer.io/expo-portal` so it floats above headers and tab bars.
- **Dismiss Callbacks**: Always supply `onDismiss` if `dismissable={true}`, `dismissOnBackdropPress={true}`, or `dismissOnHardwareBackPress={true}`.
- **Hardware Back Press Trapping**: If a dialog requires explicit user action before closing (e.g. non-cancellable alert), set `trapHardwareBackPress={true}` and `dismissable={false}` to prevent the Android back button from navigating away.
- **Standard Action Layout**: Use `DialogActions` to lay out `@codexporer.io/expo-button` components (e.g. Cancel / Confirm).
