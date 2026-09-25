import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    BackHandler,
    TouchableWithoutFeedback,
    StyleProp,
    ViewStyle
} from 'react-native';
import { useAppTheme } from '@codexporer.io/expo-app-theme';

export interface DialogProps {
    visible: boolean;
    onDismiss?: () => void;
    dismissable?: boolean;
    dismissOnBackdropPress?: boolean;
    dismissOnHardwareBackPress?: boolean;
    trapHardwareBackPress?: boolean;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export interface DialogContentProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export interface DialogActionsProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, style }) => {
    return <View style={[styles.content, style]}>{children}</View>;
};

export const DialogActions: React.FC<DialogActionsProps> = ({ children, style }) => {
    return <View style={[styles.actionsContainer, style]}>{children}</View>;
};

export const Dialog: React.FC<DialogProps> = ({
    visible,
    onDismiss,
    dismissable = true,
    dismissOnBackdropPress = dismissable,
    dismissOnHardwareBackPress = dismissable,
    trapHardwareBackPress = false,
    children,
    style
}) => {
    const theme = useAppTheme();
    const [mounted, setMounted] = useState<boolean>(visible);
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setMounted(true);
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true
            }).start(() => {
                setMounted(false);
            });
        }
    }, [visible, opacity]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            if (dismissOnHardwareBackPress && onDismiss) {
                onDismiss();
                return true;
            }
            if (trapHardwareBackPress) {
                return true;
            }
            return false;
        });

        return () => {
            subscription?.remove();
        };
    }, [visible, dismissOnHardwareBackPress, trapHardwareBackPress, onDismiss]);

    if (!mounted) {
        return null;
    }

    const handleBackdropPress = () => {
        if (dismissOnBackdropPress && onDismiss) {
            onDismiss();
        }
    };

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFill,
                styles.overlayContainer,
                { opacity }
            ]}
            pointerEvents={visible ? 'auto' : 'none'}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation?.()}>
                        <View
                            style={[
                                styles.dialogContainer,
                                {
                                    backgroundColor: theme.surface,
                                    shadowColor: theme.shadow
                                },
                                style
                            ]}
                        >
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        zIndex: 99999,
        elevation: 99999,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    dialogContainer: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        padding: 24,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    content: {
        marginBottom: 16,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    }
});

export default Dialog;
