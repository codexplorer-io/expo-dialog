---
name: expo-dialog
description: Instructions and guidelines for using @codexporer.io/expo-dialog (Expo Dialog) in React Native and Expo applications.
---

# `@codexporer.io/expo-dialog` Skill

## Overview
`@codexporer.io/expo-dialog` is the base modal dialog overlay component suite for the application. Built using `StyleSheet.absoluteFill` and z-index elevation with animated fade transitions, backdrop dismiss handling, hardware back press trapping, theme integration, and subcomponents (`DialogContent`, `DialogActions`).

---

## Peer Dependencies

All peer dependencies must be installed in consuming projects:
- `react`: `*`
- `react-native`: `*`
- `@codexporer.io/expo-app-theme`: `*`

---

## Theme Requirement

`Dialog` calls `useAppTheme()` internally to resolve colors (`theme.overlay` for backdrop, `theme.surface` for card, and `theme.shadow` for card shadow). The consuming application must mount `<ThemeProvider>` from `@codexporer.io/expo-app-theme` higher in the component tree.

---

## When to Use
- Custom modal popups that require custom UI beyond standard alerts.
- Alert confirmations, input prompts, or picker overlays.

---

## Usage Example

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  Dialog,
  DialogContent,
  DialogActions
} from '@codexporer.io/expo-dialog';
import { Button, ButtonVariant, ButtonSize } from '@codexporer.io/expo-button';
import { Portal } from '@codexporer.io/expo-portal';
import { useAppTheme } from '@codexporer.io/expo-app-theme';

export function ConfirmationModal() {
  const [visible, setVisible] = useState(false);
  const theme = useAppTheme();

  return (
    <View>
      <Button title="Open Dialog" onPress={() => setVisible(true)} />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <DialogContent>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>
              Discard Draft?
            </Text>
            <Text style={{ color: theme.placeholder, fontSize: 14 }}>
              Any unsaved changes will be permanently lost.
            </Text>
          </DialogContent>
          <DialogActions>
            <Button
              title="Cancel"
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Small}
              onPress={() => setVisible(false)}
            />
            <Button
              title="Discard"
              variant={ButtonVariant.Primary}
              size={ButtonSize.Small}
              onPress={() => {
                setVisible(false);
                // Perform discard
              }}
            />
          </DialogActions>
        </Dialog>
      </Portal>
    </View>
  );
}
```

---

## API Reference

### `<Dialog />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls modal visibility and triggers fade animations |
| `onDismiss` | `() => void` | — | Callback fired when backdrop is tapped or back button pressed |
| `dismissable` | `boolean` | `true` | Default flag for backdrop and hardware back press dismissal |
| `dismissOnBackdropPress` | `boolean` | `dismissable` (`true`) | If `true`, tapping outside the dialog invokes `onDismiss` |
| `dismissOnHardwareBackPress` | `boolean` | `dismissable` (`true`) | If `true`, pressing Android back button invokes `onDismiss` |
| `trapHardwareBackPress` | `boolean` | `false` | If `true`, Android back button is swallowed preventing screen navigation |
| `children` | `React.ReactNode` | **Required** | Dialog contents (typically `<DialogContent />` and `<DialogActions />`) |
| `style` | `StyleProp<ViewStyle>` | — | Dialog card surface style override (default `maxWidth: 400`, `borderRadius: 16`, `padding: 24`) |

### `<DialogContent />` Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | **Required** | Body content (text, form elements, custom widgets) |
| `style` | `StyleProp<ViewStyle>` | — | Content container style override (default `marginBottom: 16`) |

### `<DialogActions />` Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | **Required** | Action buttons (typically `<Button />` elements) |
| `style` | `StyleProp<ViewStyle>` | — | Action row style override (default `flexDirection: 'row'`, `justifyContent: 'flex-end'`, `gap: 8`, `marginTop: 8`) |

---

## Critical Rules & Guidelines
1. **ThemeProvider Requirement**: `Dialog` calls `useAppTheme()` and must be mounted within `<ThemeProvider>`.
2. **Always Use Inside `<Portal>`**: When rendering from nested screens or scrollable views, wrap in `<Portal>` from `@codexporer.io/expo-portal` to float above headers and navigation bars.
3. **Provide `onDismiss`**: Necessary for user-friendly exit via backdrop tap and hardware back button.
4. **Hardware Back Press Trapping**: Use `trapHardwareBackPress={true}` on critical dialogs to prevent Android users from backing out of required prompts.
