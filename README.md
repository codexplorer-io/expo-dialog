# `@codexporer.io/expo-dialog`

A lightweight, animated modal dialog overlay system for Expo and React Native applications. Built using `StyleSheet.absoluteFill` and z-index elevation instead of React Native's native `<Modal>` to eliminate modal layering, flickering, and navigation hierarchy issues.

---

## Features

- **Smooth Opacity Transitions**: 200ms fade-in and 150ms fade-out with native driver animation.
- **Safe Overlay Stacking**: Uses `zIndex: 99999` and `elevation: 99999` over standard screen trees.
- **Hardware Back Button Control**: Configurable Android back press handling (`dismissOnHardwareBackPress`, `trapHardwareBackPress`).
- **Backdrop Press Detection**: Tap-outside dismissal with inner container event stoppage.
- **Sub-components**: Comes with `<DialogContent />` and `<DialogActions />` for consistent layout.
- **Dynamic Theming**: Automatically styled via `@codexporer.io/expo-app-theme`.

---

## Peer Dependencies

All peer dependencies must be installed in consuming projects:
- `react`: `*`
- `react-native`: `*`
- `@codexporer.io/expo-app-theme`: `*`

---

## Installation

```bash
yarn add @codexporer.io/expo-dialog
```

---

## Theme Requirement

`Dialog` calls `useAppTheme()` internally to resolve colors (`theme.overlay` for the backdrop, `theme.surface` for card background, and `theme.shadow` for elevation shadow). The consuming application must mount `<ThemeProvider>` from `@codexporer.io/expo-app-theme` higher in the component tree, or an error will be thrown.

---

## Quick Start

```tsx
import React from 'react';
import { Text } from 'react-native';
import { Dialog, DialogContent, DialogActions } from '@codexporer.io/expo-dialog';
import { Button, ButtonVariant, ButtonSize } from '@codexporer.io/expo-button';
import { useAppTheme } from '@codexporer.io/expo-app-theme';

export function ConfirmationDialog({ isVisible, onConfirm, onCancel }) {
  const theme = useAppTheme();

  return (
    <Dialog
      visible={isVisible}
      onDismiss={onCancel}
      dismissable={true}
    >
      <DialogContent>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>
          Confirm Action
        </Text>
        <Text style={{ fontSize: 14, color: theme.placeholder }}>
          Are you sure you want to proceed with this operation?
        </Text>
      </DialogContent>
      <DialogActions>
        <Button
          title="Cancel"
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Small}
          onPress={onCancel}
        />
        <Button
          title="Confirm"
          variant={ButtonVariant.Primary}
          size={ButtonSize.Small}
          onPress={onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
```

---

## Props Reference

### `<Dialog />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls visibility and triggers 200ms fade-in / 150ms fade-out animation |
| `onDismiss` | `() => void` | — | Callback invoked on backdrop tap or hardware back button press |
| `dismissable` | `boolean` | `true` | Default flag for backdrop and hardware back press dismissal |
| `dismissOnBackdropPress` | `boolean` | `dismissable` (`true`) | If `true`, tapping outside the dialog invokes `onDismiss` |
| `dismissOnHardwareBackPress` | `boolean` | `dismissable` (`true`) | If `true`, pressing Android back button invokes `onDismiss` |
| `trapHardwareBackPress` | `boolean` | `false` | If `true`, Android back button is swallowed (`return true`) preventing screen navigation while active |
| `children` | `React.ReactNode` | **Required** | Dialog content elements (typically `<DialogContent />` and `<DialogActions />`) |
| `style` | `StyleProp<ViewStyle>` | — | Custom style applied to the dialog card container (default `maxWidth: 400`, `borderRadius: 16`, `padding: 24`) |

### `<DialogContent />`
Container wrapping body content with standardized bottom margins (`marginBottom: 16`).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | **Required** | Body content (text, form elements, custom widgets) |
| `style` | `StyleProp<ViewStyle>` | — | Style override |

### `<DialogActions />`
Action buttons row aligned to the bottom right with standard spacing (`flexDirection: 'row'`, `justifyContent: 'flex-end'`, `gap: 8`, `marginTop: 8`).

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | **Required** | Action buttons (typically `<Button />` elements) |
| `style` | `StyleProp<ViewStyle>` | — | Style override |

---

## License

MIT