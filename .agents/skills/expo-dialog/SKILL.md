---
name: expo-dialog
description: Instructions and guidelines for using @codexporer.io/expo-dialog (Expo Dialog) in React Native and Expo applications.
---

# `@codexporer.io/expo-dialog` Skill

## Overview
`@codexporer.io/expo-dialog` is the base modal dialog component for the application. It features animated scale/fade transitions, backdrop dismiss handling, theme integration, and structured subcomponents (`DialogContent`, `DialogActions`).

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
| `visible` | `boolean` | `false` | Controls modal visibility |
| `onDismiss` | `() => void` | — | Callback fired when backdrop is tapped or back button pressed |
| `children` | `ReactNode` | — | Dialog contents (`DialogContent`, `DialogActions`) |
| `style` | `StyleProp<ViewStyle>` | — | Outer modal wrapper style override |
| `contentStyle` | `StyleProp<ViewStyle>` | — | Dialog card surface style override |

### `<DialogContent />` Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | Body content (text, form elements, custom widgets) |
| `style` | `StyleProp<ViewStyle>` | Padding and layout overrides |

### `<DialogActions />` Props
| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `ReactNode` | Action buttons (typically `<Button />` elements) |
| `style` | `StyleProp<ViewStyle>` | Action row alignment overrides |

---

## Critical Rules & Guidelines
1. **Always Use Inside `<Portal>`**: Prevents z-index conflicts and clipping inside nested scroll views.
2. **Provide `onDismiss`**: Necessary for user-friendly exit via backdrop tap.
