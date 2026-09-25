# `@codexporer.io/expo-dialog`

A lightweight, animated modal dialog overlay system for Expo and React Native applications. Built using `StyleSheet.absoluteFill` and z-index elevation instead of React Native's `<Modal>` to eliminate modal layering, flickering, and navigation hierarchy issues.

## Features

- **Smooth Opacity Transitions**: 200ms fade-in and 150ms fade-out with native driver animation.
- **Safe Overlay Stacking**: Uses `zIndex: 99999` and `elevation: 99999` over standard screen trees.
- **Hardware Back Button Control**: Configurable Android back press handling (`dismissOnHardwareBackPress`, `trapHardwareBackPress`).
- **Backdrop Press Detection**: Tap-outside dismissal with inner container event stoppage.
- **Sub-components**: Comes with `<DialogContent />` and `<DialogActions />` for consistent layout.
- **Dynamic Theming**: Automatically styled via `@codexporer.io/expo-app-theme`.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-dialog
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)
- `@codexporer.io/expo-app-theme` (`*`)

## Quick Start

```tsx
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Dialog, DialogContent, DialogActions } from '@codexporer.io/expo-dialog';
import { Button, ButtonVariant, ButtonSize } from '@codexporer.io/expo-button';

export function ConfirmationDialog({ isVisible, onConfirm, onCancel }) {
  return (
    <Dialog
      visible={isVisible}
      onDismiss={onCancel}
      dismissable={true}
    >
      <DialogContent>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Confirm Action
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
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

## Props Reference

### `<Dialog />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls visibility and trigger fade in/out animation |
| `onDismiss` | `() => void` | — | Callback invoked on backdrop tap or back button press |
| `dismissable` | `boolean` | `true` | Default flag for backdrop and hardware back press dismissal |
| `dismissOnBackdropPress` | `boolean` | `dismissable` | If `true`, tapping outside the dialog invokes `onDismiss` |
| `dismissOnHardwareBackPress` | `boolean` | `dismissable` | If `true`, pressing Android back button invokes `onDismiss` |
| `trapHardwareBackPress` | `boolean` | `false` | If `true`, Android back button is swallowed (`return true`) preventing screen navigation while active |
| `children` | `ReactNode` | — | Dialog content elements |
| `style` | `StyleProp<ViewStyle>` | — | Custom style for the dialog card container |

### `<DialogContent />`
Container wrapping body content with standardized bottom margins.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Body content |
| `style` | `StyleProp<ViewStyle>` | — | Style override |

### `<DialogActions />`
Action buttons row aligned to the bottom right with standard spacing and gaps.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Action buttons (e.g. `<Button />`) |
| `style` | `StyleProp<ViewStyle>` | — | Style override |

## License

MIT